"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { UnifiedJob } from "@/lib/types/types";
import JobContent from "./jobContent";
import JobCardSmall from "./jobsCard";
import { SpinnerMini } from "../utils/SpinnerMini";
import BrowsMore from "./browsMore";

export function MinimalView() {
    const [jobs, setJobs] = useState<UnifiedJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    // yha bas 4 hi fetch karna hai toh use effect se hi kar lete hai

    useEffect(() => {
        async function fetchJobs() {
            try {
                const res = await fetch("http://localhost:3000/api/minimaljobs", {
                    next: { revalidate: 300 }
                });
                ;
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                }
            } catch (err) {
                console.error("Failed to fetch jobs:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, []);

    const nextSlide = useCallback(() => {
        if (jobs.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % jobs.length);
    }, [jobs.length]);

    const prevSlide = useCallback(() => {
        if (jobs.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + jobs.length) % jobs.length);
    }, [jobs.length]);

    // 4-second auto-slide for mobile
    useEffect(() => {
        if (jobs.length === 0) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);
        return () => clearInterval(interval);
    }, [jobs.length, nextSlide]);

    if (loading) return (
        <div className="w-full gap-2 flex justify-center mt-4">
            <span className="text-zinc-400 text-md inline">Loading...</span>
            <SpinnerMini />
        </div>
    );

    if (jobs.length === 0) return null;

    return (
        <section className="mt-6 w-full">
            <div className="flex items-center justify-between mb-8 px-4 sm:px-0">
                <h3 className="text-lg sm:text-2xl font-semibold text-zinc-100 flex items-center gap-2">
                    <span className="w-1.5 h-10 sm:w-2 sm:h-8 bg-indigo-500 rounded-full" />
                    Recommended Jobs
                </h3>
                <Link
                    href="/jobspage"
                    className="lg:hidden flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                    Browse more
                    <ArrowRight size={14} />
                </Link>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-5 gap-4">
                {jobs.slice(0, 4).map((job) => (
                    <JobCardSmall key={job.id} job={job} />
                ))}

                {/* Browse More Card */}
                <BrowsMore />
            </div>

            {/* Mobile / Tablet Slider */}
            <div className="lg:hidden relative px-4">
                <div className="overflow-hidden rounded-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6"
                        >
                            <JobContent job={jobs[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Arrows */}
                <button
                    onClick={(e) => { e.preventDefault(); prevSlide(); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white z-10 transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={(e) => { e.preventDefault(); nextSlide(); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white z-10 transition-colors"
                >
                    <ChevronRight size={20} />
                </button>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    {jobs.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-indigo-500" : "w-1.5 bg-zinc-800"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}


