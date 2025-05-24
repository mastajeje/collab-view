import ViewModeButtons from "@/components/molecules/ViewModeButtons";
import EmptyScreen from "@/components/organisms/EmptyScreen";
import ImageViewer from "@/components/organisms/ImageViewer";
import VideoChatViewer from "@/components/organisms/VideoChatViewer";
import { useSocketStore } from "@/stores/socketStore";

type Props = {
  mode: "empty" | "video" | "image";
  imageUrl?: string;
};

const imgUrl =
  "https://imgnews.pstatic.net/image/468/2025/05/24/0001149407_001_20250524094217320.jpg?type=w647";
const imgUrl2 = "/test1.jpeg";

export default function ViewerSwitcher({ mode, imageUrl }: Props) {
  //   const { image } = useSocketStore();

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
