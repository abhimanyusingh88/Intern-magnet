import { JobDetail } from "@/lib/types/types"
import { Briefcase, Clock4, IndianRupee, MapPin } from "lucide-react"
import Image from "next/image"

export default function MainHeaderJob({ jobData }: { jobData: JobDetail }) {
    return (
        <div className="w-full p-6 flex flex-col gap-5 rounded-2xl bg-zinc-900/60 border border-zinc-900 shadow-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    {jobData.company_logo ? (
                        <div className="p-1 rounded-xl border-2 border-zinc-800 bg-zinc-900 shadow-lg shrink-0">
                            <Image
                                quality={100}
                                src={jobData.company_logo}
                                alt="company logo"
                                width={56}
                                height={56}
                                className="rounded-lg object-contain"
                            />
                        </div>
                    ) : (
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-zinc-800 text-zinc-400 border border-zinc-700 font-bold text-xl shrink-0">
                            {jobData.company_name?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="flex flex-col">
                        <h1 className="text-zinc-100 font-bold text-lg sm:text-xl tracking-tight leading-tight">
                            {jobData.job_title}
                        </h1>
                        <p className="text-zinc-500 font-medium text-sm sm:text-base">
                            {jobData.company_name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Job stats */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-900">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm shrink-0">
                    <Briefcase className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-400 font-medium text-xs sm:text-sm">
                        {jobData.work_experience_min}-{jobData.work_experience_max} Years
                    </span>
                </div>

                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm shrink-0">
                    <IndianRupee className="w-4 h-4 text-green-500/70" />
                    <span className="text-zinc-400 font-bold text-xs sm:text-sm">
                        {jobData.salary_per_month_from} - {jobData.salary_per_month_to}
                    </span>
                </div>

                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm shrink-0">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-400 font-medium text-xs sm:text-sm">
                        {jobData.location}
                    </span>
                </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-zinc-900">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm shrink-0">
                    <Clock4 className="w-4 h-4 text-zinc-500" />
                    <span className="text-zinc-400 font-medium text-xs sm:text-sm">
                        {jobData.created_at
                            ? jobData.created_at
                                .toString()
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")
                            : "Recently"}
                    </span>
                </div>

                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm shrink-0">
                    <span className="text-zinc-300 font-thin text-xs sm:text-sm">
                        <span className="text-zinc-500 font-thin">openings:</span>{" "}
                        {jobData.number_of_applications || "1"}
                    </span>
                </div>

                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm shrink-0">
                    <span className="text-zinc-400 font-medium text-xs sm:text-sm">
                        <span className="text-zinc-500 font-thin">Applicants:</span>{" "}
                        0
                    </span>
                </div>

                {jobData.application_deadline && (
                    <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl border border-red-600/50 backdrop-blur-sm shrink-0">
                        <span className="font-medium text-xs text-red-600 sm:text-sm">
                            <span className="text-red-600 font-thin">
                                Apply before:
                            </span>{" "}
                            {jobData.application_deadline}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
