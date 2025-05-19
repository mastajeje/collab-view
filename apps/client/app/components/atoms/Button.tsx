export default function Button({text, onClick}: {text: string, onClick: () => void}) {
    return (
        <button onClick={onClick} className="w-auto h-[43px] text-lg bg-blue-500 text-white rounded-md px-2 cursor-pointer">
            {text}
        </button>
    )
}