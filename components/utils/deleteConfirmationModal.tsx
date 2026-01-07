"use client";

import { X, Trash2 } from "lucide-react";

export default function DeleteConfirmationModal({
    handleDelete,
    openModal,
    setOpenModal,
}: {
    handleDelete: () => void;
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
}) {
    if (!openModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
                className="
                    relative w-[90%] max-w-sm
                    rounded-2xl
                    bg-zinc-900
                    border border-zinc-800
                    p-6
                    shadow-2xl
                    animate-in fade-in zoom-in-95
                "
            >
                {/* Close */}
                <button
                    onClick={() => setOpenModal(false)}
                    className="absolute right-4 top-4 text-zinc-400 hover:text-white transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                    <Trash2 className="h-6 w-6 text-red-500" />
                </div>

                {/* Text */}
                <h2 className="text-center text-lg font-semibold text-white">
                    Delete job post?
                </h2>

                <p className="mt-2 text-center text-sm text-zinc-400">
                    This action cannot be undone. The job post will be permanently removed.
                </p>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={() => setOpenModal(false)}
                        className="
                            flex-1 rounded-xl
                            cursor-pointer
                            border border-zinc-700
                            px-4 py-2.5
                            text-sm font-medium
                            text-zinc-300
                            hover:bg-zinc-800
                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="
                        cursor-pointer
                            flex-1 rounded-xl
                            bg-red-600
                            px-4 py-2.5
                            text-sm font-medium
                            text-white
                            hover:bg-red-700
                            transition
                        "
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
