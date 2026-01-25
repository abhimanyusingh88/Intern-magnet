

export default function Card({
    id,
    title,

    children,
}: {
    id?: string
    title: string

    children: React.ReactNode
}) {
    return (
        <div id={id} className="rounded-2xl border  border-white/20 bg-zinc-900/60 px-4 py-4 sm:px-6 backdrop-blur-xl shadow-xl flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">{title}</h2>

            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}
