'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useJobs } from '@/lib/data/useJobs';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFiltersComponent } from '@/components/jobs/JobFilters';
import { JobCardSkeleton } from '@/components/jobs/LoadingComponents';
import { JobFilters } from '@/lib/types/types';
import BackGroundGlow from '@/components/BackGroundGlow';
import EndJobIndicator from './endJobIndicator';
import NoMansLand from './noMansLand';
import ErrorComponent from './errorComponent';
import { selectClasses } from './reusableClasses';
import LoadMoreSection from './loadMoreSection';

export function JobListPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Initialize filters from URL on mount
    const getFiltersFromURL = (): JobFilters => {
        const filters: JobFilters = {};

        if (searchParams.get('title')) filters.title = searchParams.get('title')!;
        if (searchParams.get('location')) filters.location = searchParams.get('location')!;
        if (searchParams.get('skills')) filters.skills = searchParams.get('skills')!;
        if (searchParams.get('minSalary')) filters.minSalary = Number(searchParams.get('minSalary'));
        if (searchParams.get('maxSalary')) filters.maxSalary = Number(searchParams.get('maxSalary'));
        if (searchParams.get('minExperience')) filters.minExperience = Number(searchParams.get('minExperience'));
        if (searchParams.get('maxExperience')) filters.maxExperience = Number(searchParams.get('maxExperience'));
        if (searchParams.get('jobAge')) filters.jobAge = Number(searchParams.get('jobAge'));
        if (searchParams.get('source')) filters.source = searchParams.get('source') as 'naukri' | 'internal';
        if (searchParams.get('sortBy')) filters.sortBy = searchParams.get('sortBy') as 'recent' | 'oldest';

        return filters;
    };

    const [filters, setFilters] = useState<JobFilters>(getFiltersFromURL);
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
    } = useJobs({ filters, limit: 10 });

    // Apply filters by updating URL
    const applyFilters = (newFilters: JobFilters) => {
        const params = new URLSearchParams();

        // Add all filter values to URL
        if (newFilters.title) params.set('title', newFilters.title);
        if (newFilters.location) params.set('location', newFilters.location);
        if (newFilters.skills) params.set('skills', newFilters.skills);
        if (newFilters.minSalary !== undefined) params.set('minSalary', newFilters.minSalary.toString());
        if (newFilters.maxSalary !== undefined) params.set('maxSalary', newFilters.maxSalary.toString());
        if (newFilters.minExperience !== undefined) params.set('minExperience', newFilters.minExperience.toString());
        if (newFilters.maxExperience !== undefined) params.set('maxExperience', newFilters.maxExperience.toString());
        if (newFilters.jobAge !== undefined) params.set('jobAge', newFilters.jobAge.toString());
        if (newFilters.source) params.set('source', newFilters.source);
        if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);

        // Update URL
        const queryString = params.toString();
        router.push(queryString ? `/jobspage?${queryString}` : '/jobspage');

        // Update local state
        setFilters(newFilters);
    };

    // Listen to URL changes (browser back/forward)
    useEffect(() => {
        const urlFilters = getFiltersFromURL();
        setFilters(urlFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const pages = data?.pages ?? [];

    const jobs = pages.flatMap(page => page.data);

    const uniqueJobs: any[] = [];

    for (const job of jobs) {
        if (!uniqueJobs.some(j => j.id === job.id)) {
            uniqueJobs.push(job);
        }
    }

    const allJobs = uniqueJobs;


    useEffect(() => {
        const canFetch = inView && hasNextPage && !isFetchingNextPage;
        if (!canFetch) return;


        if (allJobs.length > 0) {
            fetchNextPage();
        } else if (!isLoading) {
            // debouncing
            const timer = setTimeout(() => {
                fetchNextPage();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, allJobs.length, isLoading]);


    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-500">
            <BackGroundGlow />
            <div className="container mx-auto px-4 py-6 sm:py-10 max-w-7xl">
                {/* Header */}
                <div className="mt-10 sm:mt-8 mb-6 sm:mb-8 text-center lg:text-left">
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
                            appliedFilters={filters}
                            onApplyFilters={applyFilters}
                        />
                    </aside>

                    {/* Jobs List */}
                    <main className="lg:col-span-3">
                        {/* Results Count & Status */}
                        {!isLoading && (
                            <div className="mb-3 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 dark:bg-zinc-900/50 p-3 rounded-xl border border-gray-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
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
                                        onChange={(e) => applyFilters({ ...filters, sortBy: e.target.value as any })}
                                        className={`${selectClasses} cursor-pointer !bg-white dark:!bg-zinc-800 !py-1.5 !px-3 !w-auto min-w-[140px] border-gray-200 dark:border-zinc-800`}
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
                            <NoMansLand setFilters={(f: JobFilters) => applyFilters(f)} />
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
