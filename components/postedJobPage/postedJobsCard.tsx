
"use client"
import useDeleteJob from "@/lib/data/deletingJob";
import { ChevronRight, MapPin, Trash2 } from "lucide-react"
import Link from "next/link";
import { useState, useTransition } from "react";
import DeleteConfirmationModal from "../utils/deleteConfirmationModal";
import { toast } from "sonner";

export default function PostedJobsCard({ job, deleteJob }: { job: any, deleteJob: any }) {
    const { mutateAsync, isPending: isDeleting, error } = useDeleteJob();
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        startTransition(async () => {
            try {
                deleteJob(job.id);
                const res = await mutateAsync(job.id);
                setOpenModalDelete(false);
                toast.success("Job deleted successfully");

            } catch (error) {
                setOpenModalDelete(false);
                toast.error("Failed to delete job");

            }
        });
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

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,1)] hover:border-white/20">

                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-indigo-500/15 to-transparent" />
                <div onClick={() => setOpenModalDelete(true)} className="absolute right-1.5 top-1.5 z-20">
                    <Trash2 size={15} className="text-indigo-500 hover:text-indigo-400 cursor-pointer" />
                </div>

                {/* Header: title + badge */}
                <div className="relative z-10 flex items-start justify-between gap-2 pr-5">
                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold tracking-tight text-white leading-none truncate">{job.job_title}</h2>
                        <p className="mt-0.5 text-xs text-zinc-400 truncate">{job.company_name}</p>
                    </div>
                    <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300 backdrop-blur shrink-0 whitespace-nowrap">{job.employment_type}</span>
                </div>

                {/* Stats row — flex-wrap so they never squash */}
                <div className="relative z-10 mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                    <div className="min-w-[80px]">
                        <p className="text-zinc-500 flex items-center gap-0.5"><MapPin size={10} className="shrink-0" />Location</p>
                        <p className="text-zinc-200 truncate">{job.location}</p>
                    </div>
                    <div className="min-w-[80px]">
                        <p className="text-zinc-500">Experience</p>
                        <p className="text-zinc-200">{job.work_experience_min}–{job.work_experience_max} yrs</p>
                    </div>
                    <div className="min-w-[80px]">
                        <p className="text-zinc-500">Salary</p>
                        <p className="text-zinc-200">₹{job.salary_per_month_from}–₹{job.salary_per_month_to}</p>
                    </div>
                    <div className="min-w-[60px]">
                        <p className="text-zinc-500">Vacancy</p>
                        <p className="text-white font-semibold">{job.number_of_applications} Post</p>
                    </div>
                </div>

                {/* Footer: posted date + manage link */}
                <div className="relative z-10 mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-zinc-300">
                        <span className="bg-zinc-800 rounded-xl py-1 px-2">Posted: {new Date(job.created_at).toLocaleDateString()}</span>
                        <span className="mx-1">·</span>
                        <span className="text-red-500">Deadline: {job.application_deadline}</span>
                    </span>
                    <Link
                        href={`/postedjobs/manage/${job.id}`}
                        className="font-medium border hover:scale-105 cursor-pointer border-indigo-400 rounded-full hover:bg-zinc-800 py-1 px-3 text-white/70 transition group-hover:text-white inline-flex items-center gap-0.5 whitespace-nowrap"
                    >
                        Manage <ChevronRight size={11} />
                    </Link>
                </div>



            </div>
        </main>
    );
}
