"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MultiOptionsProps } from "@/lib/types/types";

export default function MultiOptions({
    label,
    name,
    required = false,
    placeholder = "Select options",
    value,
    onChange,
    options,
}: MultiOptionsProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // 🔹 derive selection from form state
    const selected = value
        ? value.split(",").map(v => v.trim()).filter(Boolean)
        : [];

    const toggle = (opt: string) => {
        const next = selected.includes(opt)
            ? selected.filter(v => v !== opt)
            : selected.length < 15 ? [...selected, opt] : selected;

        onChange(next.join(","));
    };

    const remove = (opt: string) => {
        onChange(selected.filter(v => v !== opt).join(","));
    };

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div className="flex flex-col gap-2 relative max-w-md" ref={ref}>
            <p className="font-sans">{label}</p>

            {/* Visible input area */}
            <div
                onClick={() => setOpen(o => !o)}
                className="min-h-[52px] w-full cursor-pointer p-2 flex flex-wrap gap-2 items-start
                    transition-all duration-75 outline-none border border-indigo-400 rounded-2xl
                    not-[]:focus-within:border-r-pink-500 focus-within:border-l-pink-500"

            >
                {selected.length === 0 && (
                    <span className="text-sm text-gray-400 px-2">
                        {placeholder}
                    </span>
                )}

                {selected.map(opt => (
                    <span
                        key={opt}
                        className="px-3 py-1 text-sm text-zinc-300 rounded-full bg-zinc-900 text-indigo-700 flex items-center gap-2"
                    >
                        {opt}
                        <button
                            type="button"
                            onClick={e => {
                                e.stopPropagation();
                                remove(opt);
                            }}
                            className="text-xs hover:text-red-500"
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-20 top-full mt-2 w-full max-h-56 overflow-y-auto
          rounded-2xl border border-indigo-300 bg-zinc-900 shadow-lg">
                    {options.map(opt => (
                        <div
                            key={opt}
                            onClick={() => toggle(opt)}
                            className={`px-4 py-2 cursor-pointer text-sm flex justify-between
              hover:bg-zinc-700 ${selected.includes(opt) ? "bg-zinc-800" : ""}`}
                        >
                            {opt}
                            {selected.includes(opt) && <Check className="w-5 h-5 text-gray-50 border border-zinc-300 rounded p-0.5" />}
                        </div>
                    ))}
                </div>
            )}

            {/* Hidden input for native form submit */}
            <input
                type="hidden"
                name={name}
                value={value}
                required={required && selected.length === 0}
            />
        </div>
    );
}
