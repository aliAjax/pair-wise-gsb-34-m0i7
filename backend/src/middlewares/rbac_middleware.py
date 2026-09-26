from fastapi import HTTPException, Request

from src.constants.error_codes import ERROR_CODES
from src.constants.error_messages import ERROR_MESSAGES


def allow_roles(*roles):
    def checker(request: Request):
        user = getattr(request.state, "user", None) or {}
        if user.get("role") not in roles:
            raise HTTPException(
                status_code=403,
                detail={"code": ERROR_CODES["RBAC_DENIED"], "message": ERROR_MESSAGES["RBAC_DENIED"]},
            )
        return user

    return checker
