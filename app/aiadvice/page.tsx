import AiAdviceLayout from "@/components/AiAdviceLayout";
import BackGroundGlow from "@/components/BackGroundGlow";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Career Advice | Intern-Magnet",
    description: "Personalized career guidance and resume optimization powered by AI.",
};

export default function AIAdvicePage() {
    return (
        <div className="relative min-h-screen w-full">
            <BackGroundGlow />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400">
                        <Sparkles size={14} />
                        Powered by AI
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        <span className="text-zinc-200">AI</span>{" "}
                        <span className="bg-linear-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                            Advice
                        </span>
                    </h1>
                    <p className="max-w-2xl text-zinc-400 text-lg text-balance">
                        Smart, personalized career guidance and resume optimization at your fingertips.
                    </p>
                </div>

                <AiAdviceLayout />
            </div>
        </div>
    )
}