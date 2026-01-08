"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import BackGroundGlow from "../BackGroundGlow";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginRequiredPage() {
    const pathName = usePathname();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

            {/* Glow stays subtle in background */}
            <BackGroundGlow />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-lg px-6"
            >
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 sm:p-10">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center">
                            <Lock className="h-7 w-7 text-white" />
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-semibold text-center text-white">
                        Login Required
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-center text-white/70 leading-relaxed">
                        You must be a logged in user to access this page.
                        <br />
                        If you do not have an account, you can create one
                    </p>

                    <div className="mt-8">
                        <Link
                            href={`/login?callbackUrl=${pathName}`}
                            className="
                                flex items-center justify-center
                                h-11 rounded-xl text-sm font-medium
                                bg-white text-black
                                hover:bg-white/90 transition hover:scale-x-105
                            "
                        >
                            Login to Continue
                        </Link>
                    </div>

                    <p className="mt-6 text-xs text-center text-white/50">
                        You’ll be redirected back to job posting after login.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
