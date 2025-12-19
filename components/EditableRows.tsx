import { Plus } from "lucide-react"
import InputWithTick from "./InputWithTick"

export default function EditableRow({
    label,
    name,
    open,
    onOpen,
    onClose,
    placeholder,
    value,
}: {
    label: string
    name: string
    open: boolean
    onOpen: () => void
    onClose: () => void
    placeholder: string
    value: string
}) {
    return (
        <div className="flex flex-col gap-1.5 min-h-[48px]">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{label}</span>
            <div className="flex items-center gap-2">
                {!open ? (
                    <button
                        type="button"
                        onClick={() => !value && onOpen()}
                        disabled={!!value}
                        className={`flex items-center gap-2 text-sm text-zinc-400 transition-colors ${!value ? "hover:text-white cursor-pointer" : "cursor-default"}`}
                    >
                        {value || placeholder}
                        {!value && <Plus size={14} className="text-indigo-400" />}
                    </button>
                ) : (
                    <InputWithTick name={name} onClose={onClose} defaultValue={value} />
                )}
            </div>
        </div>
    )
}