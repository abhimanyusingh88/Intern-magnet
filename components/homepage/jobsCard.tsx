import { UnifiedJob } from "@/lib/types/types";
import JobContent from "./jobContent";
export default function JobCardSmall({ job }: { job: UnifiedJob }) {
    return (
        <div className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 hover:border-zinc-700 hover:bg-zinc-800/60 transition-all duration-300">
            <JobContent job={job} />
        </div>
    );
}