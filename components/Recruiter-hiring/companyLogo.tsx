"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

interface CompanyLogoProps {
    onUploadSuccess: (url: string) => void;
    currentLogo?: string;
}

export default function CompanyLogo({ onUploadSuccess, currentLogo }: CompanyLogoProps) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const preview = file ? URL.createObjectURL(file) : currentLogo;

    async function handleAction(formData: FormData) {
        setUploading(true);
        const res = await fetch("/api/companylogo", {
            method: "POST",
            body: formData,
        });

        const result = await res.json();


        if (result?.success && result.url) {
            onUploadSuccess(result.url);
            setFile(null);
        } else {
            alert(result?.error || "Upload failed");
        }
        setUploading(false);
    }

    const containerClasses = `
        h-full w-full rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex items-center justify-center
        ${preview
            ? "bg-zinc-900 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_10px_30px_-10px_rgba(0,0,0,0.5)] border-0"
            : "border-2 border-dashed border-zinc-800 bg-zinc-950/50 hover:border-indigo-500/50 hover:bg-indigo-500/5"}
    `;

    return (
        <form action={handleAction} className="flex items-center gap-5">
            <input
                id="logo-upload-input" type="file" name="company_logo" className="hidden" accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <div className="relative h-20 w-20 group shrink-0">
                <label htmlFor="logo-upload-input" className={containerClasses}>
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Logo"
                            fill
                            unoptimized
                            className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-600 transition-colors group-hover:text-indigo-400">
                            <Plus size={28} strokeWidth={1.5} className="transition-transform group-hover:rotate-90" />
                        </div>
                    )}
                </label>
            </div>

            <div className="flex flex-col justify-center gap-1">
                <p className="text-sm font-semibold text-zinc-100 font-sans">Company Logo</p> <span className="text-zinc-400 text-xs">(Optional)</span>

                {uploading ? (
                    <p className="text-xs text-indigo-400 animate-pulse font-medium">Uploading your brand...</p>
                ) : file ? (
                    <div className="flex gap-2">
                        <button type="submit" className="cursor-pointer rounded-lg bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white transition hover:bg-indigo-500 active:scale-95 shadow-lg shadow-indigo-600/20">
                            CONFIRM UPLOAD
                        </button>
                        <button type="button" onClick={() => setFile(null)} className="cursor-pointer rounded-lg bg-zinc-800 px-3 py-1.5 text-[10px] font-bold text-zinc-400 transition hover:bg-zinc-700 hover:text-zinc-200">
                            CANCEL
                        </button>
                    </div>
                ) : currentLogo ? (
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">Verified</span>
                        <label htmlFor="logo-upload-input" className="text-[10px] text-zinc-500 hover:text-red-400 transition font-bold uppercase tracking-wider underline underline-offset-4 cursor-pointer">
                            Change Logo
                        </label>
                    </div>
                ) : (
                    <p className="text-[10px] text-zinc-500 font-medium">Recommended: PNG, 500x500px</p>
                )}
            </div>
        </form>
    );
}

