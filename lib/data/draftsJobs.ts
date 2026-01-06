"use client"
import { useQuery } from "@tanstack/react-query";
export default function PostedDraftData() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["drafts"],
        queryFn: () => fetch("/api/recruiterDrafts").then(res => res.json()),


    })
    return { data, isLoading, isError, error }
}