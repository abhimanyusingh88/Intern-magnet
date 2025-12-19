import { useRef, useEffect } from "react";
import { Check } from "lucide-react";

export default function InputWithTick({ name, onClose, defaultValue }: { name: string, onClose: () => void, defaultValue?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={containerRef} className="flex items-center gap-2 w-full">
            <style dangerouslySetInnerHTML={{
                __html: `
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px #18181b inset !important;
                    -webkit-text-fill-color: white !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}} />
            <input
                autoFocus
                name={name}
                defaultValue={defaultValue}
                autoComplete="on"
                className="flex-1 min-w-0 bg-transparent py-0.5 px-0 text-sm text-white outline-none border-b border-indigo-500/50 focus:border-indigo-400"
            />
            <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-md bg-indigo-500/20 p-1 text-indigo-400 hover:bg-indigo-500/30"
            >
                <Check size={14} />
            </button>
        </div>
    )
}

