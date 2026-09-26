from pydantic import BaseModel
class HazardTicket(BaseModel):
    id: int | float
    result_id: int | float
    severity: str
    owner_id: int | float
    deadline: str
    rectify_status: str
    rectify_note: str
    review_note: str
    submitted_at: str
    closed_at: str
