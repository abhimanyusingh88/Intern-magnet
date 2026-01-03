"use client";

import FormTextArea from "../utils/FormTextArea";
import FormInput from "./FormInput";
import NormalButton from "../utils/normalButton";
import { FormData } from "@/lib/types/types";
import { educationalRequirements } from "./EducationalRequirements";
import MultiOptions from "./MultiOptions";
import { skills } from "./Skills";

export default function JobDescriptionRecruiter({
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
    const updateField = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isValid =
        formData.job_description.trim() !== "" &&
        formData.application_deadline.length === 10 &&
        formData.number_of_applications.trim() !== "" &&
        formData.educational_requirements.trim() !== "";

    return (
        <div className="flex flex-col gap-2">
            <FormTextArea
                label="Job Description"
                name="job_description"
                placeholder="Add here"
                required
                maxWords={4000}
                hint="(max 4000 words)"
                value={formData.job_description}
                onChange={(val) => updateField("job_description", val)}
            />
            <FormTextArea
                label="Key responsibilities"
                name="key_responsibilities"
                placeholder="Add here"
                required
                maxWords={1000}
                hint="(max 4000 words)"
                value={formData.key_responsibilities}
                onChange={(val) => updateField("key_responsibilities", val)}
            />
            <MultiOptions
                label="Good to have"
                name="good_to_have"
                options={skills}
                value={formData.good_to_have}
                onChange={(val) => updateField("good_to_have", val)}
            />
            <FormTextArea
                label="what we offer"
                name="what_we_offer"
                placeholder="Add here"
                required
                maxWords={1000}
                hint="(max 4000 words)"
                value={formData.what_we_offer}
                onChange={(val) => updateField("what_we_offer", val)}

            />
            <FormInput
                label="Application Deadline"
                name="application_deadline"
                placeholder="Application Deadline"
                required
                hint="(Enter a valid date eg.12/10/2025)"
                value={formData.application_deadline}
                onChange={(val) => updateField("application_deadline", val)}
            />
            <FormInput
                label="Number of applications"
                name="number_of_applications"
                placeholder="(eg. 10)"
                required
                numeric={true}
                value={formData.number_of_applications}
                onChange={(val) => updateField("number_of_applications", val)}
            />
            <MultiOptions
                label="Educational Requirements"
                name="educational_requirements"
                options={educationalRequirements}
                value={formData.educational_requirements}
                onChange={(val) => updateField("educational_requirements", val)}
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
                    disabled={!isValid}
                />
            </div>
        </div>
    );
}
