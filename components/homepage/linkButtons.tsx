import { ExternalLink, Eye } from "lucide-react"
import { Slugify } from "../jobs/slugify"
import Link from "next/link"
import { UnifiedJob } from "@/lib/types/types"
import Image from "next/image"

export default function LinkButtons({ isExternal, job }: { isExternal: boolean, job: UnifiedJob }) {
    return (
        <>
            {isExternal ? (
                <a
                    href={job.apply_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
                >

                    <Image src="/naukri-logo.png" alt="naukri-logo " width={200} height={200} className="h-5 w-5 sm:h-6 sm:w-6 md:w-7 md:h-7 lg:w-7 lg:h-7" />
                    Apply on Naukri
                    <ExternalLink size={14} />

                </a>
            ) : (
                <Link
                    href={`/jobspage/${Slugify(job.company_name)}/${Slugify(job.title)}-${job.original_id}`}
                    className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-indigo-600 text-zinc-300 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
                >
                    View Details
                    <Eye size={14} />
                </Link>
            )}
        </>
    )
}