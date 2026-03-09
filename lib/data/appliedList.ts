import { useInfiniteQuery } from "@tanstack/react-query";

export function AppliedUsersList(id: string, status: string) {

    const {
        data,
        error,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({

        queryKey: ["appliedList", id],

        queryFn: async ({ pageParam }) => {

            const res = await fetch(
                `/api/appliedusers/${id}?cursor=${pageParam ?? ""}&status=${status}`
            );

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to fetch applicants");
            }

            return res.json();
        },

        initialPageParam: null,

        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor ?? undefined;
        },

        staleTime: 10 * 60 * 1000
    });

    return {
        data,
        error,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    };
}