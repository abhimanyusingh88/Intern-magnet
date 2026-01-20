import { BulletList } from "@/components/utils/BulletList";
import { JobDetail } from "@/lib/types/types";
import { MapPin } from "lucide-react";

export default function CompanyDescription({ jobData }: { jobData: JobDetail }) {
    return <div className="bg-zinc-900/60 flex flex-col gap-4 rounded-2xl mt-2 p-6">
        <div className="space-y-2">
            <h1 className="text-zinc-200 text-sm   sm:text-lg md:text-xl font-semibold">Company Description</h1>
            <div className="space-y-2 text-zinc-300  text-justify font-light leading-relaxed  text-xs sm:text-sm md:text-[14px]">

                {jobData.company_description
                    ?.split("\n")
                    .filter(Boolean)
                    .map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
            </div>


        </div>
        <div className="space-y-2">
            <h1 className="text-zinc-300 text-sm   sm:text-lg md:text-xl font-semibold">What we offer</h1>
            <div className="space-y-2 text-zinc-300  text-justify font-light leading-relaxed  text-xs sm:text-sm md:text-[14px]">
                <BulletList color="bg-zinc-300" text={jobData.what_we_offer} />
            </div>
        </div>
        <div className="space-y-2">
            <h1 className="text-zinc-200 text-sm   sm:text-lg md:text-xl font-semibold">Why join us?</h1>
            <div className="space-y-2 text-zinc-300  text-justify font-light leading-relaxed  text-xs sm:text-sm md:text-[14px]">

                {jobData.why_join}
            </div>


        </div>
        <div className="space-y-2 flex items-center gap-2 text-wrap">
            <h1 className="text-zinc-200 text-sm   sm:text-lg md:text-xl font-semibold"><span><MapPin className="text-amber-300 w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" /></span></h1>
            <div className="text-zinc-300  text-justify font-light leading-relaxed  text-xs sm:text-sm md:text-[14px]">

                {jobData.location}
            </div>


        </div>

    </div>
}