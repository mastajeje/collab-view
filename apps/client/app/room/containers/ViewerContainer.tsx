"use client";

import ViewModeButtons from "@/components/molecules/ViewModeButtons";
import ViewerSwitcher from "../components/ViewerSwitcher";
import { useEffect, useState } from "react";
import { sendImage } from "@/sockets/events/image";
import { useSocketStore } from "@/stores/socketStore";
import { joinRoom } from "@/sockets/events/room";
import { ChatWindow } from "@/components/organisms/ChatWindow";
// import { ViewerButtons } from "../components/ViewerButtons";
import { ChatButton } from "@/components/molecules/ChatButton";
import { MarkupLayer } from "@/components/organisms/MarkupLayer";
import { RECEIVE_IMAGE } from "@shared/dist";
import { useScreenStore } from "@/stores/screenStore";
import { getOptimalSize } from "@/app/lib/getSize";

export default function CollaborationContainer({
  roomId,
  username,
}: {
  roomId: string;
  username: string | null;
}) {
  const {
    socket,
    setRoomInfo,
    initImageListener,
    connect,
    // isConnected,
    onEvents,
  } = useSocketStore();
  const { setScreenSize, screenSize } = useScreenStore();
  const [mode, setMode] = useState<"empty" | "video" | "image" | "chat">(
    "empty",
  );
  const [imageUrl, setImageUrl] = useState<string>("");

  const [isChatOpen, setIsChatOpen] = useState(false);
  useEffect(() => {
    const optimalSize = getOptimalSize();
    setScreenSize(optimalSize);
    connect();
  }, []);

  useEffect(() => {
    console.log(screenSize);
  }, [screenSize]);
  useEffect(() => {
    if (socket && username) {
      joinRoom(socket, roomId, username);
      setRoomInfo(roomId, username);
      onEvents();
      initImageListener((image) => {
        setMode("image");
        setImageUrl(image);
      });
    }

    return () => {
      socket?.off(RECEIVE_IMAGE);
    };
  }, [socket]);

  const handleOpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleModeChange = (mode: "empty" | "video" | "image" | "chat") => {
    setMode(mode);
    console.log(mode);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      sendImage(base64, roomId);
      setImageUrl(base64);
      if (mode !== "image") {
        setMode("image");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      aria-label="Viewer Container"
      className="relative flex h-full min-h-0 w-full flex-1 flex-col items-center justify-center overflow-auto bg-gray-100"
    >
      <ViewModeButtons
        onModeChange={handleModeChange}
        onUpload={handleUpload}
      />
      {!isChatOpen && <ChatButton openChat={handleOpenChat} />}

      <ViewerSwitcher mode={mode} imageUrl={imageUrl} />
      {/* <MarkupLayer roomId={roomId} /> */}
      {isChatOpen && <ChatWindow handleChatOpen={handleOpenChat} />}
    </div>
  );
}
