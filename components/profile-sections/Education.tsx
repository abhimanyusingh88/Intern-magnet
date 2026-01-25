"use client";

import Card from "../Profile-elements/ProfileCard";
import EducationBlock from "../EducationBlockProfile";
import { Divider } from "../DividersProfile";

interface EducationProps {
    data: any;
    onChange: (e: any, value?: string) => void;
}

export default function Education({ data, onChange }: EducationProps) {
    return (
        <Card id="section-education" title="Education">
            <div className=" space-y-2 md:space-y-4">
                <EducationBlock
                    value={data}
                    onChange={onChange}
                    label="Highest Qualification"
                    degree="degree"
                    college="college_edu"
                    duration="education_duration"
                />
                <Divider />
                <EducationBlock
                    value={data}
                    onChange={onChange}
                    label="Class XII"
                    degree="class_xii"
                    college="class_xii_board"
                    duration="class_xii_details"
                />
                <Divider />
                <EducationBlock
                    value={data}
                    onChange={onChange}
                    label="Class X"
                    degree="class_x"
                    college="class_x_board"
                    duration="class_x_details"
                />
            </div>
        </Card>
    );
}
