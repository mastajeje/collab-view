import ViewModeButtons from "@/components/molecules/ViewModeButtons";
import EmptyScreen from "@/components/organisms/EmptyScreen";
import ImageViewer from "@/components/organisms/ImageViewer";
// import VideoChatViewer from "@/components/organisms/VideoChatViewer";
import VideoCallViewer from "@/components/organisms/VideoCallViewer";
import { useScreenStore } from "@/stores/screenStore";

type Props = {
  //   mode: "empty" | "video" | "image" | "chat";
  imageUrl?: string;
  roomId: string;
};

export default function ViewerSwitcher({ imageUrl, roomId }: Props) {
  const { viewerMode } = useScreenStore();
  //   const { image } = useSocketStore();
  //   const { screenSize } = useScreenStore();
  return (
    <div
      aria-label="viewer-switcher"
      className="flex h-full w-full flex-col items-center justify-center bg-gray-100"
    >
      {viewerMode === "empty" && <EmptyScreen onClick={() => {}} />}
      {viewerMode === "video" && <VideoCallViewer roomId={roomId} />}
      {viewerMode === "image" && imageUrl && <ImageViewer imgUrl={imageUrl} />}
    </div>
  );
}
