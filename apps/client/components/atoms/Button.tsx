export default function Button({
  text,
  onClick,
  size = "full",
}: {
  text: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg" | "auto" | "full";
}) {
  return (
    <button
      onClick={onClick}
      className={`h-[43px] cursor-pointer rounded-md bg-blue-500 px-3 py-1 text-lg text-white ${
        size === "auto" ? "w-auto" : "w-full"
      }`}
    >
      {text}
    </button>
  );
}
