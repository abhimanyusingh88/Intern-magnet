'use client';

import { JobFilters, JobsResponse } from '@/lib/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseJobsOptions {
    filters?: JobFilters;
    limit?: number;
}

export function useJobs({ filters = {}, limit = 10 }: UseJobsOptions = {}) {
    return useInfiniteQuery<JobsResponse>({
        queryKey: ['jobs', filters],
        queryFn: async ({ pageParam }) => {
            const params = new URLSearchParams();

            // Add pagination
            params.append('limit', limit.toString());
            if (pageParam) {
                params.append('cursor', pageParam as string);
            }

            // Add filters
            if (filters.title) params.append('title', filters.title);
            if (filters.location) params.append('location', filters.location);
            if (filters.skills) params.append('skills', filters.skills);
            if (filters.minSalary) params.append('minSalary', filters.minSalary.toString());
            if (filters.maxSalary) params.append('maxSalary', filters.maxSalary.toString());
            if (filters.minExperience) params.append('minExperience', filters.minExperience.toString());
            if (filters.maxExperience) params.append('maxExperience', filters.maxExperience.toString());
            if (filters.jobAge) params.append('jobAge', filters.jobAge.toString());
            if (filters.source) params.append('source', filters.source);
            if (filters.sortBy) params.append('sortBy', filters.sortBy);

            const response = await fetch(`/api/jobs?${params.toString()}`);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to fetch jobs');
            }

            return response.json();
        },
        staleTime: 5 * 60 * 1000,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: undefined,

    });

}
