export default function EducationBlock({ inputRef, value, onChange, label, degree, college, duration }: any) {
    return (
        <div className="space-y-4">
            <h4 className="text-xs font-semibold text-zinc-300">{label}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input ref={inputRef} name={degree} value={value?.[degree] || ""} onChange={onChange} className="input-profile" placeholder="Degree / Class" />
                <input name={college} value={value?.[college] || ""} onChange={onChange} className="input-profile" placeholder="College / Board" />
                <input name={duration} value={value?.[duration] || ""} onChange={onChange} className="input-profile" placeholder="Details (e.g. 2020-2024)" />
            </div>
        </div>
    )
}