import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const styles = {
    emerald: {
        text: "text-emerald-500",
        border: "border-emerald-500/20",
        softBg: "hover:bg-emerald-500/10",
        glow: "bg-emerald-500/10",
    },
    blue: {
        text: "text-blue-500",
        border: "border-blue-500/20",
        softBg: "hover:bg-blue-500/10",
        glow: "bg-blue-500/10",
    },
}

export function ChoiceCard({
    icon: Icon,
    title,
    desc,
    accent = "emerald",
    features,
    onClick,
}: any) {
    const s = styles[accent as keyof typeof styles]

    return (
        <motion.button
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            onClick={onClick}
            className={`relative group w-full text-left rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition p-5 sm:p-8 cursor-pointer overflow-hidden ${s.softBg}`}
        >
            {/* Hover Glow */}
            <motion.div
                className={`absolute -bottom-10 -right-10 h-36 w-36 sm:h-48 sm:w-48 ${s.glow} blur-3xl rounded-full`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            />

            {/* Light Sweep */}
            <motion.div
                className="absolute inset-0"
                initial={{ x: "-120%" }}
                whileHover={{ x: "120%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{
                    background:
                        "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
                }}
            />

            <ArrowRight
                className={`absolute top-5 right-5 sm:top-7 sm:right-7 ${s.text} opacity-0 group-hover:opacity-100 transition pointer-events-none`}
                size={18}
            />

            <div className="relative z-10 space-y-4 sm:space-y-6">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl ${s.glow} border ${s.border} flex items-center justify-center`}
                >
                    <Icon className={s.text} size={20} />
                </motion.div>

                <div>
                    <h3 className="text-lg sm:text-2xl font-semibold text-white tracking-tight mb-1.5 sm:mb-2">
                        {title}
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                        {desc}
                    </p>
                </div>

                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-zinc-500">
                    {features.map((f: string) => (
                        <li key={f} className="flex items-center gap-2">
                            <div className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${s.text}`} />
                            {f}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.button>
    )
}
