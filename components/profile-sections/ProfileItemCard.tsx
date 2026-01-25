"use client";

import { LucideIcon } from "lucide-react";
import DeleteOrEdit from "./deleteoredit";

interface ProfileItemCardProps {
    title: string;
    subtitle?: string;
    icon: LucideIcon;
    iconColorClass?: string;
    bgClass?: string;
    metadata?: React.ReactNode;
    onEdit: () => void;
    onDelete: () => void;
    children?: React.ReactNode;
}

export default function ProfileItemCard({
    title,
    subtitle,
    icon: Icon,
    iconColorClass = "bg-indigo-500/10 text-indigo-400",
    bgClass = "bg-linear-to-br from-zinc-900/50 to-zinc-900/20",
    metadata,
    onEdit,
    onDelete,
    children
}: ProfileItemCardProps) {
    return (
        <div className={`group relative h-full rounded-2xl border border-white/15 ${bgClass} p-4 transition-all hover:bg-zinc-900/80 shadow-lg`}>
            <div className="flex flex-col h-full justify-between gap-4">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${iconColorClass} transition-colors`}>
                            <Icon size={20} />
                        </div>
                        <h4 className="font-bold text-zinc-100 tracking-tight line-clamp-1">{title}</h4>
                    </div>

                    <div className="pl-1 space-y-2">
                        {subtitle && <p className="text-sm font-medium text-zinc-400">{subtitle}</p>}
                        {metadata}
                        {children}
                    </div>
                </div>

                <DeleteOrEdit onEdit={onEdit} onDelete={onDelete} />
            </div>
        </div>
    );
}
