import BackGroundGlow from "@/components/BackGroundGlow";
import NetBg from "@/components/utils/netBg";
import RecruiterForms from "@/components/Recruiter-hiring/recruiterForms";
import { auth } from "@/lib/auth";
import { Rocket } from "lucide-react";

export default async function InternshipPage() {
    const session = await auth();
    const user = session?.user?.name
    return (
        <main className="
      w-full bg-black
      flex flex-col
      px-6 sm:px-10 md:px-20 lg:px-36
      pt-20 pb-10
    ">
            <BackGroundGlow />
            <div className="relative flex flex-col items-center gap-3 text-center">

                {/* GRID TEXTURE BACKGROUND */}
                <NetBg />

                <div className="relative flex items-center gap-3">
                    <h1 className="
            text-xl sm:text-2xl md:text-3xl
            font-semibold tracking-tight
            bg-linear-to-r from-indigo-400 to-pink-400
            bg-clip-text text-transparent
          ">
                        Complete the details to proceed with the recruitment process
                    </h1>

                    <Rocket size={28} className="text-indigo-400" />
                </div>

                <p className="text-sm text-white/60 max-w-xl">
                    Step-by-step setup to help you hire faster and better.
                </p>

            </div>
            <div className="flex justify-center w-full mt-10 sm:mt-20 ">
                <RecruiterForms user={user} />
            </div>
        </main>
    );
}
