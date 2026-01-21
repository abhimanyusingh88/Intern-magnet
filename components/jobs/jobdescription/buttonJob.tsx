"use client";

import Link from "next/link";
import { Loader2, ArrowRight, ExternalLink } from "lucide-react";
import clsx from "clsx";

interface ButtonJobProps {
    title: string;
    link?: string;
    variant?: "solid" | "outline";
    anch?: boolean;
    saving?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function ButtonJob({
    title,
    link,
    variant = "solid",
    anch = false,
    saving = false,
    disabled = false,
    onClick,
    className
}: ButtonJobProps) {

    const baseStyles =
        "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold overflow-hidden whitespace-nowrap transition-all duration-300 transform-gpu";

    const sizeStyles =
        "px-4 py-2 text-sm sm:px-3 sm:py-2 md:px-4 md:py-2";

    const variantStyles = {
        solid: clsx(
            "bg-indigo-600 text-white",
            !disabled &&
            "shadow-[0_0_20px_rgba(79,70,229,0.35)] hover:bg-indigo-500 hover:shadow-[0_0_28px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 active:translate-y-0",
            disabled &&
            "bg-indigo-600/50 text-white/70 shadow-none cursor-not-allowed"
        ),

        outline: clsx(
            "border border-indigo-500/50 text-indigo-400 bg-transparent backdrop-blur-sm",
            !disabled &&
            "hover:border-indigo-500 hover:bg-indigo-500/10 hover:-translate-y-0.5 active:translate-y-0",
            disabled && "border-indigo-500/20 text-indigo-400/50 cursor-not-allowed"
        )
    };

    const content = (
        <>
            {variant === "solid" && !disabled && (
                <div className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shimmer" />
            )}

            <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
                {saving ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                        <span>{title === "Apply" ? "Applying..." : "Loading..."}</span>
                    </>
                ) : (
                    <>
                        <span className="tracking-tight truncate">
                            {title}
                        </span>

                        {!disabled && (
                            anch ? (
                                <ExternalLink className="h-4 w-4 opacity-70 shrink-0 transition-transform group-hover:scale-110" />
                            ) : (
                                <ArrowRight className="h-4 w-4 opacity-70 shrink-0 transition-transform group-hover:translate-x-1" />
                            )
                        )}
                    </>
                )}
            </span>
        </>
    );

    const commonProps = {
        className: clsx(baseStyles, sizeStyles, variantStyles[variant], className),
        onClick: !disabled ? onClick : undefined
    };

    if (link && !disabled) {
        if (anch) {
            return (
                <a
                    href={link.startsWith("http") ? link : `https://${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...commonProps}
                >
                    {content}
                </a>
            );
        }

        return (
            <Link href={link} {...commonProps}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            disabled={disabled || saving}
            {...commonProps}
        >
            {content}
        </button>
    );
}
