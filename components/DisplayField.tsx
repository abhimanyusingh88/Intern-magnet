

export default function DisplayField({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-1.5 min-h-[48px] justify-center">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{label}</span>
            <div className={`text-xs sm:text-sm ${label === "Email" ? "text-zinc-400 cursor-not-allowed" : ""} ${value ? "text-zinc-200 filled" : "text-zinc-500 italic"}`}>
                {value || "-"}
            </div>
        </div>
    )
}
