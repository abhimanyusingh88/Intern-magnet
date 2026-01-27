import { BriefcaseBusiness, Clock4, ExternalLink, Eye, IndianRupee, MapPin } from "lucide-react";
import Image from "next/image";
import { UnifiedJob } from "@/lib/types/types";
import LinkButtons from "./linkButtons";

export default function JobContent({ job }: { job: UnifiedJob }) {
    const isExternal = job.source === 'naukri';

    return (
        <>
            <div className="flex items-start gap-4 h-full">
                <div className="shrink-0">
                    {job.logo_url ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-zinc-800 flex items-center justify-center">
                            <Image
                                src={job.logo_url}
                                alt={job.company_name}
                                width={40}
                                height={40}
                                className="object-contain p-1"
                            />
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                            {job.company_name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-zinc-100 font-medium text-sm sm:text-base truncate group-hover:text-indigo-400 transition-colors">
                        {job.title}
                    </h4>
                    <p className="text-zinc-400 text-xs sm:text-sm truncate mt-0.5">
                        {job.company_name}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 mt-4">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    <MapPin size={14} className="text-indigo-500/60" />
                    <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    <BriefcaseBusiness size={14} className="text-indigo-500/60" />
                    <span className="truncate">{job.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    <IndianRupee size={14} className="text-emerald-500/60" />
                    <span className="truncate">{job.salary && job.salary.trim() !== "" ? job.salary : "Not disclosed"}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    <Clock4 size={14} className="text-zinc-500" />
                    <span className="truncate">{job.posted_ago && job.posted_ago.trim() !== "" ? job.posted_ago : "Not disclosed"}</span>
                </div>
            </div>

        </>
    );
}