"use client"
import { JobListIndicator } from "./loadingIndicator"
import { toast } from "sonner"
import { Check, X } from "lucide-react"
import { AppliedUsersList } from "@/lib/data/appliedList"
import { useState } from "react"
import DeleteConfirmationModal from "../utils/deleteConfirmationModal"
import { useQueryClient } from "@tanstack/react-query"
import Noapplicants from "./noApplicants"
import { handleRejection } from "./rejectHandler"
import { handleShortlist } from "./shorlistHandler"

export default function ApplicantList({ id }: { id: string }) {
    const [open, setOpen] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [reject, setReject] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = AppliedUsersList(id, "pending")


    if (isLoading) {
        return <JobListIndicator />
    }

    if (error) {
        toast.error("Failed to load applicants")
        return (
            <p className="text-red-500 text-center text-sm mt-6">
                Failed to load applicants!!
            </p>
        )
    }
    const applicants = data?.pages?.flatMap((page: any) => page.appliedUsers || []) || []

    if (applicants.length === 0) {
        return <Noapplicants />
    }

    return (
        <div className="grid gap-2 mt-2">

            {applicants.map((a: any) => {
                const u = a.userId

                return (
                    <div
                        key={a.id}
                        className="group rounded-xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-3 hover:border-white/20 transition"
                    >
                        {/* ... (rest of the card content) */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-linear-to-r from-indigo-500/30 to-pink-500/30 text-white font-semibold text-sm shrink-0">
                                    {u?.name?.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="text-white font-semibold text-sm leading-none">
                                        {u?.name}
                                    </h3>

                                    <p className="text-zinc-400 text-xs mt-0.5">
                                        {u?.email}
                                    </p>

                                    <p className="text-zinc-500 text-xs mt-0.5">
                                        {u?.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="flex text-xs gap-2">
                                <button className="px-3 py-1 cursor-pointer rounded-lg border border-white/10 bg-white/5 text-zinc-200 hover:border-white/20 hover:bg-white/10 transition">
                                    View Profile
                                </button>
                                {
                                    a.status === "shortlisted" ? <p className="bg-green-500/30 rounded-xl flex items-center px-2 text-xs">Shortlisted</p> : <button onClick={() => setOpen(true)} className="px-3 py-1 cursor-pointer rounded-lg border border-white/10 bg-green-500/60 text-zinc-200 hover:border-white/20 hover:bg-green-500/40 transition">
                                        <Check className="w-4 h-4" />
                                    </button>
                                }
                                <button onClick={() => setReject((f) => !f)} className="px-3 py-1 cursor-pointer rounded-lg border border-white/10 bg-red-500/60 text-zinc-200 hover:border-white/20 hover:bg-red-500/40 transition">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 text-xs">
                            <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                                <p className="text-zinc-500 text-xs">Degree</p>
                                <p className="text-zinc-200">{u?.degree}</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                                <p className="text-zinc-500 text-xs">College</p>
                                <p className="text-zinc-200">{u?.college}</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                                <p className="text-zinc-500 text-xs">Course</p>
                                <p className="text-zinc-200">{u?.course}</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                                <p className="text-zinc-500 text-xs">Education</p>
                                <p className="text-zinc-200">
                                    {u?.education_duration_start} - {u?.education_duration_end}
                                </p>
                            </div>



                            <div className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 col-span-full">
                                <p className="text-zinc-500 text-xs">Address</p>
                                <p className="text-zinc-200">{u?.address}</p>
                            </div>
                        </div>
                        {
                            open && <DeleteConfirmationModal openModal={open} indic="short" setOpenModal={setOpen} title="Confirm this action" para="Are you sure to perform this action?" isDeleting={saving} handleDelete={() => handleShortlist(u?.email, id, setOpen, setSaving, queryClient)} savingString="Shortlist" />
                        }
                        {
                            reject && <DeleteConfirmationModal openModal={reject} indic="reject" setOpenModal={setReject} title="Confirm this action" para="Are you sure to perform this action?" isDeleting={saving} handleDelete={() => handleRejection(u?.email, id, setReject, setSaving, queryClient)} savingString="Reject" />
                        }
                    </div>
                )
            })}

            {hasNextPage && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-200 hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}



        </div>
    )
}