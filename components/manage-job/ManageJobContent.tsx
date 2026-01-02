"use client"
import useManageJobData from "@/lib/data/manageJob";
import { SpinnerBig } from "@/components/utils/SpinnerBig";
import {
    Calendar,
    GraduationCap,
    Sparkles,
    MessageSquare,
    Clock,
    Users,
    Briefcase,
    Edit
} from "lucide-react";

import { JobHeader } from "@/components/manage-job/JobHeader";
import { ManagementBanner } from "@/components/manage-job/ManagementBanner";
import { StatCard } from "@/components/manage-job/StatCard";
import { Section } from "@/components/manage-job/Section";
import { SidebarFinancials } from "@/components/manage-job/SidebarFinancials";
import BackGroundGlow from "../BackGroundGlow";

export default function ManageJobContent({ id }: { id: string }) {
    const { data: job, isLoading, isError, error } = useManageJobData(id);

    if (isLoading) return <SpinnerBig />;
    if (isError) return <div className="p-10 text-red-500 text-center">Error: {(error as Error).message}</div>;

    if (!job) return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Job Not Found</h1>
        </div>
    );

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30">
            {/* <BackgroundDecoration /> */}
            <BackGroundGlow />

            <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-20">
                <div className="w-full font-sans flex-col gap-2 flex justify-center sm:text-3xl sm:pb-4 text-center mb-8">
                    <p className="bg-linear-to-r font-sans from-indigo-500 via-pink-400 to-indigo-300 text-transparent bg-clip-text font-sans font-bold">Your complete editing area, modify your posting here with ease</p>
                    <p className="text-xs sm:text-lg font-thin font-sans text-zinc-400">MANAGE, REVIEW, EDIT</p>
                </div>
                <div className="w-full flex sm:justify-end justify-center"><span className="text-zinc-500 text-sm font-sans mr-2">Edit Your job</span><Edit className="h-6 w-6 text-indigo-400  cursor-pointer" /></div>

                <JobHeader job={job} />

                <ManagementBanner />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={<Clock className="w-4 h-4" />} label="Posted" value={new Date(job.created_at).toLocaleDateString()} />
                            <StatCard icon={<Calendar className="w-4 h-4 text-red-400" />} label="Deadline" value={job.application_deadline} color="text-red-400" />
                            <StatCard icon={<Briefcase className="w-4 h-4 text-indigo-400" />} label="Experience" value={`${job.work_experience_min}–${job.work_experience_max} yrs`} />
                            <StatCard icon={<Users className="w-4 h-4" />} label="Applicants" value={`${job.number_of_applications || 0} Posts`} />
                        </div>

                        <div className="space-y-6">
                            <Section title="Job Description">
                                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{job.job_description}</p>
                            </Section>

                            {job.key_responsibilities && (
                                <Section title="Key Responsibilities">
                                    <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{job.key_responsibilities}</p>
                                </Section>
                            )}

                            {job.good_to_have && (
                                <Section title="Good to Have">
                                    <div className="flex flex-wrap gap-2">
                                        {job.good_to_have.split(",").map((skill: string) => (
                                            <p
                                                key={skill.trim()}
                                                className="bg-zinc-800 px-3 py-1 rounded-xl text-xs"
                                            >
                                                {skill.trim()}
                                            </p>
                                        ))}
                                    </div>
                                </Section>
                            )}

                            {job.what_we_offer && (
                                <Section title="What We Offer">
                                    <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{job.what_we_offer}</p>
                                </Section>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Section title="Educational Requirements" icon={<GraduationCap className="w-5 h-5 text-indigo-400" />}>
                                    <div className="flex flex-wrap gap-2">
                                        {job.educational_requirements.split(",").map((requirements: string) => (
                                            <p
                                                key={requirements.trim()}
                                                className="bg-zinc-800 px-3 py-1 rounded-xl text-xs"
                                            >
                                                {requirements.trim()}
                                            </p>
                                        ))}
                                    </div>
                                </Section>
                                <Section
                                    title="Primary Skills"
                                    icon={<Sparkles className="w-5 h-5 text-pink-400" />}
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {job.primary_skills.split(",").map((skill: string) => (
                                            <p
                                                key={skill.trim()}
                                                className="bg-zinc-800 px-3 py-1 rounded-xl text-xs"
                                            >
                                                {skill.trim()}
                                            </p>
                                        ))}
                                    </div>
                                </Section>

                            </div>

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
                                                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{q.type} response</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Section>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <SidebarFinancials job={job} />
                    </div>
                </div>
            </div>
        </main>
    );
}
