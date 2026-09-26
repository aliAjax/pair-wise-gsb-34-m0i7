export const HazardSeverity = ["LOW","MEDIUM","HIGH","CRITICAL"] as const;
export type HazardSeverity = (typeof HazardSeverity)[number];
export const HazardSeverityText: Record<HazardSeverity, string> = Object.fromEntries(HazardSeverity.map((value) => [value, value.replace(/_/g, " ")])) as Record<HazardSeverity, string>;
// 列表排序权重：数值越小越靠前
export const HazardSeverityRank: Record<HazardSeverity, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
