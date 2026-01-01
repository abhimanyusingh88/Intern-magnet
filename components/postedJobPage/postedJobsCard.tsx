import { LocateIcon, MapPin, Trash2 } from "lucide-react"
import Link from "next/link";

export default function PostedJobsCard({ job }: { job: any }) {
    return (
        <main className="relative group">
            {/* <BackGroundGlow /> */}

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,1)] hover:border-white/20">

                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-indigo-500/15 to-transparent" />
                <div className="absolute right-1 top-1">
                    <Trash2 size={20} className="text-indigo-500 hover:text-indigo-400 cursor-pointer" />
                </div>

                <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">{job.job_title}</h2>
                        <p className="mt-1 text-sm text-zinc-400">{job.company_name}</p>
                    </div>

                    <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur">{job.employment_type}</span>
                </div>

                <div className="relative z-10 mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div><p className="text-zinc-500"><MapPin size={16} className="inline mr-1" /><span>Location</span></p><p className="text-zinc-200">{job.location}</p></div>
                    <div><p className="text-zinc-500">Experience</p><p className="text-zinc-200">{job.work_experience_min}–{job.work_experience_max} yrs</p></div>
                    <div><p className="text-zinc-500">Salary</p><p className="text-zinc-200">₹{job.salary_per_month_from}–₹{job.salary_per_month_to}</p></div>
                    <div><p className="text-zinc-500">Posted Vacancy</p><p className="text-white font-semibold">{job.number_of_applications} Post</p></div>
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Posted {new Date(job.created_at).toLocaleDateString()}</span>
                    <span className="text-red-600 border border-red-600 p-1 rounded-lg">Deadline:  {job.application_deadline}</span>
                    <Link href={`/postedjobs/manage/${job.id}`} className="font-medium border hover:scale-105 cursor-pointer border-indigo-400 rounded-full p-2 text-white/70 transition  group-hover:text-white">Manage job →</Link>
                </div>

                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(500px_circle_at_50%_-20%,rgba(99,102,241,0.12),transparent_40%)]" />
            </div>
        </main>
    );
}
