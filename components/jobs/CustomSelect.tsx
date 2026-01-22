'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value?: string | number;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
}

export default function CustomSelect({
    value,
    onChange,
    options,
    placeholder = 'Select...',
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find(o => o.value === String(value));
    const label = selected?.label || placeholder;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(v => !v)}
                className="w-full flex items-center cursor-pointer justify-between px-3 py-2 text-sm rounded-lg border bg-white dark:bg-zinc-800
                           border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white
                           hover:border-gray-400 dark:hover:border-zinc-600
                           focus:ring-2 focus:ring-blue-500 outline-none"
            >
                <span className={!selected ? 'text-gray-400 dark:text-zinc-500' : ''}>
                    {label}
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto rounded-lg border shadow-lg
                                bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700
                                animate-in fade-in duration-150">
                    {options.map(o => (
                        <button
                            key={o.value}
                            onClick={() => {
                                onChange(o.value);
                                setIsOpen(false);
                            }}
                            className={`w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors
                                ${o.value === String(value)
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-indigo-600 dark:text-indigo-400 font-medium'
                                    : 'hover:bg-gray-50 dark:hover:bg-zinc-700/50 text-gray-700 dark:text-zinc-300'
                                }`}
                        >
                            {o.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
