import type { FireDevice } from "./FireDevice";
import type { HazardTicket } from "./HazardTicket";
import type { HazardTicketFlow } from "./HazardTicketFlow";
import type { InspectionResult } from "./InspectionResult";

export interface HazardTicketDetail {
  ticket: HazardTicket;
  device: FireDevice | null;
  result: InspectionResult | null;
  flows: HazardTicketFlow[];
}
