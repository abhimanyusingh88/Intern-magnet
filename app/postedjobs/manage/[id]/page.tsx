import { getManageJobQueryOptions } from "@/lib/data/manageJob";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ManageJobContent from "@/components/manage-job/ManageJobContent";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    try {
        const job = await prisma.recruiterHiring.findUnique({
            where: { id: BigInt(id) },
            select: { job_title: true, company_name: true }
        });

        if (!job) return { title: "Job Not Found | Intern-Magnet" };

        return {
            title: `Manage ${job.job_title} at ${job.company_name} | Intern-Magnet`,
            description: `Review applications and management details for the ${job.job_title} position at ${job.company_name}.`
        };
    } catch (e) {
        return { title: "Manage Job | Intern-Magnet" };
    }
}

export default async function ManageJobPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const queryClient = new QueryClient();
    const cookieStore = await cookies();
    // yha pe cookies manually bhejna pad rha kyuki server pe cheeze ho rhi hai , na ki browser me
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
