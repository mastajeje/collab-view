import { MessageBox } from "../atoms/MessageBox";
import { UsernameBar } from "../atoms/UsernameBar";

export const ChatBox = ({
  username,
  message,
  self,
}: {
  username: string;
  message: string;
  self: boolean;
}) => {
  return (
    <>
      {self ? (
        <div className="flex justify-end">
          <MessageBox message={message} self={self} />
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <UsernameBar username={username} />
          <MessageBox message={message} self={self} />
        </div>
      )}
    </>
  );
};
