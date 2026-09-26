from src.constants.hazard_severity import HazardSeverityRank
from src.constants.log_templates import HAZARD_FLOW_LOG
from src.constants.rectify_status import RECTIFIABLE_STATUS, RECTIFY_STATUS_TEXT, REVIEW_ACTIONS
from src.constructors.hazard_ticket_factory import (
    create_flow_event,
    create_hazard_ticket_detail,
    create_hazard_ticket_list_item,
)
from src.repositories.fire_device_repository import FireDeviceRepository
from src.repositories.hazard_ticket_repository import HazardTicketRepository
from src.repositories.inspection_result_repository import InspectionResultRepository
from src.types.domain_error import (
    invalid_transition,
    rectify_note_required,
    reject_reason_required,
    ticket_already_closed,
    ticket_not_found,
    validation_failed,
)
from src.utils.formatters import audit_target, is_overdue, now_iso

class HazardTicketService:
    def __init__(self):
        self.repo = HazardTicketRepository()
        self.device_repo = FireDeviceRepository()
        self.result_repo = InspectionResultRepository()

    def _device_of(self, result):
        for device in self.device_repo.find_all():
            if result and device["id"] == result["device_id"]:
                return device
        return None

    def _result_of(self, ticket):
        for result in self.result_repo.find_all():
            if result["id"] == ticket["result_id"]:
                return result
        return None

    def _must_get(self, ticket_id):
        ticket = self.repo.find_by_id(ticket_id)
        if ticket is None:
            raise ticket_not_found()
        return ticket

    def _sort_key(self, item):
        # 严重程度优先，逾期在前，同组按截止时间升序
        return (
            HazardSeverityRank.get(item["severity"], len(HazardSeverityRank)),
            0 if item["overdue"] else 1,
            item["deadline"],
        )

    def list_sorted(self):
        items = []
        for ticket in self.repo.find_all():
            result = self._result_of(ticket)
            items.append(create_hazard_ticket_list_item(ticket, self._device_of(result), result))
        return sorted(items, key=self._sort_key)

    def get_detail(self, ticket_id):
        ticket = self._must_get(ticket_id)
        result = self._result_of(ticket)
        return create_hazard_ticket_detail(
            ticket, self._device_of(result), result, self.repo.list_flow(ticket_id)
        )

    def _record_flow(self, ticket, action, actor_role, note, from_status, to_status):
        event = create_flow_event(
            self.repo.next_flow_id(), ticket["id"], action, actor_role,
            note, from_status, to_status, now_iso(),
        )
        self.repo.append_flow(event)
        print(HAZARD_FLOW_LOG[action], audit_target("HazardTicket", ticket["id"]), f"{from_status}->{to_status}")
        return event

    def submit_rectify(self, ticket_id, rectify_note, user):
        # 每次提交都重新读取当前状态，重复提交/越权操作在这里被拦下
        ticket = self._must_get(ticket_id)
        note = (rectify_note or "").strip()
        if not note:
            raise rectify_note_required()
        status = ticket["rectify_status"]
        if status == "CLOSED":
            raise ticket_already_closed()
        if status not in RECTIFIABLE_STATUS:
            raise invalid_transition(RECTIFY_STATUS_TEXT.get(status, status))

        from_status = status
        ticket["rectify_note"] = note
        ticket["rectify_status"] = "PENDING_REVIEW"
        ticket["submitted_at"] = now_iso()
        self.repo.update(ticket)
        self._record_flow(ticket, "SUBMIT_RECTIFY", user.get("role", "unknown"), note, from_status, "PENDING_REVIEW")
        return self.get_detail(ticket_id)

    def review(self, ticket_id, action, review_note, user):
        ticket = self._must_get(ticket_id)
        if action not in REVIEW_ACTIONS:
            raise validation_failed(f"不支持的复验动作: {action}")
        note = (review_note or "").strip()
        if action == "reject" and not note:
            raise reject_reason_required()

        status = ticket["rectify_status"]
        if status == "CLOSED":
            raise ticket_already_closed()
        if status != "PENDING_REVIEW":
            raise invalid_transition(RECTIFY_STATUS_TEXT.get(status, status))

        if action == "approve":
            ticket["rectify_status"] = "CLOSED"
            ticket["closed_at"] = now_iso()
            flow_action = "REVIEW_APPROVE"
        else:
            ticket["rectify_status"] = "IN_PROGRESS"
            flow_action = "REVIEW_REJECT"
        ticket["review_note"] = note
        self.repo.update(ticket)
        self._record_flow(ticket, flow_action, user.get("role", "unknown"), note, "PENDING_REVIEW", ticket["rectify_status"])
        return self.get_detail(ticket_id)
