from pydantic import BaseModel
class HazardFlowEvent(BaseModel):
    id: int | float
    ticket_id: int | float
    action: str
    actor_role: str
    note: str
    from_status: str
    to_status: str
    created_at: str
