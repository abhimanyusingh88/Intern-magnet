"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface EditableSelectProps {
    label: string;
    name: string;
    value: string;
    options: Option[];
    placeholder?: string;
    onChange: (e: any) => void;
}

export default function EditableSelect({
    label,
    name,
    value,
    options,
    placeholder = "Select...",
    onChange
}: EditableSelectProps) {
    const [isEditing, setIsEditing] = useState(false);
    const selectRef = useRef<HTMLSelectElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-focus when entering edit mode
    useEffect(() => {
        if (isEditing && selectRef.current) {
            selectRef.current.focus();
        }
    }, [isEditing]);

    // Close edit mode when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find(opt => opt.value === value)?.label || value;


    return (
        <div ref={containerRef} className={`flex ${value ? "filled" : ""} flex-col gap-1.5 p-3 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors`}>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">{label}</span>

            {isEditing ? (
                <div className="relative">
                    <select
                        ref={selectRef}
                        name={name}
                        value={value}
                        onChange={(e) => {
                            onChange(e);
                            setIsEditing(false); // Close on selection
                        }}
                        onBlur={() => setIsEditing(false)}
                        className="w-full bg-zinc-800 border-none rounded p-1 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                    >
                        <option value="" disabled hidden>{placeholder}</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex w-full items-center justify-between text-sm text-zinc-400 transition-colors hover:text-white cursor-pointer min-h-[24px]"
                >
                    <span className={value ? "text-zinc-200" : "text-zinc-500"}>
                        {selectedLabel || placeholder}
                    </span>
                    {!value && <Plus size={14} className="text-indigo-400" />}
                </button>
            )}
        </div>
    );
}
