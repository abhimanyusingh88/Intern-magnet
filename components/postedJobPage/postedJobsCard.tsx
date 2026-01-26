
"use client"
import useDeleteJob from "@/lib/data/deletingJob";
import { ChevronRight, LocateIcon, MapPin, Trash2 } from "lucide-react"
import Link from "next/link";
import { startTransition, useState } from "react";
import DeleteConfirmationModal from "../utils/deleteConfirmationModal";

export default function PostedJobsCard({ job, deleteJob }: { job: any, deleteJob: any }) {
    const { mutateAsync, isPending: isDeleting } = useDeleteJob();
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const handleDelete = async () => {
        try {
            // No need to set isDeleting manually as it's from useDeleteJob
            deleteJob(job.id);
            await mutateAsync(job.id);
            setOpenModalDelete(false);
        } catch (error) {
            console.error(error);
        }
    }

    if (openModalDelete) return <DeleteConfirmationModal
        title="Delete job post?"
        para="This action cannot be undone. The job post will be permanently removed."
        handleDelete={handleDelete}
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        isDeleting={isDeleting}
    />

    return (
        <main className="relative group">
            {/* <BackGroundGlow /> */}

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-4 sm:p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,1)] hover:border-white/20">

                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-indigo-500/15 to-transparent" />
                <div onClick={
                    () => setOpenModalDelete(true)
                }
                    className="absolute right-1 top-1">
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

                <div className="relative z-10 mt-4 text-xs">
                    <span className="block text-zinc-500 mb-2">
                        Posted {new Date(job.created_at).toLocaleDateString()}
                    </span>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex text-red-600 border border-red-600 px-2 py-1 rounded-lg text-[10px] sm:text-xs shrink-0">
                            Deadline: {job.application_deadline}
                        </span>

                        <Link
                            href={`/postedjobs/manage/${job.id}`}
                            className="text-[10px] sm:text-xs font-medium border hover:scale-105 cursor-pointer border-indigo-400 rounded-full hover:bg-zinc-800 py-1.5 px-3 sm:px-4 text-white/70 transition group-hover:text-white inline-flex items-center gap-1"
                        >
                            Manage Your Jobs <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                        </Link>
                    </div>
                </div>


                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(500px_circle_at_50%_-20%,rgba(99,102,241,0.12),transparent_40%)]" />
            </div>
        </main>
    );
}
