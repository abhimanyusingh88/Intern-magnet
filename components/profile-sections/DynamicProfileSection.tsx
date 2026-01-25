"use client";

import { useState } from "react";
import Card from "../Profile-elements/ProfileCard";
import { Plus } from "lucide-react";
import FieldEditModal from "../FieldEditModal";
import { DynamicProfileSectionProps, UpdateCommand } from "@/lib/types/types";

export default function DynamicProfileSection<T>({
    title,
    id,
    items,
    limit,
    itemLabel,
    emptyMessage,
    initialItem,
    onSave,
    renderItem,
    renderForm,
    gridClassName
}: DynamicProfileSectionProps<T>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [currentItem, setCurrentItem] = useState<T>(initialItem);

    const handleOpenModal = (index: number | null = null) => {
        if (index !== null) {
            setCurrentItem(items[index]);
            setEditingIndex(index);
        } else {
            setCurrentItem(initialItem);
            setEditingIndex(null);
        }
        setIsModalOpen(true);
    };

    const handleInternalSave = async () => {
        // Prevent saving if all fields are empty
        const isActuallyEmpty = Object.values(currentItem as any).every(val =>
            val === null || val === undefined || (typeof val === 'string' && val.trim() === "")
        );

        if (isActuallyEmpty) {
            alert(`Please fill in at least one field for ${itemLabel}`);
            return;
        }

        setIsSaving(true);
        try {
            const command: UpdateCommand<T> = {
                field: id.replace('section-', ''), // e.g. section-internships -> internships
                action: editingIndex !== null ? 'edit' : 'add',
                item: currentItem,
                index: editingIndex !== null ? editingIndex : undefined
            };

            await onSave(command);
            setIsModalOpen(false);
        } catch (error) {
            console.error(`Failed to save ${itemLabel}:`, error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleInternalDelete = async (index: number) => {
        try {
            const command: UpdateCommand<T> = {
                field: id.replace('section-', ''),
                action: 'delete',
                index: index
            };
            await onSave(command);
        } catch (error) {
            console.error(`Failed to delete ${itemLabel}:`, error);
        }
    };

    return (
        <Card id={id} title={title}>
            <div className="space-y-2">
                {items.length > 0 ? (
                    <div className={gridClassName || "space-y-3"}>
                        {items.map((item, index) => (
                            <div key={index} className="h-full">
                                {renderItem(
                                    item,
                                    () => handleOpenModal(index),
                                    () => handleInternalDelete(index)
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-3 rounded-xl border border-dashed border-white/10">
                        <p className="text-zinc-500 text-sm italic">{emptyMessage}</p>
                    </div>
                )}

                {items.length < limit && (
                    <button
                        type="button"
                        onClick={() => handleOpenModal()}
                        className="w-full flex items-center cursor-pointer justify-center gap-2 py-3 rounded-xl border border-dashed border-indigo-500/35 text-zinc-500 hover:border-indigo-500/30 hover:text-indigo-400 hover:border-indigo-500/90 transition-all group"
                    >
                        <Plus size={18} />
                        <span className="text-sm font-medium">Add {itemLabel}</span>
                    </button>
                )}

                {items.length >= limit && (
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold text-center">
                        Limit reached ({items.length}/{limit})
                    </p>
                )}
            </div>

            <FieldEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingIndex !== null ? `Edit ${itemLabel}` : `Add ${itemLabel}`}
                onSave={handleInternalSave}
                isSaving={isSaving}
            >
                {renderForm(currentItem, setCurrentItem)}
            </FieldEditModal>
        </Card>
    );
}
