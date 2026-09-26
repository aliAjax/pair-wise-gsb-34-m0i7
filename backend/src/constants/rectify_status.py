RectifyStatus = ["OPEN", "IN_PROGRESS", "PENDING_REVIEW", "CLOSED"]

RECTIFY_STATUS_TEXT = {
  "OPEN": "待处理",
  "IN_PROGRESS": "处理中",
  "PENDING_REVIEW": "待复验",
  "CLOSED": "已归档"
}

# 允许提交整改说明的状态；其余状态提交一律视为重复/越权操作
RECTIFIABLE_STATUS = ["OPEN", "IN_PROGRESS"]

# 复验动作
REVIEW_ACTIONS = ["approve", "reject"]
