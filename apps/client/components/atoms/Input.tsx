type Props = {
  placeholder: string;
  border?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
};

export default function Input({
  placeholder,
  value,
  onChange,
  onKeyDown,
  border = "border-1 border-gray-200 rounded-md",
}: Props) {
  return (
    <input
      className={`h-[43px] w-auto min-w-[250px] rounded-md border-1 border-gray-200 p-[2px] ${border}`}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
    />
  );
}
