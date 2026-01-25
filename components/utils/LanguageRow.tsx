import EditableComplexField from "../EditableComplexField"
import { useState, useEffect } from "react"
import { updateProfile } from "@/app/actions/profile"

export default function LanguageRow({
    value,
    onChange,
    label,
    namePrefix,
}: {
    value?: any
    onChange?: any
    label: string
    namePrefix: string
}) {
    const [tempData, setTempData] = useState<any>({});

    useEffect(() => {
        setTempData({
            [`${namePrefix}_name`]: value?.[`${namePrefix}_name`] || "",
            [`${namePrefix}_proficiency`]: value?.[`${namePrefix}_proficiency`] || "",
        })
    }, [value, namePrefix]);

    const handleChange = (name: string, val: string) => {
        setTempData((prev: any) => ({ ...prev, [name]: val }));
    }

    const hasValue = !!value?.[`${namePrefix}_name`];

    return (
        <EditableComplexField
            label={label}
            hasValue={hasValue}
            renderView={() => (
                <div className="flex items-center justify-between">
                    {hasValue ? (
                        <>
                            <span className="font-medium text-xs sm:text-sm text-zinc-200">{value?.[`${namePrefix}_name`]}</span>
                            {value?.[`${namePrefix}_proficiency`] && (
                                <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wide">
                                    {value?.[`${namePrefix}_proficiency`]}
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="italic opacity-50">Add {label.toLowerCase()}...</span>
                    )}
                </div>
            )}
            renderEdit={() => (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400">Language</label>
                        <input
                            name={`${namePrefix}_name`}
                            value={tempData[`${namePrefix}_name`] || ""}
                            onChange={(e) => handleChange(`${namePrefix}_name`, e.target.value)}
                            className="input-profile w-full filled"
                            placeholder="e.g. English, Hindi"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400">Proficiency</label>
                        <select
                            value={tempData[`${namePrefix}_proficiency`] || ""}
                            onChange={(e) => handleChange(`${namePrefix}_proficiency`, e.target.value)}
                            className="input-profile w-full filled appearance-none"
                        >
                            <option value="">Select proficiency</option>
                            <option value="good">Good</option>
                            <option value="expert">Expert</option>
                            <option value="professional">Professional</option>
                        </select>
                    </div>
                </div>
            )}
            onSave={async () => {
                const formData = new FormData();
                Object.entries(tempData).forEach(([k, v]) => formData.append(k, v as string));
                await updateProfile(formData);
                Object.entries(tempData).forEach(([k, v]) => onChange(k, v));
            }}
        />
    )
}
