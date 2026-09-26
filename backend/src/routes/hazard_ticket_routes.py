from fastapi import APIRouter
from src.controllers.hazard_ticket_controller import (
    get_hazard_ticket,
    list_hazard_ticket,
    review_hazard_ticket,
    submit_hazard_ticket,
)

router = APIRouter(prefix="/api/hazard-ticket", tags=["HazardTicket"])
router.get("")(list_hazard_ticket)
router.get("/{ticket_id}")(get_hazard_ticket)
router.post("/{ticket_id}/submit")(submit_hazard_ticket)
router.post("/{ticket_id}/review")(review_hazard_ticket)
