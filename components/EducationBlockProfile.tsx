import YearRangePicker from "./utils/YearRangePicker"
import EditableComplexField from "./EditableComplexField"
import { useState, useEffect } from "react"
import { updateProfile } from "@/app/actions/profile"
import { useQueryClient } from "@tanstack/react-query"

export default function EducationBlock({ value, onChange, label, degree, college, duration, grade }: any) {
    const [tempData, setTempData] = useState<any>({});
    const queryClient = useQueryClient();

    // A simple way is to sync from `value` whenever `value` changes.
    useEffect(() => {
        setTempData({
            [degree]: value?.[degree] || "",
            [college]: value?.[college] || "",
            [grade]: value?.[grade] || "",
            [`${duration}_start`]: value?.[`${duration}_start`] || "",
            [`${duration}_end`]: value?.[`${duration}_end`] || "",
        })
    }, [value, degree, college, duration, grade]);

    const handleChange = (name: string, val: string) => {
        setTempData((prev: any) => ({ ...prev, [name]: val }));
    }

    const hasValue = !!value?.[degree] || !!value?.[college];

    return (
        <EditableComplexField
            label={label}
            hasValue={hasValue}
            renderView={() => (
                <div className="w-full flex flex-col gap-1">
                    {hasValue ? (
                        <>
                            <div className="font-medium text-zinc-200 text-[13px] sm:text-sm md:text-base leading-snug wrap-break-word pr-8">
                                {value?.[degree]}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-zinc-400/80">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                    <span>{value?.[college]}</span>
                                    {value?.[grade] && (
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-800/50 border border-white/5 shadow-inner">
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">Grade</span>
                                            <span className="text-xs font-semibold text-emerald-400">{value?.[grade]}</span>
                                        </div>
                                    )}
                                </div>
                                {(value?.[`${duration}_start`] && value?.[`${duration}_end`]) && (value?.[`${duration}_start`] <= value?.[`${duration}_end`]) && (
                                    <span className="text-xs font-medium text-indigo-400 bg-indigo-400/5 px-2 py-0.5 rounded border border-indigo-400">
                                        {value?.[`${duration}_start`]} - {value?.[`${duration}_end`]}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <span className="italic opacity-50">Click to add {label.toLowerCase()}...</span>
                    )}
                </div>
            )}
            renderEdit={() => (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Degree / Class</label>
                            <input
                                name={degree}
                                value={tempData[degree] || ""}
                                onChange={(e) => handleChange(degree, e.target.value)}
                                className="input-profile w-full filled"
                                placeholder="e.g. B.Tech, Class XII"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Grade / CGPA</label>
                            <input
                                name={grade}
                                value={tempData[grade] || ""}
                                onChange={(e) => handleChange(grade, e.target.value)}
                                className="input-profile w-full filled"
                                placeholder="e.g. 9.5 or 95%"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">College / Board</label>
                        <input
                            name={college}
                            value={tempData[college] || ""}
                            onChange={(e) => handleChange(college, e.target.value)}
                            className="input-profile w-full filled"
                            placeholder="e.g. IIT Delhi, CBSE"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Duration</label>
                        <YearRangePicker
                            namePrefix={duration}
                            startYear={tempData[`${duration}_start`] || ""}
                            endYear={tempData[`${duration}_end`] || ""}
                            onChange={(name: string, val: string) => handleChange(name, val)}
                        />
                    </div>
                </div>
            )}
            onSave={async () => {
                const formData = new FormData();
                Object.entries(tempData).forEach(([k, v]) => formData.append(k, v as string));
                await updateProfile(formData);
                Object.entries(tempData).forEach(([k, v]) => onChange(k, v));
                await queryClient.invalidateQueries({ queryKey: ["profileData"] });
            }}
        />
    )
}