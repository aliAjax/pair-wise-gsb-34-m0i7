export const RectifyStatus = ["IN_PROGRESS", "PENDING_REVIEW", "CLOSED"] as const;
export type RectifyStatus = (typeof RectifyStatus)[number];
export const RectifyStatusText: Record<RectifyStatus, string> = {
  IN_PROGRESS: "处理中",
  PENDING_REVIEW: "待复验",
  CLOSED: "已关闭"
};

export const HazardFlowAction = ["SUBMIT", "APPROVE", "REJECT"] as const;
export type HazardFlowAction = (typeof HazardFlowAction)[number];
