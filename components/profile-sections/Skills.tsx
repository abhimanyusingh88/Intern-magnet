import { useState } from "react";
import Card from "../Profile-elements/ProfileCard";
import { updateProfile } from "@/app/actions/profile";
import { X, Plus } from "lucide-react";

interface SkillsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Skills({ data, setFormData }: SkillsProps) {
    const [inputValue, setInputValue] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    const skills: string[] = Array.isArray(data.skills) ? data.skills : [];

    const saveSkills = async (newSkills: string[]) => {
        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append("skills", JSON.stringify(newSkills));
            await updateProfile(formData);
            setFormData((prev: any) => ({ ...prev!, skills: newSkills }));
        } catch (error) {
            console.error("Failed to save skills:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddSkill = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = inputValue.trim();
        if (trimmed && skills.length < 15 && !skills.includes(trimmed)) {
            const nextSkills = [...skills, trimmed];
            saveSkills(nextSkills);
            setInputValue("");
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        const nextSkills = skills.filter(s => s !== skillToRemove);
        saveSkills(nextSkills);
    };

    return (
        <Card id="section-skills" title="Key skills">
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {skills.length > 0 ? (
                        skills.map((skill) => (
                            <div
                                key={skill}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm group transition-all hover:bg-indigo-500/20"
                            >
                                <span>{skill}</span>
                                <button
                                    onClick={() => handleRemoveSkill(skill)}
                                    type="button"
                                    className="p-0.5 rounded-full hover:bg-indigo-500/30 text-indigo-400/60 hover:text-indigo-400"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-zinc-500 text-sm italic">No skills added yet. Add up to 15 skills.</p>
                    )}
                </div>

                {skills.length < 15 && (
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddSkill();
                                    }
                                }}
                                placeholder="Add a skill (e.g. React, Python)"
                                className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                                disabled={isSaving}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                                {skills.length}/15
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleAddSkill()}
                            disabled={!inputValue.trim() || isSaving}
                            className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                )}

                {skills.length >= 15 && (
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold text-center">
                        Skill limit reached (15/15)
                    </p>
                )}
            </div>
        </Card>
    );
}
