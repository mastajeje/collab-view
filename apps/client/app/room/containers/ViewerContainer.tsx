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
    isConnected,
    onEvents,
  } = useSocketStore();
  const [mode, setMode] = useState<"empty" | "video" | "image" | "chat">(
    "empty",
  );
  const [imageUrl, setImageUrl] = useState<string>("");

  const [isChatOpen, setIsChatOpen] = useState(false);
  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (isConnected && socket && username) {
      joinRoom(socket, roomId, username);
      setRoomInfo(roomId, username);
      onEvents();
      initImageListener((image) => {
        setMode("image");
        setImageUrl(image);
      });
    }
  }, [isConnected]);

  const handleOpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleModeChange = (mode: "empty" | "video" | "image" | "chat") => {
    setMode(mode);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      sendImage(base64);
      setMode("image");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      aria-label="Viewer Container"
      className="relative flex h-full w-full flex-col items-center justify-center bg-gray-100"
    >
      <ViewModeButtons
        onModeChange={handleModeChange}
        onUpload={handleUpload}
      />
      {!isChatOpen && <ChatButton openChat={handleOpenChat} />}

      <ViewerSwitcher mode={mode} imageUrl={imageUrl} />
      <MarkupLayer />
      {isChatOpen && <ChatWindow handleChatOpen={handleOpenChat} />}
    </div>
  );
}
