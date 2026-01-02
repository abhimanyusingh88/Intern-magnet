
import { auth } from "@/lib/auth";
import CandidatePreferencesRecruiter from "./CandidatePreferencesRecruiter";
import CommunicationPrefRecruiter from "./CommunicationPrefRecruiter";
import JobDescriptionRecruiter from "./JobDescriptionRecruiter";
import JobDetailsRecruiter from "./JobDetailsRecruiter";
import ScreeningQuestionsRecruiter from "./ScreeningQuestionsRecruiter";
import { FormData } from "@/lib/types/types";

export default function ChoiceForms({
    count,
    setCount,
    formData,
    setFormData,
    saving,
    user
}: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    saving: boolean;
    user: any;
}) {
    return <div className="transition-opacity duration-300 ease-in-out animate-in fade-in">

        {count === -1 && <JobDetailsRecruiter count={count} setCount={setCount} formData={formData} setFormData={setFormData} />}
        {count === 0 && <CandidatePreferencesRecruiter count={count} user={user} setCount={setCount} formData={formData} setFormData={setFormData} />}
        {count === 1 && <ScreeningQuestionsRecruiter count={count} setCount={setCount} formData={formData} setFormData={setFormData} />}
        {count === 2 && <JobDescriptionRecruiter count={count} setCount={setCount} formData={formData} setFormData={setFormData} />}
        {count === 3 && <CommunicationPrefRecruiter count={count} saving={saving} setCount={setCount} formData={formData} setFormData={setFormData} />}



    </div>
} 