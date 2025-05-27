export const MessageBox = ({
  message,
  self,
}: {
  message: string;
  self: boolean;
}) => {
  return self ? (
    <p className="rounded-lg bg-gray-200 px-2 py-1 wrap-anywhere">{message}</p>
  ) : (
    <p className="wrap-anywhere text-gray-500">{message}</p>
  );
};
