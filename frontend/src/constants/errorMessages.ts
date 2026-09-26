export const ERROR_MESSAGES = {
  AUTH_REQUIRED: "请先登录后再继续操作",
  RBAC_DENIED: "当前角色没有执行该动作的权限",
  VALIDATION_FAILED: "表单字段缺失或格式错误",
  RATE_LIMITED: "请求过于频繁，请稍后再试",
  TICKET_NOT_FOUND: "隐患整改单不存在",
  INVALID_STATUS_TRANSITION: "整改单当前状态不允许该操作",
  RECTIFY_NOTE_REQUIRED: "提交复验前必须填写处理说明",
  REJECT_REASON_REQUIRED: "退回整改必须填写退回原因",
  TICKET_ALREADY_CLOSED: "整改单已归档关闭，不能重复操作"
};
