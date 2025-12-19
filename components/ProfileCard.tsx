import { Pencil, Plus } from "lucide-react"

export default function Card({
    id,
    title,
    action,
    onAction,
    children,
}: {
    id?: string
    title: string
    action?: string
    onAction?: () => void
    children: React.ReactNode
}) {
    return (
        <div id={id} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">{title}</h2>
                {action ? (
                    <button
                        type="button"
                        onClick={onAction}
                        className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        <Plus size={14} />
                        {action}
                    </button>
                ) : (
                    <Pencil
                        size={14}
                        onClick={onAction}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                    />
                )}
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}
