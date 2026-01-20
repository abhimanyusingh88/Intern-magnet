import ManageJobContent from "@/components/manage-job/ManageJobContent";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LoginRequiredPage from "@/components/login/LoginReminderPage";

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
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return <LoginRequiredPage />
    }

    const { id } = await params;

    return (
        <ManageJobContent id={id} />
    );
}
