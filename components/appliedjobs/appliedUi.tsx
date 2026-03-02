import Image from "next/image";
import { formatDate } from "../utils/dateFormatter";
import { ExternalLink, IndianRupee, MapPin } from "lucide-react";
import Link from "next/link";

export default function AppliedUi({ job }: { job: any }) {
    return <div
        className="flex-3 bg-zinc-800/40 w-full md:w-2/3 rounded-lg p-0 sm:p-2 md:p-4"
    >
        <div className="flex flex-col gap-2 p-4 md:p-2 text-zinc-300">

            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                {/* Company */}
                <div className="flex gap-2 items-center">
                    <Image
                        src={job.job.company_logo}
                        alt="company logo"
                        width={40}
                        height={40}
                        className="rounded-md h-8 w-8 object-cover"
                    />
                    <p className="text-sm sm:text-[15px] font-medium">
                        {job.job.company_name}
                    </p>
                </div>

                {/* Applied + Status */}
                <div className="flex flex-row flex-wrap sm:flex-col gap-2 ">
                    <p className="flex text-[10px] sm:text-xs bg-zinc-700/40 border-zinc-500/40 px-2 py-1 border rounded-md items-center whitespace-nowrap">
                        Applied: {formatDate(job.applied_at)}
                    </p>

                    <p
                        className={`flex sm:text-xs px-2 text-[10px] py-1 rounded-md items-center border whitespace-nowrap
                                            ${job.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/40"
                                : job.status === "shortlisted"
                                    ? "bg-green-500/10 text-green-500 border-green-500/40"
                                    : "bg-zinc-700/40 text-zinc-400 border-zinc-500/40"
                            }`}
                    >
                        Status: {job.status}
                    </p>

                </div>

            </div>

            {/* Job Title */}
            <p className="text-sm sm:text-[15px] font-medium leading-snug">
                {job.job.job_title}
            </p>

            {/* Location */}
            <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-2 items-center">
                    <p className="text-sm sm:text-[15px] flex gap-1 items-center font-medium text-zinc-400">
                        <MapPin className="w-4 h-4 text-red-600" />
                        {job.job.location}
                    </p>
                    <p className="flex gap-1  text-[10px] sm:text-xs bg-zinc-700/40 border-zinc-500/40 px-2 py-1 border rounded-md items-center whitespace-nowrap"><IndianRupee className=" h-3 w-3 translate-y-[-1.1px] sm:w-4 sm:h-4 text-green-600" />{job.job.salary_per_month_from} - {job.job.salary_per_month_to}</p>
                </div>
                <Link
                    href={`/jobspage/${job.job.company_name}/${job.job.job_title}-${job.job.id}`}
                    className="relative  text-xs sm:text-base px-2 py-1 bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 ease-in-out rounded-lg text-zinc-100 font-medium group"
                >

                    <span className="relative flex gap-1 items-center z-10">View <span><ExternalLink className=" h-4 w-4" /></span></span>
                </Link>

            </div>

        </div>


    </div>
}