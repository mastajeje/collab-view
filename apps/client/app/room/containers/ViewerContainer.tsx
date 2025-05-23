"use client";

import ViewModeButtons from "@/components/molecules/ViewModeButtons";
import ViewerSwitcher from "../components/ViewerSwitcher";
import { useState } from "react";

export default function CollaborationContainer() {
  const [mode, setMode] = useState<"empty" | "video" | "image">("empty");

  const handleModeChange = (mode: "empty" | "video" | "image") => {
    setMode(mode);
  };

  return (
    <div
      aria-label="Viewer Container"
      className="relative flex h-full w-full flex-col items-center justify-center bg-gray-100"
    >
      <ViewModeButtons onModeChange={handleModeChange} />
      <ViewerSwitcher mode={mode} />
    </div>
  );
}
