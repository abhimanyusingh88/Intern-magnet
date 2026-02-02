import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function ErrorIndicator({ error }: { error: String }) {
    return <AnimatePresence>
        {error && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
            >
                <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 flex items-center gap-2 text-red-500 text-xs font-medium">
                    <AlertCircle size={14} className="shrink-0" />
                    {error}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
}