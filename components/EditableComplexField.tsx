"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import FieldEditModal from "./FieldEditModal"

interface EditableComplexFieldProps {
    label: string
    hasValue: boolean
    renderView: () => React.ReactNode
    renderEdit: (onChange: (name: string, value: string) => void) => React.ReactNode
    onSave: () => Promise<void>
    className?: string
}

export default function EditableComplexField({
    label,
    hasValue,
    renderView,
    renderEdit,
    onSave,
    className = ""
}: EditableComplexFieldProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);



    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await onSave();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save field", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <div className={`space-y-2 group ${className}`}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {label}
                </p>

                <div
                    onClick={handleOpen}
                    className={`
                        relative flex w-full cursor-pointer items-start justify-between rounded-xl border px-4 py-3
                        transition-all duration-200
                        ${hasValue
                            ? "border-white/5 filled bg-zinc-900/30 text-zinc-300 hover:border-white/10 hover:bg-zinc-900/50"
                            : "border-dashed border-white/10 bg-transparent text-zinc-500 hover:border-indigo-500/30 hover:text-zinc-400"
                        }
                    `}
                >
                    <div className="flex-1">
                        {renderView()}
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

                {renderEdit((name, val) => {
                })}
            </FieldEditModal>
        </>
    )
}
