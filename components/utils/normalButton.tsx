import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function NormalButton({
    link,
    title,
    variant = "solid",
    type = "button",
    front = true,
    setCount,
    count,
    disabled = false,
    saving
}: {
    link?: string;
    title: string;
    variant?: "solid" | "outline";
    type?: "submit" | "button";
    front?: boolean;
    setCount?: React.Dispatch<React.SetStateAction<number>>;
    count?: number;
    disabled?: boolean;
    saving?: boolean
}) {
    function handleClickFront() {
        if (setCount && count !== undefined) {
            setCount(count + 1);
        }
    }
    function handleClickBack() {
        if (setCount && count !== undefined) {
            setCount(count - 1);
        }
    }
    const classes = clsx(
        "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
        "px-4 py-2 text-sm",
        "sm:px-5 sm:py-2.5 sm:text-sm",
        "md:px-6 md:py-3 md:text-base",
        !disabled && "hover:scale-[1.05] active:scale-[0.97]",
        variant === "solid" &&
        !disabled &&
        "bg-indigo-500 text-amber-50 hover:bg-indigo-600",
        variant === "outline" &&
        !disabled &&
        "border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
        disabled &&
        "opacity-50 cursor-not-allowed bg-indigo-500/50 text-amber-50/50"
    );

    const Icon = front ? ChevronRight : ChevronLeft;

    const content = (
        <>
            {!front && type === "button" && (
                <Icon className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:-translate-x-0.5" />
            )}

            <span className="leading-none font-sans">{title}</span>

            {front && type === "button" && (
                <Icon className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-0.5" />
            )}
        </>
    );

    if (link) {
        return (
            <Link href={link} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button type={type} onClick={front ? handleClickFront : handleClickBack} className={classes} disabled={disabled}>
            {saving ? <> <span>Creating...</span> <Loader2 className="h-4 w-4 animate-spin" /> </> : content}
        </button>
    );
}
