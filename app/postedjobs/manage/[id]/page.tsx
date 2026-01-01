import { getManageJobQueryOptions } from "@/lib/data/manageJob";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ManageJobContent from "@/components/manage-job/ManageJobContent";
import { cookies } from "next/headers";

export default async function ManageJobPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const queryClient = new QueryClient();
    const cookieStore = await cookies();

    // Prefetching the data on the server. 
    // We forward the current request's cookies to authenticate the internal fetch.
    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        await queryClient.prefetchQuery(getManageJobQueryOptions(
            id,
            baseUrl,
            cookieStore.toString()
        ));
    } catch (e) {
        // Log the actual error for debugging
        console.error("Server-side prefetch error:", e);
        // Throwing here as per user preference to ensure we know if it's failing
        throw new Error(`Server-side prefetch failed: ${(e as Error).message}`);
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ManageJobContent id={id} />
        </HydrationBoundary>
    );
}
