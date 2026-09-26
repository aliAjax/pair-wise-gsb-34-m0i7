import type { HazardTicket } from "../types/HazardTicket";

export const createDefaultHazardTicket = (overrides: Partial<HazardTicket> = {}): HazardTicket => ({
  id: 0,
  result_id: 0,
  severity: "MEDIUM",
  owner_id: 0,
  deadline: "",
  rectify_status: "OPEN",
  rectify_note: "",
  review_note: "",
  submitted_at: "",
  closed_at: "",
  ...overrides
});

export const createHazardTicketForm = createDefaultHazardTicket;
export const createHazardTicketResponse = createDefaultHazardTicket;
