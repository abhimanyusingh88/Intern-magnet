'use client';

import { useState, useEffect } from 'react';
import { JobFilters } from '@/lib/types/types';
import { labelClasses, selectClasses, subLabelClasses } from './reusableClasses';
import { Filter, Check } from 'lucide-react';
import { InputFilter } from './inputFilter';
import { motion, AnimatePresence } from 'framer-motion';
import AgeSelect from './ageSelect';
import CustomSelect from './CustomSelect';

interface JobFiltersProps {
    appliedFilters: JobFilters;
    onApplyFilters: (filters: JobFilters) => void;
}

export function JobFiltersComponent({ appliedFilters, onApplyFilters }: JobFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [pendingFilters, setPendingFilters] = useState<JobFilters>(appliedFilters);


    useEffect(() => {
        setPendingFilters(appliedFilters);
    }, [appliedFilters]);

    const hasChanges = JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);

    // check karke yha pe filter changes ka lenght check karunga

    const allKeys = new Set([
        ...Object.keys(pendingFilters),
        ...Object.keys(appliedFilters),
    ]);

    const changedCount = [...allKeys].filter(key => {
        const k = key as keyof JobFilters;
        return pendingFilters[k] !== appliedFilters[k];
    }).length;


    const handleChange = (key: keyof JobFilters, value: any) => {
        const newFilters = { ...pendingFilters, [key]: (value !== "" && value !== undefined) ? value : undefined };
        Object.keys(newFilters).forEach(k => {
            if (newFilters[k as keyof JobFilters] === undefined) {
                delete newFilters[k as keyof JobFilters];
            }
        });
        setPendingFilters(newFilters);
    };

    const handleApply = () => {
        onApplyFilters(pendingFilters);
    };

    const handleReset = () => {
        setPendingFilters({});
        onApplyFilters({});
    };

    const activeFilterCount = Object.keys(appliedFilters).length;

    return (
        <div className="bg-zinc-900 lg:rounded-xl lg:shadow-sm lg:border lg:border-zinc-800 rounded-xl overflow-hidden lg:overflow-visible sticky lg:top-16 h-full lg:h-auto font-sans">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between rounded-t-xl bg-linear-to-r from-zinc-800 to-zinc-800/50">
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
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isExpanded ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden lg:h-auto!"
            >
                <div className="p-4 space-y-1 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    {/* Title Search */}
                    <div>
                        <label className={labelClasses}>Job Title</label>
                        <InputFilter
                            type="text"
                            placeholder="e.g. Software Developer"
                            value={pendingFilters.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className={labelClasses}>Location</label>
                        <InputFilter
                            type="text"
                            placeholder="e.g. Bangalore, Remote"
                            value={pendingFilters.location || ''}
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
                            value={pendingFilters.skills || ''}
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
                                value={pendingFilters.minExperience ?? ''}
                                onChange={(e) => handleChange('minExperience', e.target.value !== "" ? Number(e.target.value) : undefined)}
                            />
                            <InputFilter
                                type="number"
                                placeholder="Max"
                                min="0"
                                value={pendingFilters.maxExperience ?? ''}
                                onChange={(e) => handleChange('maxExperience', e.target.value !== "" ? Number(e.target.value) : undefined)}
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
                                value={pendingFilters.minSalary ?? ''}
                                onChange={(e) => handleChange('minSalary', e.target.value !== "" ? Number(e.target.value) : undefined)}
                            />
                            <InputFilter
                                type="number"
                                placeholder="Max"
                                min="0"
                                value={pendingFilters.maxSalary ?? ''}
                                onChange={(e) => handleChange('maxSalary', e.target.value !== "" ? Number(e.target.value) : undefined)}
                            />
                        </div>
                    </div>

                    {/* Job Age */}
                    <div>
                        <label className={labelClasses}>Posted Within</label>
                        <AgeSelect filters={pendingFilters} handleChange={handleChange} />
                    </div>

                    {/* Source */}
                    <div>
                        <label className={labelClasses}>Job Source</label>
                        <CustomSelect
                            value={pendingFilters.source}
                            onChange={(value: string) => handleChange('source', value || undefined)}
                            options={[
                                { value: '', label: 'All sources' },
                                { value: 'naukri', label: 'Naukri Jobs' },
                                { value: 'internal', label: 'Internal Jobs' },
                            ]}
                            placeholder="All sources"
                        />
                    </div>

                    {/* Apply Filters Button */}
                    <AnimatePresence>
                        {hasChanges && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}

                                onClick={handleApply}
                                className="w-full mt bg-blue-600 dark:bg-blue-500 cursor-pointer text-white py-2.5 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-[0.98] transition-all font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
                            >
                                <Check className="w-4 h-4" />
                                Apply Filters {changedCount > 0 && `(${changedCount})`}
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Reset Button */}
                    {activeFilterCount > 0 && (
                        <button
                            onClick={handleReset}
                            className="w-full cursor-pointer bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 py-2.5 rounded-lg hover:bg-gray-200 mt dark:hover:bg-zinc-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset Filters
                        </button>
                    )}

                </div>
            </motion.div>
        </div >
    );
}
