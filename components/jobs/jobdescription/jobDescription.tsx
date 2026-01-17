import { JobDetail } from "@/lib/types/types";

export default function JobDescription({ jobData }: { jobData: JobDetail }) {
    return <div className="bg-zinc-950 rounded-2xl mt-2 p-6">
        {/* yha pe description */}
        <div>
            <h1 className="text-zinc-200 text-sm mb-2  sm:text-lg md:text-xl font-semibold">Job description</h1>
            <div className="space-y-2 text-zinc-300  text-justify font-light leading-relaxed text-xs sm:text-sm md:text-base">

                {jobData.job_description
                    ?.split("\n")
                    .filter(Boolean)
                    .map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
            </div>


        </div>
        {/* yha pe skills jo required hai */}
        <div>
            <h1 className="text-zinc-300 text-sm mb-3 mt-4  sm:text-sm md:text-sm font-semibold">Primary Skills required</h1>
            <div className="flex flex-wrap gap-3 text-zinc-300 font-light text-xs md:text-sm">
                {jobData.primary_skills
                    ?.split(",")
                    .map((sk, i) => (
                        <span
                            key={i}
                            className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 
                           text-zinc-300 text-xs font-medium leading-none whitespace-nowrap"
                        >
                            {sk.trim()}
                        </span>
                    ))}
            </div>

        </div>
        {/* yha pe good to have  */}
        <div></div>
    </div>
}