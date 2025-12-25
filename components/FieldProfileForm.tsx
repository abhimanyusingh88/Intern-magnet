export default function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className={`space-y-2`}>
            <p className={`text-[10px] font-bold uppercase  tracking-widest text-zinc-500`}>{label}</p>
            {children}
        </div>
    )
}