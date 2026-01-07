"use client"
import { useOptimistic, useState, useTransition } from "react";
import PostedDraftData from "@/lib/data/draftsJobs";
import DraftJobsCard from "./DraftJobsCard";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { SpinnerBig } from "../utils/SpinnerBig";
import { Suspense } from "react";
import { SpinnerMini } from "../utils/SpinnerMini";
import useDeleteDraft from "@/lib/data/deletingDrafts";

export default function DraftJobs() {
    const { data, isLoading, isError, error } = PostedDraftData();
    const [openModal, setOpenModal] = useState(false);
    const deleteMutation = useDeleteDraft();
    const [isPending, startTransition] = useTransition();

    const [optimisticDrafts, addOptimisticDraft] = useOptimistic(
        data || [],
        (state: any[], idToDelete: number) => state.filter(job => job.id !== idToDelete)
    );

    const handleDelete = async (id: number) => {
        startTransition(async () => {
            addOptimisticDraft(id);
            try {
                await deleteMutation.mutateAsync(id);
                setOpenModal(false);

            } catch (err) {
                console.error("Failed to delete draft:", err);
            }
        });
    };


    if (isLoading) {
        return <SpinnerBig />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <div>
                    <h3 className="text-lg font-semibold text-white">Something went wrong</h3>
                    <p className="text-sm text-zinc-400">{error?.message || "Failed to load drafts"}</p>
                </div>
            </div>
        );
    }

    if (!optimisticDrafts || optimisticDrafts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 rounded-full bg-zinc-900/50 flex items-center justify-center mb-6">
                    <AlertCircle className="h-10 w-10 text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold text-white">No drafts found</h3>
                <p className="mt-2 text-zinc-400 max-w-sm">
                    You haven't saved any drafts yet. Start posting a job to save progress.
                </p>
            </div>
        );
    }

    return (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {optimisticDrafts.map((item: any, index: number) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Suspense fallback={<SpinnerMini />} key={item.id}>
                        <DraftJobsCard
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            item={item}
                            id={item.id}
                            onDelete={() => handleDelete(item.id)}
                            isDeleting={deleteMutation.isPending && String(deleteMutation.variables) === String(item.id)}
                        />
                    </Suspense>
                </motion.div>
            ))}
        </div>
    );
}

