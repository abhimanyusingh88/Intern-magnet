"use client";

import Card from "../Profile-elements/ProfileCard";
import EditableField from "../EditableField";
import { updateProfile } from "@/app/actions/profile";

interface SkillsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Skills({ data, setFormData }: SkillsProps) {
    const handleSave = async (name: string, val: string) => {
        const formData = new FormData();
        formData.append(name, val);
        await updateProfile(formData);
        setFormData((prev: any) => ({ ...prev!, [name]: val }));
    };

    return (
        <Card id="section-skills" title="Key skills">
            <EditableField
                label="Skills"
                name="skills"
                value={data.skills || ""}
                onSave={handleSave}
                placeholder="Add skills separated by comma (e.g. React, Node.js, Design)"
            />
        </Card>
    );
}
