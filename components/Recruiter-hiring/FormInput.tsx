"use client";

import { validateAndFormatDate } from "../utils/dateValidation";
import { FormInputProps } from "@/lib/types/types";
export default function FormInput({
    label,
    hint,
    name,
    placeholder,
    required = false,
    numeric = false,
    value,
    onChange,
}: FormInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-sans">
                {label}
                {hint && <span className="text-zinc-500"> {hint}</span>}
            </p>

            <input
                className="p-3 focus:border-2.5 transition-all duration-75 ease-in-out transform-gpu outline-none border focus-within:border-r-pink-500 focus-within:border-l-pink-500 border-indigo-400 rounded-2xl w-full"
                type="text"
                name={name}
                placeholder={placeholder}
                required={required}
                inputMode={numeric ? "numeric" : undefined}
                pattern={numeric ? "[0-9]*" : undefined}
                value={value}
                onChange={
                    onChange
                        ? (e) => {
                            let v = e.target.value;
                            if (label === "Application Deadline") {
                                const validatedValue = validateAndFormatDate(v, value);
                                if (validatedValue !== null) {
                                    onChange(validatedValue);
                                }
                                return;
                            }

                            if (numeric) {
                                const numericValue = v.replace(/[^0-9]/g, "");
                                onChange(numericValue);
                            } else {
                                onChange(v);
                            }
                        }
                        : numeric
                            ? (e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                            }
                            : undefined
                }
            />
        </div>
    );
}
