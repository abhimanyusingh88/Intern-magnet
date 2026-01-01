"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        image: "/Career.png",
        title: "Tired of internship hunts?",
        description: "We've got you covered! Stop searching. Start your career.",
    },
    {
        image: "/Certification.png",
        title: "Get certified, get noticed",
        description: "Industry-recognized certifications that boost your profile.",
    },
    {
        image: "/Skill.png",
        title: "Build real skills",
        description: "Learn by doing with hands-on tasks and mentorship.",
    },
    {
        image: "/Project.png",
        title: "Showcase real projects",
        description: "Work on real-world projects recruiters care about.",
    },
];

export default function HeroSlider() {
    const extendedSlides = [...slides, slides[0]];
    const [index, setIndex] = useState(0);
    const [transition, setTransition] = useState(true);

    // Auto slide → RIGHT only
    useEffect(() => {
        const t = setInterval(() => {
            setIndex((p) => p + 1);
        }, 4000);
        return () => clearInterval(t);
    }, []);

    // Snap back invisibly
    useEffect(() => {
        if (index === slides.length) {
            const t = setTimeout(() => {
                setTransition(false);
                setIndex(0);
            }, 700);
            return () => clearTimeout(t);
        }
        setTransition(true);
    }, [index]);

    const next = () => setIndex((p) => p + 1);

    const prev = () => {
        if (index === 0) {
            setTransition(false);
            setIndex(slides.length - 1);
            requestAnimationFrame(() =>
                requestAnimationFrame(() => setTransition(true))
            );
        } else {
            setIndex((p) => p - 1);
        }
    };

    return (
        <section
            className="
        flex-1 w-full mt-10 relative rounded-xl overflow-hidden
        transform-gpu
        transition-transform duration-300 ease-out
        active:scale-[0.98]
      "
        >
            {/* SLIDER */}
            <div
                className={`absolute inset-0 flex ${transition ? "transition-transform duration-700 ease-in-out" : ""
                    }`}
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {extendedSlides.map((s, i) => (
                    <div key={i} className="relative w-full h-full shrink-0">
                        <Image
                            src={s.image}
                            alt={s.title}
                            fill
                            className="object-cover"
                            priority={i === 0}
                        />

                        {/* Overlay */}
                        <div
                            className="
                absolute inset-0
                bg-linear-to-t
                from-black/80
                via-black/60
                to-black/40
              "
                        />

                        {/* Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
                            <h2
                                className="
                  text-center font-semibold text-white
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  font-sans
                  transition-all duration-700
                "
                            >
                                {s.title}
                            </h2>

                            <p
                                className="
                  mt-6 text-center text-zinc-100
                  max-w-xl sm:max-w-2xl
                  text-lg sm:text-base md:text-xl
                  leading-relaxed
                  font-sans
                  transition-all duration-700
                "
                            >
                                {s.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CHEVRONS */}
            <button
                onClick={prev}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 p-2 rounded-full text-white"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={next}
                className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 z-20 bg-black/40 p-2 rounded-full text-white"
            >
                <ChevronRight />
            </button>
        </section>
    );
}
