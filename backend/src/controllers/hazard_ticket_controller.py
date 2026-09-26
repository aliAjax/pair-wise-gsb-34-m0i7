from fastapi import Request
from fastapi.responses import JSONResponse

from src.constants.error_codes import ERROR_CODES
from src.services.hazard_ticket_service import HazardTicketService, ServiceError
from src.types.hazard_ticket_payload import ReviewTicketPayload, SubmitRectifyPayload

service = HazardTicketService()

STATUS_BY_CODE = {
    ERROR_CODES["RBAC_DENIED"]: 403,
    ERROR_CODES["TICKET_NOT_FOUND"]: 404,
    ERROR_CODES["INVALID_TICKET_STATE"]: 409,
}


def error_response(exc):
    return JSONResponse(
        status_code=STATUS_BY_CODE.get(exc.code, 400),
        content={"code": exc.code, "message": str(exc)},
    )


def list_hazard_ticket():
    return service.list_sorted()


def get_hazard_ticket(ticket_id: int):
    try:
        return service.get_detail(ticket_id)
    except ServiceError as exc:
        return error_response(exc)


def submit_rectify(ticket_id: int, payload: SubmitRectifyPayload, request: Request):
    try:
        return service.submit_rectify(ticket_id, payload.rectify_note, getattr(request.state, "user", {}))
    except ServiceError as exc:
        return error_response(exc)


def review_hazard_ticket(ticket_id: int, payload: ReviewTicketPayload, request: Request):
    try:
        return service.review(ticket_id, payload.action, payload.comment, getattr(request.state, "user", {}))
    except ServiceError as exc:
        return error_response(exc)
