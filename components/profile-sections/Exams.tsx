"use client";

import { updateProfile } from "@/app/actions/profile";
import { UpdateCommand } from "@/lib/types/types";
import { FileText, Trophy } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import DynamicProfileSection from "./DynamicProfileSection";
import DeleteOrEdit from "./deleteoredit";
import ProfileItemCard from "./ProfileItemCard";
// import DynamicProfileSection, { UpdateCommand } from "./DynamicProfileSection";

interface Exam {
    name: string;
    rank: string;
}

interface ExamsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Exams({ data, setFormData }: ExamsProps) {
    const queryClient = useQueryClient();
    const rawExams = data.exams;
    const exams: Exam[] = Array.isArray(rawExams) ? rawExams : [];

    const handleSave = async (command: UpdateCommand<Exam>) => {
        const formData = new FormData();
        formData.append("json_command", JSON.stringify(command));
        await updateProfile(formData);

        setFormData((prev: any) => {
            const next = [...(prev.exams || [])];
            if (command.action === 'add' && command.item) next.push(command.item);
            else if (command.action === 'edit' && command.index !== undefined && command.item) next[command.index] = command.item;
            else if (command.action === 'delete' && command.index !== undefined) next.splice(command.index, 1);
            return { ...prev, exams: next };
        });
        await queryClient.invalidateQueries({ queryKey: ["profileData"] });
    };

    return (
        <DynamicProfileSection<Exam>
            title="Competitive Exams"
            id="section-exams"
            items={exams}
            limit={5}
            itemLabel="Exam"
            emptyMessage="No competitive exams added yet."
            initialItem={{ name: "", rank: "" }}
            onSave={handleSave}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            renderItem={(exam, onEdit, onDelete) => (
                <ProfileItemCard
                    title={exam.name}
                    icon={Trophy}
                    iconColorClass="bg-emerald-500/10 text-emerald-400"
                    onEdit={onEdit}
                    onDelete={onDelete}
                    metadata={
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            <span>RANK / SCORE: </span>
                            <span className="text-emerald-400">{exam.rank}</span>
                        </div>
                    }
                />
            )}
            renderForm={(item, onChange) => (
                <div className="space-y-2">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Exam Name</label>
                        <input
                            value={item.name}
                            onChange={(e) => onChange({ ...item, name: e.target.value })}
                            className="input-profile w-full filled"
                            placeholder="e.g. JEE Mains, GATE, CAT"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Rank/Score</label>
                        <input
                            value={item.rank}
                            onChange={(e) => onChange({ ...item, rank: e.target.value })}
                            className="input-profile w-full filled"
                            placeholder="e.g. AIR 1234 or 99.5 percentile"
                        />
                    </div>
                </div>
            )}
        />
    );
}
