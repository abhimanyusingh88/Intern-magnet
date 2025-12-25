"use client"; // Required for React Query

import { useQuery } from "@tanstack/react-query";
import { fetchProfileData } from "../DataFetching";

// 1. Define the Fetcher Function
// This targets your specific file: app/api/profile/route.ts -> /api/profile


export default function ProfileData() {
    // 2. Use the Hook
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["profileData"], // Unique key for caching
        queryFn: fetchProfileData, // The function above
    });

    // 3. Handle Loading & Error States
    return { data, isLoading, isError, error };
}