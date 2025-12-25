"use client"

import BackGroundGlow from "@/components/BackGroundGlow"

export default function TermsPage() {
  return (
    <main className="relative overflow-hidden bg-zinc-950">
      {/* background glow */}
     <BackGroundGlow/>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20">
        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-400 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
            These Terms & Conditions govern your access to and use of InternMagnet.
            By using our services, you agree to comply with and be bound by these terms.
          </p>
        </div>

        {/* Content Card */}
        <div className="space-y-12 rounded-2xl border border-white/10 p-2 backdrop-blur-xl sm:p-10">

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">1. Definitions</h2>
            <p className="mt-3 text-sm text-zinc-400">
              “Platform” refers to InternMagnet and all related services.
              “User” refers to students, recruiters, employers, or visitors accessing the platform.
              “Content” includes text, images, listings, and any data uploaded or displayed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">2. Acceptance of Terms</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              By accessing InternMagnet, you acknowledge that you have read,
              understood, and agreed to be bound by these Terms, our Privacy Policy,
              and any additional guidelines provided on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">3. Eligibility & User Responsibility</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
              <li>You must be at least 16 years old to use this platform.</li>
              <li>You are responsible for ensuring all information provided is accurate.</li>
              <li>You agree to comply with all applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">4. Account Creation & Security</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Users are responsible for safeguarding their login credentials.
              InternMagnet will not be liable for any loss or damage arising from
              unauthorized access due to user negligence.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">5. Platform Usage</h2>
            <p className="mt-3 text-sm text-zinc-400">
              InternMagnet provides internship listings, hiring tools, and career resources.
              Users agree not to misuse the platform, including scraping data,
              attempting system breaches, or engaging in fraudulent activities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">6. Internship Listings & Recruiters</h2>
            <p className="mt-3 text-sm text-zinc-400">
              InternMagnet does not guarantee the accuracy, legitimacy, or outcomes
              of internship listings. Recruiters are solely responsible for the
              content and hiring decisions they make.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">7. User Content & Licensing</h2>
            <p className="mt-3 text-sm text-zinc-400">
              By submitting content, you grant InternMagnet a non-exclusive,
              royalty-free, worldwide license to host, display, and distribute
              such content for platform operations and improvements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">8. Prohibited Conduct</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
              <li>Posting misleading, false, or illegal information</li>
              <li>Violating intellectual property or privacy rights</li>
              <li>Harassment, abuse, or discriminatory behavior</li>
              <li>Automated access without written permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">9. Payments & Fees (If Applicable)</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Certain features may require payment. All fees are non-refundable
              unless explicitly stated otherwise. InternMagnet reserves the right
              to modify pricing at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">10. Third-Party Services</h2>
            <p className="mt-3 text-sm text-zinc-400">
              The platform may contain links to third-party websites or services.
              InternMagnet is not responsible for the content, policies, or practices
              of any third-party providers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">11. Suspension & Termination</h2>
            <p className="mt-3 text-sm text-zinc-400">
              InternMagnet reserves the right to suspend or terminate accounts
              without notice if users violate these Terms or pose risk to the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">12. Disclaimer of Warranties</h2>
            <p className="mt-3 text-sm text-zinc-400">
              The platform is provided “as is” without warranties of any kind,
              including implied warranties of merchantability or fitness for a
              particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">13. Limitation of Liability</h2>
            <p className="mt-3 text-sm text-zinc-400">
              InternMagnet shall not be liable for any indirect, incidental,
              consequential, or special damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">14. Indemnification</h2>
            <p className="mt-3 text-sm text-zinc-400">
              You agree to indemnify and hold harmless InternMagnet from any claims,
              losses, or damages arising from your use of the platform or violation
              of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">15. Changes to These Terms</h2>
            <p className="mt-3 text-sm text-zinc-400">
              We may update these Terms periodically. Continued use of InternMagnet
              after changes indicates acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-100">16. Governing Law</h2>
            <p className="mt-3 text-sm text-zinc-400">
              These Terms shall be governed by and interpreted in accordance with
              the laws of India.
            </p>
          </section>

          <section className="border-t border-white/10 pt-6">
            <h2 className="text-lg font-semibold text-zinc-100">17. Contact Information</h2>
            <p className="mt-3 text-sm text-zinc-400">
              For questions regarding these Terms, contact us at{" "}
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
