import JobApplicants from "@/components/applicants/JobApplicants";
import BackGroundGlow from "@/components/BackGroundGlow";
import { auth } from "@/lib/auth";
import { Metadata } from "next"
import { headers } from "next/headers";
import { toast } from "sonner";

export const metadata: Metadata = {

    title: "Applicants | Intern-Magnet",
    description: "Manage and view applicants to this job"

}
interface Params {
    params: Promise<{
        company_name: string,
        job_title: string,
        id: string
    }>
}
export default async function ApplicantsPage({ params }: Params) {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        toast.error("Unauthorized user access denied");
    }
    const email = session?.user?.email;
    const { id } = await params;
    console.log(id);
    return <main className="
        relative min-h-screen flex flex-col overflow-hidden
        px-6 pt-24 pb-12
        sm:px-10 sm:pt-20
        md:px-10 md:pt-20
        lg:px-30
        flex-wrap gap-4
      ">
        <BackGroundGlow />

        <JobApplicants id={id} email={email} />

    </main>
}