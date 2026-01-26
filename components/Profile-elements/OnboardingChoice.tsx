"use client"

import { Briefcase, UserPlus, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { ProfileMode } from "../providers/ProfileContext"

interface OnboardingChoiceProps {
    onChoice: (mode: ProfileMode) => void;
}

export default function OnboardingChoice({ onChoice }: OnboardingChoiceProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
                    How would you like to use Intern-Magnet?
                </h1>
                <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                    Select your primary path to get started. You can always switch or use both later.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Job Seeker Option */}
                <motion.button
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onChoice("SEEKER")}
                    className="relative group p-8 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl overflow-hidden text-left transition-all hover:border-emerald-500/50 hover:bg-zinc-900/60"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-emerald-500" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                            <UserPlus className="text-emerald-500" size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">I am a Job Seeker</h3>
                            <p className="text-zinc-400">
                                Build your professional profile, showcase your skills, and apply for the best internships and entry-level jobs.
                            </p>
                        </div>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li className="flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-emerald-500" /> Professional Resume
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-emerald-500" /> Skill Assessments
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-emerald-500" /> One-click Apply
                            </li>
                        </ul>
                    </div>

                    <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                {/* Recruiter Option */}
                <motion.button
                    whileHover={{ scale: 1.02, translateY: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onChoice("RECRUITER")}
                    className="relative group p-8 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl overflow-hidden text-left transition-all hover:border-blue-500/50 hover:bg-zinc-900/60"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-blue-500" />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                            <Briefcase className="text-blue-500" size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">I am a Recruiter</h3>
                            <p className="text-zinc-400">
                                Post exciting job opportunities, manage applications, and discover top-tier talent for your organization.
                            </p>
                        </div>
                        <ul className="space-y-2 text-sm text-zinc-500">
                            <li className="flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-blue-500" /> Company Dashboard
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-blue-500" /> Manage Postings
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="h-1 w-1 rounded-full bg-blue-500" /> Talent Search
                            </li>
                        </ul>
                    </div>

                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            </div>
        </div>
    )
}
