import Input from "../atoms/Input";
import Button from "../atoms/Button";
export default function EnterForm({ onSubmit }: { onSubmit: () => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <Input placeholder="닉네임을 입력해주세요" />
      <Button text="방 생성하기" />
    </form>
  );
}
