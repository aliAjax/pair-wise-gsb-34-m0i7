import { HazardSeverityRank, type HazardSeverity } from "../constants/HazardSeverity";
import { RectifyStatusText, type RectifyStatus } from "../constants/RectifyStatus";

export const formatDate = (value: string) => (value ? new Date(value).toLocaleString("zh-CN") : "-");
export const formatStatus = (value: string) => value.replace(/_/g, " ");
export const formatNumber = (value: number) => new Intl.NumberFormat("zh-CN").format(value);
export const formatRisk = (value: string) => ({ LOW: "低", MEDIUM: "中", HIGH: "高", CRITICAL: "严重", EXTREME: "极高" }[value] ?? value);
export const formatRectifyStatus = (value: string) => RectifyStatusText[value as RectifyStatus] ?? value;

// 已归档的单据不再算逾期
export const isOverdue = (deadline: string, rectifyStatus: string) => {
  if (rectifyStatus === "CLOSED" || !deadline) return false;
  const due = new Date(deadline).getTime();
  return Number.isFinite(due) && due < Date.now();
};

// 严重程度优先，逾期在前，同组按截止时间升序
export const sortHazardTickets = <T extends { severity: string; deadline: string; overdue?: boolean }>(rows: T[]): T[] =>
  [...rows].sort((a, b) => {
    const severityGap = (HazardSeverityRank[a.severity as HazardSeverity] ?? 99) - (HazardSeverityRank[b.severity as HazardSeverity] ?? 99);
    if (severityGap !== 0) return severityGap;
    const overdueGap = Number(b.overdue ?? false) - Number(a.overdue ?? false);
    if (overdueGap !== 0) return overdueGap;
    return a.deadline.localeCompare(b.deadline);
  });
