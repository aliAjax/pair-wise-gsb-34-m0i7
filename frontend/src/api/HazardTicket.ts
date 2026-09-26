import { mockData } from "../mocks/seedData";
import type {
  HazardFlowEvent,
  HazardTicket,
  HazardTicketDetail,
  HazardTicketListItem
} from "../types/HazardTicket";
import type { ReviewAction } from "../constants/RectifyStatus";
import { isOverdue, sortHazardTickets } from "../utils/formatters";

const endpoint = "/api/hazard-ticket";

export class ApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

async function parseError(res: Response): Promise<never> {
  // 后端统一返回 {code, message}，原样抛给页面展示
  let body: { code?: string; message?: string } = {};
  try {
    body = await res.json();
  } catch {
    // 非 JSON 响应按网络错误处理
  }
  throw new ApiError(body.code ?? "INTERNAL_ERROR", body.message ?? `请求失败（${res.status}）`);
}

async function post<T>(url: string, payload: unknown, role: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-role": role },
      body: JSON.stringify(payload)
    });
  } catch {
    throw new ApiError("NETWORK_ERROR", "后端服务不可用，无法提交");
  }
  if (!res.ok) return parseError(res);
  return await res.json();
}

export async function listHazardTicket(): Promise<HazardTicketListItem[]> {
  try {
    const res = await fetch(endpoint);
    if (res.ok) return await res.json();
  } catch {
    // Local mock fallback keeps the UI available during offline review.
  }
  const devices = mockData.fireDevice;
  const results = mockData.inspectionResult;
  const rows = mockData.hazardTicket.map((ticket) => {
    const result = results.find((row) => row.id === ticket.result_id);
    const device = devices.find((row) => row.id === result?.device_id);
    return {
      ...(ticket as unknown as HazardTicket),
      overdue: isOverdue(ticket.deadline, ticket.rectify_status),
      device_code: device?.device_code ?? "",
      device_type: device?.device_type ?? "",
      item_code: result?.item_code ?? ""
    } as HazardTicketListItem;
  });
  return sortHazardTickets(rows);
}

export async function getHazardTicket(id: number): Promise<HazardTicketDetail> {
  try {
    const res = await fetch(`${endpoint}/${id}`);
    if (res.ok) return await res.json();
    if (res.status !== 404) return parseError(res);
  } catch {
    // Local mock fallback keeps the UI available during offline review.
  }
  const ticket = mockData.hazardTicket.find((row) => row.id === id);
  if (!ticket) throw new ApiError("TICKET_NOT_FOUND", "隐患整改单不存在");
  const result = mockData.inspectionResult.find((row) => row.id === ticket.result_id) ?? null;
  const device = mockData.fireDevice.find((row) => row.id === result?.device_id) ?? null;
  const flow = (mockData.hazardTicketFlow as unknown as HazardFlowEvent[])
    .filter((event) => event.ticket_id === id)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
  return {
    ticket: ticket as unknown as HazardTicket,
    device,
    result,
    flow,
    overdue: isOverdue(ticket.deadline, ticket.rectify_status)
  };
}

export async function submitRectify(id: number, rectifyNote: string, role: string): Promise<HazardTicketDetail> {
  return post(`${endpoint}/${id}/submit`, { rectify_note: rectifyNote }, role);
}

export async function reviewHazardTicket(id: number, action: ReviewAction, reviewNote: string, role: string): Promise<HazardTicketDetail> {
  return post(`${endpoint}/${id}/review`, { action, review_note: reviewNote }, role);
}

export async function saveHazardTicket(payload: HazardTicket) {
  console.info("save HazardTicket", payload);
  return payload;
}
