import { getOptimalSize } from "@/app/lib/getSize";
import { LARGE, MEDIUM, SMALL } from "@shared/constants/canvas";
import { ScreenSize } from "@shared/dist";
import { create } from "zustand";

interface ScreenStore {
  viewerMode: "empty" | "video" | "image" | "chat";
  screenSize: ScreenSize;

  // Actions
  setViewerMode: (viewerMode: "empty" | "video" | "image" | "chat") => void;
  setScreenSize: (screenSize: ScreenSize) => void;
}
export const useScreenStore = create<ScreenStore>((set) => ({
  viewerMode: "empty",
  screenSize: null,
  setViewerMode: (viewerMode: "empty" | "video" | "image" | "chat") => {
    set({ viewerMode });
  },
  setScreenSize: (screenSize: ScreenSize) => {
    set({ screenSize });
  },
}));
