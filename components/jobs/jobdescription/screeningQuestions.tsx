import { useEffect, useState } from "react";

interface ScreeningQuestions {
    question: string;
    id: number;
    type: string;
    step: number;
    total: number;
    isLast: boolean;
    onNext: (answer: string) => void;
    onClose: () => void;
    submitDisabled: boolean;
}

export default function ScreeningQuestionsModal({
    question,
    id,
    type,
    step,
    total,
    isLast,
    onNext,
    onClose,
    submitDisabled
}: ScreeningQuestions) {
    const [answer, setAnswer] = useState("");

    const isAnswered =
        type === "text"
            ? answer.trim() !== ""
            : answer !== "";

    const handleNext = () => {
        if (isAnswered) onNext(answer);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            <div className="relative z-10 w-[90%] sm:w-[70%] md:w-[60%] max-w-2xl bg-zinc-900 rounded-xl p-6 space-y-6">

                <p className="text-xs text-zinc-400">
                    Question {step + 1} of {total}
                </p>

                <h1 className="text-zinc-100 font-bold text-sm sm:text-lg">
                    {question}
                </h1>

                {type === "text" ? (
                    <textarea
                        name={`question-${id}`}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full min-h-[120px] p-4 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none"
                    />
                ) : (
                    <>
                        <input
                            type="hidden"
                            name={`question-${id}`}
                            value={answer}
                        />

                        <div className="flex gap-4">
                            {["Yes", "No"].map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setAnswer(opt)}
                                    className={`flex-1 py-3 cursor-pointer rounded-lg border transition-all transform-gpu duration-150 ease-in-out
                                        ${answer === opt
                                            ? "bg-indigo-600 border-indigo-500 text-white"
                                            : "bg-zinc-800 border-zinc-700 text-zinc-300"
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-200"
                    >
                        Cancel
                    </button>

                    {!isLast ? (
                        <button
                            type="button"
                            disabled={!isAnswered}
                            onClick={handleNext}
                            className={`px-4 py-2 cursor-pointer rounded-lg text-white
                                ${isAnswered
                                    ? "bg-indigo-600"
                                    : "bg-indigo-600/40 cursor-not-allowed"
                                }`}
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled={!isAnswered || submitDisabled}
                            onClick={handleNext}
                            className={`px-4 py-2 cursor-pointer rounded-lg text-white
                                ${isAnswered && !submitDisabled
                                    ? "bg-green-600"
                                    : "bg-green-600/40 cursor-not-allowed"
                                }`}
                        >
                            {submitDisabled ? "Submitting..." : "Submit Application"}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
