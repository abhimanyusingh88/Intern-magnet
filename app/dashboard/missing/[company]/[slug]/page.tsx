import { Slugify } from "@/components/jobs/slugify";
import { headers } from "next/headers";
import RequiredSkills from "@/components/missingskills/requiredSkills";
import LeftMainHeader from "@/components/missingskills/leftMainHeader";
import { askAI } from "@/lib/groqAI";
import MissingSkills from "@/components/missingskills/mssingSkills";

export default async function MissingSkillsPage({ params }: { params: Promise<{ company: string, slug: string }> }) {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const { company, slug } = await params;
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

    ////////////////// promt dena hai yha se
    const prompt = `
Required Skills: ${JSON.stringify(skills)}
User Skills: ${JSON.stringify(userSkills)}
Find which skills from Required Skills are NOT present in User Skills.
Return STRICT JSON in this format only:
{
  "missingSkills": ["skill1", "skill2", "skill3"],
  "improvementPlan": "A short overall description of what the user should do to gain these skills and please state is saying to user , its must be like "you should do this and that""
}
Do not return anything else.
`;

    let AIDATA = { missingSkills: [], improvementPlan: "" };

    const existingReqRes = await fetch(`${baseUrl}/api/userjobrequirements?user_id=${userRes.id}&job_id=${jobData.id}`, {
        headers: {
            cookie: (await headers()).get("cookie") || "",
        },
    });

    const existingData = await existingReqRes.json();
    const userJobReq = existingData.userJobReq;

    if (!userJobReq) {
        try {
            const AIDATA_RAW = await askAI(prompt);
            const jsonMatch = AIDATA_RAW ? AIDATA_RAW.match(/\{[^]*\}/) : null;
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                AIDATA = {
                    missingSkills: parsed.missingSkills || [],
                    improvementPlan: parsed.improvementPlan || ""
                };

                ////////// post if not already
                await fetch(`${baseUrl}/api/userjobrequirements`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'cookie': (await headers()).get("cookie") || "",
                    },
                    body: JSON.stringify({
                        user_id: userRes.id,
                        job_id: jobData.id,
                        missing_skills: AIDATA.missingSkills,
                        improvement_plan: AIDATA.improvementPlan,
                    }),
                });
            }
        } catch (e: any) {
            console.error("Failed to generate or save AI response:", e);
        }
    } else {
        // 3. Use stored data
        try {
            AIDATA = {
                missingSkills: typeof userJobReq.missing_skills === 'string'
                    ? JSON.parse(userJobReq.missing_skills)
                    : userJobReq.missing_skills,
                improvementPlan: userJobReq.improvement_plan || ""
            };
        } catch (e: any) {
            AIDATA = {
                missingSkills: userJobReq.missing_skills || [],
                improvementPlan: userJobReq.improvement_plan || ""
            };
            throw new Error(e.message);
        }
    }
    // console.log(AIDATA);

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
