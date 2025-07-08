import { useWebRTC } from "@/hooks/useWebRTC";

export default function VideoCallViewer({ roomId }: { roomId: string }) {
  const { localVideoRef, remoteVideoRef, startCall } = useWebRTC(roomId);
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
      <button onClick={startCall} className="btn btn-primary">
        Start Call
      </button>
    </div>
  );
}
