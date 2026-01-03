"use client";

import { FormData, JobDetail } from "@/lib/types/types";
import { useEffect, useRef, useState } from "react";
import FormInput from "../Recruiter-hiring/FormInput";
import MultiOptions from "../Recruiter-hiring/MultiOptions";
import { AdditionalBenefits } from "../Recruiter-hiring/AdditionalBenefits";
import FormTextArea from "../utils/FormTextArea";
import { educationalRequirements } from "../Recruiter-hiring/EducationalRequirements";
import { skills } from "../Recruiter-hiring/Skills";
import { Cross, CrossIcon, X } from "lucide-react";
import NormalButton from "../utils/normalButton";
import { recruiterHiring } from "@/app/actions/recruiterHiring";
import { EditRecruiterJob } from "@/app/actions/editRecruiterJob";
import { useRouter } from "next/navigation";

type editJOb = {
    job: JobDetail,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditForm({ job, setOpen }: editJOb) {
    const router = useRouter();
    const initialFormData: FormData = {
        company_name: job.company_name,
        job_title: job.job_title,
        work_experience_min: job.work_experience_min,
        work_experience_max: job.work_experience_max,
        salary_per_month_from: job.salary_per_month_from,
        salary_per_month_to: job.salary_per_month_to,
        additional_benefits: job.additional_benefits || "",
        primary_skills: job.primary_skills,
        employment_type: job.employment_type,
        location: job.location,
        screening_questions: job.screening_questions.map((q) => ({
            question: q.question,
            type: q.type as "yes_no" | "text",
        })),
        job_description: job.job_description,
        application_deadline: job.application_deadline,
        number_of_applications: job.number_of_applications,
        educational_requirements: job.educational_requirements,
        communication_preferences: job.communication_preferences || "",
        key_responsibilities: job.key_responsibilities || "",
        good_to_have: job.good_to_have || "",
        what_we_offer: job.what_we_offer || "",
        company_description: job.company_description || "",
        website_link: job.website_link || ""
    };
    const updateField = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Updated:", formData);

        try {
            setSaving(true);
            // Call the server action manually with our state data
            await EditRecruiterJob(formData, Number(job.id));
            alert("Job updated successfully!😀");
            setOpen(false);
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit job post. Please try again.");
        }
        finally {
            setSaving(false)
        }
    };


    return (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <main

                className="w-[90%] max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 text-zinc-100 shadow-2xl"
            >
                <X onClick={() => setOpen(false)} className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-105 cursor-pointer " />
                <p className="text-xl sm:text-3xl font-semibold font-sans text-zinc-400 text-center">
                    Edit your fields, rest leave on us
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <FormInput
                        label="Company Name"
                        name="company_name"
                        value={formData.company_name}
                        onChange={(val) => updateField("company_name", val)}
                    />
                    <FormInput
                        label="Job Title"
                        name="job_title"
                        value={formData.job_title}
                        onChange={(val) => updateField("job_title", val)}
                    />
                    <FormInput
                        label="Work Experience Minimum"
                        numeric={true}
                        name="work_experience_min"
                        value={formData.work_experience_min}
                        onChange={(val) => updateField("work_experience_min", val)}
                    />
                    <FormInput
                        label="Work Experience Maximum"
                        numeric={true}
                        name="work_experience_max"
                        value={formData.work_experience_max}
                        onChange={(val) => updateField("work_experience_max", val)}
                    />
                    <FormInput
                        label="Salary Minimum"
                        numeric={true}
                        name="salary_per_month_from"
                        value={formData.salary_per_month_from}
                        onChange={(val) => updateField("salary_per_month_from", val)}
                    />
                    <FormInput
                        label="Salary Maximum"
                        numeric={true}
                        name="salary_per_month_to"
                        value={formData.salary_per_month_to}
                        onChange={(val) => updateField("salary_per_month_to", val)}
                    />
                    <MultiOptions
                        label="Additional Benefits"
                        name="additional_benefits"
                        options={AdditionalBenefits}
                        value={formData.additional_benefits}
                        onChange={(val) => updateField("additional_benefits", val)}
                    />
                    <MultiOptions
                        label="Primary Skills"
                        name="primary_skills"
                        options={AdditionalBenefits}
                        value={formData.primary_skills}
                        onChange={(val) => updateField("primary_skills", val)}
                    />

                    <FormInput
                        label="Employment Type"
                        name="employment_type"
                        value={formData.employment_type}
                        onChange={(val) => updateField("employment_type", val)}
                    />
                    <FormInput
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={(val) => updateField("location", val)}
                    />
                    <FormTextArea
                        label="Job Description"
                        name="job_description"
                        value={formData.job_description}
                        onChange={(val) => updateField("job_description", val)}
                    />
                    <FormTextArea
                        label="Company Description"
                        name="company_description"
                        value={formData.company_description}
                        onChange={(val) => updateField("company_description", val)}
                    />
                    <FormTextArea
                        label="Key Responsiblities"
                        name="key_responsibilities"
                        value={formData.key_responsibilities}
                        onChange={(val) => updateField("key_responsibilities", val)}
                    />


                    <FormInput
                        label="Application Deadline"
                        name="application_deadline"
                        value={formData.application_deadline}
                        onChange={(val) => updateField("application_deadline", val)}
                    />
                    <FormInput
                        label="Number of Posts"
                        numeric={true}
                        name="number_of_applications"
                        value={formData.number_of_applications}
                        onChange={(val) => updateField("number_of_applications", val)}
                    />
                    <FormInput
                        label="Website Link"
                        name="website_link"
                        value={formData.website_link}
                        onChange={(val) => updateField("website_link", val)}
                    />
                    <MultiOptions
                        label="Educational Requirements"
                        name="educational_requirements"
                        options={educationalRequirements}
                        value={formData.educational_requirements}
                        onChange={(val) => updateField("educational_requirements", val)}
                    />
                    <MultiOptions
                        label="Good to have"
                        name="good_to_have"
                        options={skills}
                        value={formData.good_to_have}
                        onChange={(val) => updateField("good_to_have", val)}
                    />
                    <FormTextArea
                        label="What we offer"
                        name="what_we_offer"
                        value={formData.what_we_offer}
                        onChange={(val) => updateField("what_we_offer", val)}
                    />
                    <FormInput
                        label="Communication preferences"
                        name="communication_preferences"
                        value={formData.communication_preferences}
                        onChange={(val) => updateField("communication_preferences", val)}
                    />
                    <div className="w-full flex justify-end">
                        <NormalButton
                            title="Update Job"
                            type="submit"
                            variant="solid"
                            disabled={saving}
                            saving={saving}


                        />
                    </div>




                </form>
            </main>
        </div>
    );
}