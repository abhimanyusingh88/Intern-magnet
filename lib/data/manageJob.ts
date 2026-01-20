import { useQuery } from "@tanstack/react-query";

// Exporting the fetcher logic so it can be used on the server for prefetching
export const getManageJobQueryOptions = (id: string, baseUrl?: string, cookieString?: string) => ({
    queryKey: ["manageJob", id],

    queryFn: async () => {
        const headers: Record<string, string> = {};
        // if (cookieString) {
        //     headers.cookie = cookieString;
        // }

        // On server, we need the full URL. On client, we use relative.
        const url = `${baseUrl || ""}/api/recruitermanage/${id}`;

        const res = await fetch(url, {
            headers
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Failed to fetch job: ${res.status}`);
        }
        return res.json();
    },
    staleTime: 5 * 60 * 1000

});

export default function useManageJobData(id: string) {
    return useQuery(getManageJobQueryOptions(id));
}
