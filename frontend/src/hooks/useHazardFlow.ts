import { useMemo, useState } from "react";
import { RECTIFIABLE_STATUS, type ReviewAction } from "../constants/RectifyStatus";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { useHazardTicketStore } from "../stores/HazardTicketStore";

// 隐患整改流转：按角色和当前状态推导可执行动作，并把提交/复验接进 store
export function useHazardFlow(role: string) {
  const { detail, saving, error, submit, review, clearError } = useHazardTicketStore();
  const [rectifyNote, setRectifyNote] = useState("");
  const [reviewNote, setReviewNote] = useState("");
  const [localError, setLocalError] = useState("");

  const status = detail?.ticket.rectify_status;
  const canSubmit = role === "vendor" && !!status && RECTIFIABLE_STATUS.includes(status);
  const canReview = role === "auditor" && status === "PENDING_REVIEW";

  const hint = useMemo(() => {
    if (!detail) return "";
    if (role === "vendor" && status === "PENDING_REVIEW") return "已提交复验，等待审计员处理，请勿重复提交";
    if (role === "auditor" && status !== "PENDING_REVIEW" && status !== "CLOSED") return "维保商尚未提交整改，暂不能复验";
    if (status === "CLOSED") return "整改单已归档关闭";
    if (role !== "vendor" && role !== "auditor") return "当前角色仅可查看，提交复验需维保商、复验需审计员";
    return "";
  }, [detail, role, status]);

  const doSubmit = async () => {
    setLocalError("");
    if (!rectifyNote.trim()) {
      setLocalError(ERROR_MESSAGES.RECTIFY_NOTE_REQUIRED);
      return;
    }
    if (await submit(rectifyNote.trim(), role)) setRectifyNote("");
  };

  const doReview = async (action: ReviewAction) => {
    setLocalError("");
    if (action === "reject" && !reviewNote.trim()) {
      setLocalError(ERROR_MESSAGES.REJECT_REASON_REQUIRED);
      return;
    }
    if (await review(action, reviewNote.trim(), role)) setReviewNote("");
  };

  return {
    detail,
    saving,
    error: localError || error,
    rectifyNote,
    setRectifyNote,
    reviewNote,
    setReviewNote,
    canSubmit,
    canReview,
    hint,
    doSubmit,
    doReview,
    clearError: () => {
      setLocalError("");
      clearError();
    }
  };
}
