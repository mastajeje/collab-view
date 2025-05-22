export default function IconButton({
  icon,
  onClick,
}: {
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-[43px] w-[43px] cursor-pointer items-center justify-center rounded-xl bg-gray-200 p-2 text-3xl"
    >
      {icon}
    </button>
  );
}
