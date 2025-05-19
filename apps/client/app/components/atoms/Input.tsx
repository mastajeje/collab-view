export default function Input({placeholder}: {placeholder: string}) {
    return (
        <div>
            <input className="w-auto h-[43px] border-1 border-gray-200 rounded-md p-[2px]" 
            type="text"
            placeholder={placeholder}
            />
        </div>
    )
}