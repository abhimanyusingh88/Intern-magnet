"use client"

import { useState, useEffect } from "react"
import { Pencil, Briefcase, User as UserIcon } from "lucide-react"
import Image from "next/image"
import { useProfile } from "../providers/ProfileContext"
import { useQueryClient } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import FieldEditModal from "../FieldEditModal"
import ProfileAdditionalDetails from "./ProfileAdditional"
import MainDetails from "../MainDetails"
import ImageModal from "../utils/ImageModal"
import ProfileEditForm from "./ProfileEditForm"
import ProfileIndicatorText from "./ProfileIndicatorText"
import OnboardingChoice from "./OnboardingChoice"
import RecruiterProfileLayout from "./RecruiterProfileLayout"
import DownProfileComponent from "./DownProfileComponent"
import ProfileModeSwitcher from "./ProfileModeSwitcher"

import { updateProfile } from "@/app/actions/profile"
import { getInitialProfileData, getInitialRecruiterData } from "@/lib/profile-helpers"
import ProfileData from "@/lib/data/UserData"
import RecruiterProfileData from "@/lib/data/RecruiterData"
import { SpinnerBig } from "../utils/SpinnerBig"

export default function ProfileMain({ session }: { session: any }) {
    const { data: userData, isLoading: isUserLoading } = ProfileData();
    const { data: recruiterData, isLoading: isRecruiterLoading } = RecruiterProfileData();
    const {
        activeMode,
        setActiveMode,
        completionPercentage,
        recruiterCompletionPercentage,
        getProgressColor,
        setFields,
        setRecruiterFields,
        profileFields,
    } = useProfile()

    const [isMounted, setIsMounted] = useState(false);
    const [openImageModal, setImageModal] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const queryClient = useQueryClient();
    const sessionImage = session?.user?.image;

    // Determine if onboarding is needed
    // Onboarding is needed if both profiles are effectively empty
    const hasSeekerData = (userData && typeof userData === 'object' && Object.keys(userData).length > 6);
    const hasRecruiterData = (recruiterData && typeof recruiterData === 'object' && Object.keys(recruiterData).length > 6);

    useEffect(() => {
        // Initialize with default fields if userData is null
        const seekerBase = userData || (session?.user?.email ? { email: session.user.email } : null);
        setFields(getInitialProfileData(seekerBase));

        const recruiterBase = recruiterData || (session?.user?.email ? { email: session.user.email } : null);
        setRecruiterFields(getInitialRecruiterData(recruiterBase));
    }, [userData, recruiterData, setFields, setRecruiterFields, session]);

    if (isUserLoading || isRecruiterLoading) return <SpinnerBig />;

    // Show onboarding ONLY if:
    // 1. We have finished loading (checked above)
    // 2. Neither profile has real data
    // 3. We are on the client side (to avoid hydration mismatch)
    // 4. No mode preference exists in localStorage (which activeMode handles)

    const showOnboarding = isMounted && !hasSeekerData && !hasRecruiterData && !localStorage.getItem("profileActiveMode");

    if (showOnboarding) {
        return <OnboardingChoice onChoice={(mode) => {
            setActiveMode(mode);
        }} />;
    }

    const currentCompletion = activeMode === "SEEKER" ? completionPercentage : recruiterCompletionPercentage;

    return (
        <div className="space-y-6">
            {/* Mode Switcher */}
            <ProfileModeSwitcher activeMode={activeMode} setActiveMode={setActiveMode} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeMode}
                    initial={{ opacity: 0, x: activeMode === "SEEKER" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: activeMode === "SEEKER" ? 20 : -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {activeMode === "SEEKER" ? (
                        <>
                            <section className="relative rounded-2xl border border-white/10 bg-zinc-900/60 p-4 md:p-6 backdrop-blur-xl group/card">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="absolute top-4 right-4 z-20 p-2 rounded-lg border border-white/5 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-white/10 hover:bg-zinc-800 transition-all cursor-pointer"
                                >
                                    <Pencil size={18} />
                                </button>

                                {openImageModal &&
                                    <ImageModal open={openImageModal} setOpen={setImageModal} sessionImage={sessionImage} />
                                }

                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row items-start gap-6">
                                        <div className="relative shrink-0 h-28 w-28 group/avatar">
                                            <svg className="absolute -inset-2 h-32 w-32 -rotate-90 transform" viewBox="0 0 128 128">
                                                <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                                                <circle
                                                    cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="4"
                                                    strokeDasharray={364.4}
                                                    strokeDashoffset={364.4 - (364.4 * completionPercentage) / 100}
                                                    className={`${getProgressColor(completionPercentage)} transition-all duration-1000 ease-out`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>

                                            <div className="relative h-full w-full rounded-full border border-white/10 bg-zinc-950 p-1 transition-transform group-hover/avatar:scale-95 duration-500">
                                                <Image
                                                    onClick={() => setImageModal(true)}
                                                    src={sessionImage || "/avatar-placeholder.png"}
                                                    width={112}
                                                    height={112}
                                                    className="h-full cursor-pointer w-full rounded-full object-cover"
                                                    alt="profile"
                                                />
                                            </div>

                                            <div className="absolute -bottom-1 -right-1 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded-full shadow-xl">
                                                <span className={`text-[10px] font-bold ${getProgressColor(completionPercentage)}`}>{completionPercentage}%</span>
                                            </div>
                                        </div>

                                        <MainDetails currentData={profileFields} />
                                    </div>

                                    <ProfileIndicatorText globalCompletionPercentage={completionPercentage} getProgressColor={getProgressColor} />

                                    <ProfileAdditionalDetails currentData={profileFields} />
                                </div>
                            </section>
                            <div className="mt-8">
                                <DownProfileComponent />
                            </div>
                        </>
                    ) : (
                        <RecruiterProfileLayout />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Seeker Edit Modal */}
            <FieldEditModal
                isOpen={isEditModalOpen && activeMode === "SEEKER"}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Profile Details"
                onSave={async () => {
                    setIsSaving(true);
                    try {
                        const formData = new FormData();
                        Object.entries(profileFields).forEach(([k, v]) => {
                            if (v !== null && v !== undefined) formData.append(k, String(v));
                        });
                        await updateProfile(formData);
                        await queryClient.invalidateQueries({ queryKey: ["profileData"] });
                        setIsEditModalOpen(false);
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setIsSaving(false);
                    }
                }}
                isSaving={isSaving}
            >
                <ProfileEditForm editFormData={profileFields as any} handleEditChange={(e) => {
                    const { name, value } = e.target;
                    setFields({ [name]: value });
                }} />
            </FieldEditModal>
        </div >
    )
}
