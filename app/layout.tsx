import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import NavBar from "@/components/utils/navBar";
import Footer from "@/components/utils/Footer";
import { ProfileProvider } from "@/components/providers/ProfileContext";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CustomProvider } from "rsuite";
import Providers from "./providers";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SessionStorageCleaner from "@/components/utils/SessionStorageCleaner"
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { prisma } from "@/lib/prisma";
import { getInitialProfileData, getInitialRecruiterData } from "@/lib/profile-helpers";
import NetBg from "@/components/utils/netBg";

export const metadata: Metadata = {
  title: "Home | Intern-Magnet",
  description: "A platform to help students find internships and companies find talent.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  let initialProfileData = getInitialProfileData();
  let initialRecruiterData = {};

  if (session?.user?.id) {
    try {
      if (session.user.email) {
        const user = await prisma.legacyUser.findFirst({
          where: { email: session.user.email },
        });

        initialProfileData = getInitialProfileData(user || {
          email: session.user.email || "",
        });

        initialProfileData = JSON.parse(JSON.stringify(initialProfileData));
      }

      const recruiter = await prisma.recruiterProfile.findUnique({
        where: { userId: session.user.id },
      });

      initialRecruiterData = getInitialRecruiterData(recruiter || {
        email: session.user.email || "",
      });

      initialRecruiterData = JSON.parse(JSON.stringify(initialRecruiterData, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    } catch (error) {
      console.error("Failed to fetch user/recruiter in layout:", error);
      initialProfileData = getInitialProfileData({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
      });
    }
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >        <Providers>
          <ProfileProvider initialData={initialProfileData} initialRecruiterData={initialRecruiterData}>
            <CustomProvider theme="dark">
              <NavBar />
              <ReactQueryDevtools initialIsOpen={false} />
              <main className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white">
                <NetBg />
                {children}
              </main>
              <Toaster position="top-right" richColors />
              <Footer />
            </CustomProvider>
          </ProfileProvider>
        </Providers>
        <SessionStorageCleaner />
      </body>

    </html>
  );
}
