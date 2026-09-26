from pydantic import BaseModel

HazardTicketPayload = dict


class SubmitRectifyPayload(BaseModel):
    rectify_note: str = ""


class ReviewTicketPayload(BaseModel):
    action: str = ""
    comment: str = ""
