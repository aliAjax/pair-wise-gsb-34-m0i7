import { create } from "zustand";
import {
  getHazardTicket,
  listHazardTicket,
  reviewHazardTicket,
  submitRectify
} from "../api/HazardTicket";
import type { ReviewAction } from "../constants/RectifyStatus";
import type { HazardTicketDetail, HazardTicketListItem } from "../types/HazardTicket";

type State = {
  rows: HazardTicketListItem[];
  detail: HazardTicketDetail | null;
  selectedId: number | null;
  loading: boolean;
  saving: boolean;
  error: string;
  load: () => Promise<void>;
  select: (id: number) => Promise<void>;
  submit: (rectifyNote: string, role: string) => Promise<boolean>;
  review: (action: ReviewAction, reviewNote: string, role: string) => Promise<boolean>;
  clearError: () => void;
};

export const useHazardTicketStore = create<State>((set, get) => ({
  rows: [],
  detail: null,
  selectedId: null,
  loading: false,
  saving: false,
  error: "",
  async load() {
    set({ loading: true });
    const rows = await listHazardTicket();
    set({ rows, loading: false });
    const { selectedId } = get();
    if (selectedId === null && rows.length > 0) {
      await get().select(rows[0].id);
    }
  },
  async select(id) {
    set({ selectedId: id, error: "" });
    set({ detail: await getHazardTicket(id) });
  },
  async submit(rectifyNote, role) {
    const { selectedId } = get();
    if (selectedId === null) return false;
    set({ saving: true, error: "" });
    try {
      const detail = await submitRectify(selectedId, rectifyNote, role);
      set({ detail, rows: await listHazardTicket(), saving: false });
      return true;
    } catch (err) {
      // 后端返回的明确原因（重复提交/越权/状态不符）直接展示
      set({ saving: false, error: err instanceof Error ? err.message : "提交失败" });
      return false;
    }
  },
  async review(action, reviewNote, role) {
    const { selectedId } = get();
    if (selectedId === null) return false;
    set({ saving: true, error: "" });
    try {
      const detail = await reviewHazardTicket(selectedId, action, reviewNote, role);
      set({ detail, rows: await listHazardTicket(), saving: false });
      return true;
    } catch (err) {
      set({ saving: false, error: err instanceof Error ? err.message : "复验失败" });
      return false;
    }
  },
  clearError() {
    set({ error: "" });
  }
}));
