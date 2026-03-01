"use client"
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function HomeImageSliderRight({ currentSlide, index, prev, next }: {
    currentSlide: {
        image: string;
        title: string;
        description: string;
    };
    index: number;
    prev: () => void;
    next: () => void;
}) {
    return <div className="relative order-1 lg:order-2">
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
            {/* Browser Header */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-900/50 border-bottom border-zinc-800">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="ml-4 flex-1 h-5 rounded-md bg-zinc-800/80 flex items-center px-4">
                    <span className="text-[10px] text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap">
                        Product in Action
                    </span>
                </div>
            </div>

            {/* Slider Content */}
            <div className="relative aspect-4/3 sm:aspect-video overflow-hidden group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            fill
                            className="object-cover brightness-80"
                            priority
                        />


                    </motion.div>
                </AnimatePresence>


                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 opacity-80 transition-opacity flex justify-between items-center bg-linear-to-t from-black/20 to-transparent">
                    <div className="flex gap-2">
                        <button
                            onClick={prev}
                            className="p-2 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 transition shadow-lg"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={next}
                            className="p-2 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 transition shadow-lg"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Caption below mockup */}
        <div className="mt-4 text-center px-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
                See how our AI-powered job hunt streamlines everything from applicant screening to final hiring decisions.
            </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="absolute -z-10 -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full" />
    </div>
}
