"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import FieldEditModal from "./FieldEditModal"

interface EditableFieldProps {
    label: string
    name: string
    value: string
    placeholder?: string
    isTextarea?: boolean
    options?: { value: string; label: string }[]
    onSave: (name: string, value: string) => Promise<void>
    className?: string
    type?: string
    margin?: string
}

export default function EditableField({
    label,
    name,
    value,
    placeholder = "",
    isTextarea = false,
    options,
    onSave,
    className = "",
    type = "text",
    margin = ""
}: EditableFieldProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempValue, setTempValue] = useState(value || "");
    const [isSaving, setIsSaving] = useState(false);

    // Initialize temp value when modal opens
    const handleOpen = () => {
        setTempValue(value || "");
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await onSave(name, tempValue);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save field", error);
        } finally {
            setIsSaving(false);
        }
    };

    const hasValue = value && value.length > 0;
    const key = options ? options.find(o => o.value === value)?.label : value;

    return (
        <>
            <div className={`space-y-2 group ${className} ${margin}`}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    {label}
                </p>

                <div
                    onClick={handleOpen}
                    className={`
                        relative flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3
                        transition-all duration-200
                        ${hasValue
                            ? "border-white/5 filled bg-zinc-900/30 text-zinc-300 hover:border-white/10 hover:bg-zinc-900/50"
                            : "border-dashed border-white/10 bg-transparent text-zinc-500 hover:border-indigo-500/30 hover:text-zinc-400"
                        }
                    `}
                >
                    <div className="flex-1">
                        {hasValue ? (
                            <div className="whitespace-pre-wrap  text-[13px] sm:text-sm md:text-base ">{key}</div>
                        ) : (
                            <span className="italic opacity-50">{placeholder || "Click to add..."}</span>
                        )}
                    </div>

                    <div className={`ml-3 rounded-lg p-1.5 transition-colors ${hasValue ? "text-zinc-500 group-hover:text-indigo-400" : "text-indigo-400/50"}`}>
                        <Pencil size={16} />
                    </div>
                </div>
            </div>

            <FieldEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Edit ${label}`}
                onSave={handleSave}
                isSaving={isSaving}
            >
                <div>
                    <label className="mb-2 block text-xs font-medium text-zinc-400">{label}</label>
                    {options ? (
                        <select
                            value={tempValue || ""}
                            onChange={(e) => setTempValue(e.target.value)}
                            className="input-profile w-full filled appearance-none"
                            autoFocus
                        >
                            <option value="" disabled>Select {label}</option>
                            {options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    ) : isTextarea ? (
                        <textarea
                            value={tempValue || ""}
                            onChange={(e) => setTempValue(e.target.value)}
                            placeholder={placeholder}
                            className="input-profile min-h-[150px] w-full resize-none filled"
                            autoFocus
                        />
                    ) : (
                        <input
                            type={type}
                            value={tempValue || ""}
                            onChange={(e) => setTempValue(e.target.value)}
                            placeholder={placeholder}
                            className="input-profile w-full filled"
                            autoFocus
                        />
                    )}
                </div>
            </FieldEditModal>
        </>
    )
}
