from datetime import datetime, timezone

def audit_target(kind, id):
    return f"{kind}#{id}"

def parse_iso(value):
    if not value:
        return None
    return datetime.fromisoformat(value.replace("Z", "+00:00"))

def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")

def is_overdue(deadline, rectify_status, now=None):
    # 已归档的单据不再算逾期
    if rectify_status == "CLOSED":
        return False
    due = parse_iso(deadline)
    if due is None:
        return False
    current = now or datetime.now(timezone.utc)
    return due < current
