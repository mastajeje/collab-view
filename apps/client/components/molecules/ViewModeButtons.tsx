"use client";
import IconButton from "../atoms/IconButton";
import { UploadButton } from "../atoms/UploadButton";

type Props = {
  onModeChange: (mode: "empty" | "video" | "image") => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ViewModeButtons({ onModeChange, onUpload }: Props) {
  return (
    <div
      aria-label="view-mode-buttons"
      className="absolute top-0 right-0 z-10 flex flex-col"
    >
      {/* <IconButton icon="I" onClick={() => onModeChange("image")} /> */}
      <UploadButton onUpload={onUpload} />
      <IconButton icon="V" onClick={() => onModeChange("video")} />
    </div>
  );
}
