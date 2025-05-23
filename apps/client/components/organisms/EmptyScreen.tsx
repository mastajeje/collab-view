import IconButton from "../atoms/IconButton";

type Props = {
  onClick: () => void;
};

export default function EmptyScreen({ onClick }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100">
      Empty Screen
    </div>
  );
}
