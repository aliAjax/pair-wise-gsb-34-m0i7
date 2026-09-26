from pydantic import BaseModel

HazardTicketPayload = dict

class SubmitRectifyPayload(BaseModel):
    rectify_note: str

class ReviewPayload(BaseModel):
    action: str  # approve | reject
    review_note: str = ""
