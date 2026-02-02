"use client";

import { updateProfile } from "@/app/actions/profile";
import { UpdateCommand } from "@/lib/types/types";
import { Award, Link as LinkIcon, Hash, Calendar } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import DynamicProfileSection from "./DynamicProfileSection";
import ProfileItemCard from "./ProfileItemCard";


interface Certification {
    name: string;
    completion_id: string;
    url: string;
    validity: string;
}

export default function Certifications({ data, setFormData }: any) {
    const certifications = Array.isArray(data.certifications) ? data.certifications : [];
    const queryClient = useQueryClient();

    const handleSave = async (command: UpdateCommand<Certification>) => {
        const fd = new FormData();
        fd.append("json_command", JSON.stringify(command));
        await updateProfile(fd);

        setFormData((p: any) => {
            const c = [...(p.certifications || [])];
            if (command.action === "add") c.push(command.item);
            if (command.action === "edit") c[command.index!] = command.item;
            if (command.action === "delete") c.splice(command.index!, 1);
            return { ...p, certifications: c };
        });
        await queryClient.invalidateQueries({ queryKey: ["profileData"] });
    };

    return (
        <DynamicProfileSection
            title="Certifications"
            id="section-certifications"
            items={certifications}
            limit={5}
            itemLabel="Certification"
            emptyMessage="No certifications added yet."
            initialItem={{ name: "", completion_id: "", url: "", validity: "" }}
            onSave={handleSave}
            gridClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
            renderItem={(c, onEdit, onDelete) => (
                <ProfileItemCard
                    title={c.name}
                    icon={Award}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    metadata={
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {c.completion_id && (
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                    <Hash size={12} className="text-indigo-500/50" />
                                    <span>{c.completion_id}</span>
                                </div>
                            )}
                            {c.validity && (
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                    <Calendar size={12} className="text-indigo-500/50" />
                                    <span>{c.validity}</span>
                                </div>
                            )}
                        </div>
                    }
                >
                    {c.url && (
                        <div className="pt-1">
                            <a
                                href={c.url.startsWith('http') ? c.url : `https://${c.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                <LinkIcon size={12} />
                                <span className="truncate max-w-[180px]">View Credential</span>
                            </a>
                        </div>
                    )}
                </ProfileItemCard>
            )}
            renderForm={(i, onChange) => (
                <div className="grid gap-3">
                    <input
                        value={i.name}
                        onChange={(e) => onChange({ ...i, name: e.target.value })}
                        className="input-profile filled"
                        placeholder="Certification name"
                        required
                    />
                    <input
                        value={i.completion_id}
                        onChange={(e) => onChange({ ...i, completion_id: e.target.value })}
                        className="input-profile filled"
                        placeholder="Completion ID"
                    />
                    <input
                        value={i.url}
                        onChange={(e) => onChange({ ...i, url: e.target.value })}
                        className="input-profile filled"
                        placeholder="URL"
                    />
                    <input
                        value={i.validity}
                        onChange={(e) => onChange({ ...i, validity: e.target.value })}
                        className="input-profile filled"
                        placeholder="Validity (dd-mm-yyyy)"
                    />
                </div>
            )}
        />
    );
}
