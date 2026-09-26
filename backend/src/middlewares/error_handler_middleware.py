from fastapi.responses import JSONResponse

from src.types.domain_error import DomainError

def to_error_payload(exc):
    return {"code": getattr(exc, "code", "INTERNAL_ERROR"), "message": str(exc)}

# 统一把业务异常转成 {code, message} 响应，service/controller 不再各自吞异常
async def error_handler_middleware(request, call_next):
    try:
        return await call_next(request)
    except DomainError as exc:
        return JSONResponse(status_code=exc.http_status, content=to_error_payload(exc))
