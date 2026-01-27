import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BrowsMore() {
    return (
        <Link
            href="/jobspage"
            className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 p-6 hover:bg-zinc-800/60 transition-all duration-300 overflow-hidden"
        >
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                <ArrowRight className="text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-zinc-400 font-medium group-hover:text-zinc-200">Browse here</span>
        </Link>
    )
}