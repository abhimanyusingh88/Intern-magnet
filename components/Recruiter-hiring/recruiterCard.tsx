export default function RecruiterCard({ title, description }: { title: string, description: string }) {
    return (

        <div className="rounded-xl hover:scale-[1.08] transform-gpu transition-transform duration-300 ease-out border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-medium text-white">
                {title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
                {description}
            </p>
        </div>
    )
}