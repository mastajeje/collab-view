// import IconButton from "@/components/atoms/IconButton";
// import { UploadButton } from "@/components/atoms/UploadButton";

// type Props = {
//   onModeChange: (mode: "empty" | "video" | "image" | "chat") => void;
//   onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   openChat: () => void;
// };

// export const ViewerButtons = ({ onModeChange, onUpload, openChat }: Props) => {
//   return (
//     <div
//       aria-label="view-mode-buttons"
//       className="absolute top-0 right-0 z-10 flex flex-col"
//     >
//       {/* <IconButton icon="I" onClick={() => onModeChange("image")} /> */}
//       <UploadButton onUpload={onUpload} />
//       <IconButton icon="/next.svg" onClick={() => onModeChange("video")} />
//       <IconButton icon="/send.svg" onClick={() => openChat()} />
//     </div>
//   );
// };
