import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function NormalButton({
    anch,
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
    anch?: boolean,
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
        "group inline-flex cursor-pointer whitespace-nowrap items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
        "px-2 py-2 text-sm min-w-[125px] sm:min-w-[150px] md:min-w-[170px] lg:min-w-[180px]",
        "sm:px-5 sm:py-2.5 sm:text-sm",
        "md:px-6 md:py-3 md:text-base",
        !disabled && "hover:scale-[1.05] active:scale-[0.97]",
        variant === "solid" &&
        !disabled &&
        "bg-indigo-500 text-amber-50 hover:bg-indigo-600",
        variant === "outline" &&
        !disabled &&
        "border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
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

    if (link && !anch && !disabled) {
        return (
            <Link href={link} className={classes}>
                {content}
            </Link>
        );
    }
    if (anch) {
        return (
            <a href={`https://${link}`} target="_blank" rel="noopener noreferrer" className={classes}>
                {content}
            </a>
        );
    }

    return (
        <button type={type} onClick={front ? handleClickFront : handleClickBack} className={classes} disabled={disabled}>
            {saving ? <> <span>{title === "Update Job" ? "Updating..." : "Creating..."}</span> <Loader2 className="h-4 w-4 animate-spin" /> </> : content}
        </button>
    );
}
