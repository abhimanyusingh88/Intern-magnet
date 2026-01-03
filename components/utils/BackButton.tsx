"use client"
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    function HandleClick() {
        router.back()
    }
    return <ArrowLeftCircle onClick={HandleClick} className="w-8 h-8 sm:w-10 sm:h-10 hover:scale-105 transition-all duration-150 cursor-pointer ease-in-out transform-gpu hover:text-zinc-400 text-zinc-600 top-15 sm:top-17 opacity-65  left-3 sm:left-8 fixed  font-thin" />
}