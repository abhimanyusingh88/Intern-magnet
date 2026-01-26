"use client"

import React from "react";

interface RecruiterEditFormProps {
    editFormData: {
        recruiter_name: string;
        email: string;
        contact_number: string;
        address: string;
        designation: string;
        organisation_name: string;
        website: string;
        company_domain: string;
        hiring_for: string;
    } | any;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function RecruiterEditForm({ editFormData, handleEditChange }: RecruiterEditFormProps) {
    return (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Recruiter Name</label>
                    <input
                        name="recruiter_name"
                        value={editFormData.recruiter_name || ""}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="Your Full Name"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Business Email</label>
                    <input
                        name="email"
                        value={editFormData.email || ""}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="company@email.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Organisation Name</label>
                    <input
                        name="organisation_name"
                        value={editFormData.organisation_name || ""}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="Company Name"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Designation</label>
                    <input
                        name="designation"
                        value={editFormData.designation || ""}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="e.g. Hiring Manager"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Company Domain</label>
                    <input
                        name="company_domain"
                        value={editFormData.company_domain || ""}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="e.g. Technology, Finance"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Website URL</label>
                    <input
                        name="website"
                        value={editFormData.website || ""}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="https://company.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Contact Number</label>
                    <input
                        name="contact_number"
                        value={editFormData.contact_number || ""}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="Phone Number"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Office Address</label>
                    <input
                        name="address"
                        value={editFormData.address || ""}
                        onChange={handleEditChange}
                        className="input-profile w-full filled"
                        placeholder="City, Country"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Hiring Intent</label>
                <select
                    name="hiring_for"
                    value={editFormData.hiring_for || ""}
                    onChange={handleEditChange}
                    className="input-profile w-full filled appearance-none cursor-pointer"
                >
                    <option value="">Select Intent</option>
                    <option value="Personal">Personal</option>
                    <option value="Business">Business</option>
                    <option value="Organisation">Organisation</option>
                </select>
            </div>
        </div>
    )
}
