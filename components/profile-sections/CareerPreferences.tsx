"use client";

import Card from "../Profile-elements/ProfileCard";
import { TwoCol } from "../DividersProfile";
import EditableField from "../EditableField";
import { joiningDurationData } from "../JoiningDurationData";
import { INDIAN_CITIES } from "@/lib/Cities";
import { updateProfile } from "@/app/actions/profile";
import { useQueryClient } from "@tanstack/react-query";

interface CareerPreferencesProps {
    data: any;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function CareerPreferences({ data, setFormData }: CareerPreferencesProps) {
    const queryClient = useQueryClient();

    const handleSave = async (name: string, val: string) => {
        const formData = new FormData();
        formData.append(name, val);
        await updateProfile(formData);
        setFormData((prev: any) => ({ ...prev!, [name]: val }));
        await queryClient.invalidateQueries({ queryKey: ["profileData"] });
    };

    return (
        <Card id="section-preference" title="Your career preferences">
            <TwoCol>
                <EditableField
                    label="Preferred job type"
                    name="preferred_job_type"
                    value={data.preferred_job_type || ""}
                    onSave={handleSave}
                    options={[
                        { value: "Full-time", label: "Full-time" },
                        { value: "Internship", label: "Internship" }
                    ]}
                />

                <EditableField
                    label="Availability to work"
                    name="availability"
                    value={data.availability || ""}
                    onSave={handleSave}
                    options={joiningDurationData}
                />
            </TwoCol>

            <EditableField
                label="Preferred location"
                margin="mt-2"
                name="preferred_location"
                value={data.preferred_location || ""}
                onSave={handleSave}
                options={INDIAN_CITIES}
                isMulti={true}
                placeholder="Search and select multiple cities"
            />
        </Card>
    );
}
