import { headers } from "next/headers";
import { AlertCircle } from "lucide-react";
import LinkButtons from "./linkButtons";
import { Slugify } from "../jobs/slugify";
import DashboardErrorCompo from "../utils/DashboardErrorCompo";
import PrepareButton from "./PrepareButton";
import AppliedUi from "./appliedUi";


export default async function AppliedJobCard() {

    const baseUrl = process.env.BASE_URL || "http://localhost:3000";



    const h = await headers();

    const appliedData = await fetch(`${baseUrl}/api/appliedjobs`, {
        headers: {
            cookie: h.get("cookie") || "",
        },
    });

    const appliedJobs = await appliedData.json();
    let error = "";
    if (!appliedData.ok) {
        error = appliedJobs.message;
        console.log(appliedData.statusText)
    }
    // console.log(appliedJobs);

    if (appliedJobs.length === 0 && error === "") {
        return <div className="w-full h-full flex items-center justify-center">
            <p className="text-zinc-500/70 font-bold text-xl">No jobs applied</p>
        </div>
    }


    // console.log(appliedJobs);
    return (
        <div className="flex flex-col gap-4 w-full">

            <div className="w-full flex flex-col items-center gap-2">

                <div className="w-full flex justify-start">
                    {
                        error === "" && <h1 className="text-lg sm:text-xl  md:text-xl font-semibold uppercase text-zinc-400 tracking-wide">
                            Applied Jobs
                        </h1>
                    }
                </div>


            </div>

            {Array.isArray(appliedJobs) && appliedJobs.length > 0 ? (
                appliedJobs.map((job: any) => (
                    <div key={job.id} className="w-full flex gap-4 md:flex-row flex-col">
                        <AppliedUi job={job} />

                        <div className="bg-zinc-800/40 justify-center flex flex-col gap-4 w-full flex-3 p-4 rounded-lg md:p-4 md:flex-1">
                            <LinkButtons link={`/dashboard/missing/${Slugify(job.job.company_name)}/${Slugify(job.job.job_title)}-${job.job.id}`} title="Missing Skills" >
                                <AlertCircle className="w-3 h-3 sm:h-4 sm:w-4" />
                            </LinkButtons>
                            <PrepareButton job={{
                                job_title: job.job.job_title,
                                company_name: job.job.company_name,
                                location: job.job.location,
                                job_description: job.job.job_description,
                                skills: job.job.skills,
                                salary_per_month_from: job.job.salary_per_month_from,
                                salary_per_month_to: job.job.salary_per_month_to,
                                good_to_have: job.job.good_to_have,
                                company_description: job.job.company_description,
                                educational_req: job.job.educational_requirements
                            }} />

                        </div>
                    </div>
                ))
            ) : (
                <DashboardErrorCompo error={error} />

            )}


        </div>
    )
}
