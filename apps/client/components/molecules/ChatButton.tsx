import IconButton from "../atoms/IconButton";

export const ChatButton = ({ openChat }: { openChat: () => void }) => {
  return (
    <div
      className="absolute top-0 right-0 z-20 m-2"
      data-component="chat-button"
    >
      <IconButton icon="/chat-bubble.svg" onClick={() => openChat()} />
    </div>
  );
};
