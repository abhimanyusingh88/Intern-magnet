"use client";

import { useState } from "react";
import Card from "../ProfileCard";
import { Download, Plus } from "lucide-react";
import { getResumeDownloadUrl } from "@/app/actions/resume";

interface ResumeProps {
    data: any;
    resumeFile: File | null;
    isUploadingResume: boolean;
    setResumeFile: (file: File | null) => void;
}

export default function Resume({
    data,
    resumeFile,
    isUploadingResume,
    setResumeFile,
}: ResumeProps) {
    const [loading, setLoading] = useState(false);

    async function handleDownload() {
        setLoading(true);
        try {
            const url = await getResumeDownloadUrl();
            if (!url) return;
            window.open(url, "_blank");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card id="section-resume" title="Resume">
            <div className="space-y-4">
                {data.resume_path && !resumeFile && (
                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        gap-2
                        p-3
                        rounded-lg
                        bg-indigo-500/5
                        border
                        border-indigo-500/10
                    ">
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                            <p className="text-sm text-zinc-300 truncate">
                                Current:{" "}
                                <span className="text-indigo-400 font-medium">
                                    {data.resume_path?.includes("-")
                                        ? data.resume_path.split("-").slice(2).join("-")
                                        : data.resume_path || "Resume"}
                                </span>
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleDownload}
                            disabled={loading}
                            className="
                                self-start
                                sm:self-auto
                                p-1
                                rounded
                                hover:bg-white/10
                                transition-colors
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                            title="Download Resume"
                        >
                            <Download size={14} className={loading ? "animate-pulse" : "text-indigo-400 cursor-pointer"} />
                        </button>
                    </div>
                )}

                {!resumeFile ? (
                    /* ===== Upload box ===== */
                    <div className="
                        group
                        relative
                        rounded-xl
                        border-2
                        border-dashed
                        border-white/10
                        p-6
                        sm:p-8
                        text-center
                        hover:border-indigo-500/50
                        transition-colors
                        bg-zinc-950/30
                    ">
                        <input
                            type="file"
                            name="resume_file"
                            accept=".pdf,.doc,.docx,.rtf"
                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setResumeFile(file);
                            }}
                        />
                        <div className="flex flex-col items-center">
                            <Plus size={24} className="mb-2 text-indigo-400" />
                            <p className="text-sm font-medium text-zinc-200">
                                {data.resume_path ? "Upload new resume" : "Upload your resume"}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                                Supported formats: doc, docx, rtf, pdf (max 2MB)
                            </p>
                        </div>
                    </div>
                ) : (
                    /* ===== Selected file + button ===== */
                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-4
                        rounded-xl
                        border
                        border-white/10
                        bg-zinc-900/60
                        p-4
                        animate-in
                        fade-in
                        slide-in-from-top-2
                    ">
                        <div className="flex flex-col min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                                New Selection
                            </span>
                            <p className="text-sm text-indigo-400 truncate">
                                {resumeFile.name}
                            </p>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                type="button"
                                disabled={isUploadingResume}
                                onClick={() => setResumeFile(null)}
                                className="
                                    flex-1
                                    sm:flex-none
                                    px-3
                                    py-2
                                    text-xs
                                    font-medium
                                    text-zinc-400
                                    hover:text-white
                                    transition-colors
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isUploadingResume}
                                className={`
                                    flex-1
                                    sm:flex-none
                                    px-5
                                    py-2
                                    text-sm
                                    font-medium
                                    rounded-lg
                                    transition-colors
                                    ${isUploadingResume
                                        ? "bg-indigo-400 cursor-not-allowed"
                                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                    }
                                `}
                            >
                                {isUploadingResume ? "Uploading..." : "Click to Upload"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
