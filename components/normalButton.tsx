import Link from "next/link";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export default function NormalButton({
    link,
    title,
    variant = "solid",
}: {
    link: string;
    title: string;
    variant?: "solid" | "outline";
}) {
    return (
        <Link
            href={link}
            className={clsx(
                // base
                "group inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ",

                // responsive padding
                "px-4 py-2 text-sm",
                "sm:px-5 sm:py-2.5 sm:text-sm",
                "md:px-6 md:py-3 md:text-base",

                // interaction
                "hover:scale-[1.05] active:scale-[0.97]",

                // variants
                variant === "solid" &&
                "bg-indigo-500 text-amber-50 hover:bg-indigo-600",
                variant === "outline" &&
                "border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10"
            )}
        >
            <span className="flex items-center gap-1.5 sm:gap-2">
                <span className="leading-none font-sans">
                    {title}
                </span>

                {variant === "solid" && (
                    <ChevronRight
                        className="
              h-4 w-4
              sm:h-4 sm:w-4
              md:h-5 md:w-5
              translate-y-[0.5px]
              transition-transform
              group-hover:translate-x-0.5
            "
                    />
                )}
            </span>
        </Link>
    );
}
