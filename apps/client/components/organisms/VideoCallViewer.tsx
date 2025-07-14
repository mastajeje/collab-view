import { useWebRTC } from "@/hooks/useWebRTC";
import { useSocketStore } from "@/stores/socketStore";
import { useCallStore } from "@/stores/useCallStore";

export default function VideoCallViewer({ roomId }: { roomId: string }) {
  const { localVideoRef, remoteVideoRef, startCall } = useWebRTC(roomId);
  const { setIsCalling, setIncomingCallFrom } = useCallStore();
  const { socket } = useSocketStore();
  const handleStartCall = () => {
    if (!socket) return;
    setIsCalling(true);
    console.log("call:request", roomId);
    socket.emit("call:request", { roomId });
    // startCall();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-1/2 border"
        ></video>
        <video ref={remoteVideoRef} autoPlay className="w-1/2 border"></video>
      </div>
      {/* <button onClick={startCall} className="btn btn-primary"> */}
      <button onClick={handleStartCall} className="btn btn-primary">
        Start Call
      </button>
    </div>
  );
}
