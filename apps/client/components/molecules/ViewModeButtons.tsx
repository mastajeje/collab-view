"use client";
import IconButton from "../atoms/IconButton";

type Props = {
  onModeChange: (mode: "empty" | "video" | "image") => void;
};

export default function ViewModeButtons({ onModeChange }: Props) {
  return (
    <div
      aria-label="view-mode-buttons"
      className="absolute top-0 right-0 flex flex-col bg-gray-100"
    >
      <IconButton icon="I" onClick={() => onModeChange("image")} />
      <IconButton icon="V" onClick={() => onModeChange("video")} />
    </div>
  );
}
