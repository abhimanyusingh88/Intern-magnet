import RecruiterCard from "@/components/recruiterCard";
import RecruiterHeaderImage from "@/components/RecruiterHeaderImage";

export default function AddPage() {
    return (
        <main
            className="
        relative min-h-screen flex flex-col overflow-hidden
        px-6 pt-24 pb-12
        sm:px-10 sm:pt-28
        md:px-20 md:pt-20
        lg:px-36
      "
        >
            {/* HERO / BANNER */}
            <RecruiterHeaderImage />

            {/* PLACEHOLDER FOR FUTURE COMPONENTS */}
            <section
                className="
          mt-16 grid gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
            >


                {/* Card 1 */}
                <RecruiterCard title="Create Internship Listings" description="Publish roles with detailed requirements and reach thousands of students instantly." />

                {/* Card 2 */}
                <RecruiterCard title="Manage Applicants" description="Review applications, shortlist candidates, and track hiring progress." />

                {/* Card 3 */}
                <RecruiterCard title="Build Your Employer Brand" description="Showcase your company and attract motivated, high-quality talent." />
            </section>
        </main>
    );
}
