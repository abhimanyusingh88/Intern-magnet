"use client"
import TrackIndicator from "@/components/utils/trackIndicator";
import BoxPoints from "./boxPoints";
import { JobDetail } from "@/lib/types/types";
import { Slugify } from "../slugify";
import { useState } from "react";
import ScreeningQuestionsModal from "./screeningQuestions";
import { Reply } from "lucide-react";
import ButtonJob from "./buttonJob";

export default function SideJobDescView({ jobData, session }: { jobData: JobDetail, session: any }) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const questions = jobData.screening_questions || [];
    const [disabled, setDisabled] = useState(questions.length > 0);
    const [loading, setLoading] = useState(false);
    const [submitDisable, setSubmitDisbale] = useState(false);

    async function handleSubmitAnswers(finalAnswers: Record<string, string>) {
        try {
            setDisabled(false);
            setLoading(true);
            setSubmitDisbale(true);
            const res = await fetch("/api/screeningquestion",
                {
                    method: "POST",
                    body: JSON.stringify(finalAnswers),
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
        } else {
            // Last question
            handleSubmitAnswers(newAnswers);
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
        <div className="flex items-start">
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
        </div>

        {/* // key bhejna yaad rakhna warna auto submit hone waali dikkat yaad hai na?? */}

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


        <div className="flex gap-4 items-center justify-center">
            <div className="flex justify-center mt-4">
                <ButtonJob title="Visit website" variant="outline" anch={true} link={jobData.website_link} />
            </div>

            <div className="flex justify-center mt-4">
                <ButtonJob
                    saving={loading}
                    disabled={disabled}
                    title={session ? "Apply" : "Login to Apply"}
                    link={session ? `/apply/${jobData.id}` : `/login?callbackUrl=/jobspage/${Slugify(jobData.job_title)}/${Slugify(jobData.job_title)}-${jobData.id}`}
                />
            </div>
        </div>
    </div >
}