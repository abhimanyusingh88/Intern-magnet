import { useProfile } from "../providers/ProfileContext";
import { sections } from "../SectionDataFileds";

export default function SideNav() {
    const { isFieldFilled } = useProfile();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
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
                {sections.map((item) => {
                    const isComplete = item.fields.every(f => isFieldFilled(f));

                    return (
                        <button
                            key={item.name}
                            type="button"
                            onClick={() => scrollToSection(item.id)}
                            className="w-full group/nav hover:scale-[1.02] cursor-pointer text-left px-4 py-2.5 text-sm font-medium text-zinc-400 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-150 ease-in-out flex items-center justify-between"
                        >
                            <span>{item.name}</span>
                            {isComplete && (
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 " />
                            )}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
