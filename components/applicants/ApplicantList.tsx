"use client"
import { JobListIndicator } from "./loadingIndicator"
import { toast } from "sonner"
import { Check, X } from "lucide-react"
import { AppliedUsersList } from "@/lib/data/appliedList"
import { useState } from "react"
import DeleteConfirmationModal from "../utils/deleteConfirmationModal"
import { prisma } from "@/lib/prisma"

export default function ApplicantList({ id, email }: { id: string, email: any }) {
    const [open, setOpen] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = AppliedUsersList(id)

    async function handleShortlist() {
        try {
            setSaving(true);
            const res = await fetch(`/api/shortlist/${id}`)
            const result = await res.json();
            if (!res.ok) {
                toast.error(result.message);
            }
            else {
                toast.success(result.message);
            }
            setSaving(false);
            setOpen(false);
        }
        catch (err) {
            setSaving(false);
            setOpen(false);
            toast.error("Something went wrong while updating the status!!")
            throw new Error(err instanceof Error ? err.message : "something went wrong !!")
        }
    }

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

    return (
        <div className="grid gap-4 mt-4">

            {applicants.map((a: any) => {
                const u = a.userId

                return (
                    <div
                        key={a.id}
                        className="group rounded-xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-6 hover:border-white/20 transition"
                    >
                        {/* ... (rest of the card content) */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-linear-to-r from-indigo-500/30 to-pink-500/30 text-white font-semibold">
                                    {u?.name?.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="text-white font-semibold text-lg leading-none">
                                        {u?.name}
                                    </h3>

                                    <p className="text-zinc-400 text-sm mt-1">
                                        {u?.email}
                                    </p>

                                    <p className="text-zinc-500 text-xs mt-1">
                                        {u?.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="flex text-xs sm:text-sm gap-4">
                                <button className="px-4 py-2  cursor-pointer rounded-lg border border-white/10 bg-white/5 text-zinc-200 hover:border-white/20 hover:bg-white/10 transition">
                                    View Profile
                                </button>
                                <button onClick={() => setOpen(true)} className="px-4 py-2  cursor-pointer rounded-lg border border-white/10 bg-green-500/60 text-zinc-200 hover:border-white/20 hover:bg-green-500/40 transition">
                                    <Check className="w-5 h-5" />
                                </button>
                                <button className="px-4 py-2  cursor-pointer rounded-lg border border-white/10 bg-red-500/60 text-zinc-200 hover:border-white/20 hover:bg-red-500/40 transition">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 text-sm">
                            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                <p className="text-zinc-500 text-xs">Degree</p>
                                <p className="text-zinc-200">{u?.degree}</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                <p className="text-zinc-500 text-xs">College</p>
                                <p className="text-zinc-200">{u?.college}</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                <p className="text-zinc-500 text-xs">Course</p>
                                <p className="text-zinc-200">{u?.course}</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                <p className="text-zinc-500 text-xs">Education</p>
                                <p className="text-zinc-200">
                                    {u?.education_duration_start} - {u?.education_duration_end}
                                </p>
                            </div>

                            {u?.college_grade && (
                                <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                                    <p className="text-zinc-500 text-xs">Grade</p>
                                    <p className="text-zinc-200">{u?.college_grade}</p>
                                </div>
                            )}

                            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 col-span-full">
                                <p className="text-zinc-500 text-xs">Address</p>
                                <p className="text-zinc-200">{u?.address}</p>
                            </div>
                        </div>
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

            {
                open && <DeleteConfirmationModal openModal={open} indic="short" setOpenModal={setOpen} title="Confirm this action" para="Are you sure to perform this action?" isDeleting={saving} handleDelete={handleShortlist} savingString="Shortlist" />
            }

        </div>
    )
}