import { Box, LockIcon, Rocket, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion"
import PostJobIndicatorCard from "./postJobIndicatorCard";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
}

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
}

export default function PostJobIndicator() {
    return (
        <motion.main
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
        >
            <motion.div variants={item} className="w-full flex justify-center">
                <p className="bg-linear-to-r text-xl flex items-center font-sans font-semibold p-2 from-indigo-500 to-pink-600 text-transparent bg-clip-text sm:text-2xl md:text-3xl lg:text-4xl gap-2">
                    Start By posting a job
                    <motion.span
                        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-indigo-500"
                    >
                        <Rocket className="h-8 w-8 sm:w-10 sm:h-10" />
                    </motion.span>
                </p>
            </motion.div>

            <motion.div variants={item} className="w-full flex justify-center text-center">
                <p className="text-zinc-400 max-w-2xl px-2">Post your first job in under 2 minutes and start receiving AI-matched candidates.</p>
            </motion.div>

            <motion.div variants={item} className="w-full flex justify-center p-4">
                <p className="text-2xl sm:text-4xl font-semibold text-zinc-100">How Hiring works?</p>
            </motion.div>

            <motion.div
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
                className="flex sm:flex-row sm:justify-between gap-4 flex-col"
            >
                <PostJobIndicatorCard icon={<Box className="h-4 w-4 sm:w-6 sm:h-6" />} content="Add role, skills & experience. Inject your requirements to get the best candidates." label="Post a job" />
                <PostJobIndicatorCard icon={<Sparkles className="h-4 w-4 sm:w-6 sm:h-6" />} content="No spam, only relevant profiles. AI matches candidates based on your requirements." label="AI Matches" />
                <PostJobIndicatorCard icon={<Rocket className="h-4 w-4 sm:w-6 sm:h-6" />} content="Interact, shortlist & hire. Get the best candidates for your job." label="Hire Faster" />
            </motion.div>

            <motion.div
                variants={item}
                className="bg-zinc-900/70 mt-6 border border-zinc-800 rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent pointer-events-none" />

                <div className="flex justify-between items-center relative z-10">
                    <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Job Analytics Preview</h3>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-yellow-500/10 p-2 rounded-full"
                    >
                        <LockIcon className="h-4 w-4 text-yellow-500" />
                    </motion.div>
                </div>

                <div className="flex gap-4 relative z-10">
                    {[
                        { label: "Views", val: "56", icon: "👁️" },
                        { label: "Applied", val: "45", icon: "📩" },
                        { label: "Hired", val: "20", icon: "⭐" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5, backgroundColor: "rgba(39, 39, 42, 0.9)" }}
                            className="flex-1 bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-4 flex flex-col items-center gap-2 blur-[1.5px] transition-colors"
                        >
                            <span className="text-2xl">{stat.icon}</span>
                            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-tighter">{stat.label}</span>
                            <span className="text-xl font-bold text-zinc-100">{stat.val}</span>
                        </motion.div>
                    ))}
                </div>

                <p className="text-xs text-zinc-500 text-center font-medium">
                    Post a job to unlock live performance insights
                </p>
            </motion.div>
        </motion.main>
    )
}
