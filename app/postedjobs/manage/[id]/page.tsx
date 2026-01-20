
import ManageJobContent from "@/components/manage-job/ManageJobContent";
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

    // We removed server-side prefetching to prevent the loading.tsx spinner from blocking navigation.
    // The client component <ManageJobContent> will now handle fetching, using the cache if available.

    return (
        <ManageJobContent id={id} />
    );
}
