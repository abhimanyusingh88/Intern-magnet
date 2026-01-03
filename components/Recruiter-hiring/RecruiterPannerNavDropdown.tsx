export default function RecruiterPannerNavDropdown() {
    return (
        <div
            className=" pointer-events-none animate-float absolute left-1/2 top-full mt-4 -translate-x-1/2 w-72 rounded-xl
      border border-white/10 bg-zinc-950 backdrop-blur-xl px-5 py-4 text-sm text-zinc-200 shadow-2xl
      opacity-0 translate-y-2 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0
      group-hover:scale-100
    "
        >
            <p className="font-medium text-white">
                Become a recruiter 🚀
            </p>

            <p className="mt-2 text-zinc-400 leading-relaxed">
                Hire the best talent from across the country and build your dream team
                faster with curated internship applicants.
            </p>

            {/* glow */}
            <div className="absolute inset-0 -z-10 rounded-xl bg-indigo-500/10 blur-xl" />
        </div>
    )
}