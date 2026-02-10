import { Slugify } from "@/components/jobs/slugify";
import { headers } from "next/headers";
import RequiredSkills from "@/components/missingskills/requiredSkills";
import LeftMainHeader from "@/components/missingskills/leftMainHeader";
import { askAI } from "@/lib/groqAI";
import MissingSkills from "@/components/missingskills/mssingSkills";

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
    const user = await fetch(`${baseUrl}/api/userData`, {
        headers: {
            cookie: (await headers()).get("cookie") || "",
        },
    });
    const userRes = await user.json();
    // console.log(userRes);
    const userSkills = userRes.skills;

    // console.log(userSkills);
    const skills = typeof jobData.primary_skills === "string"
        ? jobData.primary_skills.split(",").map((s: string) => s.trim())
        : jobData.primary_skills;
    const prompt = `
Required Skills: ${JSON.stringify(skills)}
User Skills: ${JSON.stringify(userSkills)}

Find which skills from Required Skills are NOT present in User Skills.

Return STRICT JSON in this format only:
{
  "missingSkills": ["skill1", "skill2", "skill3"],
  "improvementPlan": "A short overall description of what the user should do to gain these skills"
}
Do not return anything else.
`;

    const AIDATA_RAW = await askAI(prompt);
    let AIDATA = { missingSkills: [], improvementPlan: "" };
    // yha se ai ka json data lena hoga

    try {
        const jsonMatch = AIDATA_RAW ? AIDATA_RAW.match(/\{[\s\S]*\}/) : null;
        if (jsonMatch) {
            AIDATA = JSON.parse(jsonMatch[0]);
        }
    } catch (e: any) {
        console.error("Failed to parse AI response:", e);
        throw new Error("Failed to parse AI response", e.message);
    }


    return (
        <div className="px-0 py-4 md:p-8 min-h-screen text-zinc-100">
            <div className="max-w-6xl mx-auto flex w-full gap-4 flex-col ">

                {/* Left Side: Job Info */}
                <div className="w-full flex flex-col md:flex-row gap-8">
                    <LeftMainHeader jobData={jobData} />

                    {/* Right Side: Required Skills Grid */}
                    <RequiredSkills skills={skills} />
                </div>
                <MissingSkills missingSkills={AIDATA} />

            </div>
        </div>
    );
}
