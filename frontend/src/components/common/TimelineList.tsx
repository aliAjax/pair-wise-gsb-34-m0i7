import { HAZARD_FLOW_ACTION_TEXT, ROLE_TEXT } from "../../constants/logTemplates";
import type { HazardFlowEvent } from "../../types/HazardTicket";
import { formatDate, formatRectifyStatus } from "../../utils/formatters";
import { EmptyState } from "./EmptyState";

// 整改流转时间线：处理说明、复验意见和状态变更都留在这里
export function TimelineList({ events }: { events: HazardFlowEvent[] }) {
  if (events.length === 0) return <EmptyState title="暂无流转记录" />;
  return (
    <ol className="timeline">
      {events.map((event) => (
        <li key={event.id}>
          <div className="timeline-head">
            <strong>{HAZARD_FLOW_ACTION_TEXT[event.action] ?? event.action}</strong>
            <span className="timeline-meta">
              {ROLE_TEXT[event.actor_role] ?? event.actor_role} · {formatDate(event.created_at)}
            </span>
          </div>
          {event.note && <p className="timeline-note">{event.note}</p>}
          <div className="timeline-status">
            {event.from_status && <span>{formatRectifyStatus(event.from_status)}</span>}
            {event.from_status && <span className="arrow">→</span>}
            <span>{formatRectifyStatus(event.to_status)}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
