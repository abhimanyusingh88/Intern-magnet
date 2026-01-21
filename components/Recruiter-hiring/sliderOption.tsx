"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, PlusCircle, Briefcase, FileText, Settings, HelpCircle } from "lucide-react";

const IconMap: { [key: string]: any } = {
    PlusCircle,
    Briefcase,
    FileText,
    Settings,
    HelpCircle
};

export default function SideArrowMenu({ menuItems }: { menuItems: Array<{ title: string, href: string, icon: string, color: string }> }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center group">
            {/* Arrow Handle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-16 w-8 cursor-pointer rounded-r-2xl bg-black/80 dark:bg-zinc-900/90 backdrop-blur-md text-white flex items-center opacity-70 justify-center shadow-2xl border-y border-r border-white/10 transition-all duration-300 hover:w-10 hover:bg-black dark:hover:bg-zinc-800"
            >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <ChevronRight size={22} className="text-zinc-300 " />
                </motion.div>
            </button>

            {/* Sliding Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: -280, opacity: 0, scale: 0.95 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: -280, opacity: 0, scale: 0.95 }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 20,
                            staggerChildren: 0.1
                        }}
                        className="ml-3 w-64 rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] p-4 flex flex-col gap-3 overflow-hidden"
                    >
                        <div className="mb-2 px-1">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Recruiter Tools</h3>
                        </div>

                        {menuItems.map((item, index) => {
                            const Icon = IconMap[item.icon] || Briefcase;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`
                                            flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300
                                            group/item hover:scale-[1.02] active:scale-[0.98]
                                            ${item.color} text-white
                                        `}
                                    >
                                        <Icon size={18} className="group-hover/item:scale-110 transition-transform" />
                                        {item.title}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
