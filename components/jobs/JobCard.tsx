import { UnifiedJob } from '@/lib/types/types';
import { BriefcaseBusiness, ChevronRight, Clock4, ExternalLink, IndianRupee, SquareArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTimeAgo, getNormalizedPostDate } from '@/lib/dateCount';
import { Slugify } from './slugify';
// import Slugify from './slugify';


interface JobCardProps {
    job: UnifiedJob;
}

export function JobCard({ job }: JobCardProps) {
    const isExternal = job.source === 'naukri';

    // Calculate dynamic time ago
    const referenceDate = isExternal
        ? getNormalizedPostDate(job.created_at, job.posted_ago)
        : new Date(job.created_at);
    const timeAgo = getTimeAgo(referenceDate);

    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500/50 group">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                {/* Company Logo */}
                <div className="shrink-0">
                    {job.logo_url ? (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800 flex items-center justify-center border border-gray-100 dark:border-zinc-700">
                            <Image
                                src={job.logo_url}
                                alt={job.company_name}
                                width={56}
                                height={56}
                                className="object-contain p-1"
                            />
                        </div>
                    ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {job.company_name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Job Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg text-gray-900 dark:text-zinc-100 mb-0.5 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {job.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-zinc-400 font-medium line-clamp-1">{job.company_name}</p>
                        </div>

                        {/* Source Badge */}
                        {isExternal && (
                            <span className="px-2 py-0.5 rounded-full text-[10px]  sm:text-xs flex flex-col gap-1 font-medium whitespace-nowrap">
                                <Image src="/naukri-logo.png" alt="naukri-logo " width={200} height={200} className="h-5 w-5 sm:h-6 sm:w-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />

                            </span>
                        )}
                    </div>

                    {/* Job Meta Information */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600 dark:text-zinc-500 mb-2">
                        <div className="flex items-center gap-1">
                            <span className="text-gray-400 dark:text-zinc-600">📍</span>
                            <span className="line-clamp-1">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 dark:text-zinc-600"><BriefcaseBusiness className='text-indigo-400 w-[16px] h-[16px]' /></span>
                            <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-gray-400 dark:text-zinc-600"><IndianRupee className='text-green-500 w-[16px] h-[16px]' /></span>
                            <span>{job.salary}</span>
                        </div>
                        {timeAgo && (
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 dark:text-zinc-600"><Clock4 className='w-[16px] h-[16px] text-gray-400' /></span>
                                <span className="whitespace-nowrap">{timeAgo}</span>
                            </div>
                        )}
                    </div>

                    {/* Job Description */}
                    {job.job_description && (
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-400 mb-3">
                            {job.job_description.slice(0, 100)}
                        </p>
                    )}

                    {/* Action Button */}
                    <div className="flex justify-start">
                        {isExternal ? (
                            <a
                                href={job.apply_link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all font-medium text-xs sm:text-sm shadow-sm hover:shadow-md"
                            >
                                Apply On Naukri
                                <ExternalLink className='w-[19px] h-[19px] mb-1' />
                            </a>
                        ) : (
                            <Link
                                href={`/jobspage/${Slugify(job.company_name)}/${Slugify(job.title)}-${job.original_id}`}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all font-medium text-xs sm:text-sm shadow-sm hover:shadow-md"
                            >
                                View Details
                                <ChevronRight className='w-[20px] h-[20px] mb-1' />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
