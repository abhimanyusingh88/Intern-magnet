"use client"

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react"

interface ProfileContextType {
    profileFields: Record<string, any>;
    setField: (name: string, value: any) => void;
    setFields: (fields: Record<string, any>) => void;
    completionPercentage: number;
    getProgressColor: (percentage: number) => string;
    isFieldFilled: (key: string) => boolean;
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

export function ProfileProvider({ children, initialData = {} }: { children: React.ReactNode, initialData?: Record<string, any> }) {
    const [profileFields, setProfileFields] = useState<Record<string, any>>(initialData)

    useEffect(() => {
        setProfileFields(initialData);
    }, [initialData]);

    const setField = useCallback((name: string, value: any) => {
        setProfileFields(prev => ({ ...prev, [name]: value }))
    }, [])

    const setFields = useCallback((fields: Record<string, any>) => {
        setProfileFields(prev => ({ ...prev, ...fields }))
    }, [])

    const isFieldFilled = useCallback((key: string) => {
        const val = profileFields[key];
        if (val === undefined || val === null) return false;
        if (typeof val === 'string') return val.trim() !== "";
        if (Array.isArray(val)) return val.length > 0;
        if (typeof val === 'object') return Object.keys(val).length > 0;
        return true;
    }, [profileFields]);

    const completionPercentage = useMemo(() => {
        const filledFieldsCount = TRACKED_FIELDS.filter(isFieldFilled).length;
        return Math.round((filledFieldsCount / TRACKED_FIELDS.length) * 100);
    }, [isFieldFilled])

    const getProgressColor = useCallback((percentage: number) => {
        if (percentage < 50) return "text-red-500";
        if (percentage < 70) return "text-orange-500";
        return "text-emerald-500";
    }, [])

    return (
        <ProfileContext.Provider value={{ profileFields, setField, setFields, completionPercentage, getProgressColor, isFieldFilled }}>
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
