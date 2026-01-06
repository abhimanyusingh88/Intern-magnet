import { Loader2 } from "lucide-react";

export default function DraftSavingButton({ handleSaveDraft, savingDraft }: { handleSaveDraft: () => void, savingDraft: boolean }) {
    return <button
        onClick={handleSaveDraft}
        disabled={savingDraft}
        className="bg-indigo-600 hover:scale-115 hover:bg-indigo-700 hover:text-zinc-50 cursor-pointer transition-all duration-300 transform-gpu text-zinc-100 px-4 py-3 rounded-2xl font-semibold backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2"
    >
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        {savingDraft ? (
            <>
                <span>Saving...</span> <Loader2 className="h-4 w-4 animate-spin" /> </>
        ) : (
            "Save as draft"
        )}
    </button>
}