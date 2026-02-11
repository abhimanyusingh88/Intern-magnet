"use client"
import { motion } from "framer-motion"
import { Rocket } from "lucide-react";

export default function DashboardHeader() {
    return <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.1, once: false }}
        className="flex flex-col justify-center gap-2 items-center text-center mt-2 px-2">
        <h1 className="text-xl sm:text-2xl flex flex-wrap justify-center gap-2 items-center font-semibold bg-linear-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            GROWTH DASHBOARD
            <span><Rocket className="w-6 h-6 sm:w-8 text-indigo-500 sm:h-8 animate-float" /></span>
        </h1>
        <p className="text-[10px] sm:text-[13px] text-center font-thin text-zinc-400 uppercase">Manage your profile, track opportunities, and grow your career.</p>
    </motion.div>
}