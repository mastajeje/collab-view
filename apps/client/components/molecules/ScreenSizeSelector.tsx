import { LARGE, MEDIUM, SMALL } from "@shared/constants/canvas";
import { useState } from "react";
import { SizeButton } from "../atoms/SizeButton";
import { ScreenSize } from "@shared/dist";
import { useScreenStore } from "@/stores/screenStore";

const SCREEN_SIZE_OPTIONS = [SMALL, MEDIUM, LARGE];

export const ScreenSizeSelector = () => {
  const { setScreenSize, screenSize } = useScreenStore();
  const handleSizeChange = (size: ScreenSize) => {
    setScreenSize(size);
    console.log(screenSize);
  };
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white">
      {SCREEN_SIZE_OPTIONS.map((size) => (
        <SizeButton
          key={size}
          size={size}
          selected={screenSize}
          onClick={() => handleSizeChange(size as ScreenSize)}
        />
      ))}
    </div>
  );
};
