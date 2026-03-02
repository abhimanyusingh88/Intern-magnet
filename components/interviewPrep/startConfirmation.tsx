import { motion, AnimatePresence } from "framer-motion";

export default function StartConfirmation({
    open,
    setOpen,
    header,
    btName,
    onConfirm,
    loading
}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    header: string;
    btName: string;
    onConfirm: () => void;
    loading: boolean
}) {

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                onClick={() => setOpen(false)}
            >
                {/* Modal Box */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="
                        w-full max-w-md
                        rounded-2xl
                        bg-zinc-900
                        shadow-2xl
                        border border-white/10
                        p-6
                        flex flex-col gap-6
                    "
                >
                    {/* Header */}
                    <h1 className="text-lg sm:text-xl font-semibold text-white text-center">
                        {header}
                    </h1>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
                        <button
                            onClick={() => setOpen(false)}
                            className="
                                w-full sm:w-auto
                                px-4 py-2
                                rounded-xl
                                bg-white/10
                                text-white
                                hover:bg-white/20
                                transition
                            "
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => {
                                onConfirm();
                            }}
                            className="
                                w-full sm:w-auto
                                px-4 py-2
                                rounded-xl
                                bg-red-500
                                text-white
                                font-medium
                                hover:bg-red-600
                                transition
                                shadow-lg shadow-red-500/20
                            "
                        >
                            {loading === true ? `${btName}ing...` : btName}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}