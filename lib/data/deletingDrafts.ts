"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useDeleteDraft() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: string | number) => {
            const response = await fetch(`/api/deleting/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete job");
            }
            return response.json();
        },
        onSuccess: (_, id) => {
            qc.setQueryData(["drafts"], (oldData: any) => {
                if (!oldData) return oldData;
                return oldData.filter((job: any) => String(job.id) !== String(id));
            });
            qc.invalidateQueries({
                queryKey: ["drafts"],
            })
        }
    })
}