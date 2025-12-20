"use client"

import React, { createContext, useContext, useState, useCallback, useMemo } from "react"

interface ProfileContextType {
    profileFields: Record<string, any>;
    setField: (name: string, value: any) => void;
    setFields: (fields: Record<string, any>) => void;
    completionPercentage: number;
    getProgressColor: (percentage: number) => string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

const TRACKED_FIELDS = [
    "college", "course", "name", "email", "phone", "address", "dob", "gender",
    "preferred_job_type", "availability", "preferred_location", "degree",
    "college_edu", "education_duration", "class_xii", "class_xii_board", "class_xii_details",
    "class_x", "class_x_board", "class_x_details", "skills",
    "language_1_name", "language_1_proficiency", "language_2_name", "language_2_proficiency",
    "internship_company", "internship_duration", "projects", "profile_summary",
    "certifications", "awards", "clubs", "exam_name", "exam_rank", "resume"
];

export function ProfileProvider({ children, initialData = {} }: { children: React.ReactNode, initialData?: Record<string, any> }) {
    const [profileFields, setProfileFields] = useState<Record<string, any>>(initialData)

    const setField = useCallback((name: string, value: any) => {
        setProfileFields(prev => ({ ...prev, [name]: value }))
    }, [])

    const setFields = useCallback((fields: Record<string, any>) => {
        setProfileFields(prev => ({ ...prev, ...fields }))
    }, [])

    const completionPercentage = useMemo(() => {
        const filledFieldsCount = TRACKED_FIELDS.filter(key => {
            const val = profileFields[key];
            if (typeof val === 'string') return val.trim() !== "";
            return val !== undefined && val !== null;
        }).length;

        return Math.round((filledFieldsCount / TRACKED_FIELDS.length) * 100);
    }, [profileFields])

    const getProgressColor = useCallback((percentage: number) => {
        if (percentage < 50) return "text-red-500";
        if (percentage < 70) return "text-orange-500";
        return "text-emerald-500";
    }, [])

    return (
        <ProfileContext.Provider value={{ profileFields, setField, setFields, completionPercentage, getProgressColor }}>
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
