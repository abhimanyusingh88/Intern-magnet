import { Slugify } from "@/components/jobs/slugify";
import { headers } from "next/headers";
import Image from "next/image";
import { Info, Target } from "lucide-react";
import RequiredSkills from "@/components/missingskills/requiredSkills";
import LeftMainHeader from "@/components/missingskills/leftMainHeader";

export default async function MissingSkillsPage({ params }: { params: Promise<{ company: string, slug: string }> }) {
    const { company, slug } = await params;
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const role = slug.split("-");
    const jobName = role.slice(0, role.length - 1).join("-");
    const id = role[role.length - 1];

    const res = await fetch(`${baseUrl}/api/job/${Slugify(company)}/${Slugify(jobName)}-${id}`, {
        headers: {
            cookie: (await headers()).get("cookie") || "",
        },
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    const jobData = await res.json();
    const skills = typeof jobData.primary_skills === "string"
        ? jobData.primary_skills.split(",").map((s: string) => s.trim())
        : jobData.primary_skills;

    return (
        <div className="p-4 md:p-8 bg-zinc-950 min-h-screen text-zinc-100">
            <div className="max-w-6xl mx-auto flex w-full flex-col gap-8 md:flex-row">

                {/* Left Side: Job Info */}
                <LeftMainHeader jobData={jobData} />

                {/* Right Side: Required Skills Grid */}
                <RequiredSkills skills={skills} />

            </div>
        </div>
    );
}
