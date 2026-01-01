"use client"
import { Sparkles } from "lucide-react";

export function ManagementBanner() {
    return (
        <div className="mb-12 relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-r from-indigo-500/10 via-pink-500/10 to-transparent p-8 backdrop-blur-sm">
            <div className="relative z-10 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400">
                    <Sparkles className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">Management Center</h2>
                    <p className="text-zinc-400 text-sm">Review, Edit, and Manage your job posting details below.</p>
                </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-indigo-500/5 to-transparent pointer-events-none" />
        </div>
    );
}
