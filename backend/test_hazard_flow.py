"""直接驱动 service 层验证整改流转（不依赖 fastapi）。"""
import copy
import sys

sys.path.insert(0, ".")

from src.seed import seed
from src.services.hazard_ticket_service import HazardTicketService
from src.types.domain_error import DomainError

snapshot = copy.deepcopy(seed)
service = HazardTicketService()
vendor = {"id": 11, "role": "vendor"}
auditor = {"id": 21, "role": "auditor"}

def expect_error(fn, code):
    try:
        fn()
    except DomainError as exc:
        assert exc.code == code, f"expected {code}, got {exc.code}: {exc.message}"
        print(f"  OK  {code}: {exc.message}")
        return
    raise AssertionError(f"expected DomainError {code}, but call succeeded")

# 1. 列表排序：严重程度优先，逾期在前
items = service.list_sorted()
order = [(i["id"], i["severity"], i["overdue"]) for i in items]
print("sorted:", order)
assert [i["id"] for i in items] == [1, 2, 3, 4, 5, 6], order
assert items[0]["overdue"] is True and items[1]["overdue"] is False
assert items[2]["overdue"] is True and items[3]["overdue"] is False
assert items[4]["overdue"] is False  # CLOSED 不算逾期

# 2. 详情带关联设备、检查结果和流转记录
detail = service.get_detail(1)
assert detail["device"]["device_code"] == "HYD-01-1F-01"
assert detail["result"]["item_code"] == "HYDRANT-PRESSURE"
assert [e["action"] for e in detail["flow"]] == ["CREATE", "SUBMIT_RECTIFY", "REVIEW_REJECT"]

# 3. 维保商提交：OPEN -> PENDING_REVIEW
detail = service.submit_rectify(3, "已更换压力表并复测合格", vendor)
assert detail["ticket"]["rectify_status"] == "PENDING_REVIEW"
assert detail["ticket"]["rectify_note"] == "已更换压力表并复测合格"
assert detail["ticket"]["submitted_at"]
assert detail["flow"][-1]["action"] == "SUBMIT_RECTIFY"
print("  OK  submit OPEN -> PENDING_REVIEW")

# 4. 重复提交被拦截
expect_error(lambda: service.submit_rectify(3, "重复提交", vendor), "INVALID_STATUS_TRANSITION")

# 5. 已归档单据任何操作都被拦截
expect_error(lambda: service.submit_rectify(5, "再次提交", vendor), "TICKET_ALREADY_CLOSED")
expect_error(lambda: service.review(5, "approve", "", auditor), "TICKET_ALREADY_CLOSED")

# 6. 空处理说明 / 空退回原因
expect_error(lambda: service.submit_rectify(4, "   ", vendor), "RECTIFY_NOTE_REQUIRED")
expect_error(lambda: service.review(3, "reject", " ", auditor), "REJECT_REASON_REQUIRED")

# 7. 状态未到时不能复验
expect_error(lambda: service.review(4, "approve", "", auditor), "INVALID_STATUS_TRANSITION")

# 8. 审计员退回：PENDING_REVIEW -> IN_PROGRESS，原因留痕
detail = service.review(3, "reject", "复测仍不合格，需重新处理", auditor)
assert detail["ticket"]["rectify_status"] == "IN_PROGRESS"
assert detail["ticket"]["review_note"] == "复测仍不合格，需重新处理"
assert detail["flow"][-1]["action"] == "REVIEW_REJECT"
print("  OK  reject PENDING_REVIEW -> IN_PROGRESS")

# 9. 退回后维保商可再次提交，审计员通过归档并记录关闭时间
service.submit_rectify(3, "已更换减压阀，复测 0.31MPa", vendor)
detail = service.review(3, "approve", "现场复验合格", auditor)
assert detail["ticket"]["rectify_status"] == "CLOSED"
assert detail["ticket"]["closed_at"]
assert detail["flow"][-1]["action"] == "REVIEW_APPROVE"
print("  OK  approve PENDING_REVIEW -> CLOSED, closed_at =", detail["ticket"]["closed_at"])

# 10. 不存在的单据 / 非法动作
expect_error(lambda: service.get_detail(999), "TICKET_NOT_FOUND")
expect_error(lambda: service.review(2, "archive", "", auditor), "VALIDATION_FAILED")

# 11. 流转记录完整留痕（处理说明、复验意见、新状态）
flow = service.get_detail(3)["flow"]
assert [e["action"] for e in flow] == ["CREATE", "SUBMIT_RECTIFY", "REVIEW_REJECT", "SUBMIT_RECTIFY", "REVIEW_APPROVE"]
assert flow[-1]["note"] == "现场复验合格" and flow[-1]["to_status"] == "CLOSED"
print("  OK  flow trail:", [e["action"] for e in flow])

seed.clear()
seed.update(snapshot)
print("ALL SERVICE TESTS PASSED")
