"use client"
import { motion } from "framer-motion";
import { Brain, Lightbulb, Sparkles, AlertCircle, Rocket } from "lucide-react";
import Link from "next/link";
import MissingSkillsPlaceholder from "./missingPlaceholder";

export default function MissingSkills({ missingSkills }: { missingSkills: any }) {

    if (!missingSkills || (!missingSkills.missingSkills?.length && !missingSkills.improvementPlan)) {
        return <MissingSkillsPlaceholder missingSkills={missingSkills} />
    }
    const { missingSkills: skills, improvementPlan } = missingSkills;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
        >
            {/* Header section with icon */}
            <div className="flex items-center md:mt-4 gap-4 px-4 mb-2">
                <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                    <Brain className="text-amber-400" size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold bg-linear-to-r from-red-400 to-orange-400 bg-clip-text text-transparent  uppercase tracking-tighter">
                        AI Skill Gap Analysis
                    </h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Powered by Groq Intelligence</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Missing Skills Card */}
                <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <AlertCircle size={80} className="text-red-400" />
                    </div>

                    <h4 className="text-zinc-200 text-sm font-black tracking-widest uppercase italic border-l-4 border-red-500 pl-4 mb-6">
                        Target Skills to Acquire
                    </h4>

                    <div className="flex  flex-col gap-2 relative z-10">
                        <div className="flex  flex-wrap gap-2 relative z-10">
                            {skills?.map((s: string, i: number) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="px-4 py-2 text-xs font-bold bg-zinc-950/60 text-red-400 border border-red-500/20 rounded-xl hover:border-red-500/40 transition-colors shadow-inner"
                                >
                                    {s}
                                </motion.span>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2">
                            {(!skills || skills.length === 0) &&
                                <p className="text-sm justify-center font-bold text-zinc-500/70 italic">No significant gaps found!
                                </p>
                            }
                            <Link href="/dashboard/interview-prep" className="text-amber-400 hover:text-amber-500 flex gap-1 items-center border-amber-400 border-[1.1px] rounded-xl p-2 w-fit">Prepare for interviews <Rocket className="w-4 h-4" /></Link>
                        </div>

                    </div>
                </div>

                {/* Improvement Plan Card */}
                <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Lightbulb size={80} className="text-amber-400" />
                    </div>

                    <h4 className="text-zinc-200 text-sm font-black tracking-widest uppercase border-l-4 border-amber-500 pl-4 mb-6">
                        Roadmap & Strategy
                    </h4>

                    <div className="relative z-10">
                        <p className="text-sm text-zinc-400 leading-relaxed italic">
                            {improvementPlan}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
