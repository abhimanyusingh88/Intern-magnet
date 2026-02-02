export function getInitialProfileData(userData: any = null) {
    return {
        // Main Details
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        address: userData?.address || "",
        dob: userData?.dob || "",
        gender: userData?.gender || "",
        college: userData?.college || "",
        course: userData?.course || "",

        // Career Preferences
        preferred_job_type: userData?.preferred_job_type || "",
        availability: userData?.availability || "",
        preferred_location: userData?.preferred_location || "",

        // Education
        degree: userData?.degree || "",
        college_edu: userData?.college_edu || "",
        college_grade: userData?.college_grade || "",
        education_duration_start: userData?.education_duration_start || "",
        education_duration_end: userData?.education_duration_end || "",

        class_xii: userData?.class_xii || "",
        class_xii_board: userData?.class_xii_board || "",
        class_xii_grade: userData?.class_xii_grade || "",
        class_xii_details_start: userData?.class_xii_details_start || "",
        class_xii_details_end: userData?.class_xii_details_end || "",

        class_x: userData?.class_x || "",
        class_x_board: userData?.class_x_board || "",
        class_x_grade: userData?.class_x_grade || "",
        class_x_details_start: userData?.class_x_details_start || "",
        class_x_details_end: userData?.class_x_details_end || "",

        // Professional Info
        skills: userData?.skills || [],
        internships: Array.isArray(userData?.internships) ? userData.internships : [],
        projects: Array.isArray(userData?.projects) ? userData.projects : [],
        certifications: Array.isArray(userData?.certifications) ? userData.certifications : [],
        exams: Array.isArray(userData?.exams) ? userData.exams : [],

        // Languages
        language_1_name: userData?.language_1_name || "",
        language_1_proficiency: userData?.language_1_proficiency || "",
        language_2_name: userData?.language_2_name || "",
        language_2_proficiency: userData?.language_2_proficiency || "",

        // Summary & Others
        profile_summary: userData?.profile_summary || "",
        awards: userData?.awards || "",
        clubs: userData?.clubs || "",
        resume_path: userData?.resume_path || "",
    };
}

export function getInitialRecruiterData(userData: any = null) {
    return {
        recruiter_name: userData?.recruiter_name || "",
        email: userData?.email || "",
        contact_number: userData?.contact_number || "",
        address: userData?.address || "",
        designation: userData?.designation || "",
        organisation_name: userData?.organisation_name || "",
        website: userData?.website || "",
        company_domain: userData?.company_domain || "",
        hiring_for: userData?.hiring_for || "",
    };
}

export function getInitialDownProfileData(userData: any = null) {
    const full = getInitialProfileData(userData);
    // Return only the fields used in DownProfileComponent if needed, 
    // but actually most fields there are from the full set.
    return full;
}
