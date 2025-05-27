"use client";
import IconButton from "../atoms/IconButton";
import { UploadButton } from "../atoms/UploadButton";

type Props = {
  onModeChange: (mode: "empty" | "video" | "image" | "chat") => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ViewModeButtons({ onModeChange, onUpload }: Props) {
  return (
    <div
      aria-label="view-mode-buttons"
      className="absolute top-0 left-0 z-10 m-2 flex flex-row gap-2"
    >
      {/* <IconButton icon="I" onClick={() => onModeChange("image")} /> */}
      <UploadButton onUpload={onUpload} />
      <IconButton
        icon="/video-call.svg"
        onClick={() => onModeChange("video")}
      />
    </div>
  );
}
