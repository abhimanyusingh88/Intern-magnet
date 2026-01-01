"use client"
import { useQuery } from "@tanstack/react-query";
export default function PostedJobsData() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["postedJobs"],
        queryFn: () => fetch("/api/recruiterhiring").then(res => res.json())
    })
    return { data, isLoading, isError, error }
}