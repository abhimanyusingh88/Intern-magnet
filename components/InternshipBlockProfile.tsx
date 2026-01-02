"use client"

import YearRangePicker from "./utils/YearRangePicker"
import EditableComplexField from "./EditableComplexField"
import { useState, useEffect } from "react"
import { updateProfile } from "@/app/actions/profile"

export default function InternshipBlock({ value, onChange, label, company, duration }: any) {
    const [tempData, setTempData] = useState<any>({});

    useEffect(() => {
        setTempData({
            [company]: value?.[company] || "",
            [`${duration}_start`]: value?.[`${duration}_start`] || "",
            [`${duration}_end`]: value?.[`${duration}_end`] || "",
        })
    }, [value, company, duration]);

    const handleChange = (name: string, val: string) => {
        setTempData((prev: any) => ({ ...prev, [name]: val }));
    }

    const hasValue = !!value?.[company];

    return (
        <EditableComplexField
            label={label}
            hasValue={hasValue}
            renderView={() => (
                <div className="w-full flex flex-col gap-1.5">
                    {hasValue ? (
                        <>
                            <div className="font-medium text-zinc-200 text-base leading-snug wrap-break-word pr-8">
                                {value?.[company]}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-zinc-400/80">
                                <span>Internship</span>
                                {(value?.[`${duration}_start`] && value?.[`${duration}_end`]) && (
                                    <span className="text-xs font-medium text-indigo-400 bg-indigo-400/5 px-2 py-0.5 rounded border border-indigo-400/30">
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
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400">Company Name</label>
                        <input
                            name={company}
                            value={tempData[company] || ""}
                            onChange={(e) => handleChange(company, e.target.value)}
                            className="input-profile w-full filled"
                            placeholder="e.g. Google, Microsoft"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400">Duration</label>
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
            }}
        />
    )
}
