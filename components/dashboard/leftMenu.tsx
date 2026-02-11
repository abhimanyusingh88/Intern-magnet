"use client"
import { Briefcase, HelpCircle, Home, Bookmark, ScanSearch, Search, X, Settings, LogOut, BookOpenText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SidebarSlider from "./slider";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "@/lib/auth-client";

export default function LeftMenu({ mode = "desktop" }: { mode?: "desktop" | "mobile" }) {
    const [open, setOpen] = useState<boolean>(false);

    const menuItems = (
        <div className="text-zinc-300 flex flex-col gap-8">
            <div className="border-b-[1.8px] hover:bg-zinc-800 rounded-lg transition-all px-2 py-4 text-indigo-300 border-zinc-800">
                <Link className="flex gap-6 items-center px-2" href="/dashboard" onClick={() => setOpen(false)}><Home className="h-4 w-4" />Home</Link>
            </div>
            <div >
                <div className="flex flex-col gap-2">
                    <Link className="flex gap-6 transition-all hover:bg-zinc-800 items-center px-4 py-2 rounded-lg" href="/dashboard/appliedjobs" onClick={() => setOpen(false)}><Briefcase className="h-4 w-4" />Applied Jobs</Link>
                    <Link className="flex gap-6 transition-all hover:bg-zinc-800 items-center px-4 py-2 rounded-lg" href="/jobspage" onClick={() => setOpen(false)}><Search className="h-4 w-4" />Find Jobs</Link>
                    <Link className="flex gap-6 transition-all hover:bg-zinc-800 items-center px-4 py-2 rounded-lg" href="/dashboard/atschecker" onClick={() => setOpen(false)}><ScanSearch className="h-4 w-4" />ATS Checker</Link>
                    <Link className="flex gap-6 transition-all hover:bg-zinc-800 items-center px-4 py-2 rounded-lg" href="/dashboard/interviewprep" onClick={() => setOpen(false)}><BookOpenText className="h-4 w-4" />Interview Prep</Link>
                    <Link className="flex gap-6 transition-all hover:bg-zinc-800 items-center px-4 py-2 rounded-lg" href="/dashboard/helpcenter" onClick={() => setOpen(false)}><HelpCircle className="h-4 w-4" />Help Center</Link>
                </div>
                <div className="h-[1.4px] w-full translate-y-[20px] bg-zinc-600/40" />
                <div className="translate-y-[40px] flex flex-col gap-2">
                    <Link className="flex gap-6 transition-all hover:bg-zinc-800 items-center px-4 py-2 rounded-lg" href="/dashboard/settings" onClick={() => setOpen(false)}><Settings className="h-4 w-4" />Settings</Link>
                    <button className="flex gap-6 transition-all text-red-500 cursor-pointer  items-center px-4 py-2 font-medium hover:bg-red-800/30 hover:text-zinc-200 rounded-lg" onClick={async () => {
                        await signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    window.location.href = "/";
                                }
                            }
                        });
                    }}><LogOut className="h-5 w-5" />Logout</button>

                </div>
            </div>
        </div >
    );

    if (mode === "desktop") {
        return <div className="p-4">{menuItems}</div>;
    }

    return (
        <>
            <SidebarSlider onClick={() => setOpen(true)} />

            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-full w-[240px] bg-zinc-950 border-r border-white/5 z-50 p-6 md:hidden shadow-2xl overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold bg-linear-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent italic">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            {menuItems}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
