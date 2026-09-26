async def audit_log_middleware(request, call_next):
    response = await call_next(request)
    if request.method in ("POST", "PUT", "PATCH", "DELETE"):
        user = getattr(request.state, "user", {}) or {}
        print("audit", user.get("role", "anonymous"), request.method, request.url.path, response.status_code)
    return response
