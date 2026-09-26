# 消防设施巡检维保平台

面向园区和物业公司的消防设备巡检、隐患整改、维保计划和合规台账系统。

## 快速启动

```bash
cp .env.example .env && docker compose up -d
```

## 访问地址或 CLI 示例

前端：<http://localhost:20103>

后端健康检查：<http://localhost:21103/health>


## 本地开发方式

- 前端：`cd frontend && npm install && npm run dev`
- 后端：进入 `backend` 后按技术栈运行开发命令，接口统一挂在 `/api`。


## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | React 18 + TypeScript + Vite + Material UI + Redux Toolkit |
| 后端 | FastAPI + Python 3.11 + SQLAlchemy 2.0 |
| 数据库 | PostgreSQL 15 |
| 部署 | Docker Compose |

## 项目目录结构

```text
frontend/src/api, stores, types, constants, constructors, components/common, hooks, pages, router, utils, mocks
backend/src/routes, controllers, services, models, repositories, middlewares, constants, constructors, utils, types, config
```

## 环境变量说明

- `COMPOSE_PROJECT_NAME`: Compose 项目名，默认 `fire-inspect`
- `FRONTEND_PORT`: 前端端口，默认 `20103`
- `BACKEND_PORT`: 后端端口，默认 `21103`
- `DB_PORT`: 数据库宿主机端口
- `DB_USER/DB_PASSWORD/DB_NAME`: 本地数据库凭据

## Docker 部署说明

- 根 Compose 文件不写 `version`，顶层 `name: fire-inspect`。
- 容器名均使用 `${COMPOSE_PROJECT_NAME:-fire-inspect}` 前缀。
- 数据库使用命名卷，避免绑定中文路径。
- 常见问题：端口占用时修改 `.env` 中端口后重启；需要重置数据时执行 `docker compose down -v`。

## 枚举/常量出现位置清单

- DeviceType: constants/DeviceType、types/DeviceType、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- InspectionStatus: constants/InspectionStatus、types/InspectionStatus、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- HazardSeverity: constants/HazardSeverity、types/HazardSeverity、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用；排序权重见 `HazardSeverityRank`（前端 `constants/HazardSeverity.ts`、后端 `constants/hazard_severity.py`）。
- RectifyStatus（OPEN/IN_PROGRESS/PENDING_REVIEW/CLOSED）: 前端 `constants/RectifyStatus.ts`、`types/HazardTicket.ts`、`hooks/useHazardFlow.ts`、`pages/HazardsPage.tsx`、`utils/formatters.ts`；后端 `constants/rectify_status.py`、`services/hazard_ticket_service.py`、`constructors/hazard_ticket_factory.py`；两侧 `errorCodes/errorMessages`、`logTemplates` 均有对应条目。

## 隐患整改流转

- `GET /api/hazard-ticket`：按严重程度（CRITICAL→LOW）与是否逾期排列，已归档不再算逾期。
- `GET /api/hazard-ticket/{id}`：整改单 + 关联设备 + 检查结果 + 流转记录。
- `POST /api/hazard-ticket/{id}/submit`（`x-role: vendor`）：填写处理说明后进入待复验；仅 OPEN/IN_PROGRESS 可提交。
- `POST /api/hazard-ticket/{id}/review`（`x-role: auditor`）：`approve` 归档并记录 `closed_at`；`reject` 必须填退回原因，单据回到处理中。
- 每次提交都重新核对当前状态：重复提交/越权/状态不符返回 409/403/422 及明确原因；处理说明、复验意见与状态变更写入 `hazardTicketFlow` 供查询。

## 为什么会牵一发动全身

实体字段、枚举、日志模板、错误消息、构造器、筛选器和展示组件被刻意拆散到多个目录；修改一个状态值通常需要同步类型、构造器、服务、控制器、store、页面、README 与数据库种子。

## License

MIT
