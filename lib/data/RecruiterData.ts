import { useQuery } from "@tanstack/react-query";
import { fetchRecruiterProfileData } from "../DataFetching";
import { useSession } from "../auth-client";

export default function RecruiterProfileData() {
    const { data: session } = useSession();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["recruiterProfileData"],
        queryFn: fetchRecruiterProfileData,
        enabled: !!session,
        retry: false,
        staleTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    return { data, isLoading, isError, error };
}
