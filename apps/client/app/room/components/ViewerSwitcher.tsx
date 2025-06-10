import ViewModeButtons from "@/components/molecules/ViewModeButtons";
import EmptyScreen from "@/components/organisms/EmptyScreen";
import ImageViewer from "@/components/organisms/ImageViewer";
import VideoChatViewer from "@/components/organisms/VideoChatViewer";
import { useScreenStore } from "@/stores/screenStore";
import { useSocketStore } from "@/stores/socketStore";

type Props = {
  mode: "empty" | "video" | "image" | "chat";
  imageUrl?: string;
};

export default function ViewerSwitcher({ mode, imageUrl }: Props) {
  //   const { image } = useSocketStore();
  const { screenSize } = useScreenStore();
  return (
    <div
      aria-label="viewer-switcher"
      className="flex h-full w-full flex-col items-center justify-center bg-gray-100"
    >
      {mode === "empty" && <EmptyScreen onClick={() => {}} />}
      {mode === "video" && <VideoChatViewer />}
      {mode === "image" && imageUrl && <ImageViewer imgUrl={imageUrl} />}
    </div>
  );
}
