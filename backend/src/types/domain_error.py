from src.constants.error_codes import ERROR_CODES
from src.constants.error_messages import ERROR_MESSAGES

# 业务异常：controller 不兜底，统一由 error_handler_middleware 转成响应
class DomainError(Exception):
    def __init__(self, code, message=None, http_status=400):
        self.code = code
        self.message = message if message is not None else ERROR_MESSAGES.get(code, code)
        self.http_status = http_status
        super().__init__(self.message)

def ticket_not_found():
    return DomainError(ERROR_CODES["TICKET_NOT_FOUND"], http_status=404)

def rbac_denied():
    return DomainError(ERROR_CODES["RBAC_DENIED"], http_status=403)

def validation_failed(message=None):
    return DomainError(ERROR_CODES["VALIDATION_FAILED"], message=message, http_status=422)

def invalid_transition(status_text):
    return DomainError(
        ERROR_CODES["INVALID_STATUS_TRANSITION"],
        message=ERROR_MESSAGES["INVALID_STATUS_TRANSITION"].format(status=status_text),
        http_status=409,
    )

def ticket_already_closed():
    return DomainError(ERROR_CODES["TICKET_ALREADY_CLOSED"], http_status=409)

def rectify_note_required():
    return DomainError(ERROR_CODES["RECTIFY_NOTE_REQUIRED"], http_status=422)

def reject_reason_required():
    return DomainError(ERROR_CODES["REJECT_REASON_REQUIRED"], http_status=422)
