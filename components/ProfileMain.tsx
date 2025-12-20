"use client"

import { useState, useEffect } from "react"
import { Check, Pencil } from "lucide-react"
import Image from "next/image"
import { useProfile } from "./ProfileContext"
import ProfileAdditionalDetails from "./ProfileAdditional"
import MainDetails from "./MainDetails"

export default function ProfileMain({ session }: { session: any }) {
    const { setFields, completionPercentage: globalCompletionPercentage, getProgressColor } = useProfile()
    const [open, setOpen] = useState<string | null>(null)

    // The data that has been "saved" (initially from session)
    const [savedData, setSavedData] = useState({
        college: "",
        course: "",
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        address: "",
        dob: "",
        gender: ""
    })

    // The data currently being typed in the form
    const [profileData, setProfileData] = useState(savedData)

    const sessionImage = session?.user?.image;

    // Derived dirty state: only true if form differs from last saved state
    const isDirty = JSON.stringify(profileData) !== JSON.stringify(savedData)

    // Sync initial/saved data to global context
    useEffect(() => {
        setFields(savedData)
    }, [savedData, setFields])

    // Update global context as user types for real-time progress
    useEffect(() => {
        setFields(profileData)
    }, [profileData, setFields])

    const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.name) {
            setProfileData(prev => ({ ...prev, [target.name]: target.value }))
        }
    }

    return (
        <section className="relative rounded-2xl border border-white/10 bg-zinc-900/60 p-4 sm:p-6 backdrop-blur-xl group/card">
            {/* Edit Icon for the card */}
            <button
                type="button"
                className="absolute top-4 right-4 p-2 rounded-lg border border-white/5 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-white/10 transition-all opacity-0 group-hover/card:opacity-100"
                onClick={() => console.log("Open edit modal")}
            >
                <Pencil size={18} />
            </button>

            <form
                onInput={handleInput}
                action={() => {
                    console.log("Submitting Profile Data to DB:", profileData)
                    // Reset fields by reverting profileData to the last saved state
                    setProfileData(savedData)
                    // TODO: Re-fetch session or update state after actual DB save
                    setOpen(null)
                }}
                className="space-y-6"
            >

                {/* TOP SECTION: PROFILE IMAGE AND PRIMARY INFO */}
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* Profile Image with Progress Ring */}
                    <div className="relative shrink-0 h-28 w-28 group/avatar">
                        {/* Progress Ring SVG */}
                        <svg className="absolute -inset-2 h-32 w-32 -rotate-90 transform" viewBox="0 0 128 128">
                            {/* Background Circle */}
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-white/5"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeDasharray={364.4}
                                strokeDashoffset={364.4 - (364.4 * globalCompletionPercentage) / 100}
                                className={`${getProgressColor(globalCompletionPercentage)} transition-all duration-1000 ease-out`}
                                strokeLinecap="round"
                            />
                        </svg>

                        <div className="relative h-full w-full rounded-full border border-white/10 bg-zinc-950 p-1 transition-transform group-hover/avatar:scale-95 duration-500">
                            <Image
                                src={sessionImage || "/avatar-placeholder.png"}
                                width={112}
                                height={112}
                                className="h-full w-full rounded-full object-cover"
                                alt="profile"
                            />
                        </div>

                        {/* Percentage Badge */}
                        <div className="absolute -bottom-1 -right-1 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded-full shadow-xl">
                            <span className={`text-[10px] font-bold ${getProgressColor(globalCompletionPercentage)}`}>{globalCompletionPercentage}%</span>
                        </div>
                    </div>

                    {/* The main section on profile */}
                    <MainDetails open={open} setOpen={setOpen} savedData={savedData} />

                </div>

                {/* Call to Action Text */}
                {globalCompletionPercentage < 100 && (
                    <div className="mt-4 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-between group/cta">
                        <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full animate-pulse ${getProgressColor(globalCompletionPercentage).replace('text-', 'bg-')}`} />
                            <p className="text-sm font-medium text-zinc-300">
                                Complete your profile to get <span className="text-indigo-400">better opportunities</span>
                            </p>
                        </div>
                        <div className="text-xs text-zinc-500 group-hover/cta:text-indigo-400 transition-colors">
                            {100 - globalCompletionPercentage}% more to go
                        </div>
                    </div>
                )}

                {/* BOTTOM SECTION: ADDITIONAL DETAILS */}
                <ProfileAdditionalDetails open={open} setOpen={setOpen} savedData={savedData} />

                {/* Hidden persistent inputs for all non-open fields so they are included in formData */}
                {Object.entries(profileData).map(([key, val]) => (
                    key !== open && <input key={key} type="hidden" name={key} value={val} />
                ))}

                {/* SAVE BUTTON */}
                {isDirty && (
                    <div className="flex justify-end pt-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all"
                        >
                            <Check size={16} />
                            Save Changes
                        </button>
                    </div>
                )}
            </form>
        </section>
    )
}
