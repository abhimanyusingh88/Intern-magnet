import BackGroundGlow from "@/components/BackGroundGlow";
import JobPage from "@/components/jobs/jobdescription/jobpage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
interface Params {
    companyname: string,
    slug: string
}

export default async function JobDetails({ params }: { params: Promise<Params> }) {
    const { companyname, slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return (
        <main className="min-h-screen relative pt-22 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BackGroundGlow />
            <JobPage
                session={session?.user ?? null}
                companyname={companyname ?? ""}
                slug={slug ?? ""}
            />



        </main>
    );
}