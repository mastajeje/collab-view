import { useWebRTC } from "@/hooks/useWebRTC";
import { useSocketStore } from "@/stores/socketStore";
import { useCallStore } from "@/stores/useCallStore";
import { useEffect } from "react";

export default function VideoCallViewer({ roomId }: { roomId: string }) {
  const { localVideoRef, remoteVideoRef, startCall } = useWebRTC(roomId);
  const { isAnswered, setIsAnswered } = useCallStore();

  const { socket, username } = useSocketStore();
  const handleStartCall = () => {
    if (!socket) return;
    // setIsCalling(true);
    socket.emit("call:request", { roomId, from: username });
    // startCall();
  };

  useEffect(() => {
    if (isAnswered) {
      startCall();
      //   setIsCalling(false);
      setIsAnswered(false);
    }
  }, [isAnswered]);

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
