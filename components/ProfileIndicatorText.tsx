export default function ProfileIndicatorText({ globalCompletionPercentage, getProgressColor }: { globalCompletionPercentage: number, getProgressColor: (percentage: number) => string }) {
    return (
        {
            globalCompletionPercentage< 100 && (
                <div className="mt-4 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-between group/cta">
                    <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full animate-pulse ${getProgressColor(globalCompletionPercentage).replace('text-', 'bg-')}`} />
                        <p className="text-sm font-medium text-zinc-300">
                            Complete your profile to get <span className="text-indigo-400">better opportunities</span>
                        </p>
                    </div>
                    <div className="text-xs text-zinc-500 group-hover/cta:text-indigo-400 transition-colors">
                        {100 - globalCompletionPercentage}% more to go
                    </div>
                </div>
            )
        }
    )
}