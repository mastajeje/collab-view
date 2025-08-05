"use client";

import { useEffect } from "react";
import { JOIN } from "@shared/dist";
import { useParams, useSearchParams } from "next/navigation";
import TopBar from "../components/TopBar";
import ViewerContainer from "../containers/ViewerContainer";
import { useSocketStore } from "@/stores/socketStore";
import { FlashMessage } from "@/components/molecules/FlashMessage";
type Props = {
  mode: "empty" | "video" | "image";
};

export default function RoomPage({ mode }: Props) {
  const { registerCallListener } = useSocketStore();
  const searchParams = useSearchParams();
  const { roomId } = useParams<{ roomId: string }>();
  const username = searchParams.get("username");

  useEffect(() => {
    registerCallListener();
  }, []);

  return (
    <main className="flex h-full w-full flex-col">
      <TopBar roomId={roomId} />
      {/* {mode === "empty" && <EmptyScreen onClick={handleTest} />} */}
      <ViewerContainer roomId={roomId} username={username} />
      <FlashMessage message="JJ Rejected your call" duration={5000} />
    </main>
  );
}
