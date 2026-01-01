import React from "react";

export function Section({ title, icon, children }: { title: string, icon?: React.ReactNode, children: React.ReactNode }) {
    return (
        <section className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
                {icon}
                <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
            {children}
        </section>
    );
}
