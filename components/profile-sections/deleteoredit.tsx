"use client"
import { Pencil, Trash2 } from "lucide-react";
import DeleteConfirmationModal from "../utils/deleteConfirmationModal";
import { useState } from "react";

export default function DeleteOrEdit({ onEdit, onDelete }: { onEdit: () => void, onDelete: () => Promise<void> | void }) {
    const [openModal, setOpenModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        try {
            await onDelete();
        } finally {
            setIsDeleting(false);
            setOpenModal(false);
        }
    }

    return (
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
            <DeleteConfirmationModal
                handleDelete={handleDelete}
                openModal={openModal}
                setOpenModal={setOpenModal}
                title="Delete"
                para="Are you sure you want to delete this item?"
                isDeleting={isDeleting}
            />
            <button
                type="button"
                onClick={onEdit}
                className="p-2 rounded-lg cursor-pointer text-zinc-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
            >
                <Pencil size={18} />
            </button>
            <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="p-2 rounded-lg cursor-pointer text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}