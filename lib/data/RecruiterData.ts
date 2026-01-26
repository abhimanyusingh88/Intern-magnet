"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRecruiterProfileData } from "../DataFetching";

export default function RecruiterProfileData() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["recruiterProfileData"],
        queryFn: fetchRecruiterProfileData,
    });

    return { data, isLoading, isError, error };
}
