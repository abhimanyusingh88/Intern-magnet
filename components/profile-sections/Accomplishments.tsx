"use client";

import EditableField from "../EditableField";
import { updateProfile } from "@/app/actions/profile";

interface AccomplishmentsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Accomplishments({ data, setFormData }: AccomplishmentsProps) {
    const handleSave = async (name: string, val: string) => {
        const formData = new FormData();
        formData.append(name, val);
        await updateProfile(formData);
        setFormData((prev: any) => ({ ...prev!, [name]: val }));
    };

    return (
        <>
            <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4">
                <EditableField
                    label="Certifications"
                    name="certifications"
                    isTextarea
                    value={data.certifications || ""}
                    onSave={handleSave}
                />
            </div>
            <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4">
                <EditableField
                    label="Awards"
                    name="awards"
                    isTextarea
                    value={data.awards || ""}
                    onSave={handleSave}
                />
            </div>
            <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4">
                <EditableField
                    label="Clubs"
                    name="clubs"
                    isTextarea
                    value={data.clubs || ""}
                    onSave={handleSave}
                />
            </div>
        </>
    );
}
