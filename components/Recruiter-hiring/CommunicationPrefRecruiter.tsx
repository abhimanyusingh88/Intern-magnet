import Link from "next/link";
import FormInput from "./FormInput";
import NormalButton from "../utils/normalButton";
import { FormData } from "@/lib/types/types";
export default function CommunicationPrefRecruiter({
    count,
    setCount,
    formData,
    setFormData,
    saving
}: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    saving: boolean
}) {
    const updateField = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isValid = formData.communication_preferences.trim() !== "";

    return <div className="flex flex-col gap-4">
        <FormInput
            label="Communication preferences"
            name="communication_preferences"
            placeholder="Add here"
            required
            hint="(eg. email, phone, in-person interview)"
            value={formData.communication_preferences}
            onChange={(val) => updateField("communication_preferences", val)}
        />
        <div className="flex justify-between">
            <p className=" text-xs text-zinc-500 sm:text-sm max-w-xs">
                Please review everything carefully by navigating to different fields before submitting and by submitting this you are agreeing to our <Link href="/terms"> <span className=" transition-colors text-zinc-400 hover:text-zinc-500  bg-clip-text">Terms & Conditions</span></Link>
            </p>
        </div>
        <div className="flex justify-between">
            <NormalButton
                title="back"
                type="button"
                front={false}
                count={count}
                setCount={setCount}
            />
            <NormalButton
                title="submit"
                type="submit"
                front={true}
                disabled={!isValid}
                saving={saving}
            />
        </div>
    </div>
}