import IconButton from "../atoms/IconButton";

export const ChatButton = ({ openChat }: { openChat: () => void }) => {
  return (
    <div className="absolute top-0 right-0 z-10 m-2">
      <IconButton icon="/chat-bubble.svg" onClick={() => openChat()} />
    </div>
  );
};
