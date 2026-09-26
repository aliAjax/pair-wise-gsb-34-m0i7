export const RectifyStatus = ["OPEN", "IN_PROGRESS", "PENDING_REVIEW", "CLOSED"] as const;
export type RectifyStatus = (typeof RectifyStatus)[number];

export const RectifyStatusText: Record<RectifyStatus, string> = {
  OPEN: "待处理",
  IN_PROGRESS: "处理中",
  PENDING_REVIEW: "待复验",
  CLOSED: "已归档"
};

// 维保商可提交处理说明的状态
export const RECTIFIABLE_STATUS: RectifyStatus[] = ["OPEN", "IN_PROGRESS"];

export type ReviewAction = "approve" | "reject";
export const ReviewActionText: Record<ReviewAction, string> = {
  approve: "通过归档",
  reject: "退回整改"
};
