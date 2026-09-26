export const ERROR_MESSAGES = {
  AUTH_REQUIRED: "请先登录后再继续操作",
  RBAC_DENIED: "当前角色没有执行该动作的权限",
  VALIDATION_FAILED: "表单字段缺失或格式错误",
  RATE_LIMITED: "请求过于频繁，请稍后再试",
  TICKET_NOT_FOUND: "隐患整改单不存在或已被删除",
  INVALID_TICKET_STATE: "整改单当前状态不允许该操作",
  RECTIFY_NOTE_REQUIRED: "请填写处理说明后再提交",
  REVIEW_COMMENT_REQUIRED: "退回整改时必须填写退回原因",
  UNKNOWN_REVIEW_ACTION: "未知的复验动作，仅支持通过或退回",
  NETWORK_ERROR: "无法连接后端服务，已切换为本地演示数据"
};
