import Image from "next/image";
import MainDetails from "../MainDetails";
import ProfileIndicatorText from "./ProfileIndicatorText";
import ProfileAdditionalDetails from "./ProfileAdditional";

export default function MainProfilePart({ profileFields, completionPercentage, getProgressColor, sessionImage, setImageModal }: { profileFields: any, completionPercentage: number, getProgressColor: (percentage: number) => string, sessionImage: string | null, setImageModal: (open: boolean) => void }) {
    return <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="relative shrink-0 h-28 w-28 group/avatar">
                <svg className="absolute -inset-2 h-32 w-32 -rotate-90 transform" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                    <circle
                        cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="4"
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 - (364.4 * completionPercentage) / 100}
                        className={`${getProgressColor(completionPercentage)} transition-all duration-1000 ease-out`}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="relative h-full w-full rounded-full border border-white/10 bg-zinc-950 p-1 transition-transform group-hover/avatar:scale-95 duration-500">
                    <Image
                        onClick={() => setImageModal(true)}
                        src={sessionImage || "/avatar-placeholder.png"}
                        width={112}
                        height={112}
                        className="h-full cursor-pointer w-full rounded-full object-cover"
                        alt="profile"
                    />
                </div>

                <div className="absolute -bottom-1 -right-1 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded-full shadow-xl">
                    <span className={`text-[10px] font-bold ${getProgressColor(completionPercentage)}`}>{completionPercentage}%</span>
                </div>
            </div>

            <MainDetails currentData={profileFields} />
        </div>

        <ProfileIndicatorText globalCompletionPercentage={completionPercentage} getProgressColor={getProgressColor} />

        <ProfileAdditionalDetails currentData={profileFields} />
    </div>
}