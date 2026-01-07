
import { motion } from "framer-motion";
import { Briefcase, Building2, ChevronRight, FileEdit, Trash2, Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "../utils/deleteConfirmationModal";

export default function DraftJobsCard({
    item,
    id,
    onDelete,
    isDeleting,
    openModal,
    setOpenModal
}: {
    item: any;
    id: string;
    onDelete: () => void;
    isDeleting?: boolean;
    openModal?: boolean;
    setOpenModal?: any
}) {
    const router = useRouter();

    const handleComplete = () => {
        const cleanedData: any = {};
        Object.entries(item).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
                if (Array.isArray(value)) {
                    cleanedData[key] = value;
                } else {
                    cleanedData[key] = String(value);
                }
            }
        });

        sessionStorage.setItem("recruiterFormData", JSON.stringify(cleanedData));
        sessionStorage.setItem("recruiterFormCount", "-1");
        router.push("/add/internship");
    };
    if (openModal) return <DeleteConfirmationModal openModal={openModal} setOpenModal={setOpenModal} handleDelete={onDelete} />

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={`group relative w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-xl transition-all hover:border-indigo-500/50 hover:bg-zinc-900/60 ${isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
        >
            <div className="relative flex flex-col gap-4">
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenModal(true);
                    }}
                    className="absolute -top-5 -right-5 p-2 rounded-full bg-zinc-800/50 text-zinc-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 hover:text-red-400 cursor-pointer backdrop-blur-md border border-white/5"
                >
                    {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Trash2 className="h-4 w-4" />
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                        <FileEdit className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 border border-white/5">
                        Draft
                    </span>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Building2 className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.company_name}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {item.job_title}
                    </h3>
                </div>

                <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                        <Briefcase className="h-3.5 w-3.5" />
                        Ready to resume
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                    <button
                        onClick={handleComplete}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-transform active:scale-95 group-hover:bg-indigo-50"
                    >
                        Complete job posting
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

