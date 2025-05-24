export const UploadButton = ({
  onUpload,
}: {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <button>
      <input
        type="file"
        id="upload"
        accept="image/*"
        onChange={onUpload}
        hidden
      />
      <label
        htmlFor="upload"
        className="flex h-[43px] w-[43px] cursor-pointer items-center justify-center rounded-xl bg-white p-2 text-3xl"
      >
        +
      </label>
    </button>
  );
};
