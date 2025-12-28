"use client";

import Card from "../ProfileCard";
import EditableField from "../EditableField";
import { updateProfile } from "@/app/actions/profile";

interface ProjectsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Projects({ data, setFormData }: ProjectsProps) {
    const handleSave = async (name: string, val: string) => {
        const formData = new FormData();
        formData.append(name, val);
        await updateProfile(formData);
        setFormData((prev: any) => ({ ...prev!, [name]: val }));
    };

    return (
        <Card id="section-projects" title="Best Project">
            <EditableField
                label="Project Description"
                name="projects"
                value={data.projects || ""}
                isTextarea
                onSave={handleSave}
                placeholder="Describe your key projects and contributions..."
            />
        </Card>
    );
}
