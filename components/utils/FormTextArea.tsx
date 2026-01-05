"use client";

type FormTextAreaProps = {
    label: string;
    hint?: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    maxWords?: number;
    value?: string;
    onChange: (val: string) => void;
};

export default function FormTextArea({
    label,
    hint,
    name,
    placeholder,
    required = false,
    maxWords = 4000,
    value,
    onChange,
}: FormTextAreaProps) {

    const safeValue = value || "";
    const words = safeValue.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    const handleChange = (text: string) => {
        const nextWords = text.trim().split(/\s+/).filter(Boolean);

        // Allow typing but clamp overflow
        if (nextWords.length > maxWords) {
            const trimmed = nextWords.slice(0, maxWords).join(" ");
            onChange(trimmed);
            return;
        }

        onChange(text);
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="font-thin">
                {label}
                {hint && <span className="text-zinc-500"> {hint}</span>}
            </p>

            <textarea
                name={name}
                placeholder={placeholder}
                required={required}
                rows={5}
                value={safeValue}
                onChange={(e) => handleChange(e.target.value)}
                className="
                    p-3
                    border border-indigo-400
                    rounded-2xl
                    bg-transparent
                    outline-none
                    resize-none
                    max-h-60
                    overflow-y-auto
                "
            />

            <p
                className={`text-xs text-right ${wordCount >= maxWords
                    ? "text-red-400"
                    : wordCount > maxWords * 0.9
                        ? "text-amber-400"
                        : "text-zinc-500"
                    }`}
            >
            </p>
        </div>
    );
}