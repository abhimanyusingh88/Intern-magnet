'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { features } from "./constants";

export default function TrustSection() {

    return (
        <section className="w-full mt-4 py-10 rounded-2xl sm:rounded-none sm:py-12 lg:py-16 bg-white dark:bg-zinc-900/50 border-y border-gray-100 dark:border-zinc-800">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
                        <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-pink-500">
                                Trusted by Thousands
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                We prioritize quality over quantity. Our rigorous verification process ensures you only apply to legitimate opportunities that match your career goals.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors duration-300"
                                >
                                    <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg shadow-xs shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-1">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-snug">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative animate-float w-full max-w-full sm:max-w-xl lg:max-w-none mx-auto">
                            <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl transform rotate-3 blur-2xl"></div>
                            <Image
                                src="/trustt.png"
                                alt="Trusted Job Platform"
                                width={1200}
                                height={1200}
                                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-800 relative z-10"
                                priority
                                quality={75}
                                unoptimized
                            />


                            {/* Floating Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="absolute -bottom-6 -right-4 sm:-right-8 z-20 bg-white dark:bg-zinc-900 p-3 sm:p-4 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-800 hidden sm:flex items-center gap-3"
                            >
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900"
                                        />
                                    ))}
                                </div>
                                <div className="text-xs sm:text-sm">
                                    <p className="font-bold text-gray-900 dark:text-white">2000+ New</p>
                                    <p className="text-xs text-gray-500">Jobs this week</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
