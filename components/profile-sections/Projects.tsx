import { updateProfile } from "@/app/actions/profile";
import { UpdateCommand } from "@/lib/types/types";
import { Trash2, Pencil, Briefcase } from "lucide-react";
import DynamicProfileSection from "./DynamicProfileSection";
import DeleteOrEdit from "./deleteoredit";
import ProfileItemCard from "./ProfileItemCard";
// import DynamicProfileSection, { UpdateCommand } from "./DynamicProfileSection";

interface Project {
    title: string;
    description: string;
}

interface ProjectsProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Projects({ data, setFormData }: ProjectsProps) {
    const rawProjects = data.projects;
    const projects: Project[] = Array.isArray(rawProjects) ? rawProjects : [];

    const handleSave = async (command: UpdateCommand<Project>) => {
        const formData = new FormData();
        formData.append("json_command", JSON.stringify(command));
        await updateProfile(formData);

        setFormData((prev: any) => {
            const next = [...(prev.projects || [])];
            if (command.action === 'add' && command.item) next.push(command.item);
            else if (command.action === 'edit' && command.index !== undefined && command.item) next[command.index] = command.item;
            else if (command.action === 'delete' && command.index !== undefined) next.splice(command.index, 1);
            return { ...prev, projects: next };
        });
    };

    return (
        <DynamicProfileSection<Project>
            title="Key Projects"
            id="section-projects"
            items={projects}
            limit={3}
            itemLabel="Project"
            emptyMessage="No projects added yet."
            initialItem={{ title: "", description: "" }}
            onSave={handleSave}
            gridClassName="grid grid-cols-1 lg:grid-cols-2 gap-4"
            renderItem={(proj, onEdit, onDelete) => (
                <ProfileItemCard
                    title={proj.title}
                    subtitle={proj.description}
                    icon={Briefcase}
                    bgClass="bg-linear-to-b from-zinc-900/50 to-zinc-900/30"
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
            renderForm={(item, onChange) => (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Project Title</label>
                        <input
                            value={item.title}
                            onChange={(e) => onChange({ ...item, title: e.target.value })}
                            className="input-profile w-full filled"
                            placeholder="e.g. E-commerce Website, AI Chatbot"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Description</label>
                        <textarea
                            value={item.description}
                            onChange={(e) => onChange({ ...item, description: e.target.value })}
                            className="input-profile min-h-[150px] w-full resize-none filled textarea-scroll"
                            placeholder="Describe your project, technologies used, and your contribution..."
                        />
                    </div>
                </div>
            )}
        />
    );
}
