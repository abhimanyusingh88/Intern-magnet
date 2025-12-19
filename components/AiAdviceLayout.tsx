export default function AiAdviceLayout() {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-xl shadow-xl transition-all hover:bg-white/5 hover:border-white/20">
            <h3 className="text-lg font-semibold text-zinc-200 mb-2">Resume Score</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Let our AI analyze your resume and give you tips to improve your visibility to recruiters.</p>
        </div>
        <div className="group rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-xl shadow-xl transition-all hover:bg-white/5 hover:border-white/20 border-indigo-500/20">
            <h3 className="text-lg font-semibold text-zinc-200 mb-2  decoration-indigo-500/30 underline-offset-4">Interview Prep</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Get personalized interview questions based on your profile and target companies.</p>
        </div>
        <div className="group rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-xl shadow-xl transition-all hover:bg-white/5 hover:border-white/20">
            <h3 className="text-lg font-semibold text-zinc-200 mb-2">Skill Gap Analysis</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">Identify which skills you need to develop to land your dream internship.</p>
        </div>
    </div>
}