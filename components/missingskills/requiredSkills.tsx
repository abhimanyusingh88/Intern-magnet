import { Target } from "lucide-react";

export default function RequiredSkills({ skills }: { skills: string[] }) {
    return <div className="md:w-2/3 flex flex-col bg-zinc-900/40 rounded-3xl p-6 md:p-10 border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Target size={120} className="text-zinc-100" />
        </div>

        <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-zinc-200 text-sm md:text-base font-black tracking-widest uppercase italic border-l-4 border-amber-500 pl-4">
                Required Technical Skills
            </h3>
            <span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full uppercase">
                {skills.length} Required
            </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {skills.map((skill: string, index: number) => (
                <div
                    key={index}
                    className="group px-4 py-3 rounded-xl text-zinc-300 border border-zinc-700 hover:border-amber-400 bg-zinc-950/40 hover:bg-zinc-900 transition-all duration-200"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        <span className="text-xs md:text-sm font-semibold italic group-hover:text-amber-400 transition-colors">
                            {skill}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
}