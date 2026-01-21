import { CheckCircle2 } from "lucide-react"
import ButtonJob from "./buttonJob"
import { JobDetail } from "@/lib/types/types"

export default function AppliedIndicator({ jobData }: { jobData: JobDetail }) {

    return (
        <>
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-linear-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-400 shrink-0 " />

                    <div className="leading-tight">
                        <h3 className="text-emerald-400 font-semibold text-base sm:text-lg">
                            Application Submitted!
                        </h3>
                        <p className="text-emerald-300/80 text-xs sm:text-sm">
                            You have already applied for this position
                        </p>
                    </div>
                </div>
            </div>

            {/* Visit Website Button below success message */}
            <div className="flex justify-center mt-6">
                <ButtonJob title="Visit website" variant="outline" anch={true} link={jobData.website_link} />
            </div>
        </>
    )
}