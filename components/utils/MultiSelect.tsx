"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { X, Search, Check } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export default function MultiSelect({
    options,
    value,
    onChange,
    placeholder = "Select options...",
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const optionMap = useMemo(
        () => Object.fromEntries(options.map((o) => [o.value, o.label])),
        [options]
    );

    const filteredOptions = useMemo(
        () =>
            options.filter((o) =>
                o.label.toLowerCase().includes(search.toLowerCase())
            ),
        [options, search]
    );

    const toggleOption = (v: string) =>
        onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

    const removeOption = (v: string) =>
        onChange(value.filter((x) => x !== v));

    return (
        <div className="relative space-y-2" ref={containerRef}>
            <div
                className="flex flex-wrap gap-2 min-h-[44px] p-2 bg-zinc-900/50 border border-white/10 rounded-xl cursor-pointer hover:border-white/20 transition-all"
                onClick={() => setIsOpen((p) => !p)}
            >
                {value.length ? (
                    value.map((v) => (
                        <span
                            key={v}
                            className="flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-lg border border-indigo-500/30"
                        >
                            {optionMap[v] || v}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(v);
                                }}
                                className="hover:text-indigo-100 transition-colors"
                            >
                                <X size={12} />
                            </button>
                        </span>
                    ))
                ) : (
                    <span className="text-zinc-500 text-sm py-1 px-2">{placeholder}</span>
                )}
            </div>

            {isOpen && (
                <div className="absolute z-1001 w-full mt-1 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-2 border-b border-white/5 flex items-center gap-2 bg-zinc-800/30">
                        <Search size={14} className="text-zinc-500" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm text-zinc-300 w-full py-1"
                            autoFocus
                        />
                    </div>

                    <div className="max-h-[200px] overflow-y-auto textarea-scroll">
                        {filteredOptions.length ? (
                            filteredOptions.map((o) => {
                                const selected = value.includes(o.value);
                                return (
                                    <div
                                        key={o.value}
                                        onClick={() => toggleOption(o.value)}
                                        className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors ${selected
                                            ? "bg-indigo-500/10 text-indigo-400"
                                            : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                                            }`}
                                    >
                                        <span>{o.label}</span>
                                        {selected && <Check size={14} />}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-4 text-center text-xs text-zinc-600">
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
