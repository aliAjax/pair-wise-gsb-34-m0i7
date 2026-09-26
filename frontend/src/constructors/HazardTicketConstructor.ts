import type { HazardTicket } from "../types/HazardTicket";
import type { HazardTicketDetail } from "../types/HazardTicketDetail";
import type { HazardTicketFlow } from "../types/HazardTicketFlow";

export const createDefaultHazardTicket = (overrides: Partial<HazardTicket> = {}): HazardTicket => ({
  id: 0,
  result_id: 0,
  severity: "MEDIUM",
  owner_id: 0,
  deadline: "",
  rectify_status: "IN_PROGRESS",
  rectify_note: "",
  closed_at: "",
  ...overrides
});

export const createHazardTicketFlow = (overrides: Partial<HazardTicketFlow> = {}): HazardTicketFlow => ({
  id: 0,
  ticket_id: 0,
  action: "SUBMIT",
  from_status: "IN_PROGRESS",
  to_status: "PENDING_REVIEW",
  note: "",
  operator_role: "vendor",
  created_at: "",
  ...overrides
});

export const createHazardTicketDetail = (overrides: Partial<HazardTicketDetail> = {}): HazardTicketDetail => ({
  ticket: createDefaultHazardTicket(),
  device: null,
  result: null,
  flows: [],
  ...overrides
});

export const createHazardTicketForm = createDefaultHazardTicket;
export const createHazardTicketResponse = createDefaultHazardTicket;
