"use client";

import { motion } from "framer-motion";
import Node from "./node";

export default function HowItWorks() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}

            className="w-full mt-4 py-10 rounded-xl bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        How it works
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-500">
                        A simple system-driven flow
                    </p>
                </div>

                {/* Flow */}
                <div className="relative flex items-center justify-between">
                    {/* Animated dotted line */}
                    <motion.div
                        className="absolute left-[5%] right-[5%] top-1/2 h-[2px] text-zinc-300 dark:text-zinc-700"
                        style={{
                            backgroundImage:
                                "linear-gradient(to right, currentColor 40%, transparent 0%)",
                            backgroundSize: "8px 1px",
                        }}
                        animate={{ backgroundPositionX: [0, 16] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear",
                        }}
                    />

                    <Node index="01" title="Profile" desc="Skills & projects" />
                    <Node index="02" title="Find or Match" desc="Smart discovery" />
                    <Node index="03" title="Apply" desc="One click" />
                </div>
            </div>
        </motion.section>
    );
}


