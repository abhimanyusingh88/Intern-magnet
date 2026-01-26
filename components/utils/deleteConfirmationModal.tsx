"use client";
import { X, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function DeleteConfirmationModal({
    handleDelete,
    openModal,
    setOpenModal,
    title,
    para,
    isDeleting
}: {
    handleDelete: () => Promise<void> | void;
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    title: string;
    para: string;
    isDeleting?: boolean;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when open
    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openModal]);

    if (!openModal || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => !isDeleting && setOpenModal(false)}
            />

            <div
                className="
                    relative w-full max-w-sm
                    rounded-2xl
                    bg-zinc-900
                    border border-white/10
                    p-6
                    shadow-2xl
                    animate-in fade-in zoom-in-95
                    duration-200
                "
            >
                {/* Close Button */}
                <button
                    onClick={() => !isDeleting && setOpenModal(false)}
                    disabled={isDeleting}
                    className="absolute right-4 top-4 text-zinc-400 hover:text-white transition disabled:opacity-50"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                    <Trash2 className="h-6 w-6 text-red-500" />
                </div>

                {/* Text Context */}
                <div className="text-center space-y-2">
                    <h2 className="text-lg font-bold text-white tracking-tight">
                        {title}
                    </h2>
                    <p className="text-sm text-zinc-400 px-2">
                        {para}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-3">
                    <button
                        onClick={() => setOpenModal(false)}
                        disabled={isDeleting}
                        className="
                            flex-1 rounded-xl
                            cursor-pointer
                            border border-white/5
                            bg-white/5
                            px-4 py-2.5
                            text-sm font-semibold
                            text-zinc-300
                            hover:bg-white/10
                            hover:text-white
                            transition-all
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            await handleDelete();
                            setOpenModal(false);
                        }}
                        disabled={isDeleting}
                        className="
                            flex-1 rounded-xl
                            cursor-pointer
                            bg-red-600
                            px-4 py-3
                            text-sm font-bold
                            text-white
                            hover:bg-red-500
                            shadow-lg shadow-red-900/20
                            transition-all
                            active:scale-[0.98]
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                            flex items-center justify-center gap-2
                        "
                    >
                        {isDeleting ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
