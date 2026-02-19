"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { slides } from "./constants";
import Link from "next/link";
import HomeImageSliderRight from "./homeimageSliderRight";

export default function HeroSlider() {
    const [index, setIndex] = useState(0);
    const total = slides.length;

    const next = () => setIndex((i) => (i + 1) % total);
    const prev = () => setIndex((i) => (i - 1 + total) % total);

    const currentSlide = slides[index];

    return (
        <section className="relative mt-8 sm:mt-12 md:mt-16 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


                <div className="flex flex-col space-y-6 sm:space-y-8 order-2 lg:order-1">
                    <div className="space-y-4 sm:space-y-6">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-sm font-medium text-zinc-400">
                            Transform your job hunt using intern-magnet
                        </div>

                        <div className="min-h-[200px] sm:min-h-[250px] relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="space-y-6"
                                >
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                                        {currentSlide.title}
                                    </h1>
                                    <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-lg">
                                        {currentSlide.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4 ">
                        <Link href="/jobspage" className="px-8 py-3 bg-white text-zinc-900 rounded-xl flex items-center justify-center font-semibold hover:bg-zinc-100 transition-colors shadow-none">
                            View Jobs
                        </Link >
                        <Link href="/dashboard" className="px-8 py-3.5  bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-xl font-semibold flex items-center group hover:bg-zinc-800 transition-all">
                            Dashboard Access
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link >
                    </div>

                    {/* Progress Dots/Lines (Optional but helps) */}
                    <div className="flex gap-2 pt-8">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-1.5 transition-all duration-300 rounded-full ${i === index ? "w-8 bg-zinc-900 dark:bg-white" : "w-4 bg-zinc-200 dark:bg-zinc-800"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Visual Asset in Mockup */}
                <HomeImageSliderRight currentSlide={currentSlide} index={index} prev={prev} next={next} />
            </div>
        </section>
    );
}
