import { Circle, Trophy } from "lucide-react";

interface RecruitmentProcessTrackerProps {
    steps?: string[];
}

export default function TrackIndicator({ steps = [] }: RecruitmentProcessTrackerProps) {
    const length = steps.length;
    return (
        <div className="relative">
            <ul className="space-y-6">
                {steps.map((step, i) => (
                    <li key={i} className="relative flex gap-4">
                        {/* Indicator column */}
                        <div className="relative flex flex-col items-center">
                            {/* Dot */}
                            <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600">
                                <Circle className="h-3 w-3 text-zinc-300" />
                            </span>

                            {/* Connector */}
                            {i !== length - 1 && (
                                <span className="absolute top-2 left-1/2 h-[calc(100%+24px)] w-[2px] -translate-x-1/2 bg-indigo-600" />
                            )}
                        </div>

                        {/* Text */}
                        <span className="text-sm flex items-center justify-center gap-2 font-medium text-zinc-400 leading-snug">
                            {step} {i === length - 1 && <span><Trophy className="h-4 w-4 text-amber-400" /></span>}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
