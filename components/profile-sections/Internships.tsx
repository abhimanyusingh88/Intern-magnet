import { updateProfile } from "@/app/actions/profile";
import { Calendar, Building2 } from "lucide-react";
import YearRangePicker from "../utils/YearRangePicker";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateCommand } from "@/lib/types/types";
import DynamicProfileSection from "./DynamicProfileSection";
import ProfileItemCard from "./ProfileItemCard";
// import DynamicProfileSection, { UpdateCommand } from "./DynamicProfileSection";

interface Internship {
    company: string;
    role: string;
    description: string;
    duration_start: string;
    duration_end: string;
}

interface InternshipsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Internships({ data, setFormData }: InternshipsProps) {
    const queryClient = useQueryClient();
    const rawInternships = data.internships;
    const internships: Internship[] = Array.isArray(rawInternships) ? rawInternships : [];

    const handleSave = async (command: UpdateCommand<Internship>) => {
        const formData = new FormData();
        formData.append("json_command", JSON.stringify(command));
        await updateProfile(formData);

        // Optimistic local update
        setFormData((prev: any) => {
            const next = [...(prev.internships || [])];
            if (command.action === 'add' && command.item) next.push(command.item);
            else if (command.action === 'edit' && command.index !== undefined && command.item) next[command.index] = command.item;
            else if (command.action === 'delete' && command.index !== undefined) next.splice(command.index, 1);
            return { ...prev, internships: next };
        });
        await queryClient.invalidateQueries({ queryKey: ["profileData"] });
    };

    return (
        <DynamicProfileSection<Internship>
            title="Internship Experiences"
            id="section-internships"
            items={internships}
            limit={3}
            itemLabel="Internship"
            emptyMessage="No internship experiences added yet."
            initialItem={{ company: "", role: "", description: "", duration_start: "", duration_end: "" }}
            onSave={handleSave}
            gridClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
            renderItem={(intern, onEdit, onDelete) => (
                <ProfileItemCard
                    title={intern.company}
                    subtitle={intern.role}
                    description={intern.description}
                    icon={Building2}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    metadata={
                        <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                            <Calendar size={12} className="text-indigo-500/50" />
                            <span>{intern.duration_start} — {intern.duration_end}</span>
                        </div>
                    }
                />
            )}
            renderForm={(item, onChange) => (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Company Name</label>
                        <input
                            value={item.company}
                            onChange={(e) => onChange({ ...item, company: e.target.value })}
                            className="input-profile w-full filled"
                            placeholder="e.g. Google, Microsoft"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Role/Position</label>
                        <input
                            value={item.role}
                            onChange={(e) => onChange({ ...item, role: e.target.value })}
                            className="input-profile w-full filled"
                            placeholder="e.g. Frontend Developer Intern"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Description</label>
                        <textarea
                            rows={6}
                            value={item.description}
                            onChange={(e) => onChange({ ...item, description: e.target.value })}
                            className="input-profile resize-none w-full filled"
                            placeholder="Description"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Duration</label>
                        <YearRangePicker
                            namePrefix="duration"
                            startYear={item.duration_start}
                            endYear={item.duration_end}
                            onChange={(name: string, val: string) => {
                                if (name === "duration_start") onChange({ ...item, duration_start: val });
                                if (name === "duration_end") onChange({ ...item, duration_end: val });
                            }}
                        />
                    </div>
                </div>
            )}
        />
    );
}
