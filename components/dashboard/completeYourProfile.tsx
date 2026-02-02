"use client"
import { motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react";
import { useProfile } from "../providers/ProfileContext";
import Link from "next/link";
import { useState } from "react";

export default function CompleteProfile() {
    const [close, setClose] = useState<boolean>(false);
    const { completionPercentage } = useProfile();

    if (completionPercentage >= 100 || close) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-44 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:top-32 md:right-6 z-50"

        >
            <button
                onClick={() => setClose(true)}
                className="absolute -top-2 cursor-pointer -right-2 p-1 bg-zinc-800 rounded-full border border-white/10 text-indigo-500 hover:text-indigo-400 hover:bg-zinc-700 transition-all shadow-lg z-10"
            >
                <X size={12} />
            </button>
            <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-indigo-500/30 bg-zinc-900 opacity-70 hover:border-indigo-500/60 transition shadow-2xl"
            >
                {/* Left accent line */}
                <div className="w-1 h-10 rounded-full bg-linear-to-b from-indigo-500 to-pink-500" />

                {/* Text */}
                <div className="flex flex-col">
                    <p className="text-white text-sm font-semibold">
                        Complete your profile
                    </p>
                    <p className="text-zinc-400 text-xs">
                        {completionPercentage}% done
                    </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="text-indigo-400 w-8 h-8 sm:w-5 sm:h-5 ml-2" />
            </Link>
        </motion.div>
    )
}
