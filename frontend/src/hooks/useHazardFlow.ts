import { useMemo } from "react";
import { hazardSeverityRank } from "../constants/HazardSeverity";
import { isOverdue } from "../utils/formatters";
import type { HazardTicket } from "../types/HazardTicket";

export const isTicketOverdue = (ticket: Pick<HazardTicket, "deadline" | "rectify_status">) =>
  isOverdue(ticket.deadline, ticket.rectify_status);

export function useHazardFlow(rows: HazardTicket[] = []) {
  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const bySeverity = hazardSeverityRank(a.severity) - hazardSeverityRank(b.severity);
        if (bySeverity !== 0) return bySeverity;
        const byOverdue = Number(isTicketOverdue(b)) - Number(isTicketOverdue(a));
        if (byOverdue !== 0) return byOverdue;
        return a.deadline.localeCompare(b.deadline);
      }),
    [rows]
  );
  const overdueCount = useMemo(() => rows.filter(isTicketOverdue).length, [rows]);
  return { sorted, overdueCount };
}
