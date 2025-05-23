export default function Input({ placeholder }: { placeholder: string }) {
  return (
    <div>
      <input
        className="h-[43px] w-auto min-w-[250px] rounded-md border-1 border-gray-200 p-[2px]"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}
