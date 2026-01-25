import { UserProfileData } from "./types/types";

export function getInitialDownProfileData(userData: UserProfileData | null | any) {
    return {
        preferred_job_type: userData?.preferred_job_type || "",
        availability: userData?.availability || "",
        preferred_location: userData?.preferred_location || "",

        degree: userData?.degree || "",
        college_edu: userData?.college_edu || "",
        education_duration_start: userData?.education_duration_start || "",
        education_duration_end: userData?.education_duration_end || "",

        class_xii: userData?.class_xii || "",
        class_xii_board: userData?.class_xii_board || "",
        class_xii_details_start: userData?.class_xii_details_start || "",
        class_xii_details_end: userData?.class_xii_details_end || "",

        class_x: userData?.class_x || "",
        class_x_board: userData?.class_x_board || "",
        class_x_details_start: userData?.class_x_details_start || "",
        class_x_details_end: userData?.class_x_details_end || "",

        skills: userData?.skills || "",

        language_1_name: userData?.language_1_name || "",
        language_1_proficiency: userData?.language_1_proficiency || "",
        language_2_name: userData?.language_2_name || "",
        language_2_proficiency: userData?.language_2_proficiency || "",

        internship_company: userData?.internship_company || "",
        internship_duration_start: userData?.internship_duration_start || "",
        internship_duration_end: userData?.internship_duration_end || "",
        internships: userData?.internships || [],
        projects: userData?.projects || [],
        profile_summary: userData?.profile_summary || "",

        awards: userData?.awards || "",
        clubs: userData?.clubs || "",

        certifications: Array.isArray(userData?.certifications) ? userData.certifications : [],
        exams: Array.isArray(userData?.exams) ? userData.exams : [],
        resume_path: userData?.resume_path || "",
    };
}
