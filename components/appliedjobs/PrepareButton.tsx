"use client";
import { JobContext } from "@/lib/types/types";
import { Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";


export default function PrepareButton({ job }: { job: JobContext }) {
    const router = useRouter();

    const handleClick = () => {
        sessionStorage.setItem("interviewJobContext", JSON.stringify(job));
        router.push("/dashboard/interview");
    };

    return (
        <button
            onClick={handleClick}
            className="bg-linear-to-r hover:from-indigo-800 md:text-sm text-[14px] whitespace-nowrap hover:via-purple-800 flex items-center hover:to-indigo-700 from-indigo-700 gap-2 via-purple-700 to-indigo-600 rounded-lg p-2 w-full justify-center cursor-pointer"
        >
            <Lightbulb className="w-4 h-4 sm:h-5 sm:w-5" />
            Prepare
        </button>
    );
}
