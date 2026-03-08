import { MessageSquare } from "lucide-react";
import { Section } from "./Section";

export default function ScreeningQusetions({ job }: { job: any }) {
    return <div>
        {job.screening_questions?.length > 0 && (
            <Section title="Screening Questions" icon={<MessageSquare className="w-5 h-5 text-emerald-400" />}>
                <ul className="space-y-4">
                    {job.screening_questions.map((q: any, idx: number) => (
                        <li key={idx} className="group/q flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition">
                            <span className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold border border-indigo-500/30">
                                {idx + 1}
                            </span>
                            <div className="space-y-1">
                                <p className="text-zinc-200">{q.question}</p>
                                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{q.type.split("_").join(" / ")} response</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Section>
        )}
    </div>
}