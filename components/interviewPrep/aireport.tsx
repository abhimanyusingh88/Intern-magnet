import { AiReport } from "@/lib/types/types";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";



export default function ReportModal({
    open,
    setOpen,
    report,
    setReport

}: {
    open: boolean;
    setOpen: (v: boolean) => void;
    report: AiReport;
    setReport: any;
}) {
    const router = useRouter();
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-[90%] max-w-2xl rounded-2xl bg-[#0f0f0f] border border-neutral-800 shadow-2xl p-6 relative">

                <button
                    onClick={() => {
                        setOpen(false);
                        setReport(null);
                        router.refresh();

                    }}
                    className="absolute right-4 top-4 text-neutral-400 hover:text-white"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-semibold text-white mb-6">
                    Interview Report
                </h2>

                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-xl font-bold text-white">
                        {report?.interview_score}
                    </div>

                    <div>
                        <p className="text-neutral-400 text-sm">Interview Score</p>
                        <p className="text-white font-medium">Out of 100</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-2">
                        Feedback
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2">
                        {report?.feedback_report}
                    </p>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-2">
                        Areas to Improve
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {report?.improvements?.map((item, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
                            >
                                {item.replace("_", "")}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                        Strengths
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {report?.strengths?.map((item, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
                            >
                                {item.replace('_', "")}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}