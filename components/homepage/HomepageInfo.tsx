"use client";

import { motion } from "framer-motion";
const array = [
    {
        icon: "🤖",
        title: "Intelligent Matching",
        desc: "Context-aware AI connects relevant candidates and roles.",
    },
    {
        icon: "⚡",
        title: "Frictionless Flow",
        desc: "Reduced steps, faster decisions, cleaner hiring.",
    },
    {
        icon: "🎯",
        title: "Signal-Driven",
        desc: "Intent and skills matter more than keywords.",
    },
    {
        icon: "📈",
        title: "Live Insights",
        desc: "Real-time visibility into reach and engagement.",
    },
]

export default function PlatformInfoCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative overflow-hidden mt-8 rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-6 sm:p-8"
        >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_-10%,rgba(99,102,241,0.12),transparent_40%)]" />

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <span className="text-[11px] tracking-wide text-indigo-400">
                        AI-POWERED PLATFORM
                    </span>
                    <h3 className="text-base sm:text-lg font-medium text-zinc-100">
                        Designed for modern hiring workflows
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
                        Our AI understands roles, skills, and intent — helping job posters and job
                        seekers connect faster, with less noise and better outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {array.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.35,
                                ease: "easeOut",
                                delay: 0.1 + i * 0.06,
                            }}
                            whileHover={{ y: -3 }}
                            className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex flex-col gap-2">
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm font-medium text-zinc-200">
                                    {item.title}
                                </span>
                                <span className="text-xs text-zinc-400 leading-relaxed">
                                    {item.desc}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
