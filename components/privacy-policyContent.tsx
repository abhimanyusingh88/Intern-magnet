"use client"

import BackGroundGlow from "./BackGroundGlow"

export default function PrivacyPolicyContent() {
  return (
    <main className="relative overflow-hidden bg-zinc-950">
      {/* background glow */}
      <BackGroundGlow/>

      <div className="relative mx-auto max-w-4xl px-5 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
            This Privacy Policy explains how InternMagnet collects, uses,
            discloses, and protects your personal information.
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            Last updated: 16 December 2025
          </p>
        </div>

        {/* Card */}
        <div className="space-y-12 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-10">
          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              1. Introduction
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              InternMagnet (“we”, “our”, or “us”) is committed to protecting your
              privacy. This Privacy Policy describes how we collect and process
              your personal data when you access or use our website, services,
              and related tools (collectively, the “Service”).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              2. Information We Collect
            </h2>

            <h3 className="mt-4 text-sm font-medium text-zinc-200">
              2.1 Information You Provide Directly
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-400">
              <li>Name, email address, and contact information</li>
              <li>Educational background and career preferences</li>
              <li>Profile details, resumes, and applications</li>
              <li>Messages, feedback, and support requests</li>
            </ul>

            <h3 className="mt-5 text-sm font-medium text-zinc-200">
              2.2 Information Collected Automatically
            </h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-400">
              <li>IP address, browser type, and device identifiers</li>
              <li>Pages visited, time spent, and interaction data</li>
              <li>Cookies, local storage, and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              3. How We Use Your Information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
              <li>To provide, maintain, and improve our services</li>
              <li>To personalize internship and career recommendations</li>
              <li>To communicate important updates and notifications</li>
              <li>To ensure platform security and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              4. Cookies & Tracking Technologies
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              We use cookies and similar tracking technologies to enhance your
              experience, analyze usage, and deliver relevant content. You may
              control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              5. Sharing of Information
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              We do not sell your personal data. We may share information with:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
              <li>Employers and recruiters (with your consent)</li>
              <li>Service providers who support our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              6. Data Retention
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              We retain personal information only for as long as necessary to
              fulfill the purposes outlined in this policy unless a longer
              retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              7. Data Security
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              We implement appropriate technical and organizational measures to
              protect your data against unauthorized access, loss, misuse, or
              alteration. However, no system is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              8. Your Rights
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
              <li>Right to access and review your personal data</li>
              <li>Right to correct inaccurate or incomplete information</li>
              <li>Right to request deletion of your data</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              9. Children’s Privacy
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              InternMagnet does not knowingly collect personal information from
              children under the age of 16. If we become aware of such data, we
              will take steps to delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              10. International Data Transfers
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">
              11. Changes to This Policy
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              We may update this Privacy Policy periodically. Continued use of
              our services after changes take effect constitutes acceptance of
              the updated policy.
            </p>
          </section>

          <section className="border-t border-white/10 pt-6">
            <h2 className="text-lg font-semibold text-zinc-100">
              12. Contact Information
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              If you have questions or concerns regarding this Privacy Policy,
              please contact us at{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text font-medium text-transparent">
                support@internmagnet.com
              </span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
