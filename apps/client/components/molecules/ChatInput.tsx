import IconButton from "../atoms/IconButton";
import Input from "../atoms/Input";

type Props = {
  onSendMessage: () => void;
  onChangeMessage: (message: string) => void;
  message: string;
};

export const ChatInput = ({
  onSendMessage,
  onChangeMessage,
  message,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    <div className="m-2.5 flex rounded-md border-1 border-gray-200">
      <Input
        placeholder="메시지를 입력하세요"
        onChange={handleChange}
        border="border-none"
        value={message}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        icon={"/send.svg"}
        size="md"
        onClick={onSendMessage}
        backgroundColor=""
      />
    </div>
  );
};
