export default function ContactForm()
{
    return (
        <form action="" className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
              
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-indigo-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-indigo-400"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-indigo-400"
              />

              <textarea
                name="message"
                rows={5}
                placeholder="Your message"
                className="w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-indigo-400"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Send Message
              </button>

              <p className="text-xs text-zinc-500">
                By submitting this form, you agree to our Terms & Privacy Policy.
              </p>
            </form>
    )
}