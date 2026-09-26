from src.types.domain_error import rbac_denied

# 角色守卫工厂：controller 注入 request 后调用，越权直接抛 RBAC_DENIED
def allow_roles(*roles):
    def guard(request):
        user = getattr(request.state, "user", None) or {}
        if user.get("role") not in roles:
            raise rbac_denied()
        return user
    return guard
