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
        staleTime: 1000 * 5, // 5 seconds
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    return { data, isLoading, isError, error };
}
