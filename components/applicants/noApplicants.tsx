import { UserX } from "lucide-react";

export default function Noapplicants() {
    return <div className="w-full flex flex-col items-center justify-center  ">

        <div className="relative flex items-center justify-center">

            <div className="absolute h-24 w-24 rounded-full bg-zinc-800/40 blur-xl"></div>

            <UserX className="h-12 w-12 text-zinc-500" />
        </div>

        <p className="mt-5 text-zinc-300 text-base font-medium">
            No pending applicants
        </p>

        <p className="text-zinc-500 text-sm mt-1">
            New applicants will appear here once they apply.
        </p>

    </div>
}