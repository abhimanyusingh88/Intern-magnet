import { useQuery } from "@tanstack/react-query";

export function AppliedUsersData(id: string) {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["appliedUsers", id],
        queryFn: async () => {
            const appliedData = await fetch(`/api/appliedusers/${id}`)
            const res = await appliedData.json();
            return res;
        },
        staleTime: 10 * 60 * 1000
    })
    return { data, error, isLoading, isError }
}