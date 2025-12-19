"use client"

import { Plus } from "lucide-react"
import { useRef, useState } from "react"
import LanguageRow from "./LanguageRow"
import Card from "./ProfileCard"
import EducationBlock from "./EducationBlockProfile"
import { sections } from "./SectionDataFileds"
import Field from "./FieldProfileForm"
import { Divider, TwoCol } from "./DividersProfile"

export default function DownProfileComponent() {
    // Initial baseline data
    const [initialData, setInitialData] = useState<Record<string, string>>({})
    // Live form data
    const [formData, setFormData] = useState<Record<string, string>>({})

    const prefRef = useRef<HTMLInputElement>(null)
    const eduRef = useRef<HTMLInputElement>(null)
    const skillRef = useRef<HTMLInputElement>(null)
    const langRef = useRef<HTMLInputElement>(null)
    const internRef = useRef<HTMLInputElement>(null)
    const projectRef = useRef<HTMLTextAreaElement>(null)
    const summaryRef = useRef<HTMLTextAreaElement>(null)
    const certRef = useRef<HTMLTextAreaElement>(null)
    const awardRef = useRef<HTMLTextAreaElement>(null)
    const clubRef = useRef<HTMLTextAreaElement>(null)
    const examRef = useRef<HTMLInputElement>(null)

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            const offset = 100 // Account for fixed navbar
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Submitting Lower Profile Data to DB:", formData)
        // Reset local state and form DOM
        setFormData({})
        e.currentTarget.reset()
        // TODO: In the future, call server action and update UI based on response
    }

    const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData)

    // Check if there's at least one field with non-empty content
    const hasContent = Object.values(formData).some(val => val && val.trim() !== "")

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-8 md:px-0">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">

                <aside className="hidden md:block sticky top-[72px] self-start h-fit max-h-[calc(100vh-100px)] overflow-y-auto p-4 md:border-2 md:border-zinc-800 rounded-xl bg-zinc-900/40 backdrop-blur-md shadow-2xl border-white/5">
                    <h3 className="px-4 py-2 mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5">Quick links</h3>
                    <nav className="space-y-1">
                        {sections.map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => scrollToSection(item.id)}
                                className="w-full cursor-pointer text-left px-4 py-2.5 text-sm font-medium text-zinc-400 rounded-lg hover:text-white hover:bg-white/5 transition-all"
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* ================= RIGHT CONTENT ================= */}
                <section className="space-y-8 pb-20">

                    {/* ================= CAREER PREFERENCES ================= */}
                    <Card id="section-preference" title="Your career preferences" onAction={() => prefRef.current?.focus()}>
                        <TwoCol>
                            <Field label="Preferred job type">
                                <input ref={prefRef} name="preferred_job_type" value={formData.preferred_job_type || ""} onChange={handleInputChange} className="input-profile" placeholder="e.g. Full-time, Internship" />
                            </Field>

                            <Field label="Availability to work">
                                <input name="availability" value={formData.availability || ""} onChange={handleInputChange} className="input-profile" placeholder="e.g. Immediately" />
                            </Field>
                        </TwoCol>

                        <Field label="Preferred location">
                            <textarea name="preferred_location" value={formData.preferred_location || ""} onChange={handleInputChange} className="input-profile min-h-[80px]" placeholder="e.g. Remote, Bangalore, Mumbai" />
                        </Field>
                    </Card>

                    {/* ================= EDUCATION ================= */}
                    <Card id="section-education" title="Education" action="Add" onAction={() => eduRef.current?.focus()}>
                        <div className="space-y-6">
                            <EducationBlock
                                inputRef={eduRef}
                                value={formData}
                                onChange={handleInputChange}
                                label="Highest Qualification"
                                degree="degree"
                                college="college"
                                duration="education_duration"
                            />
                            <Divider />
                            <EducationBlock
                                value={formData}
                                onChange={handleInputChange}
                                label="Class XII"
                                degree="class_xii"
                                college="class_xii_board"
                                duration="class_xii_details"
                            />
                            <Divider />
                            <EducationBlock
                                value={formData}
                                onChange={handleInputChange}
                                label="Class X"
                                degree="class_x"
                                college="class_x_board"
                                duration="class_x_details"
                            />
                        </div>
                    </Card>

                    {/* ================= KEY SKILLS ================= */}
                    <Card id="section-skills" title="Key skills" onAction={() => skillRef.current?.focus()}>
                        <Field label="Skills">
                            <input
                                ref={skillRef}
                                name="skills"
                                value={formData.skills || ""}
                                onChange={handleInputChange}
                                placeholder="Add skills separated by comma (e.g. React, Node.js, Design)"
                                className="input-profile"
                            />
                        </Field>
                    </Card>

                    {/* ================= LANGUAGES ================= */}
                    <Card id="section-languages" title="Languages" action="Add" onAction={() => langRef.current?.focus()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <LanguageRow inputRef={langRef} value={formData} onChange={handleInputChange} label="Language 1" namePrefix="language_1" />
                            <LanguageRow value={formData} onChange={handleInputChange} label="Language 2" namePrefix="language_2" />
                        </div>
                    </Card>

                    {/* ================= INTERNSHIPS ================= */}
                    <Card id="section-internships" title="Internships" action="Add" onAction={() => internRef.current?.focus()}>
                        <TwoCol>
                            <Field label="Company name">
                                <input ref={internRef} name="internship_company" value={formData.internship_company || ""} onChange={handleInputChange} className="input-profile" placeholder="Where did you work?" />
                            </Field>
                            <Field label="Duration">
                                <input name="internship_duration" value={formData.internship_duration || ""} onChange={handleInputChange} className="input-profile" placeholder="e.g. 3 months" />
                            </Field>
                        </TwoCol>
                    </Card>

                    {/* ================= PROJECTS ================= */}
                    <Card id="section-projects" title="Projects" action="Add" onAction={() => projectRef.current?.focus()}>
                        <Field label="Project Description">
                            <textarea
                                ref={projectRef}
                                name="projects"
                                value={formData.projects || ""}
                                onChange={handleInputChange}
                                className="input-profile min-h-[120px]"
                                placeholder="Describe your key projects and contributions..."
                            />
                        </Field>
                    </Card>

                    {/* ================= PROFILE SUMMARY ================= */}
                    <Card id="section-summary" title="Profile summary" action="Add" onAction={() => summaryRef.current?.focus()}>
                        <Field label="Professional Summary">
                            <textarea
                                ref={summaryRef}
                                name="profile_summary"
                                value={formData.profile_summary || ""}
                                onChange={handleInputChange}
                                className="input-profile min-h-[120px]"
                                placeholder="A brief overview of your background and aspirations..."
                            />
                        </Field>
                    </Card>

                    {/* ================= ACCOMPLISHMENTS ================= */}
                    <div id="section-certifications" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card title="Certifications" action="Add" onAction={() => certRef.current?.focus()}>
                            <textarea ref={certRef} name="certifications" value={formData.certifications || ""} onChange={handleInputChange} className="input-profile h-24" />
                        </Card>
                        <Card title="Awards" action="Add" onAction={() => awardRef.current?.focus()}>
                            <textarea ref={awardRef} name="awards" value={formData.awards || ""} onChange={handleInputChange} className="input-profile h-24" />
                        </Card>
                        <Card title="Clubs" action="Add" onAction={() => clubRef.current?.focus()}>
                            <textarea ref={clubRef} name="clubs" value={formData.clubs || ""} onChange={handleInputChange} className="input-profile h-24" />
                        </Card>
                    </div>

                    {/* ================= COMPETITIVE EXAMS ================= */}
                    <Card id="section-exams" title="Competitive exams" action="Add" onAction={() => examRef.current?.focus()}>
                        <TwoCol>
                            <Field label="Exam name">
                                <input ref={examRef} name="exam_name" value={formData.exam_name || ""} onChange={handleInputChange} className="input-profile" />
                            </Field>
                            <Field label="Rank/Score">
                                <input name="exam_rank" value={formData.exam_rank || ""} onChange={handleInputChange} className="input-profile" />
                            </Field>
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
                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
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

                    {isDirty && hasContent && (
                        <div className="flex justify-end pt-8 animate-in slide-in-from-bottom-2 fade-in duration-300">
                            <button
                                type="submit"
                                className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-10 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 shadow-indigo-500/20"
                            >
                                Save Changes
                                <div className="h-1.5 w-1.5 rounded-full bg-white opacity-50 group-hover:opacity-100" />
                            </button>
                        </div>
                    )}
                </section>
            </div>

            <style jsx global>{`
                .input-profile {
                    width: 100%;
                    background-color: transparent;
                    border-radius: 0.75rem;
                    border: 1px border-white/5;
                    padding: 0.75rem;
                    font-size: 0.875rem;
                    color: white;
                    outline: none;
                    transition: all 0.2s;
                }
                .input-profile:hover {
                    border-color: rgba(255, 255, 255, 0.1);
                    background-color: rgba(255, 255, 255, 0.02);
                }
                .input-profile:focus {
                    border-color: #6366f1;
                    background-color: rgba(99, 102, 241, 0.05);
                }
            `}</style>
        </form>
    )
}

/* ================= REUSABLE COMPONENTS ================= */





