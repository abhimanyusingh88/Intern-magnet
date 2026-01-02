"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function useDeleteJob() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await fetch(`/api/deleting/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete job");
            }
            return response.json();
        },
        onSuccess: (_, id) => {
            qc.setQueryData(["postedJobs"], (oldData: any) => {
                if (!oldData) return oldData;
                return oldData.filter((job: any) => job.id !== id);
            });
            qc.invalidateQueries({
                queryKey: ["postedJobs"],
            })
        }
    })
}