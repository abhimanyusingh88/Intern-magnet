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

    // We don't manage form state here; the parent component (renderEdit) should handle it
    // or we could lift state up. For flexibility, let's assume the parent manages the draft state
    // purely for the inputs, and onSave commits it.

    // Actually, to support "cancel", the parent needs to know when to reset.
    // Simpler approach: Parent (e.g., EducationBlock) holds the 'formData' state.
    // But then EducationBlock usually takes props. 

    // Let's rely on the parent (DownProfileComponent) passing the current data, 
    // and this component just triggering the modal.
    // The `renderEdit` will likely need access to a local "dirty" state.

    // Better pattern: This component manages the open/close and save trigger.
    // The passed `renderEdit` function could receive a `save` callback? No, onSave is prop.

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
                {/* We pass a no-op or specific handler if needed, but primarily 
                    the logic allows the parent to inject its form inputs here */}
                {renderEdit((name, val) => {
                    // This is a helper if the parent wants to use it, 
                    // but typically the parent binds its own state.
                })}
            </FieldEditModal>
        </>
    )
}
