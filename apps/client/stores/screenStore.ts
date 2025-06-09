import { getOptimalSize } from "@/app/lib/getSize";
import { LARGE, MEDIUM, SMALL } from "@shared/constants/canvas";
import { ScreenSize } from "@shared/dist";
import { create } from "zustand";

interface ScreenStore {
  screenSize: ScreenSize;

  // Actions
  setScreenSize: (screenSize: ScreenSize) => void;
}
export const useScreenStore = create<ScreenStore>((set) => ({
  screenSize: null,
  setScreenSize: (screenSize: ScreenSize) => {
    set({ screenSize });
  },
}));
