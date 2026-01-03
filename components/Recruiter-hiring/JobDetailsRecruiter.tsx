
import FormInput from "./FormInput";
import NormalButton from "../utils/normalButton";
import { FormData } from "@/lib/types/types";
import MultiOptions from "./MultiOptions";
import { AdditionalBenefits } from "./AdditionalBenefits";
import FormTextArea from "../utils/FormTextArea";

export default function JobDetailsRecruiter({
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
        formData.company_name.trim() !== "" &&
        formData.job_title.trim() !== "" &&
        formData.work_experience_min.trim() !== "" &&
        formData.work_experience_max.trim() !== "" &&
        formData.salary_per_month_from.trim() !== "" &&
        formData.salary_per_month_to.trim() !== "" &&
        formData.additional_benefits.trim() !== "" &&
        formData.company_description.trim() !== "" &&
        formData.website_link.trim() !== "";

    return (
        <div className="flex flex-col pb-4 gap-4 w-full">
            <div className="flex flex-col gap-4 w-full">

                <FormInput
                    label="Your company name"
                    name="company_name"
                    placeholder="Company Name"
                    required
                    value={formData.company_name}
                    onChange={(val) => updateField("company_name", val)}
                />
                <FormTextArea
                    label="Company Description"
                    name="company_description"
                    placeholder="Company Description"
                    required
                    value={formData.company_description}
                    onChange={(val) => updateField("company_description", val)}
                />
                <FormInput
                    label="Website Link"
                    hint="(eg. https://www.google.com, if not type NA)"
                    name="website_link"
                    placeholder="Website Link"
                    required
                    value={formData.website_link}
                    onChange={(val) => updateField("website_link", val)}
                />

                <FormInput
                    label="Job Title"
                    name="job_title"
                    placeholder="Job Title"
                    required
                    value={formData.job_title}
                    onChange={(val) => updateField("job_title", val)}
                />

                <div className="flex flex-col gap-2">
                    <p className="font-sans">
                        Work Experience <span className="text-zinc-500">(eg. 0-2 years)</span>
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between w-full">
                        <FormInput
                            label=""
                            name="work_experience_min"
                            placeholder="Min"
                            required
                            numeric
                            value={formData.work_experience_min}
                            onChange={(val) => updateField("work_experience_min", val)}
                        />
                        <span className="mt-5">----</span>
                        <FormInput
                            label=""
                            name="work_experience_max"
                            placeholder="Max"
                            required
                            numeric
                            value={formData.work_experience_max}
                            onChange={(val) => updateField("work_experience_max", val)}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="font-sans">
                        Salary range <span className="text-zinc-500">(eg. 500000)</span>
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between w-full">
                        <FormInput
                            label=""
                            name="salary_per_month_from"
                            placeholder="Min"
                            required
                            numeric
                            value={formData.salary_per_month_from}
                            onChange={(val) => updateField("salary_per_month_from", val)}
                        />
                        <span className="mt-5">----</span>
                        <FormInput
                            label=""
                            name="salary_per_month_to"
                            placeholder="Max"
                            required
                            numeric
                            value={formData.salary_per_month_to}
                            onChange={(val) => updateField("salary_per_month_to", val)}
                        />
                    </div>
                </div>
                <MultiOptions
                    label="Additional benefits"
                    name="additional_benefits"
                    placeholder="Add here"
                    required
                    value={formData.additional_benefits}
                    onChange={(val) => updateField("additional_benefits", val)}
                    options={AdditionalBenefits}
                />


                <div className="flex justify-end w-full">
                    <NormalButton
                        variant="solid"
                        type={count === 5 ? "submit" : "button"}
                        title={count === 5 ? "submit" : "next"}
                        count={count}
                        setCount={setCount}
                        disabled={!isValid}
                    />
                </div>
            </div>
        </div>
    );
}
