import React from "react";

export function StatCard({ icon, label, value, color = "text-white" }: { icon: React.ReactNode, label: string, value: string, color?: string }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 transition">
            <div className="p-2.5 rounded-xl bg-white/5 text-zinc-400">
                {icon}
            </div>
            <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{label}</p>
                <p className={`text-sm font-semibold ${color}`}>{value}</p>
            </div>
        </div>
    );
}
