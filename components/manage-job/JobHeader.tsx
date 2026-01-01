"use client"
import { JobDetail } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Briefcase,
    MapPin,
    Users
} from "lucide-react";

export function JobHeader({ job }: { job: JobDetail }) {
    const router = useRouter();

    return (
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
                <button
                    onClick={() => router.back()}
                    className="group cursor-pointer mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Posted Jobs
                </button>

                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                        {job.job_title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-zinc-400 text-sm sm:text-base">
                        <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.company_name}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                            {job.employment_type}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="px-6 py-2.5 cursor-pointer rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition active:scale-95">
                    <Users className="w-5 h-5 text-black inline" /> <span>Applicants</span>
                </button>
            </div>
        </div>
    );
}
