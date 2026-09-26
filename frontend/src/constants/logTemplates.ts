export const LOG_TEMPLATES = {
  Building: ["建筑楼栋创建", "建筑楼栋更新", "建筑楼栋状态变更", "建筑楼栋导出"],
  FireDevice: ["消防设备创建", "消防设备更新", "消防设备状态变更", "消防设备导出"],
  InspectionTask: ["巡检任务创建", "巡检任务更新", "巡检任务状态变更", "巡检任务导出"],
  InspectionResult: ["巡检结果创建", "巡检结果更新", "巡检结果状态变更", "巡检结果导出"],
  HazardTicket: ["隐患整改单创建", "隐患整改单更新", "隐患整改单状态变更", "隐患整改单导出", "隐患整改提交复验", "隐患复验通过归档", "隐患复验退回整改"]
};

// 整改流转动作文案，时间线和操作日志共用
export const HAZARD_FLOW_ACTION_TEXT: Record<string, string> = {
  CREATE: "创建整改单",
  SUBMIT_RECTIFY: "提交处理说明",
  REVIEW_APPROVE: "复验通过归档",
  REVIEW_REJECT: "复验退回整改"
};

export const ROLE_TEXT: Record<string, string> = {
  vendor: "维保商",
  auditor: "审计员",
  manager: "物业主管",
  inspector: "巡检员",
  system: "系统",
  admin: "管理员"
};
