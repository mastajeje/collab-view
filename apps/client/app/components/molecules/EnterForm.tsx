import Input from "../atoms/Input";
import Button from "../atoms/Button";
export default function EnterForm({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="flex flex-col gap-2">
      <Input placeholder="닉네임을 입력해주세요" />
      <Button text="방 생성하기" onClick={onEnter} />
    </div>
  );
}
