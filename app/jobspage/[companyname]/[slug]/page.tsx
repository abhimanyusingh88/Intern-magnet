import BackGroundGlow from "@/components/BackGroundGlow";
import JobPage from "@/components/jobs/jobdescription/jobpage";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
interface Params {
    companyname: string,
    slug: string
}

export default async function JobDetails({ params }: { params: Promise<Params> }) {
    const { companyname, slug } = await params;
    const jobId = slug.split("-")[slug.split("-").length - 1];
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const numApplied = await prisma.applied.count({
        where: {
            job_id: BigInt(jobId)
        }
    });


    return (
        <main className="min-h-screen relative pt-22 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BackGroundGlow />
            <JobPage
                numApplied={numApplied}
                session={session?.user ?? null}
                companyname={companyname ?? ""}
                slug={slug ?? ""}
            />



        </main>
    );
}