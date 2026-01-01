"use client";

type FormInputProps = {
    label: string;
    hint?: string;
    name: string;
    placeholder: string;
    required?: boolean;
    numeric?: boolean;
    value?: string;
    onChange?: (value: string) => void;
};

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
                            if (numeric) {
                                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                onChange(numericValue);
                            } else {
                                onChange(e.target.value);
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
