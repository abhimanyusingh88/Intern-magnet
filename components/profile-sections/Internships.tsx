"use client";

import Card from "../Profile-elements/ProfileCard";
import InternshipBlock from "../InternshipBlockProfile";

interface InternshipsProps {
    data: any;
    onChange: (e: any, value?: string) => void;
    setFormData: (fn: (prev: any) => any) => void;
}

export default function Internships({ data, onChange, setFormData }: InternshipsProps) {
    return (
        <Card id="section-internships" title=" Best Internship">
            <InternshipBlock
                value={data}
                onChange={onChange}
                label="Internship Experience"
                company="internship_company"
                duration="internship_duration"
            />
        </Card>
    );
}
