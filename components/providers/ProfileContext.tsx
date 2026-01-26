"use client"

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react"

export type ProfileMode = "SEEKER" | "RECRUITER";

interface ProfileContextType {
    activeMode: ProfileMode;
    setActiveMode: (mode: ProfileMode) => void;
    profileFields: Record<string, any>;
    setField: (name: string, value: any) => void;
    setFields: (fields: Record<string, any>) => void;
    recruiterFields: Record<string, any>;
    setRecruiterField: (name: string, value: any) => void;
    setRecruiterFields: (fields: Record<string, any>) => void;
    completionPercentage: number;
    recruiterCompletionPercentage: number;
    getProgressColor: (percentage: number) => string;
    isFieldFilled: (key: string, fields?: Record<string, any>) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

const TRACKED_FIELDS = [
    "college", "course", "name", "email", "phone", "address", "dob", "gender",
    "preferred_job_type", "availability", "preferred_location", "degree",
    "college_edu", "education_duration_start", "education_duration_end", "class_xii", "class_xii_board", "class_xii_details_start", "class_xii_details_end",
    "class_x", "class_x_board", "class_x_details_start", "class_x_details_end", "skills",
    "language_1_name", "language_1_proficiency", "language_2_name", "language_2_proficiency",
    "internships", "projects", "profile_summary", "certifications", "awards", "clubs", "exams", "resume_path"
];

const RECRUITER_TRACKED_FIELDS = [
    "recruiter_name", "email", "contact_number", "address", "designation", "organisation_name", "website", "company_domain", "hiring_for"
];

export function ProfileProvider({ children, initialData = {}, initialRecruiterData = {} }: { children: React.ReactNode, initialData?: Record<string, any>, initialRecruiterData?: Record<string, any> }) {
    const [activeMode, setActiveModeState] = useState<ProfileMode>("SEEKER")
    const [profileFields, setProfileFields] = useState<Record<string, any>>(initialData)
    const [recruiterFields, setRecruiterFieldsState] = useState<Record<string, any>>(initialRecruiterData)

    // Load persisted mode on mount or set smart default
    useEffect(() => {
        const savedMode = localStorage.getItem("profileActiveMode") as ProfileMode;
        if (savedMode === "SEEKER" || savedMode === "RECRUITER") {
            setActiveModeState(savedMode);
        } else {
            // Smart default: If user has recruiter data but no seeker data, default to Recruiter
            const hasSeeker = initialData && Object.keys(initialData).length > 2;
            const hasRecruiter = initialRecruiterData && Object.keys(initialRecruiterData).length > 2;

            if (hasRecruiter && !hasSeeker) {
                setActiveModeState("RECRUITER");
            }
        }
    }, [initialData, initialRecruiterData]);

    const setActiveMode = useCallback((mode: ProfileMode) => {
        setActiveModeState(mode);
        localStorage.setItem("profileActiveMode", mode);
    }, []);

    useEffect(() => {
        setProfileFields(initialData);
    }, [initialData]);

    useEffect(() => {
        setRecruiterFieldsState(initialRecruiterData);
    }, [initialRecruiterData]);

    const setField = useCallback((name: string, value: any) => {
        setProfileFields(prev => ({ ...prev, [name]: value }))
    }, [])

    const setFields = useCallback((fields: Record<string, any>) => {
        setProfileFields(prev => ({ ...prev, ...fields }))
    }, [])

    const setRecruiterField = useCallback((name: string, value: any) => {
        setRecruiterFieldsState(prev => ({ ...prev, [name]: value }))
    }, [])

    const setRecruiterFields = useCallback((fields: Record<string, any>) => {
        setRecruiterFieldsState(prev => ({ ...prev, ...fields }))
    }, [])

    const isFieldFilled = useCallback((key: string, fields?: Record<string, any>) => {
        const targetFields = fields || (activeMode === "SEEKER" ? profileFields : recruiterFields);
        const val = targetFields[key];
        if (val === undefined || val === null) return false;
        if (typeof val === 'string') return val.trim() !== "";
        if (Array.isArray(val)) return val.length > 0;
        if (typeof val === 'object') return Object.keys(val).length > 0;
        return true;
    }, [activeMode, profileFields, recruiterFields]);

    const completionPercentage = useMemo(() => {
        const filledFieldsCount = TRACKED_FIELDS.filter(k => isFieldFilled(k, profileFields)).length;
        return Math.round((filledFieldsCount / TRACKED_FIELDS.length) * 100);
    }, [isFieldFilled, profileFields])

    const recruiterCompletionPercentage = useMemo(() => {
        const filledFieldsCount = RECRUITER_TRACKED_FIELDS.filter(k => isFieldFilled(k, recruiterFields)).length;
        return Math.round((filledFieldsCount / RECRUITER_TRACKED_FIELDS.length) * 100);
    }, [isFieldFilled, recruiterFields])

    const getProgressColor = useCallback((percentage: number) => {
        if (percentage < 50) return "text-red-500";
        if (percentage < 70) return "text-orange-500";
        return "text-emerald-500";
    }, [])

    return (
        <ProfileContext.Provider value={{
            activeMode,
            setActiveMode,
            profileFields,
            setField,
            setFields,
            recruiterFields,
            setRecruiterField,
            setRecruiterFields,
            completionPercentage,
            recruiterCompletionPercentage,
            getProgressColor,
            isFieldFilled
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile() {
    const context = useContext(ProfileContext)
    if (context === undefined) {
        throw new Error("useProfile must be used within a ProfileProvider")
    }
    return context
}
