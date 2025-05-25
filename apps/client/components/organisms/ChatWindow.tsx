import { useChatStore } from "@/stores/chatStore";
import { ChatInput } from "../molecules/ChatInput";
import { ChatBox } from "../molecules/ChatBox";

const messages = [
  {
    id: 1,
    content: "안녕하세요",
    sender: "user",
  },
  {
    id: 2,
    content: "반가워요",
    sender: "user2",
  },
];

export const ChatWindow = () => {
  //   const messages = useChatStore((state) => state.messages);

  return (
    <div
      aria-label="chat-window"
      className="absolute right-0 flex h-full flex-col justify-between bg-white"
    >
      <div className="flex flex-col gap-3.5">
        {messages.map((message, index) => (
          <ChatBox
            key={index}
            username={message.sender}
            message={message.content}
          />
        ))}
      </div>

      <div className="border-t-1 border-gray-200">
        <ChatInput />
      </div>
    </div>
  );
};
