"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "./constants";



export default function HeroSlider() {
    const total = slides.length;

    // clone both ends
    const extended = [slides[total - 1], ...slides, slides[0]];

    const [index, setIndex] = useState(1);
    const [animate, setAnimate] = useState(true);

    // auto slide
    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => i + 1);
        }, 4000);
        return () => clearInterval(id);
    }, []);

    // snap logic (THE FIX)
    useEffect(() => {
        if (index === total + 1) {
            setTimeout(() => {
                setAnimate(false);
                setIndex(1);
            }, 700);
        }

        if (index === 0) {
            setTimeout(() => {
                setAnimate(false);
                setIndex(total);
            }, 700);
        }

        setTimeout(() => setAnimate(true), 0);
    }, [index, total]);

    const next = () => setIndex((i) => i + 1);
    const prev = () => setIndex((i) => i - 1);

    return (
        <section className="relative mt-6 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full overflow-hidden rounded-2xl">
            <div
                className={`absolute inset-0 flex ${animate ? "transition-transform duration-700 ease-in-out" : ""
                    }`}
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {extended.map((s, i) => (
                    <div key={i} className="relative h-full w-full shrink-0">
                        <Image src={s.image} loading="eager" alt={s.title} fill className="object-cover" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white">
                                {s.title}
                            </h2>
                            <p className="mt-6 font-thin max-w-2xl text-lg md:text-xl text-zinc-100">
                                {s.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={prev}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={next}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white"
            >
                <ChevronRight />
            </button>
        </section>
    );
}
