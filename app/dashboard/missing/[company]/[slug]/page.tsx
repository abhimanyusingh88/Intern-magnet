import { Slugify } from "@/components/jobs/slugify";
import { headers } from "next/headers";
import RequiredSkills from "@/components/missingskills/requiredSkills";
import LeftMainHeader from "@/components/missingskills/leftMainHeader";
import { askAI } from "@/lib/groqAI";
import MissingSkills from "@/components/missingskills/mssingSkills";
import { missingPrompt } from "@/components/missingskills/prompt";
import { AlertCircle } from "lucide-react";
import DashboardErrorCompo from "@/components/utils/DashboardErrorCompo";

export default async function MissingSkillsPage({ params }: { params: Promise<{ company: string, slug: string }> }) {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const { company, slug } = await params;
    const role = slug.split("-");
    const jobName = role.slice(0, role.length - 1).join("-");
    const id = role[role.length - 1];

    let error = "";

    const res = await fetch(`${baseUrl}/api/job/${Slugify(company)}/${Slugify(jobName)}-${id}`, {
        headers: {
            cookie: (await headers()).get("cookie") || "",
        },
    });
    const user = await fetch(`${baseUrl}/api/userData`, {
        headers: {
            cookie: (await headers()).get("cookie") || "",
        },
    });

    if (!res.ok) {
        error = "Something went wrong, please try again later";
        console.log(res.statusText);
    }
    if (!user.ok) {
        error = "Something went wrong, please try again later";
        console.log(user.statusText);
    }

    const jobData = await res.json();
    const userRes = await user.json();

    if (!jobData.id) {
        error = "No Jobs found";
    } else if (!userRes.id) {
        error = "login to view the content";
    }

    let AIDATA = { missingSkills: [], improvementPlan: "" };
    const skills = jobData.id && typeof jobData.primary_skills === "string"
        ? jobData.primary_skills.split(",").map((s: string) => s.trim())
        : (jobData.primary_skills || []);

    if (error === "") {
        const userSkills = userRes.skills;

        const prompt = missingPrompt({ skills, userSkills });

        try {
            const existingReqRes = await fetch(`${baseUrl}/api/userjobrequirements?user_id=${userRes.id}&job_id=${jobData.id}`, {
                headers: {
                    cookie: (await headers()).get("cookie") || "",
                },
            });

            if (!existingReqRes.ok) {
                error = "Something went wrong, please try again later";
                console.log(existingReqRes.statusText);
            } else {
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
                        error = "Something went wrong, please try again later";
                        console.error("Failed to generate or save AI response:", e);
                    }
                } else {
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
                    }
                }
            }
        } catch (e: any) {
            error = "Something went wrong, please try again later";
            console.error("Fetch/Data error:", e);
        }
    }

    return (
        <div className="px-0 py-4 md:p-8 min-h-screen text-zinc-100">
            <div className="max-w-6xl mx-auto flex w-full gap-4 flex-col ">

                {
                    error === "" ?
                        <>
                            <div className="w-full flex flex-col lg:flex-row gap-8">
                                <LeftMainHeader jobData={jobData} />

                                {/* Right Side: Required Skills Grid */}
                                <RequiredSkills skills={skills} />
                            </div>
                            <MissingSkills missingSkills={AIDATA} />
                        </>
                        :
                        <DashboardErrorCompo error={error} />


                }

            </div>
        </div>
    );
}
