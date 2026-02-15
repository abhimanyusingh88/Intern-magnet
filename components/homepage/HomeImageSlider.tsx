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
        <section className="relative mt-6 h-[300px] sm:h-[350px] md:h-[450px] w-full overflow-hidden rounded-3xl bg-black">


            <div
                className={`absolute inset-0 flex ${animate ? "transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)]" : ""
                    }`}
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {extended.map((s, i) => (
                    <div key={i} className="relative h-full w-full shrink-0 overflow-hidden">

                        {/* Image */}
                        <Image
                            src={s.image}
                            alt={s.title}
                            fill
                            priority
                            className="object-cover"
                        />


                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />


                        <div className="absolute inset-0 flex items-center px-10 md:px-20">
                            <div className="max-w-xl text-white">

                                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight transition-opacity duration-500">
                                    {s.title}
                                </h2>

                                <p className="mt-5 text-base md:text-lg text-zinc-200 leading-relaxed transition-opacity duration-500">
                                    {s.description}
                                </p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <button
                onClick={prev}
                className="absolute left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-pink-500/50 transition"
            >
                <ChevronLeft size={18} />
            </button>

            <button
                onClick={next}
                className="absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-pink-500/50 transition"
            >
                <ChevronRight size={18} />
            </button>


            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
                <div
                    className="h-full bg-pink-400 transition-all duration-700"
                    style={{ width: `${((index - 1) / total) * 100}%` }}
                />
            </div>

        </section>
    );

}
