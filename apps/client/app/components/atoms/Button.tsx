export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-[43px] w-full min-w-[250px] cursor-pointer rounded-md bg-blue-500 px-2 text-lg text-white"
    >
      {text}
    </button>
  );
}
