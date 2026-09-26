import { useEffect, useState } from "react";
import { DeviceLocationCell } from "../components/common/DeviceLocationCell";
import { EmptyState } from "../components/common/EmptyState";
import { HazardSeverityTag } from "../components/common/HazardSeverityTag";
import { StatusBadge } from "../components/common/StatusBadge";
import { TimelineList } from "../components/common/TimelineList";
import { ROLE_TEXT } from "../constants/logTemplates";
import { useHazardFlow } from "../hooks/useHazardFlow";
import { useHazardTicketStore } from "../stores/HazardTicketStore";
import { formatDate, formatRectifyStatus } from "../utils/formatters";

const ROLES = ["vendor", "auditor", "manager"] as const;

export function HazardsPage() {
  const { rows, selectedId, loading, load, select } = useHazardTicketStore();
  const [role, setRole] = useState<string>("vendor");
  const flow = useHazardFlow(role);
  const { detail } = flow;

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <main className="page">
      <section className="page-head">
        <div>
          <p className="eyebrow">fire-inspect</p>
          <h1>隐患整改</h1>
        </div>
        <div className="role-switch">
          <span>当前角色</span>
          {ROLES.map((item) => (
            <button key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>
              {ROLE_TEXT[item]}
            </button>
          ))}
        </div>
      </section>

      {flow.error && (
        <section className="error-banner" onClick={flow.clearError}>
          {flow.error}
        </section>
      )}

      <section className="workbench">
        <div className="panel wide">
          <h2>整改单（按严重程度与逾期排列）</h2>
          {loading && rows.length === 0 ? (
            <EmptyState title="加载中…" />
          ) : (
            <table className="hazard-table">
              <thead>
                <tr>
                  <th>严重程度</th>
                  <th>单号</th>
                  <th>设备 / 检查项</th>
                  <th>整改期限</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className={(selectedId === row.id ? "selected " : "") + (row.overdue ? "overdue" : "")}
                    onClick={() => void select(row.id)}
                  >
                    <td><HazardSeverityTag value={row.severity} /></td>
                    <td>#{row.id}</td>
                    <td>
                      <div className="cell-main">{row.device_code}</div>
                      <div className="cell-sub">{row.item_code}</div>
                    </td>
                    <td>
                      <div className="cell-main">{formatDate(row.deadline)}</div>
                      {row.overdue && <div className="cell-sub overdue-text">已逾期</div>}
                    </td>
                    <td><StatusBadge value={row.rectify_status} label={formatRectifyStatus(row.rectify_status)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="panel">
          {!detail ? (
            <EmptyState title="请选择左侧整改单" />
          ) : (
            <>
              <h2>
                整改单 #{detail.ticket.id}{" "}
                <StatusBadge value={detail.ticket.rectify_status} label={formatRectifyStatus(detail.ticket.rectify_status)} />
                {detail.overdue && <span className="overdue-tag">已逾期</span>}
              </h2>
              <dl className="detail-grid">
                <dt>严重程度</dt>
                <dd><HazardSeverityTag value={detail.ticket.severity} /></dd>
                <dt>整改期限</dt>
                <dd>{formatDate(detail.ticket.deadline)}</dd>
                <dt>关联设备</dt>
                <dd><DeviceLocationCell device={detail.device} /></dd>
                <dt>检查结果</dt>
                <dd>
                  {detail.result ? (
                    <div className="device-cell">
                      <strong>{detail.result.item_code}</strong>
                      <span>{detail.result.result_status} · {detail.result.measured_value}</span>
                      <span>{detail.result.note}</span>
                    </div>
                  ) : "-"}
                </dd>
                {detail.ticket.rectify_note && (
                  <>
                    <dt>处理说明</dt>
                    <dd>{detail.ticket.rectify_note}</dd>
                  </>
                )}
                {detail.ticket.review_note && (
                  <>
                    <dt>复验意见</dt>
                    <dd>{detail.ticket.review_note}</dd>
                  </>
                )}
                {detail.ticket.submitted_at && (
                  <>
                    <dt>提交时间</dt>
                    <dd>{formatDate(detail.ticket.submitted_at)}</dd>
                  </>
                )}
                {detail.ticket.closed_at && (
                  <>
                    <dt>关闭时间</dt>
                    <dd>{formatDate(detail.ticket.closed_at)}</dd>
                  </>
                )}
              </dl>

              <h2>流转记录</h2>
              <TimelineList events={detail.flow} />

              {flow.canSubmit && (
                <div className="action-box">
                  <h2>填写处理说明（维保商）</h2>
                  <textarea
                    value={flow.rectifyNote}
                    placeholder="说明整改措施与复测结果"
                    onChange={(event) => flow.setRectifyNote(event.target.value)}
                  />
                  <button className="primary" disabled={flow.saving} onClick={() => void flow.doSubmit()}>
                    提交复验
                  </button>
                </div>
              )}

              {flow.canReview && (
                <div className="action-box">
                  <h2>复验（审计员）</h2>
                  <textarea
                    value={flow.reviewNote}
                    placeholder="通过可留空；退回必须填写退回原因"
                    onChange={(event) => flow.setReviewNote(event.target.value)}
                  />
                  <div className="action-row">
                    <button className="primary" disabled={flow.saving} onClick={() => void flow.doReview("approve")}>
                      通过归档
                    </button>
                    <button className="danger" disabled={flow.saving} onClick={() => void flow.doReview("reject")}>
                      退回整改
                    </button>
                  </div>
                </div>
              )}

              {!flow.canSubmit && !flow.canReview && flow.hint && (
                <p className="hint">{flow.hint}</p>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
