"use client"

import { useState } from "react"
import { Check, Pencil } from "lucide-react"
import Image from "next/image"

import EditableRow from "./EditableRows"
import SideEditable from "./SideEditable"

export default function ProfileMain({ session }: { session: any }) {
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
                    {/* Profile Image */}
                    <div className="shrink-0 h-24 w-24 rounded-full border border-white/10 bg-zinc-950 p-1 mx-auto sm:mx-0">
                        <Image
                            src={sessionImage || "/avatar-placeholder.png"}
                            width={96}
                            height={96}
                            className="h-full w-full rounded-full object-cover"
                            alt="profile"
                        />
                    </div>

                    <div className="flex-1 w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <EditableRow
                                label="College"
                                name="college"
                                value={savedData.college}
                                open={open === "college"}
                                onOpen={() => setOpen("college")}
                                onClose={() => setOpen(null)}
                                placeholder="Add college name"
                            />
                            <EditableRow
                                label="Course"
                                name="course"
                                value={savedData.course}
                                open={open === "course"}
                                onOpen={() => setOpen("course")}
                                onClose={() => setOpen(null)}
                                placeholder="Add course name"
                            />
                        </div>

                        <div className="h-px bg-white/5 w-full my-2" />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <EditableRow
                                label="Name"
                                name="name"
                                value={savedData.name}
                                open={open === "name"}
                                onOpen={() => setOpen("name")}
                                onClose={() => setOpen(null)}
                                placeholder="Add your name"
                            />
                            <EditableRow
                                label="Email"
                                name="email"
                                value={savedData.email}
                                open={open === "email"}
                                onOpen={() => setOpen("email")}
                                onClose={() => setOpen(null)}
                                placeholder="Add email"
                            />
                            <EditableRow
                                label="Phone"
                                name="phone"
                                value={savedData.phone}
                                open={open === "phone"}
                                onOpen={() => setOpen("phone")}
                                onClose={() => setOpen(null)}
                                placeholder="Add phone"
                            />
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: ADDITIONAL DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl border border-white/5 bg-zinc-950/30">
                    <SideEditable
                        label="Address"
                        name="address"
                        value={savedData.address}
                        open={open === "address"}
                        onOpen={() => setOpen("address")}
                        onClose={() => setOpen(null)}
                        placeholder="Add address"
                    />
                    <SideEditable
                        label="Date of birth"
                        name="dob"
                        value={savedData.dob}
                        open={open === "dob"}
                        onOpen={() => setOpen("dob")}
                        onClose={() => setOpen(null)}
                        placeholder="Add Birthday"
                    />
                    <SideEditable
                        label="Gender"
                        name="gender"
                        value={savedData.gender}
                        open={open === "gender"}
                        onOpen={() => setOpen("gender")}
                        onClose={() => setOpen(null)}
                        placeholder="Add gender"
                    />
                </div>

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







