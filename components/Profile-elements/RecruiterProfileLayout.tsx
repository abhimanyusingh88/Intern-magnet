"use client"

import { useState } from "react"
import { Pencil, Building2, Globe, Mail, MapPin, Briefcase, User } from "lucide-react"
import { useProfile } from "../providers/ProfileContext"
import DisplayField from "../DisplayField"
import FieldEditModal from "../FieldEditModal"
import { updateRecruiterProfile } from "@/app/actions/recruiter"
import { useQueryClient } from "@tanstack/react-query"
import RecruiterEditForm from "./RecruiterEditForm"
import ErrorIndicator from "./errorIndicator"

export default function RecruiterProfileLayout() {
    const { recruiterFields, setRecruiterFields, recruiterCompletionPercentage, getProgressColor } = useProfile()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [editFormData, setEditFormData] = useState(recruiterFields)
    const [error, setError] = useState("")
    const queryClient = useQueryClient()

    const handleEditOpen = () => {
        setEditFormData(recruiterFields)
        setIsEditModalOpen(true)
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            setError("");
            const formData = new FormData()
            Object.entries(editFormData).forEach(([k, v]) => {
                if (v !== null && v !== undefined) formData.append(k, String(v))
            })

            await updateRecruiterProfile(formData)
            setRecruiterFields(editFormData)
            await queryClient.invalidateQueries({ queryKey: ["recruiterProfileData"] })
            setIsEditModalOpen(false)
        } catch (error: any) {
            try {
                // remove "Error: " part
                const clean = error.message.replace("Error: ", "");

                const issues = JSON.parse(clean);

                if (Array.isArray(issues) && issues.length > 0) {
                    setError(issues[0].message);
                } else {
                    setError("Invalid input");
                }

            } catch {
                setError("Something went wrong");
            }
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <section className="relative rounded-2xl border border-white/10 bg-zinc-900/60 p-4 md:p-6 backdrop-blur-xl group/card">
            <button
                type="button"
                onClick={handleEditOpen}
                className="absolute top-4 right-4 z-20 p-2 rounded-lg border border-white/5 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-white/10 hover:bg-zinc-800 transition-all cursor-pointer"
            >
                <Pencil size={18} />
            </button>

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative shrink-0 h-28 w-28">
                        <svg className="absolute -inset-2 h-32 w-32 -rotate-90 transform" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                            <circle
                                cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="4"
                                strokeDasharray={364.4}
                                strokeDashoffset={364.4 - (364.4 * recruiterCompletionPercentage) / 100}
                                className={`${getProgressColor(recruiterCompletionPercentage)} transition-all duration-1000 ease-out`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="relative h-full w-full rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center">
                            <Building2 size={48} className="text-zinc-500" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded-full shadow-xl">
                            <span className={`text-[10px] font-bold ${getProgressColor(recruiterCompletionPercentage)}`}>{recruiterCompletionPercentage}%</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 pt-2">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-1">
                                {recruiterFields.organisation_name || "Organisation Name"}
                            </h2>
                            <p className="text-zinc-400 flex items-center gap-2">
                                <Briefcase size={16} /> {recruiterFields.company_domain || "Industry Domain"}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                            {recruiterFields.website && (
                                <a href={recruiterFields.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                                    <Globe size={14} /> {recruiterFields.website.replace(/^https?:\/\//, '')}
                                </a>
                            )}
                            {recruiterFields.address && (
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} /> {recruiterFields.address}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                            <User size={16} /> Recruiter Details
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            <DisplayField label="Name" value={recruiterFields.recruiter_name} />
                            <DisplayField label="Designation" value={recruiterFields.designation} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                            <Mail size={16} /> Contact Information
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                            <DisplayField label="Email" value={recruiterFields.email} />
                            <DisplayField label="Phone" value={recruiterFields.contact_number} />
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4 border-t border-white/5 pt-8">
                    <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Hiring for?</h4>
                    <div className="p-4 rounded-xl  bg-white/5 border border-indigo-500/50 text-zinc-300">
                        {recruiterFields.hiring_for || "No hiring information specified yet."}
                    </div>
                </div>
            </div>

            <FieldEditModal
                isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false), setError("") }}
                title="Edit Recruiter Profile"
                onSave={handleSave}
                isSaving={isSaving}
            >
                <ErrorIndicator error={error} />
                <RecruiterEditForm editFormData={editFormData} handleEditChange={handleEditChange} />
            </FieldEditModal>
        </section>
    )
}
