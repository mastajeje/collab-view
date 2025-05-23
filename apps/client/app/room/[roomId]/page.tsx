"use client";

import { useEffect } from "react";
import { JOIN } from "@shared/dist";
import { useParams, useSearchParams } from "next/navigation";
import TopBar from "../components/TopBar";
import ViewerContainer from "../containers/ViewerContainer";
import { useSocketStore } from "@/stores/socketStore";
type Props = {
  mode: "empty" | "video" | "image";
};

export default function RoomPage({ mode }: Props) {
  const { socket, connect, isConnected, onEvents } = useSocketStore();
  const searchParams = useSearchParams();
  const { roomId } = useParams<{ roomId: string }>();
  const username = searchParams.get("username");

  useEffect(() => {
    console.log(roomId, username, "sss");
    connect();
    // };
  }, []);

  useEffect(() => {
    if (isConnected && socket) {
      onEvents();
      socket.emit(JOIN, { roomId: "123", userName: "test" });
    }
  }, [isConnected]);

  const handleTest = () => {
    if (socket) {
      socket.emit("test", { text: "test text" });
    } else {
      console.log("Socket is null");
    }
  };

  return (
    <main className="flex h-full w-full flex-col">
      <TopBar roomId={roomId} />
      {/* {mode === "empty" && <EmptyScreen onClick={handleTest} />} */}
      <ViewerContainer />
    </main>
  );
}
