"use client"

import { JobDetail } from "@/lib/types/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BoxPoints from "./boxPoints";
import TrackIndicator from "@/components/utils/trackIndicator";
import { Link, Reply } from "lucide-react";
import ScreeningQuestionsModal from "./screeningQuestions";
import ButtonJob from "./buttonJob";
import { Slugify } from "../slugify";
import AppliedIndicator from "./appliedIndicator";

export default function SideJobDescView({ jobData, session }: { jobData: JobDetail, session: any }) {
    const formLink = jobData.job_form_link?.startsWith("http")
        ? jobData.job_form_link
        : `https://${jobData.job_form_link}`;

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const questions = jobData.screening_questions || [];
    const [disabled, setDisabled] = useState(questions.length > 0);
    const [loading, setLoading] = useState(false);
    const [submitDisable, setSubmitDisbale] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [checkingApplication, setCheckingApplication] = useState(true);

    // Check if user has already applied to this job
    useEffect(() => {
        async function checkIfApplied() {
            if (!session || !jobData.id) {
                setCheckingApplication(false);
                return;
            }

            try {
                const res = await fetch(`/api/appliedjobuser?jobId=${jobData.id}`);
                const data = await res.json();

                if (data.success && data.hasApplied) {
                    setHasApplied(true);
                    setDisabled(true); // Disable apply button if already applied
                }
            } catch (error) {
                throw new Error("Failed to check application status");
            } finally {
                setCheckingApplication(false);
            }
        }

        checkIfApplied();
    }, [jobData.id, session]);

    async function handleSubmitAnswers(finalAnswers: Record<string, string>) {
        try {
            setDisabled(false);
            setLoading(true);
            setSubmitDisbale(true);
            const finalData = {
                ...answers,
                job_id: jobData.id,
                user_id: session?.email,
                companyName: jobData.company_name,
                jobTitle: jobData.job_title,


            };

            const res = await fetch("/api/screeningquestion",
                {
                    method: "POST",
                    body: JSON.stringify(finalData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const data = await res.json();
            console.log("Submission Response:", data);
            if (res.ok) {
                setOpen(false);
                setStep(0);
                setAnswers({});
                setHasApplied(true); // Update state to show success UI
                router.refresh(); // Revalidate the page
            }
        }
        catch (error) {
            console.error("Submission Error:", error);
            // Optionally handle error UI
        }
        finally {
            setLoading(false);
            setSubmitDisbale(false);
        }
    }

    function handleNext(answer: string) {
        const currentQuestionId = questions[step].id || `q-${step}`;
        const newAnswers = { ...answers, [currentQuestionId]: answer };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        }
        else {
            setOpen(false);
            setDisabled(false);
        }
    }

    function handleClose() {
        setOpen(false);
        setStep(0);
        setAnswers({});
    }

    const arrayOfSelectionProcess = jobData.selection_process?.split('.').map(p => p.trim()).filter(p => p.length > 0) || [];
    return <div className="w-full p-6 flex flex-col gap-2 rounded-2xl bg-zinc-900/60 border border-zinc-900 shadow-xl">

        <BoxPoints label="Additional Benefits" data={jobData.additional_benefits} />
        <BoxPoints label="Required Qualifications" data={jobData.required_qualifications} />
        <BoxPoints label="Preferred Qualifications" data={jobData.preferred_qualifications} />
        <BoxPoints label="Communication" data={jobData.communication_preferences} />
        {arrayOfSelectionProcess.length > 0 &&
            <div className="space-y-2">

                <h1 className="text-zinc-300 text-sm sm:text-lg md:text-xl font-semibold">Selection Process</h1>
                <TrackIndicator steps={arrayOfSelectionProcess} />
            </div>
        }
        {jobData.job_form_link && (
            <div className="space-y-2">
                <h1 className="text-zinc-300 text-sm sm:text-lg md:text-xl font-semibold">
                    Filling out this google form is mandatory
                </h1>

                <a
                    href={formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 flex gap-1 text-justify font-light leading-relaxed text-xs sm:text-sm md:text-[14px]"
                >
                    <Link className="w-5 h-5 text-indigo-400" />
                    {jobData.job_form_link}
                </a>
            </div>
        )}


        {/* Dynamic Action Area */}
        {
            hasApplied ? (
                <>
                    <AppliedIndicator jobData={jobData} />
                </>
            ) : checkingApplication ? (
                <div className="flex gap-4 items-center justify-center mt-6">
                    <ButtonJob title="Visit website" variant="outline" anch={true} link={jobData.website_link} />
                    <ButtonJob
                        saving={true}
                        disabled={true}
                        title="Checking..."
                        link=""
                    />
                </div>
            ) : (
                <>
                    {questions.length > 0 && <div className="flex items-start">
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            className="
                    flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-all duration-150 ease-in-out mt-2 text-xs  md:text-sm cursor-pointer 
                "
                        >
                            <Reply className="h-4 w-4 shrink-0" />
                            <span className="leading-tight">
                                Answer the recruiter's questions before applying
                            </span>
                        </button>
                    </div>}

                    {open && questions.length > 0 && (
                        <ScreeningQuestionsModal
                            key={step}
                            question={questions[step].question}
                            id={Number(questions[step].id)}
                            type={questions[step].type}
                            step={step}
                            total={questions.length}
                            isLast={step === questions.length - 1}
                            onNext={handleNext}
                            onClose={handleClose}
                            submitDisabled={submitDisable}
                        />
                    )}

                    <div className="flex gap-4 items-center justify-center mt-4">
                        <ButtonJob title="Visit website" variant="outline" anch={true} link={jobData.website_link} />

                        <ButtonJob
                            onClick={() => handleSubmitAnswers(answers)}
                            saving={loading}
                            disabled={disabled}
                            title={!session ? "Login to Apply" : "Apply"}
                            link={session ? "" : `/login?callbackUrl=/jobspage/${Slugify(jobData.job_title)}/${Slugify(jobData.job_title)}-${jobData.id}`}
                        />
                    </div>
                </>
            )
        }
    </div >
}