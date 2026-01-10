'use client';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useJobs } from '@/lib/data/useJobs';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFiltersComponent } from '@/components/jobs/JobFilters';
import { JobCardSkeleton } from '@/components/jobs/LoadingComponents';
import { JobFilters } from '@/lib/types/types';
import BackGroundGlow from '@/components/BackGroundGlow';
import EndJobIndicator from './endJobIndicator';
import { SpinnerMini } from '../utils/SpinnerMini';
import NoMansLand from './noMansLand';
import ErrorComponent from './errorComponent';
import { selectClasses } from './reusableClasses';
import LoadMoreSection from './loadMoreSection';

export function JobListPage() {
    const [filters, setFilters] = useState<JobFilters>({});
    const [debouncedFilters, setDebouncedFilters] = useState<JobFilters>({});
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useJobs({ filters: debouncedFilters, limit: 10 });

    // Debounce filters change
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);

        return () => clearTimeout(timer);
    }, [filters]);

    const pages = data?.pages ?? [];

    const jobs = pages.flatMap(page => page.data);

    const uniqueJobs: any[] = [];

    for (const job of jobs) {
        if (!uniqueJobs.some(j => j.id === job.id)) {
            uniqueJobs.push(job);
        }
    }

    const allJobs = uniqueJobs;

    // Auto-fetch when scrolling to bottom
    useEffect(() => {
        const canFetch = inView && hasNextPage && !isFetchingNextPage;
        if (!canFetch) return;

        // If we have jobs, fetch immediately when in view
        if (allJobs.length > 0) {
            fetchNextPage();
        } else if (!isLoading) {
            // If we are here, it means we have no jobs but there is a next page
            // This could happen if filters are very restrictive.
            // We'll wait a bit before trying again to avoid hammering the server
            const timer = setTimeout(() => {
                fetchNextPage();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, allJobs.length, isLoading]);

    const totalCount = data?.pages[0]?.count;

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-500">
            <BackGroundGlow />
            <div className="container mx-auto px-4 py-8 sm:py-10 max-w-7xl">
                {/* Header */}
                <div className="mt-8 mb-6 sm:mt-10 sm:mb-8 text-center lg:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-zinc-200 mb-4 tracking-tight">
                        Find Your <span className="bg-linear-to-r from-indigo-400 to-pink-500 text-transparent bg-clip-text">Dream Job</span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0">
                        Explore thousands of opportunities from top companies and Naukri.com, all in one unified view.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Filters Sidebar */}
                    <aside className="lg:col-span-1">
                        <JobFiltersComponent
                            filters={filters}
                            onFilterChange={(f) => {
                                setFilters(f);
                            }}
                        />
                    </aside>

                    {/* Jobs List */}
                    <main className="lg:col-span-3">
                        {/* Results Count & Status */}
                        {!isLoading && (
                            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 dark:bg-zinc-900/50 p-3 rounded-xl border border-gray-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
                                <div className="text-sm text-gray-600 dark:text-zinc-400">
                                    {allJobs.length > 0 ? (
                                        <>
                                            Showing <span className="font-bold text-gray-900 dark:text-zinc-100">{allJobs.length}</span> jobs
                                            {Object.keys(filters).length > 0 && ' matching your filters'}
                                        </>
                                    ) : (
                                        'No jobs found'
                                    )}
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <span className="text-xs font-medium text-gray-500 dark:text-zinc-500 whitespace-nowrap uppercase tracking-wider">Sort:</span>
                                    <select
                                        value={filters.sortBy || 'recent'}
                                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                                        className={`${selectClasses} !bg-white dark:!bg-zinc-900 !py-1.5 !px-3 !w-auto min-w-[140px] border-gray-200 dark:border-zinc-800`}
                                    >
                                        <option value="recent">Recent First</option>
                                        <option value="oldest">Oldest First</option>
                                    </select>

                                    {isFetchingNextPage && (
                                        <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium animate-pulse ml-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                            Updating...
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <JobCardSkeleton key={i} />
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {isError && (
                            <ErrorComponent error={error} />
                        )}

                        {/* Empty State */}
                        {!isLoading && !isError && allJobs.length === 0 && (
                            <NoMansLand setFilters={setFilters} />
                        )}

                        {!isLoading && !isError && allJobs.length > 0 && (
                            <div className="space-y-4">
                                {allJobs.map((job) => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        )}

                        {/* Infinite Scroll Trigger & Load More */}
                        {hasNextPage && !isError && (
                            <LoadMoreSection ref={ref} fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
                        )}

                        {/* End of List */}
                        {!hasNextPage && allJobs.length > 0 && !isError && (
                            <EndJobIndicator />

                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
