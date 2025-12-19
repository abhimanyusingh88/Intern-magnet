export default function LanguageRow({ inputRef, value, onChange, label, namePrefix }: { inputRef?: any, value?: any, onChange?: any, label: string, namePrefix: string }) {
    return (
        <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
            <div className="grid grid-cols-2 gap-3">
                <input ref={inputRef} name={`${namePrefix}_name`} value={value?.[`${namePrefix}_name`] || ""} onChange={onChange} className="input-profile" placeholder="Language" />
                <input
                    name={`${namePrefix}_proficiency`}
                    value={value?.[`${namePrefix}_proficiency`] || ""}
                    onChange={onChange}
                    className="input-profile"
                    placeholder="Proficiency"
                />
            </div>
        </div>
    )
}