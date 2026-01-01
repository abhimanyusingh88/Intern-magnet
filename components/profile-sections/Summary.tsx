"use client";

import Card from "../Profile-elements/ProfileCard";
import EditableField from "../EditableField";
import { updateProfile } from "@/app/actions/profile";

interface SummaryProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Summary({ data, setFormData }: SummaryProps) {
    const handleSave = async (name: string, val: string) => {
        const formData = new FormData();
        formData.append(name, val);
        await updateProfile(formData);
        setFormData((prev: any) => ({ ...prev!, [name]: val }));
    };

    return (
        <Card id="section-summary" title="Profile summary">
            <EditableField
                label="Professional Summary"
                name="profile_summary"
                isTextarea
                value={data.profile_summary || ""}
                onSave={handleSave}
                placeholder="A brief overview of your background and aspirations..."
            />
        </Card>
    );
}
