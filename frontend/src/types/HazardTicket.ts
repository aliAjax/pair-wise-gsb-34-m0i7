import type { RectifyStatus } from "../constants/RectifyStatus";
import type { FireDevice } from "./FireDevice";
import type { InspectionResult } from "./InspectionResult";

export interface HazardTicket {
  id: number;
  result_id: number;
  severity: string;
  owner_id: number;
  deadline: string;
  rectify_status: RectifyStatus;
  rectify_note: string;
  review_note: string;
  submitted_at: string;
  closed_at: string;
}

export interface HazardTicketListItem extends HazardTicket {
  overdue: boolean;
  device_code: string;
  device_type: string;
  item_code: string;
}

export interface HazardFlowEvent {
  id: number;
  ticket_id: number;
  action: string;
  actor_role: string;
  note: string;
  from_status: string;
  to_status: string;
  created_at: string;
}

export interface HazardTicketDetail {
  ticket: HazardTicket;
  device: FireDevice | null;
  result: InspectionResult | null;
  flow: HazardFlowEvent[];
  overdue: boolean;
}
