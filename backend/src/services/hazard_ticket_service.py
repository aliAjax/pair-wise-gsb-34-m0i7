from src.constants.error_codes import ERROR_CODES
from src.constants.error_messages import ERROR_MESSAGES
from src.constants.log_templates import LOG_TEMPLATES
from src.constants.rectify_status import RectifyStatusText
from src.constants.roles import ROLE_AUDITOR, ROLE_VENDOR
from src.constructors.hazard_ticket_factory import create_hazard_ticket_detail_dto, create_hazard_ticket_flow_dto
from src.repositories.fire_device_repository import FireDeviceRepository
from src.repositories.hazard_ticket_repository import HazardTicketRepository
from src.repositories.inspection_result_repository import InspectionResultRepository
from src.utils.formatters import audit_target, now_iso

SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}


class ServiceError(Exception):
    def __init__(self, code, message=None):
        self.code = code
        super().__init__(message or ERROR_MESSAGES.get(code, code))


class HazardTicketService:
    def __init__(self):
        self.repo = HazardTicketRepository()
        self.result_repo = InspectionResultRepository()
        self.device_repo = FireDeviceRepository()

    def list_sorted(self):
        now = now_iso()

        def sort_key(row):
            severity = SEVERITY_ORDER.get(row["severity"], len(SEVERITY_ORDER))
            overdue = 0 if (row["rectify_status"] != "CLOSED" and row["deadline"] and row["deadline"] < now) else 1
            return (severity, overdue, row["deadline"])

        return sorted(self.repo.find_all(), key=sort_key)

    def get_detail(self, ticket_id):
        ticket = self.repo.find_by_id(ticket_id)
        if ticket is None:
            raise ServiceError(ERROR_CODES["TICKET_NOT_FOUND"])
        result = self.result_repo.find_by_id(ticket["result_id"])
        device = self.device_repo.find_by_id(result["device_id"]) if result else None
        flows = self.repo.find_flows(ticket_id)
        return create_hazard_ticket_detail_dto(ticket=ticket, device=device, result=result, flows=flows)

    def submit_rectify(self, ticket_id, rectify_note, user):
        ticket = self.repo.find_by_id(ticket_id)
        if ticket is None:
            raise ServiceError(ERROR_CODES["TICKET_NOT_FOUND"])
        if (user or {}).get("role") != ROLE_VENDOR:
            raise ServiceError(ERROR_CODES["RBAC_DENIED"], "只有维保商可以提交处理说明")
        status = ticket["rectify_status"]
        if status != "IN_PROGRESS":
            raise ServiceError(
                ERROR_CODES["INVALID_TICKET_STATE"],
                f"整改单当前状态为「{RectifyStatusText.get(status, status)}」，不能重复提交处理说明",
            )
        note = (rectify_note or "").strip()
        if not note:
            raise ServiceError(ERROR_CODES["RECTIFY_NOTE_REQUIRED"])
        ticket["rectify_note"] = note
        ticket["rectify_status"] = "PENDING_REVIEW"
        self.repo.save(ticket)
        self.repo.append_flow(create_hazard_ticket_flow_dto(
            ticket_id=ticket["id"],
            action="SUBMIT",
            from_status=status,
            to_status="PENDING_REVIEW",
            note=note,
            operator_role=user.get("role"),
            created_at=now_iso(),
        ))
        print(LOG_TEMPLATES["HazardTicketFlow"][0], audit_target("HazardTicket", ticket["id"]))
        return self.get_detail(ticket_id)

    def review(self, ticket_id, action, comment, user):
        ticket = self.repo.find_by_id(ticket_id)
        if ticket is None:
            raise ServiceError(ERROR_CODES["TICKET_NOT_FOUND"])
        if (user or {}).get("role") != ROLE_AUDITOR:
            raise ServiceError(ERROR_CODES["RBAC_DENIED"], "只有审计员可以执行复验")
        status = ticket["rectify_status"]
        if status != "PENDING_REVIEW":
            raise ServiceError(
                ERROR_CODES["INVALID_TICKET_STATE"],
                f"整改单当前状态为「{RectifyStatusText.get(status, status)}」，不在待复验状态，无法复验",
            )
        action = (action or "").upper()
        if action not in ("APPROVE", "REJECT"):
            raise ServiceError(ERROR_CODES["UNKNOWN_REVIEW_ACTION"])
        comment = (comment or "").strip()
        if action == "REJECT" and not comment:
            raise ServiceError(ERROR_CODES["REVIEW_COMMENT_REQUIRED"])
        if action == "APPROVE":
            ticket["rectify_status"] = "CLOSED"
            ticket["closed_at"] = now_iso()
            note = comment or "复验通过，同意归档"
            log_template = LOG_TEMPLATES["HazardTicketFlow"][1]
        else:
            ticket["rectify_status"] = "IN_PROGRESS"
            note = comment
            log_template = LOG_TEMPLATES["HazardTicketFlow"][2]
        self.repo.save(ticket)
        self.repo.append_flow(create_hazard_ticket_flow_dto(
            ticket_id=ticket["id"],
            action=action,
            from_status=status,
            to_status=ticket["rectify_status"],
            note=note,
            operator_role=user.get("role"),
            created_at=now_iso(),
        ))
        print(log_template, audit_target("HazardTicket", ticket["id"]))
        return self.get_detail(ticket_id)
