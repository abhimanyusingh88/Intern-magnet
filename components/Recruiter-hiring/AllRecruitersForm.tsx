"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChoiceForms from "./ChoiceForms";
import { FormData } from "@/lib/types/types";
import { recruiterHiring } from "@/app/actions/recruiterHiring";

export default function AllRecruitersForm({ count, setCount, user }: { count: number, setCount: React.Dispatch<React.SetStateAction<number>>, user: any }) {
    const initialFormData: FormData = {
        company_name: "",
        job_title: "",
        work_experience_min: "",
        work_experience_max: "",
        salary_per_month_from: "",
        salary_per_month_to: "",
        additional_benefits: "",
        primary_skills: "",
        employment_type: "",
        location: "",
        screening_questions: [{ question: "", type: "yes_no" }],
        job_description: "",
        application_deadline: "",
        number_of_applications: "",
        educational_requirements: "",
        communication_preferences: "",
        key_responsibilities: "",
        good_to_have: "",
        what_we_offer: "",
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [saving, setSaving] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    //1. session stoarge se data lenge
    useEffect(() => {
        const savedData = sessionStorage.getItem("recruiterFormData");
        if (savedData) {
            try {
                setFormData(JSON.parse(savedData));
            } catch (error) {
                console.error("Error parsing saved form data:", error);
            }
        }
        setIsLoaded(true);
    }, []);

    // 2.session storage ko data denge
    useEffect(() => {
        if (isLoaded) {
            sessionStorage.setItem("recruiterFormData", JSON.stringify(formData));
        }
    }, [formData, isLoaded]);


    const router = useRouter();

    //3. submission pe sab reset and also session storage be clear karenge
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Handle the actual submission logic here (e.g., API call)
        console.log("Form submitted locally:", formData);

        try {
            setSaving(true);
            // Call the server action manually with our state data
            await recruiterHiring(formData);

            // Clear session storage
            sessionStorage.removeItem("recruiterFormData");
            sessionStorage.removeItem("recruiterFormCount");

            // Reset state
            setFormData(initialFormData);
            setCount(-1);

            alert("Job posted successfully!😀");

            // Navigate to posted jobs
            router.push("/postedjobs");
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit job post. Please try again.");
        }
        finally {
            setSaving(false)
        }
    };

    if (!isLoaded) return null;

    return <div className="flex flex-col gap-4 ">
        <p className="font-sans font-semibold text-xs sm:text-xl whitespace-nowrap max-w-full overflow-hidden text-ellipsis">
            You are posting this job as a{" "}
            <span className="p-1 sm:p-2 border-2 border-indigo-500 text-indigo-400 rounded-4xl font-sans font-semibold text-xs sm:text-xl whitespace-nowrap inline-flex items-center">
                Company/Business
            </span>
        </p>
        <div>
            <form onSubmit={handleSubmit}>
                <ChoiceForms count={count} user={user} saving={saving} setCount={setCount} formData={formData} setFormData={setFormData} />
            </form>
        </div>
    </div>;
}
