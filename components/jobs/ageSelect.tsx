'use client';

import { JobFilters } from '@/lib/types/types';
import CustomSelect from './CustomSelect';

interface AgeSelectProps {
    filters: JobFilters;
    handleChange: (key: keyof JobFilters, value: any) => void;
}

const AGE_OPTIONS = [
    { value: '', label: 'Any time' },
    { value: '1', label: 'Last 24 hours' },
    { value: '3', label: 'Last 3 days' },
    { value: '7', label: 'Last week' },
    { value: '30', label: 'Last month' },
];

export default function AgeSelect({ filters, handleChange }: AgeSelectProps) {
    return (
        <CustomSelect
            value={filters.jobAge}
            onChange={(value) => handleChange('jobAge', value ? Number(value) : undefined)}
            options={AGE_OPTIONS}
            placeholder="Any time"
        />
    );
}