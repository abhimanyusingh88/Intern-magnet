"use client";

import { useEffect, useRef, useState } from "react";
import { QuestionType, SelectElementProps } from "@/lib/types/types";

const options: { label: string; value: QuestionType }[] = [
    { label: "Yes / No", value: "yes_no" },
    { label: "Text Answer", value: "text" },
];

export function SelectElement({ row, rows, setRows, i }: SelectElementProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const selected = options.find(o => o.value === row.type);

    return (
        <div ref={ref} className="relative sm:w-48 text-white">
            {/* Trigger */}
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
                className="
          w-full p-3 rounded-2xl
          border border-indigo-400
          bg-black
          text-left flex justify-between items-center
          transition-all duration-150
          cursor-pointer
          focus:outline-none focus:scale-[1.02] focus:border-2
        "
            >
                <span>{selected?.label}</span>

                <svg
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M5.5 7.5l4.5 4.5 4.5-4.5" />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <ul
                    role="listbox"
                    className="
            absolute z-50 mt-2 w-full
            rounded-2xl border border-indigo-400
            bg-black
            shadow-[0_0_0_1px_rgba(99,102,241,0.4)]
            overflow-hidden
          "
                >
                    {options.map(opt => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={row.type === opt.value}
                            onClick={() => {
                                const copy = [...rows];
                                copy[i].type = opt.value;
                                setRows(copy);
                                setOpen(false);
                            }}
                            className="
                px-4 py-3 cursor-pointer
                transition-colors
                border-b
                border-b-zinc-800
                hover:bg-neutral-800
               
              "
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
