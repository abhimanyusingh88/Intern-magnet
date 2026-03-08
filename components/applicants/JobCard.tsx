"use client"
import useManageJobData from "@/lib/data/manageJob";
import { formatDate } from "../utils/dateFormatter";
import CardIndicator from "./loadingIndicator";


export default function JobCard({ id }: { id: string }) {
    const { error: jobError, isLoading: jobLoading, data: jobData } = useManageJobData(id);
    return jobLoading ? <CardIndicator /> : <div className="rounded-2xl mt-5 border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-4 sm:p-8 md:p-6 text-zinc-200 w-full sm:w-fit">

        <h2 className="text-xl font-semibold text-white">
            {jobData?.job_title}
        </h2>

        <p className="text-sm text-zinc-400 mt-1">
            {jobData?.company_name}
        </p>

        <div className="flex items-center gap-4 mt-4 text-xs text-zinc-400">
            <span>Posted {formatDate(jobData?.created_at)}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-500"></span>
            <span className="px-2 py-1 rounded-md border border-white/10 text-zinc-300">
                {jobData?.employment_type}
            </span>
        </div>

    </div>
}