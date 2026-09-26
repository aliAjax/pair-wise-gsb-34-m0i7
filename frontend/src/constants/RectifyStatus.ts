export const RectifyStatus = ["IN_PROGRESS", "PENDING_REVIEW", "CLOSED"] as const;
export type RectifyStatus = (typeof RectifyStatus)[number];
export const RectifyStatusText: Record<RectifyStatus, string> = {
  IN_PROGRESS: "处理中",
  PENDING_REVIEW: "待复验",
  CLOSED: "已关闭"
};
export const rectifyStatusText = (value: string) => RectifyStatusText[value as RectifyStatus] ?? value;

export const HazardFlowAction = ["SUBMIT", "APPROVE", "REJECT"] as const;
export type HazardFlowAction = (typeof HazardFlowAction)[number];
export const HazardFlowActionText: Record<HazardFlowAction, string> = {
  SUBMIT: "提交处理说明",
  APPROVE: "复验通过",
  REJECT: "复验退回"
};
export const hazardFlowActionText = (value: string) => HazardFlowActionText[value as HazardFlowAction] ?? value;
