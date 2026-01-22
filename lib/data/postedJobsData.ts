"use client"
import { useQuery } from "@tanstack/react-query";
export default function PostedJobsData() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["postedJobs"],
        queryFn: () => fetch("/api/recruiterhiring").then(res => res.json()),
        staleTime: 10 * 60 * 1000
    })
    return { data, isLoading, isError, error }
}