"use client";

import Card from "../ProfileCard";
import LanguageRow from "../LanguageRow";

interface LanguagesProps {
    data: any;
    onChange: (e: any, value?: string) => void;
}

export default function Languages({ data, onChange }: LanguagesProps) {
    return (
        <Card id="section-languages" title="Languages">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <LanguageRow value={data} onChange={onChange} label="Language 1" namePrefix="language_1" />
                <LanguageRow value={data} onChange={onChange} label="Language 2" namePrefix="language_2" />
            </div>
        </Card>
    );
}
