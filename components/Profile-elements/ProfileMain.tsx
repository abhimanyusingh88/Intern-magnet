"use client"

import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import Image from "next/image"
import { useProfile } from "./ProfileContext"
import { useQueryClient } from "@tanstack/react-query"
import FieldEditModal from "../FieldEditModal"
import ProfileAdditionalDetails from "./ProfileAdditional"
import MainDetails from "../MainDetails"
import ImageModal from "../ImageModal"
import ProfileEditForm from "./ProfileEditForm"
import ProfileIndicatorText from "./ProfileIndicatorText"

import { updateProfile } from "@/app/actions/profile"
import ProfileData from "@/lib/data/UserData"
import { SpinnerBig } from "../SpinnerBig"

export default function ProfileMain({ session }: { session: any }) {
    const { data: userData, isLoading } = ProfileData();
    const { completionPercentage: globalCompletionPercentage, getProgressColor, setFields } = useProfile()
    const [openImageModal, setImageModal] = useState(false);

    // Helper to derive state from props to ensure consistency
    // We use a function to get the object so we can use it for both initialization and comparisons
    const getInitialData = (user: any, sess: any) => ({
        college: user?.college || "",
        course: user?.course || "",
        name: user?.name || sess?.user?.name || "",
        email: user?.email || sess?.user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        dob: user?.dob || "",
        gender: user?.gender || ""
    });

    // Initialize state from DB data or fallbacks
    const [profileData, setProfileData] = useState(getInitialData(userData, session));

    const sessionImage = session?.user?.image;

    const queryClient = useQueryClient();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editFormData, setEditFormData] = useState(profileData);
    const [isSaving, setIsSaving] = useState(false);

    // Sync state with props when data updates
    useEffect(() => {
        if (userData) {
            const newData = getInitialData(userData, session);
            setProfileData(newData);
            setEditFormData(newData);
            setFields(userData);
        }
    }, [userData, session, setFields]);

    const handleEditOpen = () => {
        setEditFormData(profileData); // Reset form to current data
        setIsEditModalOpen(true);
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleMasterSave = async () => {
        setIsSaving(true);
        try {
            const formData = new FormData();
            Object.entries(editFormData).forEach(([k, v]) => formData.append(k, v));

            await updateProfile(formData);

            // Immediate local update
            setProfileData(editFormData);

            // Force re-fetch to ensure consistency
            await queryClient.invalidateQueries({ queryKey: ["profileData"] });

            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (

            <SpinnerBig />

        )
    }

    return (
        <section className="relative rounded-2xl border border-white/10 bg-zinc-900/60 p-4 sm:p-6 backdrop-blur-xl group/card">
            {/* Edit Icon for the card */}
            <button
                type="button"
                onClick={handleEditOpen}
                className="absolute top-4 right-4 z-20 p-2 rounded-lg border border-white/5 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-white/10 hover:bg-zinc-800 transition-all cursor-pointer"
            >
                <Pencil size={18} />
            </button>


            {openImageModal &&
                <ImageModal open={openImageModal} setOpen={setImageModal} sessionImage={sessionImage} />
            }

            <div className="space-y-6">

                {/* TOP SECTION: PROFILE IMAGE AND PRIMARY INFO */}
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    {/* Profile Image with Progress Ring */}
                    <div className="relative shrink-0 h-28 w-28 group/avatar">
                        {/* Progress Ring SVG */}
                        <svg className="absolute -inset-2 h-32 w-32 -rotate-90 transform" viewBox="0 0 128 128">
                            {/* Background Circle */}
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-white/5"
                            />
                            {/* Progress Circle */}
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeDasharray={364.4}
                                strokeDashoffset={364.4 - (364.4 * globalCompletionPercentage) / 100}
                                className={`${getProgressColor(globalCompletionPercentage)} transition-all duration-1000 ease-out`}
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

                        {/* Percentage Badge */}
                        <div className="absolute -bottom-1 -right-1 bg-zinc-900 border border-white/10 px-2 py-0.5 rounded-full shadow-xl">
                            <span className={`text-[10px] font-bold ${getProgressColor(globalCompletionPercentage)}`}>{globalCompletionPercentage}%</span>
                        </div>
                    </div>

                    {/* The main section on profile */}
                    <MainDetails currentData={profileData} />

                </div>

                {/* Call to Action Text */}
                <ProfileIndicatorText globalCompletionPercentage={globalCompletionPercentage} getProgressColor={getProgressColor} />

                {/* BOTTOM SECTION: ADDITIONAL DETAILS */}
                <ProfileAdditionalDetails
                    currentData={profileData}
                />

                <FieldEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title="Edit Profile Details"
                    onSave={handleMasterSave}
                    isSaving={isSaving}
                >
                    <ProfileEditForm editFormData={editFormData} handleEditChange={handleEditChange} />
                </FieldEditModal>

            </div>
        </section>
    )
}
