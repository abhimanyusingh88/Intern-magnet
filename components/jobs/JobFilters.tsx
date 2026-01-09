'use client';

import { useState } from 'react';
import { JobFilters } from '@/lib/types/types';
import { inputClasses, labelClasses, numberInputClasses, selectClasses, subLabelClasses } from './reusableClasses';
import { Filter } from 'lucide-react';
import { InputFilter } from './inputFilter';

interface JobFiltersProps {
    filters: JobFilters;
    onFilterChange: (filters: JobFilters) => void;
}

export function JobFiltersComponent({ filters, onFilterChange }: JobFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Reusable CSS Classes


    const handleChange = (key: keyof JobFilters, value: any) => {
        const newFilters = { ...filters, [key]: value || undefined };
        // Remove undefined values
        Object.keys(newFilters).forEach(k => {
            if (newFilters[k as keyof JobFilters] === undefined) {
                delete newFilters[k as keyof JobFilters];
            }
        });
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        onFilterChange({});
    };

    const activeFilterCount = Object.keys(filters).length;

    return (
        <div className="bg-white dark:bg-zinc-900 lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-200 lg:dark:border-zinc-800 rounded-xl overflow-hidden sticky lg:top-16 h-full lg:h-auto font-sans">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between bg-linear-to-r from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-800/50">
                <div className="flex items-center gap-2">
                    <Filter className='w-[20px] h-[20px] text-blue-600 dark:text-blue-400' />
                    <h3 className="font-semibold text-gray-900 dark:text-zinc-100 uppercase tracking-wider text-xs sm:text-sm">Filter Jobs</h3>
                    {activeFilterCount > 0 && (
                        <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="lg:hidden text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-all"
                >
                    <svg className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Filters Content */}
            <div className={`p-4 space-y-2 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                {/* Title Search */}
                <div>
                    <label className={labelClasses}>Job Title</label>
                    <InputFilter
                        type="text"
                        placeholder="e.g. Software Developer"
                        value={filters.title || ''}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                </div>

                {/* Location */}
                <div>
                    <label className={labelClasses}>Location</label>
                    <InputFilter
                        type="text"
                        placeholder="e.g. Bangalore, Remote"
                        value={filters.location || ''}
                        onChange={(e) => handleChange('location', e.target.value)}
                    />
                </div>

                {/* Skills */}
                <div>
                    <label className={labelClasses}>
                        Skills
                        <span className={subLabelClasses}>(comma-separated)</span>
                    </label>
                    <InputFilter
                        type="text"
                        placeholder="e.g. React, TypeScript, Node.js"
                        value={filters.skills || ''}
                        onChange={(e) => handleChange('skills', e.target.value)}
                    />
                </div>

                {/* Experience Range */}
                <div>
                    <label className={labelClasses}>Experience (years)</label>
                    <div className="grid grid-cols-2 gap-2">
                        <InputFilter
                            type="number"
                            placeholder="Min"
                            min="0"
                            value={filters.minExperience || ''}
                            onChange={(e) => handleChange('minExperience', e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <InputFilter
                            type="number"
                            placeholder="Max"
                            min="0"
                            value={filters.maxExperience || ''}
                            onChange={(e) => handleChange('maxExperience', e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                </div>

                {/* Salary Range */}
                <div>
                    <label className={labelClasses}>
                        Salary (₹/year)
                        <span className={subLabelClasses}>(in lakhs)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <InputFilter
                            type="number"
                            placeholder="Min"
                            min="0"
                            value={filters.minSalary || ''}
                            onChange={(e) => handleChange('minSalary', e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <InputFilter
                            type="number"
                            placeholder="Max"
                            min="0"
                            value={filters.maxSalary || ''}
                            onChange={(e) => handleChange('maxSalary', e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                </div>

                {/* Job Age */}
                <div>
                    <label className={labelClasses}>Posted Within</label>
                    <select
                        value={filters.jobAge || ''}
                        onChange={(e) => handleChange('jobAge', e.target.value ? Number(e.target.value) : undefined)}
                        className={selectClasses}
                    >
                        <option value="">Any time</option>
                        <option value="1">Last 24 hours</option>
                        <option value="3">Last 3 days</option>
                        <option value="7">Last week</option>
                        <option value="30">Last month</option>
                    </select>
                </div>

                {/* Source */}
                <div>
                    <label className={labelClasses}>Job Source</label>
                    <select
                        value={filters.source || ''}
                        onChange={(e) => handleChange('source', e.target.value || undefined)}
                        className={selectClasses}
                    >
                        <option value="">All sources</option>
                        <option value="naukri">Naukri Jobs</option>
                        <option value="internal">Internal Jobs</option>
                    </select>
                </div>

                {/* Reset Button */}
                {activeFilterCount > 0 && (
                    <button
                        onClick={handleReset}
                        className="w-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reset Filters
                    </button>
                )}

            </div>
        </div>
    );
}
