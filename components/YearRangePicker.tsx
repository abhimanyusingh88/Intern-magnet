import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus } from "lucide-react";

interface YearRangePickerProps {
    namePrefix: string;
    startYear?: string;
    endYear?: string;
    onChange?: (name: string, value: string) => void;
}

function YearSelect({ value, onChange, placeholder, options }: { value: string, onChange: (val: string) => void, placeholder: string, options: number[] }) {
    const [isEditing, setIsEditing] = useState(false);
    const selectRef = useRef<HTMLSelectElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditing && selectRef.current) {
            selectRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="flex-1 min-w-0">
            {isEditing ? (
                <div className="relative">
                    <select
                        ref={selectRef}
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                            setIsEditing(false);
                        }}
                        onBlur={() => setIsEditing(false)}
                        className="w-full bg-zinc-800 border-none rounded p-1 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
                    >
                        <option value="">{placeholder}</option>
                        {options.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex w-full items-center justify-between text-sm text-zinc-400 p-1 rounded hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 hover:border-white/10"
                >
                    <span className={value ? "text-zinc-200" : "text-zinc-500"}>
                        {value || placeholder}
                    </span>
                    {!value && <Plus size={14} className="text-indigo-400 shrink-0 ml-1" />}
                </button>
            )}
        </div>
    );
}

export default function YearRangePicker({
    namePrefix,
    startYear = "",
    endYear = "",
    onChange,
}: YearRangePickerProps) {
    // const currentYear = new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 60 }, (_, i) => currentYear + 10 - i);

    const handleStartChange = (val: string) => {
        if (onChange) onChange(`${namePrefix}_start`, val);
    };

    const handleEndChange = (val: string) => {
        if (onChange) onChange(`${namePrefix}_end`, val);
    };

    return (
        <div className="flex items-center gap-2 w-full p-3 rounded-lg bg-zinc-900/50 border border-white/5">
            <style jsx global>{`
                /* Hide arrows in Chrome/Safari/Edge */
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none; 
                    margin: 0; 
                }
            `}</style>

            <div className="flex flex-col gap-1 flex-1">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">Start Year</span>
                <YearSelect
                    value={startYear}
                    onChange={handleStartChange}
                    placeholder="Select"
                    options={years}
                />
            </div>

            <div className="text-zinc-600 mt-4">-</div>

            <div className="flex flex-col gap-1 flex-1">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">End Year</span>
                <YearSelect
                    value={endYear}
                    onChange={handleEndChange}
                    placeholder="Select"
                    options={years}
                />
            </div>

            {/* Hidden inputs to ensure values are submitted with the form */}
            <input type="hidden" name={`${namePrefix}_start`} value={startYear} />
            <input type="hidden" name={`${namePrefix}_end`} value={endYear} />
        </div>
    );
}
