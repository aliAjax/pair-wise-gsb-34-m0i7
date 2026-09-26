from pydantic import BaseModel


class HazardTicketFlow(BaseModel):
    id: int | float
    ticket_id: int | float
    action: str
    from_status: str
    to_status: str
    note: str
    operator_role: str
    created_at: str
