import { mockData } from "../mocks/seedData";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { rectifyStatusText } from "../constants/RectifyStatus";
import type { FireDevice } from "../types/FireDevice";
import type { HazardTicket } from "../types/HazardTicket";
import type { HazardTicketDetail } from "../types/HazardTicketDetail";
import type { HazardTicketFlow } from "../types/HazardTicketFlow";
import type { InspectionResult } from "../types/InspectionResult";

const endpoint = "/api/hazard-ticket";

export class ApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

async function request<T>(path: string, init: RequestInit, role: string): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "content-type": "application/json", "x-role": role }
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const code = body?.code ?? "INTERNAL_ERROR";
    const message = body?.message ?? ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] ?? "请求失败";
    throw new ApiError(code, message);
  }
  return body as T;
}

// Local mutable copy keeps the workflow usable during offline review.
const localTickets = JSON.parse(JSON.stringify(mockData.hazardTicket)) as HazardTicket[];
const localFlows = JSON.parse(JSON.stringify(mockData.hazardTicketFlow)) as HazardTicketFlow[];

function buildLocalDetail(id: number): HazardTicketDetail {
  const ticket = localTickets.find((row) => row.id === id);
  if (!ticket) throw new ApiError("TICKET_NOT_FOUND", ERROR_MESSAGES.TICKET_NOT_FOUND);
  const results = mockData.inspectionResult as unknown as InspectionResult[];
  const devices = mockData.fireDevice as unknown as FireDevice[];
  const result = results.find((row) => row.id === ticket.result_id) ?? null;
  const device = result ? devices.find((row) => row.id === result.device_id) ?? null : null;
  const flows = localFlows.filter((row) => row.ticket_id === id).sort((a, b) => b.id - a.id);
  return { ticket: { ...ticket }, device, result, flows };
}

function appendLocalFlow(flow: Omit<HazardTicketFlow, "id">) {
  const id = Math.max(0, ...localFlows.map((row) => row.id)) + 1;
  localFlows.push({ ...flow, id });
}

function localSubmit(id: number, note: string, role: string): HazardTicketDetail {
  if (role !== "vendor") throw new ApiError("RBAC_DENIED", "只有维保商可以提交处理说明");
  const ticket = localTickets.find((row) => row.id === id);
  if (!ticket) throw new ApiError("TICKET_NOT_FOUND", ERROR_MESSAGES.TICKET_NOT_FOUND);
  if (ticket.rectify_status !== "IN_PROGRESS") {
    throw new ApiError("INVALID_TICKET_STATE", `整改单当前状态为「${rectifyStatusText(ticket.rectify_status)}」，不能重复提交处理说明`);
  }
  const trimmed = note.trim();
  if (!trimmed) throw new ApiError("RECTIFY_NOTE_REQUIRED", ERROR_MESSAGES.RECTIFY_NOTE_REQUIRED);
  ticket.rectify_note = trimmed;
  ticket.rectify_status = "PENDING_REVIEW";
  appendLocalFlow({ ticket_id: id, action: "SUBMIT", from_status: "IN_PROGRESS", to_status: "PENDING_REVIEW", note: trimmed, operator_role: role, created_at: new Date().toISOString() });
  return buildLocalDetail(id);
}

function localReview(id: number, action: string, comment: string, role: string): HazardTicketDetail {
  if (role !== "auditor") throw new ApiError("RBAC_DENIED", "只有审计员可以执行复验");
  const ticket = localTickets.find((row) => row.id === id);
  if (!ticket) throw new ApiError("TICKET_NOT_FOUND", ERROR_MESSAGES.TICKET_NOT_FOUND);
  if (ticket.rectify_status !== "PENDING_REVIEW") {
    throw new ApiError("INVALID_TICKET_STATE", `整改单当前状态为「${rectifyStatusText(ticket.rectify_status)}」，不在待复验状态，无法复验`);
  }
  const normalized = action.toUpperCase();
  if (normalized !== "APPROVE" && normalized !== "REJECT") {
    throw new ApiError("UNKNOWN_REVIEW_ACTION", ERROR_MESSAGES.UNKNOWN_REVIEW_ACTION);
  }
  const trimmed = comment.trim();
  if (normalized === "REJECT" && !trimmed) {
    throw new ApiError("REVIEW_COMMENT_REQUIRED", ERROR_MESSAGES.REVIEW_COMMENT_REQUIRED);
  }
  const from = ticket.rectify_status;
  if (normalized === "APPROVE") {
    ticket.rectify_status = "CLOSED";
    ticket.closed_at = new Date().toISOString();
  } else {
    ticket.rectify_status = "IN_PROGRESS";
  }
  appendLocalFlow({ ticket_id: id, action: normalized, from_status: from, to_status: ticket.rectify_status, note: trimmed || "复验通过，同意归档", operator_role: role, created_at: new Date().toISOString() });
  return buildLocalDetail(id);
}

export async function listHazardTicket(): Promise<HazardTicket[]> {
  try {
    return await request<HazardTicket[]>(endpoint, { method: "GET" }, "manager");
  } catch (err) {
    if (err instanceof ApiError) throw err;
    // Local mock fallback keeps the UI available during offline review.
    return localTickets.map((row) => ({ ...row }));
  }
}

export async function getHazardTicketDetail(id: number, role: string): Promise<HazardTicketDetail> {
  try {
    return await request<HazardTicketDetail>(`${endpoint}/${id}`, { method: "GET" }, role);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    return buildLocalDetail(id);
  }
}

export async function submitRectify(id: number, rectifyNote: string, role: string): Promise<HazardTicketDetail> {
  try {
    return await request<HazardTicketDetail>(`${endpoint}/${id}/submit`, { method: "POST", body: JSON.stringify({ rectify_note: rectifyNote }) }, role);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    return localSubmit(id, rectifyNote, role);
  }
}

export async function reviewHazardTicket(id: number, action: string, comment: string, role: string): Promise<HazardTicketDetail> {
  try {
    return await request<HazardTicketDetail>(`${endpoint}/${id}/review`, { method: "POST", body: JSON.stringify({ action, comment }) }, role);
  } catch (err) {
    if (err instanceof ApiError) throw err;
    return localReview(id, action, comment, role);
  }
}

export async function saveHazardTicket(payload: HazardTicket) {
  console.info("save HazardTicket", payload);
  return payload;
}
