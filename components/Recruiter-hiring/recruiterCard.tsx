"use client"

import { motion } from "framer-motion"
export default function RecruiterCard({ title, description, icon }: { title: string, description: string, icon: any }) {
    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl hover:scale-[1.08] transform-gpu transition-transform duration-300 ease-out border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2">
                {icon}
                <h3 className="text-lg font-medium text-white leading-none">
                    {title}
                </h3>
            </div>

            <p className="mt-2 text-sm text-zinc-400">
                {description}
            </p>
        </motion.div>
    )
}