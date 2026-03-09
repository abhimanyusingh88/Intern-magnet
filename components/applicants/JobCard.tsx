"use client"
import useManageJobData from "@/lib/data/manageJob";
import { formatDate } from "../utils/dateFormatter";
import CardIndicator from "./loadingIndicator";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";


export default function JobCard({ id }: { id: string }) {
    const { error: jobError, isLoading: jobLoading, data: jobData } = useManageJobData(id);
    if (jobError) {
        return <p className="text-red-500 bg-zinc-800/50 rounded-xl p-4 font-semibold text-sm">Something went wrong!!</p>
    }
    return jobLoading ? <CardIndicator /> : <div className="rounded-2xl mt-5 sm:mt-0 border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-4   text-zinc-200 w-full sm:w-fit">

        <h2 className="text-xl font-semibold text-white">
            {jobData?.job_title}
        </h2>

        <p className="text-sm text-zinc-400 mt-1">
            {jobData?.company_name}
        </p>

        <div className="flex items-center gap-4 mb-1  text-xs text-zinc-400">
            <span>Posted {formatDate(jobData?.created_at)}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-500"></span>
            <span className="px-2 py-1 rounded-md border border-white/10 text-zinc-300">
                {jobData?.employment_type}
            </span>
        </div>
        <Link href={`/recruiter/applicants/shortlisted/${jobData?.company_name}/${jobData?.job_title}/${id}/`} className=" hover:text-zinc-200 transition-colors duration-150 bg-zinc-800/50 rounded-xl border-[0.8px] border-zinc-700/50 py-1 px-2 text-xs text-zinc-400">
            <span>Shortlisted <span><ArrowRight className="h-4 inline w-4 ml-1" /></span></span>
        </Link>

    </div>
}