"use client";
import { useCallStore } from "@/stores/useCallStore";
import { CallModalText } from "../atoms/CallModalText";
import { CallButton } from "../atoms/CallButton";
import { CALL_ACCEPT, CALL_REJECT } from "@shared/dist";
import { useSocketStore } from "@/stores/socketStore";
import { useScreenStore } from "@/stores/screenStore";

export const CallModal = () => {
  const { incomingCallFrom, isCalling, setIncomingCallFrom } = useCallStore();
  const { socket, roomId } = useSocketStore();
  const { setViewerMode } = useScreenStore();
  if (!incomingCallFrom && !isCalling) return null;

  const handleAccept = () => {
    if (!socket) return;
    socket.emit(CALL_ACCEPT, { roomId });
    setViewerMode("video");
    setIncomingCallFrom(null);
  };

  const handleReject = () => {
    if (!socket) return;
    socket.emit(CALL_REJECT);
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
      <div className="roundes-xl spacy-y-4 bg-white p-6 shadow-xl">
        <CallModalText
          text={
            incomingCallFrom
              ? `${incomingCallFrom}님이 영상 통화를 요청합니다.`
              : "영상 통화를 요청합니다."
          }
        />
        <div>
          <CallButton label="수락" onClick={handleAccept} variant="primary" />
          <CallButton label="거절" onClick={() => {}} variant="secondary" />
        </div>
      </div>
    </div>
  );
};
