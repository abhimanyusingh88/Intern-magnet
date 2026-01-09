"use client"

import BackGroundGlow from "../BackGroundGlow";
import FaqAccordion from "./FaqAccordion";
import FaqForm from "./FaqForm";

export default function FaqPage({ faqs, setOpen, open }: any) {
    return (
        <>
            <BackGroundGlow />

            <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20">
                {/* Header */}
                <div className="mb-14 text-center">
                    <h1 className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                        Frequently Asked Questions of users
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
                        Find answers to common questions about InternMagnet, internships,
                        applications, and career guidance.
                    </p>
                </div>

                {/* FAQ Accordions */}
                <FaqAccordion faqs={faqs} setOpen={setOpen} open={open} />

                {/* Ask a Question */}
                <div className="mt-16 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-10">
                    <h2 className="text-xl font-semibold text-zinc-100">
                        Still have a question?
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        Didn’t find what you were looking for? Send us your question and our
                        team will get back to you.
                    </p>

                    {/* Form (server-action ready) */}
                    <FaqForm />
                </div>
            </div>
        </>
    )
}