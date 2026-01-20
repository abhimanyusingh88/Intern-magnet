import { BulletList } from "@/components/utils/BulletList";
import { JobDetail } from "@/lib/types/types";
import BoxPoints from "./boxPoints";

export default function JobDescription({ jobData }: { jobData: JobDetail }) {
    return <div className="bg-zinc-900/60 flex flex-col gap-4 rounded-2xl mt-2 p-6">
        {/* yha pe description */}
        <div className="space-y-2">
            <h1 className="text-zinc-200 text-sm   sm:text-lg md:text-xl font-semibold">Job Description</h1>
            <div className="space-y-2 text-zinc-300  text-justify font-light leading-relaxed  text-xs sm:text-sm md:text-[14px]">

                {jobData.job_description
                    ?.split("\n")
                    .filter(Boolean)
                    .map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
            </div>


        </div>

        {/* //////////////////////////////////////// */}

        <div className="space-y-2">
            <h1 className="text-zinc-300 text-sm   sm:text-lg md:text-xl font-semibold">Skills</h1>
            <div className="space-y-2 text-zinc-300  text-justify font-light leading-relaxed  text-xs sm:text-sm md:text-[14px]">
                <BulletList color="bg-zinc-300" text={jobData.skill_description} />
            </div>
        </div>

        {/* ////////////////////////////////// */}

        {/* roles and responsibilities */}
        <div className="space-y-2">
            <h1 className="text-zinc-300 text-sm  sm:text-lg md:text-xl font-semibold">Roles and Responsibilities</h1>
            <div className="space-y-2 text-zinc-300  text-justify font-light leading-relaxed  text-xs sm:text-sm md:text-[14px]">
                <BulletList color="bg-zinc-300" text={jobData.key_responsibilities} />
            </div>
        </div>


        {/* ///////////////////////////////////////// */}
        {/* job type and role */}
        <div className="flex flex-col sm:flex-row  gap-4  ">
            <div className="flex whitespace-nowrap items-center gap-2">
                <h1 className="text-[13px] leading-relaxed sm:text-[14px] md:text-[15px] text-zinc-300 font-semibold">Job type:</h1>
                <p className="text-amber-500 px-2 py-1 text-[12px] sm:text-[13px] md:text-[14px] ">{jobData.employment_type}</p>
            </div>
            <div className="flex whitespace-nowrap items-center gap-2">
                <h1 className="text-[13px] sm:text-[14px] md:text-[15px] text-zinc-300 font-semibold">Job role:</h1>
                {jobData.role ?
                    <p className="text-zinc-300 px-2 py-1 text-[12px] sm:text-[13px] md:text-[14px] ">{jobData.role}</p>
                    : <p className="text-[12px] sm:text-[13px] md:text-[14px] text-zinc-400 italic">not specified</p>
                }
            </div>
        </div>
        {/* //////////////////////////////////////////////////// */}


        <div className="space-y-2">
            <h1 className="text-zinc-300 text-sm  sm:text-lg md:text-xl font-semibold">Educational Requirements</h1>
            <div className="space-y-2  text-justify font-light leading-relaxed  text-[12px] sm:text-[12px] md:text-[13px">
                <BulletList color="bg-zinc-300" text={jobData.educational_requirements} />
            </div>
        </div>
        {/* ////////////////////////////// */}
        {/* yha pe skills jo required hai */}
        <div className="space-y-2" >
            <BoxPoints label="Primary SKills" data={jobData.primary_skills} />
        </div>
        {/* yha pe good to have  */}
        <div className="space-y-2">
            <BoxPoints label="Good to have" data={jobData.good_to_have} />
        </div>
    </div>
}