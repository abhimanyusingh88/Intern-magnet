import { motion } from "framer-motion"

export default function PostJobIndicatorCard({ icon, content, label }: { icon: any, content: string, label: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 0.8)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-zinc-900 w-full sm:flex-1 sm:basis-[280px] sm:max-w-[360px] p-4 rounded-2xl flex flex-col gap-2 cursor-pointer border border-transparent hover:border-zinc-700 transition-colors"
        >
            <div className="flex gap-2 items-center">
                <span className="text-indigo-500">{icon}</span>
                <p className="sm:text-xl inline text-md text-zinc-200 font-medium">{label}</p>
            </div>
            <p className="sm:text-md text-xs text-zinc-400 leading-relaxed">{content}</p>
        </motion.div>
    )
}