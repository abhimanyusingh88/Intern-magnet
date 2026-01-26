"use client"; // Required for React Query

import { useQuery } from "@tanstack/react-query";
import { fetchProfileData } from "../DataFetching";
import { useSession } from "../auth-client";

// 1. Define the Fetcher Function
// This targets your specific file: app/api/profile/route.ts -> /api/profile


export default function ProfileData() {
    const { data: session } = useSession();

    // 2. Use the Hook
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["profileData"], // Unique key for caching
        queryFn: fetchProfileData, // The function above
        enabled: !!session, // Only fetch if we have a session
        retry: false, // Don't spam 404s if user doesn't exist in legacy table
        staleTime: 1000 * 60 * 30, // Keep for 30 minutes
        refetchOnWindowFocus: false, // Stop spam when switching tabs
        refetchOnReconnect: false,
    });

    // 3. Handle Loading & Error States
    return { data, isLoading, isError, error };
}