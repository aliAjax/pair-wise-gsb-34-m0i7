import { StatusBadge } from "./StatusBadge";

export interface TimelineItem {
  id: number | string;
  title: string;
  description?: string;
  time?: string;
  tag?: string;
}

export function TimelineList({ title = "TimelineList", value = "READY", items }: { title?: string; value?: string; items?: TimelineItem[] }) {
  if (!items) {
    return <div className="shared-widget"><strong>{title}</strong><StatusBadge value={value} /></div>;
  }
  if (items.length === 0) {
    return <div className="empty">暂无流转记录</div>;
  }
  return <ul className="flow-list">
    {items.map((item) => <li key={item.id}>
      <div className="flow-head">
        <strong>{item.title}</strong>
        {item.tag && <span className="flow-tag">{item.tag}</span>}
      </div>
      {item.description && <p className="flow-note">{item.description}</p>}
      {item.time && <span className="flow-time">{item.time}</span>}
    </li>)}
  </ul>;
}
