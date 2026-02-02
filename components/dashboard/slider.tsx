"use client"
import { PanelLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SidebarSlider({ onClick }: { onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="fixed top-1/2 -translate-y-1/2 left-0 z-50 bg-zinc-900 border border-zinc-800 border-l-0 rounded-r-xl p-2 shadow-lg hover:bg-zinc-800 transition md:hidden"
        >
            <PanelLeft className="h-5 w-5 text-indigo-400" />
        </motion.button>
    )
}
