"use client"
import { motion } from "framer-motion"
import CustomActiveShapePieChart from "./homepagePieChart";
export default function HomePage({ AppliedJobs }: { AppliedJobs: any }) {
    const totalLength = AppliedJobs.length;
    const pending = AppliedJobs.filter((job: any) => job.status === "pending");
    const rejected = AppliedJobs.filter((job: any) => job.status === "rejected");
    const ShortListed = totalLength - (pending.length + rejected.length);
    const data = [{ name: "shortlisted", value: ShortListed }, { name: "pending", value: pending.length }, { name: "rejected", value: rejected.length }]

    // const shortlisted = AppliedJobs.filter((job: any) => job.status === "shortlisted");
    console.log(AppliedJobs);
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


        <div className="w-full flex flex-col translate-y-[-60px] sm:flex-row  text-zinc-300 font-medium text-[15px] sm:gap-4 items-center ">

            {/* Chart */}
            <div className="min-w-[300px]">
                <CustomActiveShapePieChart data={data} />
            </div>

            {/* Legend colors */}
            <div className="flex items-start translate-y-[-30px] sm:translate-0 justify-center flex-col gap-4 ">
                <div className="flex gap-4 text-zinc-300 font-medium text-[15px] items-center"> <div className="w-[20px] h-[20px] bg-green-500" /> <p>Shortlisted: {ShortListed}</p></div>
                <div className="gap-4 text-zinc-300 font-medium text-[15px] items-center flex"> <div className="w-[20px] h-[20px] bg-amber-500" /><p>Pending: {pending.length}</p></div>
                <div className="gap-4 text-zinc-300 font-medium text-[15px] items-center flex">
                    <div className="w-[20px] h-[20px] bg-red-600" />
                    <p>Rejected: {rejected.length} </p>
                </div>
            </div>

        </div>



    </motion.div>
}