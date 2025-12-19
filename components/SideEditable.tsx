import { Plus } from "lucide-react"
import InputWithTick from "./InputWithTick"

export default function SideEditable({
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
        <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{label}</span>
            {!open ? (
                <button
                    type="button"
                    onClick={() => !value && onOpen()}
                    disabled={!!value}
                    className={`flex w-full items-center justify-between text-sm text-zinc-400 transition-colors ${!value ? "hover:text-white cursor-pointer" : "cursor-default"}`}
                >
                    <span>{value || placeholder}</span>
                    {!value && <Plus size={14} className="text-indigo-400" />}
                </button>
            ) : (
                <InputWithTick name={name} onClose={onClose} defaultValue={value} />
            )}
        </div>
    )
}