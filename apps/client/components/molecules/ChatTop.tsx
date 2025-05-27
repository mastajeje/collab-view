export const ChatTop = ({ handleChatOpen }: { handleChatOpen: () => void }) => {
  return (
    <div className="flex justify-end border-b-1 border-gray-200">
      <button
        className="flex h-[36px] w-[36px] cursor-pointer items-center justify-center self-end text-gray-200"
        onClick={handleChatOpen}
      >
        <img src="/close.svg" alt="close" />
      </button>
    </div>
  );
};
