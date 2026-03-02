"use client"
import { motion } from "framer-motion"
import CustomActiveShapePieChart from "./homepagePieChart";
import { DashCards } from "./dashboardConstants";
import { Mic } from "lucide-react";
import LegendItem from "./legendItem";
export default function HomePage({ AppliedJobs, interviewCount }: { AppliedJobs: any, interviewCount: any }) {
    const totalLength = AppliedJobs.length;
    const pending = AppliedJobs.filter((job: any) => job.status === "pending");
    const rejected = AppliedJobs.filter((job: any) => job.status === "rejected");
    const ShortListed = totalLength - (pending.length + rejected.length);
    const data = [{ name: "shortlisted", value: ShortListed }, { name: "pending", value: pending.length }, { name: "rejected", value: rejected.length }]


    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full flex relative flex-col gap-6">

        <div className="w-full backdrop-blur-xs p-3 sm:p-4 md:p-6 bg-linear-to-r flex flex-col gap-3 items-center from-zinc-600/20 via-zinc-700/20 to-zinc-800/20 rounded-2xl border border-white/5 ">

            <h1 className="text-zinc-400/80 font-semibold text-xl sm:text-2xl md:text-3xl tracking-wide text-center">
                Welcome to AI-Powered Dashboard
            </h1>

            <p className="text-xs sm:text-sm whitespace-nowrap font-medium tracking-[0.1rem] sm:tracking-[0.25em] bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                MANAGE • PREPARE • ANALYZE
            </p>

        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 w-full bg-white/5 border border-white/5 rounded-3xl p-4 sm:p-6 backdrop-blur-md relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] -ml-32 -mb-32 pointer-events-none" />
            {
                totalLength > 0
                    ? <div className="flex-1 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        {/* Chart Container */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative min-w-[280px]">
                                <CustomActiveShapePieChart data={data} />
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="grid grid-cols-2 md:flex md:flex-col gap-4 w-full md:w-auto">
                            <LegendItem color="bg-zinc-200" label="Applied" value={totalLength} />
                            <LegendItem color="bg-green-400" label="Shortlisted" value={ShortListed} />
                            <LegendItem color="bg-amber-300" label="Pending" value={pending.length} />
                            <LegendItem color="bg-red-600" label="Rejected" value={rejected.length} />
                        </div>
                    </div>
                    : <div className="flex-1 flex bg-zinc-800/20 border border-white/5 rounded-2xl items-center justify-center py-12">
                        <p className="text-zinc-500 font-medium text-sm tracking-wide italic">Apply to jobs to see your analytics</p>
                    </div>
            }

            {/* Restructured Interview Card */}
            <div className="flex shrink-0 items-center justify-center lg:justify-end">
                <div className="group relative">
                    {/* Animated glow background */}
                    <div className="absolute -inset-0.5  rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />

                    <div className="relative flex items-center gap-5 px-6 py-5 rounded-2xl border border-zinc-700 bg-zinc-900/60 shadow-md">

                        <div className="relative">
                            <div className="relative p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 transition-transform duration-200">
                                <Mic className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[11px] uppercase tracking-wide font-semibold text-zinc-500 mb-1">
                                Interviews
                            </span>

                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-white">
                                    {interviewCount}
                                </span>
                                <span className="text-sm font-medium text-zinc-400">
                                    Mocks
                                </span>
                            </div>

                            <span className="text-[12px] text-zinc-500 mt-1">
                                {interviewCount > 1 ? "Interviews" : "Interview"} Completed
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div>
            <div className="w-full flex flex-wrap gap-6">
                {DashCards.map((card, index) => (
                    <div
                        key={index}
                        className="group relative flex-1 w-full md:min-w-[350px] rounded-2xl border border-white/10 
      bg-white/[0.03] backdrop-blur-xl p-5 
      transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-[0_10px_40px_-15px_rgba(99,102,241,0.4)]"
                    >
                        <div className="flex items-start gap-4">

                            {/* Icon */}
                            <div className="h-10 w-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 
        flex items-center justify-center text-indigo-400 
        transition group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
                                {card.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-zinc-200 font-semibold text-lg tracking-tight">
                                    {card.title}
                                </h3>
                                <p className="mt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>



    </motion.div>
}