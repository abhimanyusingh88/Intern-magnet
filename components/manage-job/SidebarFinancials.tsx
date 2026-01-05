import React from "react";
import { JobDetail } from "@/lib/types/types";
import { IndianRupee } from "lucide-react";

export function SidebarFinancials({ job }: { job: JobDetail }) {
    const benefits = job.additional_benefits?.split(',').map(b => b.trim()).filter(Boolean) || [];

    return (
        <div className="p-6 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-md sticky top-28">
            <h3 className="text-lg font-semibold text-white mb-6">Financial Summary</h3>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <IndianRupee className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 uppercase font-bold tracking-tight">Monthly Salary</p>
                        <p className="text-xl font-bold text-white">₹{job.salary_per_month_from} – ₹{job.salary_per_month_to}</p>
                    </div>
                </div>

                {benefits.length > 0 ? (
                    <div className="pt-6 border-t border-white/5">
                        <h4 className="text-sm font-medium text-zinc-400 mb-3">Additional Benefits</h4>
                        <div className="flex flex-wrap gap-2">
                            {benefits.map((benefit, i) => (
                                <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-zinc-300">
                                    {benefit}
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (<p className="text-zinc-400  italic ">Not Specified</p>)}

                <div className="pt-6">
                    <button className="w-full cursor-pointer py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 active:scale-95">
                        View All Applicants
                    </button>
                </div>
            </div>
        </div>
    );
}
