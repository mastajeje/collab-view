export const CallModalText = ({
  from,
  text,
}: {
  from: string;
  text: string;
}) => {
  return (
    <p className="text-lg font-semibold">
      {from}님이: {text}
    </p>
  );
};
