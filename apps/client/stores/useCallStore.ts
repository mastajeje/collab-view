import { create } from "zustand";

interface CallStore {
  incomingCallFrom: string | null;
  isCalling: boolean;
  isAnswered: boolean;
  setIsCalling: (value: boolean) => void;
  setIncomingCallFrom: (from: string | null) => void;
  setIsAnswered: (value: boolean) => void;
}

export const useCallStore = create<CallStore>((set) => ({
  incomingCallFrom: null,
  isCalling: false,
  isAnswered: false,
  setIsAnswered: (value: boolean) => set({ isAnswered: value }),
  setIsCalling: (value: boolean) => set({ isCalling: value }),
  setIncomingCallFrom: (from: string | null) => set({ incomingCallFrom: from }),
}));
