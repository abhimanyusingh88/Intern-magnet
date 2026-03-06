"use client"

import { Bot, Briefcase, ChartNoAxesCombined, Goal } from "lucide-react";
import Link from "next/link";

const features = [
    { icon: <ChartNoAxesCombined className="text-indigo-500" />, title: "Growth Dashboard", desc: "Track your career progress in real-time." },
    { icon: <Briefcase className="text-indigo-500" />, title: "Find Jobs", desc: "Curated roles matched to your profile." },
    { icon: <Goal className="text-indigo-500" />, title: "Analyze Skills", desc: "Know your gaps. Get a roadmap." },
    { icon: <Bot className="text-indigo-500" />, title: "AI Interview Prep", desc: "Practice with AI. Get instant feedback." },
];

export default function Landing() {

    return (
        <div className="min-h-screen  text-zinc-100 flex flex-col items-center justify-center px-2 mt-4 md:mt-0 ">

            <span className="text-xs text-zinc-400 border border-zinc-600 px-3 py-1 rounded-full mb-8">
                AI-Powered Career Platform
            </span>

            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-center max-w-2xl leading-tight">
                Your career,{" "}
                <span className="text-zinc-500">accelerated.</span>
            </h1>

            <p className="mt-4 text-zinc-500 text-center max-w-md text-base leading-relaxed">
                Everything you need to land your next role — jobs, skills, and AI interview prep in one place.
            </p>

            <Link href="/login?callbackUrl=/dashboard" className="mt-8 px-8 py-3 bg-zinc-100 text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all">
                Login to Access →
            </Link>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all"
                    >
                        <div className="text-xl mb-3">{f.icon}</div>
                        <h3 className="text-sm font-medium text-zinc-100">{f.title}</h3>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}