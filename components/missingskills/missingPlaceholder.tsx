import { Sparkles } from "lucide-react";

export default function MissingSkillsPlaceholder({ missingSkills }: { missingSkills: any }) {

    return (
        <div className="w-full bg-zinc-900/40 rounded-3xl p-8 border border-zinc-800/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center">
            <Sparkles className="text-zinc-600 animate-pulse" size={40} />
            <p className="text-zinc-500 font-medium italic">Analyzing your profile for potential skill gaps...</p>
        </div>
    )

}