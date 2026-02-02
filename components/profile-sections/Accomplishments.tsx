"use client";

import EditableField from "../EditableField";
import { updateProfile } from "@/app/actions/profile";
import { useQueryClient } from "@tanstack/react-query";

interface AccomplishmentsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Accomplishments({ data, setFormData }: AccomplishmentsProps) {
    const queryClient = useQueryClient();
    const handleSave = async (name: string, val: string) => {
        const formData = new FormData();
        formData.append(name, val);
        await updateProfile(formData);
        setFormData((prev: any) => ({ ...prev!, [name]: val }));
        await queryClient.invalidateQueries({ queryKey: ["profileData"] });
    };

    return (
        <div id="section-accomplishments" className="space-y-3">
            <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4">
                <EditableField
                    label="Awards"
                    name="awards"
                    isTextarea
                    value={String(data.awards || "")}
                    onSave={handleSave}
                />
            </div>
            <div className="bg-zinc-900/60 rounded-xl border border-white/5 p-4">
                <EditableField
                    label="Clubs"
                    name="clubs"
                    isTextarea
                    value={String(data.clubs || "")}
                    onSave={handleSave}
                />
            </div>
        </div>
    );
}
