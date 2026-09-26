from fastapi import APIRouter, Depends

from src.constants.roles import ROLE_AUDITOR, ROLE_VENDOR
from src.controllers.hazard_ticket_controller import (
    get_hazard_ticket,
    list_hazard_ticket,
    review_hazard_ticket,
    submit_rectify,
)
from src.middlewares.rbac_middleware import allow_roles

router = APIRouter(prefix="/api/hazard-ticket", tags=["HazardTicket"])
router.get("")(list_hazard_ticket)
router.get("/{ticket_id}")(get_hazard_ticket)
router.post("/{ticket_id}/submit", dependencies=[Depends(allow_roles(ROLE_VENDOR))])(submit_rectify)
router.post("/{ticket_id}/review", dependencies=[Depends(allow_roles(ROLE_AUDITOR))])(review_hazard_ticket)
