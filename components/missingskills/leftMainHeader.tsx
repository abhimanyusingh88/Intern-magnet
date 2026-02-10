import { Info, Target } from "lucide-react";
import Image from "next/image";

export default function LeftMainHeader({ jobData }: { jobData: any }) {
    return <div className="md:w-1/3 flex flex-col gap-6">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em]">
                <Target size={14} className="text-amber-500" />
                Skill Alignment
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white uppercase italic tracking-tighter">
                Missing Skills
            </h1>
        </div>

        <div className="bg-zinc-900/50 p-5 rounded-2xl border border-zinc-800/60 shadow-lg">
            <div className="flex gap-4 items-center">
                <div className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center p-2 border border-zinc-700">
                    <Image
                        src={jobData.company_logo}
                        alt={`${jobData.company_name} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </div>
                <div className="flex-1">
                    <p className="text-zinc-200 text-sm md:text-base font-bold uppercase tracking-wide truncate">
                        {jobData.company_name}
                    </p>
                    <p className="text-amber-400 text-[11px] md:text-xs font-black uppercase italic tracking-tighter mt-1">
                        {jobData.job_title}
                    </p>
                </div>
            </div>
        </div>

        <div className="p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-xl">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <Info size={12} className="text-zinc-400" />
                Note
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed italic">
                These skills are identified as critical requirements for this role at {jobData.company_name}.
            </p>
        </div>
    </div>
}