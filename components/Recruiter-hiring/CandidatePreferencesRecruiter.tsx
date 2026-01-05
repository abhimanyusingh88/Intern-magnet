
import FormInput from "./FormInput";
import NormalButton from "../utils/normalButton";
import { FormData } from "@/lib/types/types";
import MultiOptions from "./MultiOptions";
import { skills } from "./Skills";
import LoginRequiredPage from "../utils/LoginReminderPage";
import FormTextArea from "../utils/FormTextArea";
export default function CandidatePreferencesRecruiter({
    count,
    setCount,
    formData,
    user,
    setFormData
}: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    formData: FormData;
    user: any
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
    const employmentTypes = [
        "Full-time",
        "Part-time",
        "Internship",
        "Contract",
        "Freelance",
        "Seasonal",
        "Temporary",
        "Apprenticeship",
        "Co-op",
        "Other"
    ];
    const updateField = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isValid =
        formData.employment_type.trim() !== "" &&
        formData.location.trim() !== "";


    if (!user) {
        return <LoginRequiredPage />
    }

    return (

        <div className="flex flex-col pb-4 gap-4 w-full">
            <div className="flex flex-col gap-4 w-full">
                <MultiOptions
                    label="Primary Skills"
                    name="primary_skills"
                    options={skills}
                    value={formData.primary_skills}
                    onChange={(val) => updateField("primary_skills", val)}
                />
                <FormTextArea
                    label="Why join us?"
                    name="why_join"
                    placeholder="Add here"
                    required
                    value={formData.why_join}
                    onChange={(val) => updateField("why_join", val)}
                />
                <FormTextArea
                    label="Required Qualifications"
                    name="required_qualifications"
                    placeholder="Add here"
                    required
                    value={formData.required_qualifications}
                    onChange={(val) => updateField("required_qualifications", val)}
                />
                <FormTextArea
                    label="Preferred Qualifications"
                    name="preferred_qualifications"
                    placeholder="Add here"
                    required
                    value={formData.preferred_qualifications}
                    onChange={(val) => updateField("preferred_qualifications", val)}
                />
                <MultiOptions
                    label="Employment Type"
                    name="employment_type"
                    hint="Select only one option"
                    options={employmentTypes}
                    value={formData.employment_type}
                    required={true}
                    single={true}
                    onChange={(val) => updateField("employment_type", val)}
                />

                <FormInput
                    label="Job location"
                    name="location"
                    placeholder="Add here"
                    required
                    value={formData.location}
                    onChange={(val) => updateField("location", val)}
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
        </div>
    );
}
