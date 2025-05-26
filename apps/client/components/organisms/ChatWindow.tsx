import { useChatStore } from "@/stores/chatStore";
import { ChatInput } from "../molecules/ChatInput";
import { ChatBox } from "../molecules/ChatBox";
import { use, useEffect, useState } from "react";
import { useSocketStore } from "@/stores/socketStore";
import { sendMessage } from "@/sockets/events/chat";
import { RECEIVE_MESSAGE } from "@shared/constants/socket-events";

export const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const initMessageListener = useChatStore(
    (state) => state.initMessageListener,
  );
  const socket = useSocketStore((state) => state.socket);
  const username = useSocketStore((state) => state.username);
  const isConnected = useSocketStore((state) => state.isConnected);

  useEffect(() => {
    if (!socket) return;
    initMessageListener(socket, ({ message, sender }) => {
      addMessage({
        id: Date.now(),
        content: message,
        sender: sender,
      });
    });

    return () => {
      socket.off(RECEIVE_MESSAGE);
    };
  }, [isConnected]);

  const handleChangeMessage = (message: string) => {
    setMessage(message);
  };

  const handleSendMessage = () => {
    if (!socket) return;
    sendMessage(socket, message.trim(), username);

    addMessage({
      id: Date.now(),
      content: message.trim(),
      sender: username,
    });

    setMessage("");
  };

  return (
    <div
      aria-label="chat-window"
      className="absolute right-0 flex h-full flex-col justify-between bg-white"
    >
      <div className="flex flex-col gap-3.5 px-4 py-2.5">
        {messages.map(({ id, sender, content }) => (
          <ChatBox
            key={id}
            username={sender}
            message={content}
            self={sender === username}
          />
        ))}
      </div>

      <div className="border-t-1 border-gray-200">
        <ChatInput
          onSendMessage={handleSendMessage}
          onChangeMessage={handleChangeMessage}
          message={message}
        />
      </div>
    </div>
  );
};
