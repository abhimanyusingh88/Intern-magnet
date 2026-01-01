"use client";

export default function ProgressLine({ count }: { count: number }) {
    const steps = 5;

    const stepNames = [
        "Job details",
        "Candidate preferences",
        "Screening questions",
        "Job description",
        "Communication preferences",
    ];

    return (
        <div className="w-full">
            {/* MOBILE: horizontal | DESKTOP: vertical */}
            <div className="flex flex-row sm:flex-col items-center sm:items-start">
                {Array.from({ length: steps }).map((_, i) => {
                    const active = i <= count;

                    return (
                        <div
                            key={i}
                            className="flex flex-row sm:flex-row items-center"
                        >
                            {/* DOT + LINE */}
                            <div className="flex flex-row sm:flex-col items-center">
                                {/* DOT */}
                                <div
                                    className={`
                    rounded-full transition-all duration-300
                    w-3 h-3 sm:w-4 sm:h-4
                    ${active ? "bg-indigo-500 scale-110" : "bg-white/30"}
                  `}
                                />

                                {/* LINE */}
                                {i !== steps - 1 && (
                                    <div
                                        className={`
      transition-all duration-300
      ${active ? "bg-indigo-500" : "bg-white/10"}
      w-14 h-[2px]
      sm:w-[2px] sm:h-10
    `}
                                    />
                                )}

                            </div>

                            {/* TEXT — hidden on small screens */}
                            <div
                                className={`
                  hidden sm:block
                  ml-4 text-sm transition-colors duration-300
                  ${active ? "text-white" : "text-white/40"}
                `}
                            >
                                {stepNames[i]}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
