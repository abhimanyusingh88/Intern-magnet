"use client";

import { sections } from "./SectionDataFileds";

export default function SideNav() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for fixed navbar
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <aside className="hidden md:block sticky top-[72px] self-start h-fit max-h-[calc(100vh-100px)] overflow-y-auto p-4 md:border-2 md:border-zinc-800 rounded-xl bg-zinc-900/40 backdrop-blur-md shadow-2xl border-white/5">
            <h3 className="px-4 py-2 mb-2 text-xs font-bold uppercase tracking-widest text-zinc-500 border-b border-white/5">Quick links</h3>
            <nav className="space-y-1">
                {sections.map((item) => (
                    <button
                        key={item.name}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className="w-full cursor-pointer text-left px-4 py-2.5 text-sm font-medium text-zinc-400 rounded-lg hover:text-white hover:bg-white/5 transition-all"
                    >
                        {item.name}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
