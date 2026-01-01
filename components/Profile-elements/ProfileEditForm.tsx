import React from "react";

interface ProfileEditFormProps {
    editFormData: {
        name: string;
        email: string;
        college: string;
        course: string;
        phone: string;
        dob: string;
        gender: string;
        address: string;
    };
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ProfileEditForm({ editFormData, handleEditChange }: ProfileEditFormProps) {
    // Simplified date converters using one-liners
    const dobForInput = editFormData.dob?.includes("/")
        ? editFormData.dob.split("/").reverse().join("-")
        : editFormData.dob;

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Convert yyyy-mm-dd -> dd/mm/yyyy directly
        const value = e.target.value.split("-").reverse().join("/");

        // Create a synthetic event matching the expected signature
        // We need to cast it to match React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        const syntheticEvent = {
            target: {
                name: e.target.name,
                value
            }
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        handleEditChange(syntheticEvent);
    };

    return (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase">First Name</label>
                    <input
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="Your Name"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Email</label>
                    <input
                        name="email"
                        value={editFormData.email}
                        disabled
                        className="input-profile w-full filled opacity-50 cursor-not-allowed"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase">College</label>
                <input
                    name="college"
                    value={editFormData.college}
                    onChange={handleEditChange}
                    className="input-profile w-full filled"
                    placeholder="College Name"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase">Course</label>
                <input
                    name="course"
                    value={editFormData.course}
                    onChange={handleEditChange}
                    className="input-profile w-full filled"
                    placeholder="Course Name"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Phone</label>
                    <input
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="Phone Number"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={dobForInput}
                        onChange={handleDateChange}
                        className="input-profile w-full filled"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Gender</label>
                    <select
                        name="gender"
                        value={editFormData.gender}
                        onChange={handleEditChange}
                        className="input-profile w-full filled appearance-none"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase">Address</label>
                    <input
                        name="address"
                        value={editFormData.address}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="Address"
                    />
                </div>
            </div>
        </div>
    )
}
