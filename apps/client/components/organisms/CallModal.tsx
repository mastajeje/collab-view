"use client";
import { useCallStore } from "@/stores/useCallStore";
import { CallModalText } from "../atoms/CallModalText";
import { CallButton } from "../atoms/CallButton";

export const CallModal = () => {
  const { incomingCallFrom, isCalling } = useCallStore();

  if (!incomingCallFrom) return null;
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
      <div className="roundes-xl spacy-y-4 bg-white p-6 shadow-xl">
        <CallModalText
          from={incomingCallFrom}
          text="오디오 통화를 요청합니다."
        />
        <div>
          <CallButton label="수락" onClick={() => {}} variant="primary" />
          <CallButton label="거절" onClick={() => {}} variant="secondary" />
        </div>
      </div>
    </div>
  );
};
