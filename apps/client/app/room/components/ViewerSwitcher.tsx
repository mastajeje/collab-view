import ViewModeButtons from "@/components/molecules/ViewModeButtons";
import EmptyScreen from "@/components/organisms/EmptyScreen";
import ImageViewer from "@/components/organisms/ImageViewer";
import VideoChatViewer from "@/components/organisms/VideoChatViewer";

type Props = {
  mode: "empty" | "video" | "image";
};

export default function ViewerSwitcher({ mode }: Props) {
  return (
    <div
      aria-label="viewer-switcher"
      className="flex h-full w-full flex-col items-center justify-center bg-gray-100"
    >
      {mode === "empty" && <EmptyScreen onClick={() => {}} />}
      {mode === "video" && <VideoChatViewer />}
      {mode === "image" && <ImageViewer />}
    </div>
  );
}
