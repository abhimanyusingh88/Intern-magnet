export interface UserProfileData {
    preferred_job_type?: string;
    availability?: string;
    preferred_location?: string;

    degree?: string;
    college_edu?: string;
    college_grade?: string;
    education_duration_start?: string;
    education_duration_end?: string;

    class_xii?: string;
    class_xii_board?: string;
    class_xii_grade?: string;
    class_xii_details_start?: string;
    class_xii_details_end?: string;

    class_x?: string;
    class_x_board?: string;
    class_x_grade?: string;
    class_x_details_start?: string;
    class_x_details_end?: string;

    skills?: string;

    language_1_name?: string;
    language_1_proficiency?: string;
    language_2_name?: string;
    language_2_proficiency?: string;

    internship_company?: string;
    internship_duration_start?: string;
    internship_duration_end?: string;

    projects?: string;
    profile_summary?: string;

    certifications?: string;
    awards?: string;
    clubs?: string;

    exam_name?: string;
    exam_rank?: string;

    // ... any other fields from schema if needed
    [key: string]: any;
}
export interface UpdateCommand<T> {
    field: string;
    action: 'add' | 'edit' | 'delete';
    item?: T;
    index?: number;
}

export interface DynamicProfileSectionProps<T> {
    title: string;
    id: string;
    items: T[];
    limit: number;
    itemLabel: string;
    emptyMessage: string;
    initialItem: T;
    onSave: (command: UpdateCommand<T>) => Promise<void>;
    renderItem: (item: T, onEdit: () => void, onDelete: () => void) => React.ReactNode;
    renderForm: (item: T, onChange: (item: T) => void) => React.ReactNode;
    gridClassName?: string;
}

export type QuestionType = "yes_no" | "text";

export type Row = {
    question: string;
    type: QuestionType;
};

export type SelectElementProps = {
    row: Row;
    rows: Row[];
    setRows: (rows: Row[]) => void;
    i: number;
};
export type FormData = {
    company_name: string;
    job_title: string;
    work_experience_min: string;
    work_experience_max: string;
    salary_per_month_from: string;
    salary_per_month_to: string;
    additional_benefits: string;
    primary_skills: string;
    employment_type: string;
    location: string;
    screening_questions: { question: string; type: "yes_no" | "text" }[];
    job_description: string;
    application_deadline: string;
    number_of_applications: string;
    educational_requirements: string;
    communication_preferences: string;
    key_responsibilities: string;
    good_to_have: string;
    what_we_offer: string;
    company_description: string;
    website_link: string;
    company_logo?: string;
    why_join?: string;
    required_qualifications?: string;
    preferred_qualifications?: string;
    draft?: boolean;
    id?: string;
    created_at?: string;
    skill_description?: string;
    role?: string;
    selection_process?: string;
};

export interface ScreeningQuestion {
    id?: string;
    question: string;
    type: string;
}

export interface JobDetail {
    id: string;
    job_title: string;
    company_name: string;
    location: string;
    employment_type: string;
    job_description: string;
    educational_requirements: string;
    primary_skills: string;
    work_experience_min: string;
    work_experience_max: string;
    salary_per_month_from: string;
    salary_per_month_to: string;
    application_deadline: string;
    created_at: string;
    number_of_applications: string;
    additional_benefits?: string;
    key_responsibilities?: string;
    good_to_have?: string;
    what_we_offer?: string;
    screening_questions: ScreeningQuestion[];
    company_description?: string;
    website_link?: string;
    communication_preferences?: string;
    company_logo?: string;
    why_join?: string;
    required_qualifications?: string;
    preferred_qualifications?: string;
    skill_description?: string;
    role?: string;
    selection_process?: string;

}
export type FormInputProps = {
    label: string;
    hint?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    numeric?: boolean;
    value?: string;
    onChange?: (value: string) => void;
};
export type MultiOptionsProps = {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    single?: boolean;
    hint?: string;
};

// Unified Jobs Types
export interface UnifiedJob {
    id: string;
    original_id: string;
    source: 'naukri' | 'internal';
    title: string;
    company_name: string;
    location: string;
    experience: string;
    salary: string;
    job_description?: string | null;
    posted_ago?: string | null;
    logo_url?: string | null;
    apply_link?: string | null;
    created_at: string;
}

export interface JobsResponse {
    data: UnifiedJob[];
    nextCursor?: string;
    count: number;
}

export interface JobFilters {
    title?: string;
    location?: string;
    skills?: string;
    minSalary?: number;
    maxSalary?: number;
    minExperience?: number;
    maxExperience?: number;
    jobAge?: number;
    source?: 'naukri' | 'internal';
    sortBy?: 'recent' | 'oldest';
}
