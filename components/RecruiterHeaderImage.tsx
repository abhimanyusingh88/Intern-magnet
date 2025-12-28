import Image from "next/image";
import NormalButton from "./normalButton";

export default function RecruiterHeaderImage() {
    return (
        <section
            className="
              relative w-full h-[60vh]
              rounded-2xl overflow-hidden
              transform-gpu
              transition-transform duration-300 ease-out
              hover:scale-[1.03]
            "
        >
            <Image
                src="/Recruiter.png"
                alt="Recruiter hiring talent"
                fill
                priority
                className="object-cover"
            />

            {/* Dark gradient overlay */}
            <div
                className="
                absolute inset-0
                bg-linear-to-t
                from-black/85
                via-black/60
                to-black/30
              "
            />

            {/* Side glow (outside feel) */}
            <div
                className="
                pointer-events-none
                absolute -left-32 top-1/2 -translate-y-1/2
                h-[120%] w-64
                bg-[radial-gradient(60%_50%_at_50%_50%,rgba(99,102,241,0.45),transparent_70%)]
              "
            />
            <div
                className="
                pointer-events-none
                absolute -right-32 top-1/2 -translate-y-1/2
                h-[120%] w-64
                bg-[radial-gradient(60%_50%_at_50%_50%,rgba(99,102,241,0.45),transparent_70%)]
              "
            />

            {/* Overlay content */}
            <div
                className="
                absolute inset-0
                flex flex-col items-center justify-center
                px-6 text-center
              "
            >
                <h1
                    className="
                  text-white font-semibold
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
                >
                    Hire the best talent
                </h1>

                <p
                    className="
                  mt-6 text-zinc-200
                  max-w-xl sm:max-w-2xl
                  text-base sm:text-lg md:text-xl
                  leading-relaxed
                "
                >
                    Post internships, discover skilled candidates, and build your team
                    faster with a recruiter-first hiring experience.
                </p>

                <div className="mt-8">
                    <NormalButton
                        link="/add/internship"
                        title="Post an Internship"
                        variant="solid"
                    />
                </div>
            </div>
        </section>
    )
}