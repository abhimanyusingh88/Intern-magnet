import { motion } from "framer-motion";

export default function Node({
    index,
    title,
    desc,
}: {
    index: string;
    title: string;
    desc: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 flex flex-col  items-center text-center"
        >
            {/* Node */}
            <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="h-14 w-14 rounded-full border border-indigo-500/40 bg-white dark:bg-zinc-900 flex items-center justify-center text-[11px] font-medium text-indigo-400"
            >
                Step - {index}
            </motion.div>

            <p className="mt-3 text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {title}
            </p>
            <p className="mt-0.5 text-[11px] sm:text-[13px] text-zinc-500">
                {desc}
            </p>
        </motion.div>
    );
}