import { useEffect, useMemo, useState } from "react";
import { DeviceLocationCell } from "../components/common/DeviceLocationCell";
import { EmptyState } from "../components/common/EmptyState";
import { HazardSeverityTag } from "../components/common/HazardSeverityTag";
import { StatCard } from "../components/common/StatCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { TimelineList } from "../components/common/TimelineList";
import { hazardFlowActionText, rectifyStatusText } from "../constants/RectifyStatus";
import { ROLE_OPTIONS, ROLE_TEXT, roleText } from "../constants/roles";
import { isTicketOverdue, useHazardFlow } from "../hooks/useHazardFlow";
import { usePagination } from "../hooks/usePagination";
import { useHazardTicketStore } from "../stores/HazardTicketStore";
import { formatDateTime, formatRisk } from "../utils/formatters";

const ROLE_STORAGE_KEY = "fire-inspect-role";

export function HazardsPage() {
  const { rows, loading, detail, error, load, openDetail, closeDetail, submit, review } = useHazardTicketStore();
  const [role, setRole] = useState<string>(() => localStorage.getItem(ROLE_STORAGE_KEY) ?? "vendor");
  const [note, setNote] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => { void load(); }, [load]);
  useEffect(() => { localStorage.setItem(ROLE_STORAGE_KEY, role); }, [role]);

  const { sorted, overdueCount } = useHazardFlow(rows);
  const { page, setPage, pageSize, pageRows, total } = usePagination(sorted);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const statusCount = useMemo(() => ({
    IN_PROGRESS: rows.filter((row) => row.rectify_status === "IN_PROGRESS").length,
    PENDING_REVIEW: rows.filter((row) => row.rectify_status === "PENDING_REVIEW").length,
    CLOSED: rows.filter((row) => row.rectify_status === "CLOSED").length
  }), [rows]);

  const ticket = detail?.ticket ?? null;
  const canSubmit = !!ticket && ticket.rectify_status === "IN_PROGRESS" && role === "vendor";
  const canReview = !!ticket && ticket.rectify_status === "PENDING_REVIEW" && role === "auditor";

  return <main className="page">
    <section className="page-head">
      <div>
        <p className="eyebrow">fire-inspect</p>
        <h1>隐患整改</h1>
      </div>
      <label className="role-switch">当前角色
        <select value={role} onChange={(event) => setRole(event.target.value)}>
          {ROLE_OPTIONS.map((option) => <option key={option} value={option}>{ROLE_TEXT[option]}</option>)}
        </select>
      </label>
    </section>

    <section className="metrics">
      <StatCard label="处理中" value={statusCount.IN_PROGRESS} />
      <StatCard label="待复验" value={statusCount.PENDING_REVIEW} />
      <StatCard label="已逾期" value={overdueCount} />
    </section>

    {error && <div className="error-box" role="alert">{error.message}<span className="error-code">{error.code}</span></div>}

    <section className="hazard-layout">
      <div className="panel">
        <h2>整改单列表（按严重程度 / 逾期排序）</h2>
        {loading ? <EmptyState title="加载中…" /> : pageRows.length === 0 ? <EmptyState title="暂无隐患整改单" /> : <>
          <div className="ticket-list">
            {pageRows.map((row) => <button
              key={row.id}
              className={"ticket-item" + (ticket?.id === row.id ? " selected" : "")}
              onClick={() => void openDetail(row.id, role)}
            >
              <HazardSeverityTag severity={row.severity} />
              <span className="ticket-main">
                <strong>整改单 #{row.id}</strong>
                <span className="meta">关联结果 #{row.result_id} · 截止 {formatDateTime(row.deadline)}</span>
              </span>
              <span className="ticket-flags">
                {isTicketOverdue(row) && <span className="badge tag-overdue">已逾期</span>}
                <StatusBadge value={row.rectify_status} text={rectifyStatusText(row.rectify_status)} />
              </span>
            </button>)}
          </div>
          {pageCount > 1 && <div className="pager">
            <button className="pager-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>上一页</button>
            <span>{page} / {pageCount}</span>
            <button className="pager-btn" disabled={page >= pageCount} onClick={() => setPage(page + 1)}>下一页</button>
          </div>}
        </>}
      </div>

      <div className="panel detail-panel">
        {!detail || !ticket ? <EmptyState title="点击左侧整改单查看详情" /> : <>
          <div className="detail-head">
            <h2>整改单 #{ticket.id}</h2>
            <button className="pager-btn" onClick={closeDetail}>收起</button>
          </div>
          <dl className="kv">
            <div><dt>严重程度</dt><dd><HazardSeverityTag severity={ticket.severity} /> {formatRisk(ticket.severity)}</dd></div>
            <div><dt>当前状态</dt><dd><StatusBadge value={ticket.rectify_status} text={rectifyStatusText(ticket.rectify_status)} /></dd></div>
            <div><dt>整改期限</dt><dd>{formatDateTime(ticket.deadline)} {isTicketOverdue(ticket) && <span className="badge tag-overdue">已逾期</span>}</dd></div>
            <div><dt>处理说明</dt><dd>{ticket.rectify_note || "—"}</dd></div>
            <div><dt>关闭时间</dt><dd>{formatDateTime(ticket.closed_at)}</dd></div>
          </dl>

          <h3>关联设备</h3>
          {detail.device ? <DeviceLocationCell device={detail.device} /> : <EmptyState title="未找到关联设备" />}

          <h3>检查结果</h3>
          {detail.result ? <dl className="kv">
            <div><dt>检查项</dt><dd>{detail.result.item_code}</dd></div>
            <div><dt>实测值</dt><dd>{detail.result.measured_value}</dd></div>
            <div><dt>异常说明</dt><dd>{detail.result.note}</dd></div>
          </dl> : <EmptyState title="未找到关联检查结果" />}

          <h3>流转记录</h3>
          <TimelineList items={detail.flows.map((flow) => ({
            id: flow.id,
            title: hazardFlowActionText(flow.action),
            tag: `${rectifyStatusText(flow.from_status)} → ${rectifyStatusText(flow.to_status)}`,
            description: flow.note,
            time: `${formatDateTime(flow.created_at)} · ${roleText(flow.operator_role)}`
          }))} />

          {canSubmit && <div className="action-box">
            <h3>提交处理说明（维保商）</h3>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="填写隐患处理说明，提交后进入待复验" rows={3} />
            <div className="action-row">
              <button className="btn-primary" onClick={() => void submit(note, role).then((ok) => { if (ok) setNote(""); })}>提交处理说明</button>
            </div>
          </div>}

          {canReview && <div className="action-box">
            <h3>复验（审计员）</h3>
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="复验意见；退回整改时必须填写退回原因" rows={3} />
            <div className="action-row">
              <button className="btn-primary" onClick={() => void review("APPROVE", comment, role).then((ok) => { if (ok) setComment(""); })}>通过并归档</button>
              <button className="btn-danger" onClick={() => void review("REJECT", comment, role).then((ok) => { if (ok) setComment(""); })}>退回整改</button>
            </div>
          </div>}

          {!canSubmit && !canReview && <p className="hint">
            当前角色（{roleText(role)}）在「{rectifyStatusText(ticket.rectify_status)}」状态下无可执行操作：
            处理中需维保商提交处理说明，待复验需审计员复验，已关闭仅可查看。
          </p>}
        </>}
      </div>
    </section>
  </main>;
}
