def create_hazard_ticket_dto(**overrides):
    row = {"id": 0, "result_id": 0, "severity": "MEDIUM", "owner_id": 0, "deadline": "", "rectify_status": "IN_PROGRESS", "rectify_note": "", "closed_at": ""}
    row.update(overrides)
    return row


def create_hazard_ticket_flow_dto(**overrides):
    row = {"id": 0, "ticket_id": 0, "action": "SUBMIT", "from_status": "IN_PROGRESS", "to_status": "PENDING_REVIEW", "note": "", "operator_role": "vendor", "created_at": ""}
    row.update(overrides)
    return row


def create_hazard_ticket_detail_dto(ticket=None, device=None, result=None, flows=None):
    return {
        "ticket": ticket or create_hazard_ticket_dto(),
        "device": device,
        "result": result,
        "flows": flows or [],
    }
