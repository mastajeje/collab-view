import IconButton from "../atoms/IconButton";
import Input from "../atoms/Input";

export const ChatInput = () => {
  return (
    <div className="m-2.5 flex rounded-md border-1 border-gray-200">
      <Input placeholder="메시지를 입력하세요" border="border-none" />
      <IconButton
        icon={"/send.svg"}
        size="md"
        onClick={() => {}}
        backgroundColor=""
      />
    </div>
  );
};
