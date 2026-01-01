
import FormInput from "../FormInput";
import NormalButton from "../normalButton";
import { FormData } from "@/lib/types/types";
import MultiOptions from "./MultiOptions";
import Skills from "../profile-sections/Skills";
import { skills } from "./Skills";
export default function CandidatePreferencesRecruiter({
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
        formData.primary_skills.trim() !== "" &&
        formData.employment_type.trim() !== "" &&
        formData.location.trim() !== "";

    return (
        <div className="flex flex-col pb-4 gap-4 w-full">
            <div className="flex flex-col gap-4 w-full">

                {/* <FormInput
                    label="Primary skills"
                    name="primary_skills"
                    placeholder="(eg. Python, Java, C++)"
                    required
                    value={formData.primary_skills}
                    onChange={(val) => updateField("primary_skills", val)}
                /> */}
                <MultiOptions
                    label="Primary Skills"
                    name="primary_skills"
                    options={skills}
                    value={formData.primary_skills}
                    onChange={(val) => updateField("primary_skills", val)}
                />

                <FormInput
                    label="Employment Type"
                    name="employment_type"
                    placeholder="(eg. Full-time, Part-time, Internship)"
                    required
                    value={formData.employment_type}
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
