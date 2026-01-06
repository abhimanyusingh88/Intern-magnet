"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChoiceForms from "./ChoiceForms";
import { FormData } from "@/lib/types/types";
import { recruiterHiring } from "@/app/actions/recruiterHiring";
import CompanyLogo from "./companyLogo";
import { initialFormData } from "./InitialFormData";
import DraftSavingButton from "./draftSavingButton";
import { useQueryClient } from "@tanstack/react-query";


export default function AllRecruitersForm({ count, setCount, user }: { count: number, setCount: React.Dispatch<React.SetStateAction<number>>, user: any }) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [saving, setSaving] = useState(false);
    const [savingDraft, setSavingDraft] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    const hasAtLeastOneValue = formData.company_name.trim() !== "" && formData.job_title.trim() !== "";
    //1. session stoarge se data lenge
    useEffect(() => {
        const savedData = sessionStorage.getItem("recruiterFormData");
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setFormData(prev => ({
                    ...prev,
                    ...parsedData
                }));
            } catch (error) {
                console.error("Error parsing saved form data:", error);
            }
        }
        setIsLoaded(true);
    }, []);

    const router = useRouter();

    const handleSaveDraft = async () => {
        try {
            setSavingDraft(true);
            const draftData = { ...formData, draft: true };
            // Call the server action with draft: true
            await recruiterHiring(draftData);

            // Clear session storage
            sessionStorage.removeItem("recruiterFormData");
            sessionStorage.removeItem("recruiterFormCount");

            // Invalidate drafts query to ensure list is fresh
            queryClient.invalidateQueries({ queryKey: ["drafts"] });

            // Reset state
            setFormData(initialFormData);
            setCount(-1);

            // Navigate back to drafts page
            router.push("/recruiterdrafts");
        } catch (error) {
            console.error("Draft save failed:", error);
            alert("Failed to save draft. Please try again.");
        } finally {
            setSavingDraft(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Handle the actual submission logic here (e.g., API call)
        console.log("Form submitted locally:", formData);

        try {
            setSaving(true);
            // Ensure draft is false when submitting the final post
            const submissionData = { ...formData, draft: false };
            // Call the server action manually with our state data
            await recruiterHiring(submissionData);

            // Clear session storage
            sessionStorage.removeItem("recruiterFormData");
            sessionStorage.removeItem("recruiterFormCount");

            // Invalidate drafts query
            queryClient.invalidateQueries({ queryKey: ["drafts"] });

            // Reset state
            setFormData(initialFormData);
            setCount(-1);
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

        {hasAtLeastOneValue && (
            <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 shadow-2xl">
                <DraftSavingButton handleSaveDraft={handleSaveDraft} savingDraft={savingDraft} />
            </div>
        )}

        {/* Company Logo Upload */}
        <div className="w-fit">
            <CompanyLogo
                currentLogo={formData.company_logo}
                onUploadSuccess={(url: string) => setFormData(prev => ({ ...prev, company_logo: url }))}
            />
        </div>



        <div>
            <form onSubmit={handleSubmit}>
                <ChoiceForms count={count} user={user} saving={saving} setCount={setCount} formData={formData} setFormData={setFormData} />
            </form>
        </div>
    </div>;
}

