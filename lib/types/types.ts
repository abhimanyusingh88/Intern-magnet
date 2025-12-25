export interface UserProfileData {
    preferred_job_type?: string;
    availability?: string;
    preferred_location?: string;

    degree?: string;
    college_edu?: string;
    education_duration_start?: string;
    education_duration_end?: string;

    class_xii?: string;
    class_xii_board?: string;
    class_xii_details_start?: string;
    class_xii_details_end?: string;

    class_x?: string;
    class_x_board?: string;
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
