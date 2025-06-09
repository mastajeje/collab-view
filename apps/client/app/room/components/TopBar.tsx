import Button from "@/components/atoms/Button";
import { ScreenSizeSelector } from "@/components/molecules/ScreenSizeSelector";

export default function TopBar({ roomId }: { roomId: string }) {
  return (
    <div className="flex items-center justify-between px-2 py-1">
      <div className="text-2xl font-bold">방 ID:{roomId}</div>
      <ScreenSizeSelector />
      <Button text="나가기" onClick={() => {}} size="auto" />
    </div>
  );
}
