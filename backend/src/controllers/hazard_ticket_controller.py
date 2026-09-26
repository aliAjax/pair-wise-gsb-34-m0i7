from fastapi import Request

from src.middlewares.rbac_middleware import allow_roles
from src.services.hazard_ticket_service import HazardTicketService
from src.types.domain_error import validation_failed
from src.types.hazard_ticket_payload import ReviewPayload, SubmitRectifyPayload

service = HazardTicketService()

def list_hazard_ticket():
    return service.list_sorted()

def get_hazard_ticket(ticket_id: int):
    return service.get_detail(ticket_id)

def submit_hazard_ticket(ticket_id: int, payload: SubmitRectifyPayload, request: Request):
    # 维保商才能提交处理说明；角色不符直接 403
    user = allow_roles("vendor")(request)
    if payload is None:
        raise validation_failed()
    return service.submit_rectify(ticket_id, payload.rectify_note, user)

def review_hazard_ticket(ticket_id: int, payload: ReviewPayload, request: Request):
    # 审计员才能复验（通过归档 / 退回整改）
    user = allow_roles("auditor")(request)
    if payload is None:
        raise validation_failed()
    return service.review(ticket_id, payload.action, payload.review_note, user)
