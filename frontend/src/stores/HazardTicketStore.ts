import { create } from "zustand";
import { ApiError, getHazardTicketDetail, listHazardTicket, reviewHazardTicket, submitRectify } from "../api/HazardTicket";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import type { HazardTicket } from "../types/HazardTicket";
import type { HazardTicketDetail } from "../types/HazardTicketDetail";

export type FlowError = { code: string; message: string } | null;

const toFlowError = (err: unknown): NonNullable<FlowError> =>
  err instanceof ApiError
    ? { code: err.code, message: err.message }
    : { code: "NETWORK_ERROR", message: ERROR_MESSAGES.NETWORK_ERROR };

type State = {
  rows: HazardTicket[];
  loading: boolean;
  detail: HazardTicketDetail | null;
  error: FlowError;
  load: () => Promise<void>;
  openDetail: (id: number, role: string) => Promise<void>;
  closeDetail: () => void;
  submit: (note: string, role: string) => Promise<boolean>;
  review: (action: string, comment: string, role: string) => Promise<boolean>;
};

export const useHazardTicketStore = create<State>((set, get) => ({
  rows: [],
  loading: false,
  detail: null,
  error: null,
  async load() {
    set({ loading: true });
    try {
      set({ rows: await listHazardTicket(), loading: false });
    } catch (err) {
      set({ loading: false, error: toFlowError(err) });
    }
  },
  async openDetail(id, role) {
    set({ error: null });
    try {
      set({ detail: await getHazardTicketDetail(id, role) });
    } catch (err) {
      set({ error: toFlowError(err) });
    }
  },
  closeDetail() {
    set({ detail: null, error: null });
  },
  async submit(note, role) {
    const detail = get().detail;
    if (!detail) return false;
    set({ error: null });
    try {
      set({ detail: await submitRectify(detail.ticket.id, note, role) });
      await get().load();
      return true;
    } catch (err) {
      set({ error: toFlowError(err) });
      return false;
    }
  },
  async review(action, comment, role) {
    const detail = get().detail;
    if (!detail) return false;
    set({ error: null });
    try {
      set({ detail: await reviewHazardTicket(detail.ticket.id, action, comment, role) });
      await get().load();
      return true;
    } catch (err) {
      set({ error: toFlowError(err) });
      return false;
    }
  }
}));
