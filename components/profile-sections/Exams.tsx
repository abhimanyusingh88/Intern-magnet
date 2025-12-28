"use client";

import Card from "../ProfileCard";
import { TwoCol } from "../DividersProfile";
import EditableField from "../EditableField";
import { updateProfile } from "@/app/actions/profile";

interface ExamsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Exams({ data, setFormData }: ExamsProps) {
    const handleSave = async (name: string, val: string) => {
        const formData = new FormData();
        formData.append(name, val);
        await updateProfile(formData);
        setFormData((prev: any) => ({ ...prev!, [name]: val }));
    };

    return (
        <Card id="section-exams" title="Competitive exams">
            <TwoCol>
                <EditableField
                    label="Exam name"
                    name="exam_name"
                    value={data.exam_name || ""}
                    onSave={handleSave}
                />
                <EditableField
                    label="Rank/Score"
                    name="exam_rank"
                    value={data.exam_rank || ""}
                    onSave={handleSave}
                />
            </TwoCol>
        </Card>
    );
}
