import { Briefcase, GraduationCap, TrendingUp, Users, Rocket } from "lucide-react"
import BackGroundGlow from "./BackGroundGlow"
export default function About()
{
    return (
        <main className="relative overflow-hidden bg-zinc-950">
      {/* background glow */}
      <BackGroundGlow/>

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">

        {/* Hero */}
        <section className="mb-20 text-center">
          <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
            About InternMagnet
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            InternMagnet is a modern internship and career platform built to
            bridge the gap between students and real-world opportunities.
            We help students discover internships, get career guidance,
            and stay updated with the evolving job market — all in one place.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="text-xl font-semibold text-zinc-100">Our Mission</h2>
            <p className="mt-4 text-sm text-zinc-400">
              Our mission is to empower students with early career opportunities
              by making internships accessible, transparent, and relevant.
              We aim to remove confusion, reduce skill gaps, and help students
              make informed career decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-8">
            <h2 className="text-xl font-semibold text-zinc-100">Our Vision</h2>
            <p className="mt-4 text-sm text-zinc-400">
              We envision a future where every student has equal access to
              meaningful internships, clear career guidance, and real-time
              insights into the job market — regardless of background.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-20">
          <h2 className="mb-10 text-center text-2xl font-semibold text-zinc-100">
            What We Offer
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Briefcase size={22} />,
                title: "Internship Discovery",
                desc: "Browse verified internships across domains, companies, and skill levels — curated for students."
              },
              {
                icon: <Users size={22} />,
                title: "Post & Hire Talent",
                desc: "Companies and startups can post internship opportunities and connect with motivated students."
              },
              {
                icon: <GraduationCap size={22} />,
                title: "Career Guidance",
                desc: "Get structured guidance on skills, roles, learning paths, and career decisions."
              },
              {
                icon: <TrendingUp size={22} />,
                title: "Job Market Insights",
                desc: "Stay updated with industry trends, in-demand skills, and hiring patterns."
              },
              {
                icon: <Rocket size={22} />,
                title: "Growth-Focused Platform",
                desc: "Built to evolve with students — from first internship to career growth."
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl transition hover:border-white/20"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-indigo-300">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why InternMagnet */}
        <section className="mb-20 rounded-2xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl">
          <h2 className="text-center text-2xl font-semibold text-zinc-100">
            Why InternMagnet?
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-zinc-400">
            We focus on clarity, accessibility, and growth. InternMagnet is
            designed to eliminate noise and provide students with practical,
            actionable opportunities — not just listings.
          </p>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-zinc-100">
            Building Careers, One Opportunity at a Time
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
            Whether you’re a student exploring your future or a company looking
            for fresh talent, InternMagnet is built for you.
          </p>
        </section>

      </div>
    </main>
    )
}