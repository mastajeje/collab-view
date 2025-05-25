export default function Input({
  placeholder,
  border = "border-1 border-gray-200 rounded-md",
}: {
  placeholder: string;
  border?: string;
}) {
  return (
    <input
      className={`h-[43px] w-auto min-w-[250px] rounded-md border-1 border-gray-200 p-[2px] ${border}`}
      type="text"
      placeholder={placeholder}
    />
  );
}
