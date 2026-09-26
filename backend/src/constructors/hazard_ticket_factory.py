from src.utils.formatters import is_overdue

def create_hazard_ticket_dto(**overrides):
    row = {"id":1,"result_id":1,"severity":"CRITICAL","owner_id":11,"deadline":"2026-09-20T18:00:00Z","rectify_status":"IN_PROGRESS","rectify_note":"","review_note":"","submitted_at":"","closed_at":""}
    row.update(overrides)
    return row

def create_hazard_ticket_list_item(ticket, device, result, now=None):
    item = dict(ticket)
    item["overdue"] = is_overdue(ticket["deadline"], ticket["rectify_status"], now)
    item["device_code"] = (device or {}).get("device_code", "")
    item["device_type"] = (device or {}).get("device_type", "")
    item["item_code"] = (result or {}).get("item_code", "")
    return item

def create_hazard_ticket_detail(ticket, device, result, flow):
    return {
        "ticket": ticket,
        "device": device,
        "result": result,
        "flow": flow,
        "overdue": is_overdue(ticket["deadline"], ticket["rectify_status"]),
    }

def create_flow_event(event_id, ticket_id, action, actor_role, note, from_status, to_status, created_at):
    return {
        "id": event_id,
        "ticket_id": ticket_id,
        "action": action,
        "actor_role": actor_role,
        "note": note,
        "from_status": from_status,
        "to_status": to_status,
        "created_at": created_at,
    }
