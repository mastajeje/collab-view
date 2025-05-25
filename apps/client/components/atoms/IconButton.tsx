import Image from "next/image";

export default function IconButton({
  icon,
  onClick,
  size = "md",
  backgroundColor = "bg-gray-200",
}: {
  icon: string;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  backgroundColor?: string;
}) {
  const sizeClass = {
    sm: "h-[30px] w-[30px]",
    md: "h-[43px] w-[43px]",
    lg: "h-[56px] w-[56px]",
  };

  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-xl ${backgroundColor} p-2 text-3xl ${sizeClass[size]}`}
    >
      <Image src={icon} alt="icon" width={24} height={24} />
      {/* {icon} */}
    </button>
  );
}
