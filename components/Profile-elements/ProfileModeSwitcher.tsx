"use client"

import { motion } from "framer-motion"
import { Briefcase, User as UserIcon } from "lucide-react"
import { ProfileMode } from "../providers/ProfileContext"

interface ProfileModeSwitcherProps {
    activeMode: ProfileMode;
    setActiveMode: (mode: ProfileMode) => void;
}

export default function ProfileModeSwitcher({ activeMode, setActiveMode }: ProfileModeSwitcherProps) {
    return (
        <div className="flex justify-center mb-8">
            <div className="p-1 rounded-2xl bg-zinc-900/80 border border-white/5 backdrop-blur-xl flex gap-1 relative overflow-hidden group">
                <button
                    onClick={() => setActiveMode("SEEKER")}
                    className={`relative z-10 px-6 py-2.5 cursor-pointer rounded-xl text-sm font-medium transition-all duration-500 flex items-center gap-2 ${activeMode === "SEEKER" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                    <UserIcon size={16} /> Job Seeker
                </button>
                <button
                    onClick={() => setActiveMode("RECRUITER")}
                    className={`relative z-10 px-6 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all duration-500 flex items-center gap-2 ${activeMode === "RECRUITER" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                    <Briefcase size={16} /> Recruiter
                </button>

                {/* Sliding Background */}
                <motion.div
                    className="absolute inset-y-1 bg-linear-to-r from-indigo-600 to-indigo-500 shadow-lg shadow-indigo-500/20 rounded-xl"
                    animate={{
                        left: activeMode === "SEEKER" ? 4 : "50%",
                        width: activeMode === "SEEKER" ? "calc(50% - 6px)" : "calc(50% - 4px)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>
        </div>
    )
}
