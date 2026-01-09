"use client"

export default function FaqForm() {
  return <form className="mt-6 grid gap-5 sm:grid-cols-2">
    <input
      name="name"
      type="text"
      placeholder="Your name"
      className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-indigo-500/50 focus:outline-none"
    />

    <input
      name="email"
      type="email"
      placeholder="Email address"
      className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-indigo-500/50 focus:outline-none"
    />

    <textarea
      name="question"
      placeholder="Write your question..."
      rows={4}
      className="sm:col-span-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-indigo-500/50 focus:outline-none"
    />

    <button
      type="submit"
      className="sm:col-span-2 rounded-lg bg-linear-to-r from-indigo-500 to-pink-500 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
    >
      Submit Question
    </button>
  </form>
}