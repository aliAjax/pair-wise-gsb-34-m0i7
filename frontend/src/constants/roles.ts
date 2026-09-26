export const ROLE_OPTIONS = ["vendor", "auditor", "manager", "inspector"] as const;
export type Role = (typeof ROLE_OPTIONS)[number];
export const ROLE_TEXT: Record<Role, string> = {
  vendor: "维保商",
  auditor: "审计员",
  manager: "物业主管",
  inspector: "巡检员"
};
export const roleText = (value: string) => ROLE_TEXT[value as Role] ?? value;
