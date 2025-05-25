import { MessageBox } from "../atoms/MessageBox";
import { UsernameBar } from "../atoms/UsernameBar";

export const ChatBox = ({
  username,
  message,
}: {
  username: string;
  message: string;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <UsernameBar username={username} />
      <MessageBox message={message} />
    </div>
  );
};
