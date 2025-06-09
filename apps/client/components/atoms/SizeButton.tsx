export const SizeButton = ({
  selected,
  onClick,
  size,
}: {
  selected: string | null;
  onClick: () => void;
  size: string;
}) => {
  return (
    <button
      className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${selected === size ? "border-blue-200 bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-50"} ${size === "sm" ? "rounded-l-lg" : ""} ${size === "md" ? "border-l border-gray-200" : ""} ${size === "lg" ? "rounded-r-lg" : ""} `}
      onClick={onClick}
    >
      {size}
    </button>
  );
};
