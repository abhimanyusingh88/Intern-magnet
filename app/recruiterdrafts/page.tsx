import BackGroundGlow from "@/components/BackGroundGlow";
import DraftJobs from "@/components/DraftJobs/DraftJobs";
import BackButton from "@/components/utils/BackButton";

export default function RecruiterDrafts() {

    return <main className="relative min-h-screen flex flex-col overflow-hidden
    px-6 pt-24 pb-12
    sm:px-10 sm:pt-28
    md:px-20 md:pt-20
    lg:px-36
    flex-wrap gap-4">
        <BackGroundGlow />
        <BackButton />

        <DraftJobs />
    </main>
}