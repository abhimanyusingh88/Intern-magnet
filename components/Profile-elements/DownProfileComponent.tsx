"use client"

import { useState, useEffect } from "react"
import SideNav from "../utils/SideNav"
import { SpinnerBig } from "../utils/SpinnerBig"
import { updateProfile } from "@/app/actions/profile"
import { getInitialDownProfileData } from "@/lib/profile-helpers"
import ProfileData from "@/lib/data/UserData"
import { useProfile } from "./ProfileContext"

// Section Components
import CareerPreferences from "../profile-sections/CareerPreferences"
import Education from "../profile-sections/Education"
import Skills from "../profile-sections/Skills"
import Languages from "../profile-sections/Languages"
import Internships from "../profile-sections/Internships"
import Projects from "../profile-sections/Projects"
import Summary from "../profile-sections/Summary"
import Accomplishments from "../profile-sections/Accomplishments"
import Exams from "../profile-sections/Exams"
import Resume from "../profile-sections/Resume"

export default function DownProfileComponent() {
    const { data: userData, isLoading } = ProfileData();
    const { setFields } = useProfile();
    const [formData, setFormData] = useState<Record<string, string> | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isUploadingResume, setIsUploadingResume] = useState(false);

    // Update form data when userData becomes available
    useEffect(() => {
        if (userData) {
            const initial = getInitialDownProfileData(userData);
            setFormData(initial);
            setFields(userData);
        }
    }, [userData, setFields]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | string, value?: string) => {
        if (typeof e === 'string') {
            setFormData(prev => ({ ...prev!, [e]: value || "" }))
        } else {
            const { name, value: val } = e.target
            setFormData(prev => ({ ...prev!, [name]: val }))
        }
    }

    if (isLoading || !formData) {
        return <SpinnerBig />
    }

    return (
        <form
            encType="multipart/form-data"
            className="mx-auto max-w-7xl px-4 py-8 md:px-0"
            onSubmit={async (e) => {
                e.preventDefault();
                if (!formData) return;

                try {
                    setIsUploadingResume(true);
                    const submitData = new FormData(e.currentTarget);
                    if (resumeFile) {
                        submitData.append("resume_file", resumeFile);
                    }
                    const newPath = await updateProfile(submitData);

                    if (newPath) {
                        setFormData(prev => ({ ...prev!, resume_path: newPath }));
                        // setLastSavedData(prev => ({ ...prev!, resume_path: newPath }));
                    }
                    // else {
                    //     // setLastSavedData(formData);
                    // }

                    // remove resume UI after successful upload
                    setResumeFile(null);
                } finally {
                    setIsUploadingResume(false);
                }
            }}
        >
            {/* Hidden inputs to ensure all data is sent on submit */}
            {Object.entries(formData).map(([key, val]) => (
                <input key={key} type="hidden" name={key} value={val} />
            ))}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
                <SideNav />

                {/* ================= RIGHT CONTENT ================= */}
                <section className="space-y-8 pb-20">
                    <CareerPreferences data={formData} setFormData={setFormData} />

                    <Education data={formData} onChange={handleInputChange} />

                    <Skills data={formData} setFormData={setFormData} />

                    <Languages data={formData} onChange={handleInputChange} />

                    <Internships data={formData} onChange={handleInputChange} setFormData={setFormData} />

                    <Projects data={formData} setFormData={setFormData} />

                    <Summary data={formData} setFormData={setFormData} />

                    <Accomplishments data={formData} setFormData={setFormData} />

                    <Exams data={formData} setFormData={setFormData} />

                    <Resume
                        data={formData}
                        resumeFile={resumeFile}
                        isUploadingResume={isUploadingResume}
                        setResumeFile={setResumeFile}
                    />
                </section>
            </div>
        </form>
    )
}
