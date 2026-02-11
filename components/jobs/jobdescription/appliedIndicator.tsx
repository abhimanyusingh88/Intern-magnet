import { ArrowRight, CheckCircle2, Search } from "lucide-react"
import ButtonJob from "./buttonJob"
import { JobDetail } from "@/lib/types/types"
import Link from "next/link"

export default function AppliedIndicator({ jobData }: { jobData: JobDetail }) {

    return (
        <>
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-linear-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle2 className="h-7 w-7 sm:h-8 animate-pulse sm:w-8 text-emerald-400 shrink-0 " />

                    <div className="leading-tight">
                        <h3 className="text-emerald-400 font-semibold text-base sm:text-lg">
                            Application Submitted!
                        </h3>
                        <p className="text-emerald-300/80 text-xs sm:text-sm">
                            You have already applied for this position
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-4 flex items-center bg-indigo-700/15 hover:border-indigo-400 justify-center border-[0.08px] border-indigo-500 mt-2 transition-all duration-150 ease-in-out transform-gpu rounded-xl">
                <Link
                    href="/appliedjobs"
                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-all duration-150 ease-in-out text-xs md:text-sm cursor-pointer"
                >
                    <span className="flex items-center ">

                        TRACK APPLICATION
                        <ArrowRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>
            <div className="p-4 flex items-center hover:border-indigo-400 bg-indigo-700/15 hover:text-indigo-400 justify-center border-[0.08px] border-indigo-500 mt-2 transition-all duration-150 ease-in-out transform-gpu rounded-xl">
                <Link
                    href={`/jobspage?title=${jobData.job_title}&skills=${jobData.primary_skills
                        .split(",")
                        .slice(0, 5)
                        .join("+")}`}


                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-all duration-150 ease-in-out text-xs md:text-sm cursor-pointer"
                >
                    <span className="flex items-center gap-2">
                        <Search className="h-6 w-6" />
                        EXPLORE SIMILAR JOBS
                        <ArrowRight className="h-5 w-5" />
                    </span>
                </Link>
            </div>


            {/* Visit Website Button below success message */}
            {jobData.website_link !== "" && jobData.website_link !== null &&
                <div className="flex justify-center mt-6">
                    <ButtonJob title="Visit website" variant="outline" anch={true} link={jobData.website_link} />
                </div>
            }
        </>
    )
}