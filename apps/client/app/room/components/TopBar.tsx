import Button from "@/app/components/atoms/Button";

export default function TopBar({ roomId }: { roomId: string }) {
  return (
    <div className="flex items-center justify-between px-2 py-1">
      <div className="text-2xl font-bold">방 ID:{roomId}</div>
      <Button text="나가기" onClick={() => {}} size="auto" />
    </div>
  );
}
