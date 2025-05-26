export const MessageBox = ({
  message,
  self,
}: {
  message: string;
  self: boolean;
}) => {
  return self ? (
    <p className="rounded-lg bg-gray-200 px-2 py-1">{message}</p>
  ) : (
    <p className="text-gray-500">{message}</p>
  );
};
