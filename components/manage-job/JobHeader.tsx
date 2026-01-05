"use client"
import { JobDetail } from "@/lib/types/types";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Briefcase,
    MapPin,
    Users,
    Link
} from "lucide-react";
import Image from "next/image";

export function JobHeader({ job }: { job: JobDetail }) {
    const router = useRouter();

    return (
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
                <div className="w-full flex mt-2 justify-center sm:justify-start">
                    <button
                        onClick={() => router.back()}
                        className="group cursor-pointer mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition"
                    >
                        <ArrowLeft className="w-4 h-4  transition-transform group-hover:-translate-x-1" />
                        Back to Posted Jobs
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
                    {job.company_logo && (
                        <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-2xl p-2.5 shadow-indigo-500/5">
                            <Image
                                src={job.company_logo}
                                alt={`${job.company_name} logo`}
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                            {job.job_title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-zinc-400 text-sm sm:text-base">
                            <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                                <Briefcase className="w-4 h-4 text-indigo-400" /> {job.company_name}
                            </span>
                            {job.website_link && (
                                <a
                                    href={job.website_link.startsWith("http")
                                        ? job.website_link
                                        : `https://${job.website_link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors break-all"
                                >
                                    <Link className="w-4 h-4" />
                                    {job.website_link}
                                </a>
                            )}

                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-zinc-500" /> {job.location}</span>
                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                                {job.employment_type}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="px-4 py-2.5 cursor-pointer rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition active:scale-95">
                    <Users className="w-5 h-5 text-black inline" /> <span className="text-zinc-700">Applicants</span>
                </button>
            </div>
        </div>
    );
}
