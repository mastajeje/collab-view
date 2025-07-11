import { create } from "zustand";

interface CallStore {
  incomingCallFrom: string | null;
  isCalling: boolean;
  setIsCalling: (value: boolean) => void;
  setIncomingCallFrom: (from: string | null) => void;
}

export const useCallStore = create<CallStore>((set) => ({
  incomingCallFrom: null,
  isCalling: false,
  setIsCalling: (value: boolean) => set({ isCalling: value }),
  setIncomingCallFrom: (from: string | null) => set({ incomingCallFrom: from }),
}));
