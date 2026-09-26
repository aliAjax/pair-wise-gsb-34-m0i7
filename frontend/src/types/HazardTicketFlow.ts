export interface HazardTicketFlow {
  id: number;
  ticket_id: number;
  action: string;
  from_status: string;
  to_status: string;
  note: string;
  operator_role: string;
  created_at: string;
}
