"use client"

import { Briefcase, UserPlus, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { ProfileMode } from "../providers/ProfileContext"
import { ChoiceCard } from "./choiceCard"

interface Props {
    onChoice: (mode: ProfileMode) => void
}



export default function OnboardingChoice({ onChoice }: Props) {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-6 text-center">

            {/* Soft ambient background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_45%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_40%)]" />

            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 sm:space-y-5 max-w-2xl"
            >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent tracking-tight">
                    How would you like to use Intern-Magnet?
                </h1>
                <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed">
                    Choose your primary path. You can switch anytime.
                </p>
            </motion.div>

            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-7 w-full max-w-5xl">

                <ChoiceCard
                    accent="emerald"
                    icon={UserPlus}
                    title="I am a Job Seeker"
                    desc="Build your profile and apply to top internships and entry-level roles."
                    color="text-emerald-500"
                    features={["Professional Resume", "Skill Assessments", "One-click Apply"]}
                    onClick={() => onChoice("SEEKER")}
                />

                <ChoiceCard
                    accent="blue"
                    icon={Briefcase}
                    title="I am a Recruiter"
                    desc="Post opportunities, manage applicants, and discover top talent."
                    color="text-blue-500"
                    features={["Company Dashboard", "Manage Postings", "Talent Search"]}
                    onClick={() => onChoice("RECRUITER")}
                />

            </div>
        </div>
    )
}
