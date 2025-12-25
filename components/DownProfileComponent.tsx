"use client"

import { Plus } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import LanguageRow from "./LanguageRow"
import Card from "./ProfileCard"
import EducationBlock from "./EducationBlockProfile"
import Field from "./FieldProfileForm"
import { Divider, TwoCol } from "./DividersProfile"
import YearRangePicker from "./YearRangePicker"
import { updateProfile } from "@/app/actions/profile"
import EditableField from "./EditableField"
import SideNav from "./SideNav"

import { getInitialDownProfileData } from "@/lib/profile-helpers"
import { UserProfileData } from "@/lib/types/types"
import { joiningDurationData } from "./JoiningDurationData"
import ProfileData from "@/lib/data/UserData"
import { SpinnerBig } from "./SpinnerBig"
import { INDIAN_CITIES } from "@/lib/Cities"
// import { JoiningDurationData } from "./JoiningDurationData"

export default function DownProfileComponent() {
    const { data: userData, isLoading } = ProfileData();
    const [formData, setFormData] = useState<Record<string, string> | null>(null);
    const [lastSavedData, setLastSavedData] = useState<Record<string, string> | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Update form data when userData becomes available
    useEffect(() => {
        if (userData) {
            const initial = getInitialDownProfileData(userData);
            setFormData(initial);
            setLastSavedData(initial);
        }
    }, [userData]);



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | string, value?: string) => {
        if (typeof e === 'string') {
            setFormData(prev => ({ ...prev!, [e]: value || "" }))
        } else {
            const { name, value: val } = e.target
            setFormData(prev => ({ ...prev!, [name]: val }))
        }
    }

    if (isLoading || !formData) {
        return (

            <SpinnerBig />

        )
    }

    const displayedData = formData; // Alias for compatibility with existing JSX
    const isDirty = !!lastSavedData && JSON.stringify(formData) !== JSON.stringify(lastSavedData);

    return (
        <form
            className="mx-auto max-w-7xl px-4 py-8 md:px-0"
            onSubmit={async (e) => {
                e.preventDefault();
                if (!formData) return;

                try {
                    setIsSaving(true);
                    await updateProfile(new FormData(e.currentTarget));
                    setLastSavedData(formData);
                } finally {
                    setIsSaving(false);
                }
            }}
        >
            {/* Hidden inputs to ensure all data is sent on submit */}
            {Object.entries(displayedData).map(([key, val]) => (
                <input key={key} type="hidden" name={key} value={val} />
            ))}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">

                <SideNav />

                {/* ================= RIGHT CONTENT ================= */}
                <section className="space-y-8 pb-20">

                    {/* ================= CAREER PREFERENCES ================= */}
                    <Card id="section-preference" title="Your career preferences">
                        <TwoCol>
                            <EditableField
                                label="Preferred job type"
                                name="preferred_job_type"
                                value={displayedData.preferred_job_type || ""}
                                onSave={async (name, val) => {
                                    const formData = new FormData();
                                    formData.append(name, val);
                                    await updateProfile(formData);
                                    setFormData(prev => ({ ...prev!, [name]: val }));
                                }}
                                options={[
                                    { value: "Full-time", label: "Full-time" },
                                    { value: "Internship", label: "Internship" }
                                ]}
                            />

                            <EditableField
                                label="Availability to work"
                                name="availability"
                                value={displayedData.availability || ""}
                                onSave={async (name, val) => {
                                    const formData = new FormData();
                                    formData.append(name, val);
                                    await updateProfile(formData);
                                    setFormData(prev => ({ ...prev!, [name]: val }));
                                }}
                                options={joiningDurationData}
                            />
                        </TwoCol>

                        <EditableField
                            label="Preferred location"
                            name="preferred_location"
                            value={displayedData.preferred_location || ""}
                            onSave={async (name, val) => {
                                const formData = new FormData();
                                formData.append(name, val);
                                await updateProfile(formData);
                                setFormData(prev => ({ ...prev!, [name]: val }));
                            }}
                            options={INDIAN_CITIES}
                            placeholder="Select location"
                        />
                    </Card>

                    {/* ================= EDUCATION ================= */}
                    <Card id="section-education" title="Education">
                        <div className="space-y-6">
                            <EducationBlock
                                value={displayedData}
                                onChange={handleInputChange}
                                label="Highest Qualification"
                                degree="degree"
                                college="college_edu"
                                duration="education_duration"
                            />
                            <Divider />
                            <EducationBlock
                                value={displayedData}
                                onChange={handleInputChange}
                                label="Class XII"
                                degree="class_xii"
                                college="class_xii_board"
                                duration="class_xii_details"
                            />
                            <Divider />
                            <EducationBlock
                                value={displayedData}
                                onChange={handleInputChange}
                                label="Class X"
                                degree="class_x"
                                college="class_x_board"
                            />
                        </div>
                    </Card>

                    {/* ================= KEY SKILLS ================= */}
                    <Card id="section-skills" title="Key skills">
                        <EditableField
                            label="Skills"
                            name="skills"
                            value={displayedData.skills || ""}
                            onSave={async (name, val) => {
                                const formData = new FormData();
                                formData.append(name, val);
                                await updateProfile(formData);
                                setFormData(prev => ({ ...prev!, [name]: val }));
                            }}
                            placeholder="Add skills separated by comma (e.g. React, Node.js, Design)"
                        />
                    </Card>

                    {/* ================= LANGUAGES ================= */}
                    <Card id="section-languages" title="Languages">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <LanguageRow value={displayedData} onChange={handleInputChange} label="Language 1" namePrefix="language_1" />
                            <LanguageRow value={displayedData} onChange={handleInputChange} label="Language 2" namePrefix="language_2" />
                        </div>
                    </Card>

                    {/* ================= INTERNSHIPS ================= */}
                    <Card id="section-internships" title=" Best Internship">
                        <TwoCol>
                            <EditableField
                                label="Company name"
                                name="internship_company"
                                value={displayedData.internship_company || ""}
                                onSave={async (name, val) => {
                                    const formData = new FormData();
                                    formData.append(name, val);
                                    await updateProfile(formData);
                                    setFormData(prev => ({ ...prev!, [name]: val }));
                                }}
                                placeholder="Where did you work?"
                            />
                            <Field label="Duration">
                                <YearRangePicker
                                    namePrefix="internship_duration"
                                    startYear={displayedData.internship_duration_start || ""}
                                    endYear={displayedData.internship_duration_end || ""}
                                    onChange={handleInputChange}
                                />
                            </Field>
                        </TwoCol>
                    </Card>

                    {/* ================= PROJECTS ================= */}
                    <Card id="section-projects" title="Best Project">
                        <EditableField
                            label="Project Description"
                            name="projects"
                            value={displayedData.projects || ""}
                            isTextarea
                            onSave={async (name, val) => {
                                const formData = new FormData();
                                formData.append(name, val);
                                await updateProfile(formData);
                                setFormData(prev => ({ ...prev!, [name]: val }));
                            }}
                            placeholder="Describe your key projects and contributions..."
                        />
                    </Card>

                    {/* ================= PROFILE SUMMARY ================= */}
                    <Card id="section-summary" title="Profile summary">
                        <EditableField
                            label="Professional Summary"
                            name="profile_summary"
                            isTextarea
                            value={displayedData.profile_summary || ""}
                            onSave={async (name, val) => {
                                const formData = new FormData();
                                formData.append(name, val);
                                await updateProfile(formData);
                                setFormData(prev => ({ ...prev!, [name]: val }));
                            }}
                            placeholder="A brief overview of your background and aspirations..."
                        />
                    </Card>

                    {/* ================= ACCOMPLISHMENTS ================= */}
                    <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4">
                        <EditableField
                            label="Certifications"
                            name="certifications"
                            isTextarea
                            value={displayedData.certifications || ""}
                            onSave={async (name, val) => {
                                const formData = new FormData();
                                formData.append(name, val);
                                await updateProfile(formData);
                                setFormData(prev => ({ ...prev!, [name]: val }));
                            }}
                        />
                    </div>
                    <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4">
                        <EditableField
                            label="Awards"
                            name="awards"
                            isTextarea
                            value={displayedData.awards || ""}
                            onSave={async (name, val) => {
                                const formData = new FormData();
                                formData.append(name, val);
                                await updateProfile(formData);
                                setFormData(prev => ({ ...prev!, [name]: val }));
                            }}
                        />
                    </div>
                    <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4">
                        <EditableField
                            label="Clubs"
                            name="clubs"
                            isTextarea
                            value={displayedData.clubs || ""}
                            onSave={async (name, val) => {
                                const formData = new FormData();
                                formData.append(name, val);
                                await updateProfile(formData);
                                setFormData(prev => ({ ...prev!, [name]: val }));
                            }}
                        />
                    </div>

                    {/* ================= COMPETITIVE EXAMS ================= */}
                    <Card id="section-exams" title="Competitive exams">
                        <TwoCol>
                            <EditableField
                                label="Exam name"
                                name="exam_name"
                                value={displayedData.exam_name || ""}
                                onSave={async (name, val) => {
                                    const formData = new FormData();
                                    formData.append(name, val);
                                    await updateProfile(formData);
                                    setFormData(prev => ({ ...prev!, [name]: val }));
                                }}
                            />
                            <EditableField
                                label="Rank/Score"
                                name="exam_rank"
                                value={displayedData.exam_rank || ""}
                                onSave={async (name, val) => {
                                    const formData = new FormData();
                                    formData.append(name, val);
                                    await updateProfile(formData);
                                    setFormData(prev => ({ ...prev!, [name]: val }));
                                }}
                            />
                        </TwoCol>
                    </Card>

                    {/* ================= RESUME ================= */}
                    <Card id="section-resume" title="Resume">
                        <div className="group relative rounded-xl border-2 border-dashed border-white/10 p-8 text-center hover:border-indigo-500/50 transition-colors bg-zinc-950/30">
                            <input
                                type="file"
                                name="resume"
                                onChange={handleInputChange}
                                accept=".pdf,.doc,.docx,.rtf"
                                className="absolute  inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                            />
                            <div className="flex flex-col items-center">
                                <Plus size={24} className="mb-2 text-indigo-400" />
                                <p className="text-sm font-medium text-zinc-200">Upload your resume</p>
                                <p className="mt-1 text-xs text-zinc-500">
                                    Supported formats: doc, docx, rtf, pdf (max 2MB)
                                </p>
                            </div>
                        </div>
                    </Card>


                </section>
            </div>


        </form>
    )
}
