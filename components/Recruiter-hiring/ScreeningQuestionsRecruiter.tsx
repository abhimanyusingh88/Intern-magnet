"use client";

import { Plus, Trash2 } from "lucide-react";
import { SelectElement } from "../SelectElement";
import { Row } from "@/lib/types/types";
import NormalButton from "../utils/normalButton";
import { FormData } from "@/lib/types/types";

export default function ScreeningQuestionsRecruiter({
    count,
    setCount,
    formData,
    setFormData
}: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
    const rows = formData.screening_questions;

    const setRows = (newRows: Row[]) => {
        setFormData(prev => ({ ...prev, screening_questions: newRows }));
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Header */}
            <p className="font-sans font-semibold text-lg">
                Screening questions
            </p>
            <p className="font-sans font-thin text-zinc-400">
                Review carefully before submitting as you wont be able to edit screening questions after submission
            </p>

            {/* Rows */}
            {rows.map((row, i) => (
                <div
                    key={i}
                    className="flex flex-col sm:flex-row gap-3 w-full"
                >
                    {/* Question input (UI only) */}
                    <input
                        type="text"
                        placeholder="Enter question"
                        value={row.question}
                        onChange={(e) => {
                            const copy = [...rows];
                            copy[i].question = e.target.value;
                            setRows(copy);
                        }}
                        className="flex-1 p-3 border focus:scale-101 outline-none focus:border-3 transition-all transform-gpu duration-100 ease-in-out border-indigo-400 rounded-2xl bg-transparent outline-none"
                    />

                    {/* Type select (UI only) */}
                    <SelectElement row={row} rows={rows} setRows={setRows} i={i} />
                    <button
                        type="button"
                        onClick={() => {
                            const copy = [...rows];
                            copy.splice(i, 1);
                            setRows(copy);
                        }}
                        className="flex cursor-pointer items-center gap-2 text-indigo-400 text-sm w-fit"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}

            {/* Add row */}
            {rows.length < 6 &&
                <button
                    type="button"
                    onClick={() =>
                        setRows([...rows, { question: "", type: "yes_no" }])
                    }
                    className="flex cursor-pointer items-center gap-2 text-indigo-400 text-sm w-fit"
                >
                    <Plus size={16} />
                    Add another question
                </button>
            }
            <input
                type="hidden"
                name="screening_questions"
                value={JSON.stringify(rows)}
            />
            <div className="flex justify-between">
                <NormalButton
                    title="back"
                    type="button"
                    front={false}
                    count={count}
                    setCount={setCount}
                />

                <NormalButton
                    title="next"
                    type="button"
                    front={true}
                    count={count}
                    setCount={setCount}

                />
            </div>



        </div>
    );
}
