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


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

  let initialProfileData = {};

  if (session?.user?.email) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const user = await prisma.legacyUser.findFirst({
        where: { email: session.user.email },
      });

      if (user) {
        // Convert BigInt and Dates to strings/plains for client components
        initialProfileData = JSON.parse(JSON.stringify(user, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        ));
      } else {
        // Fallback if DB record doesn't exist yet but session does
        initialProfileData = {
          name: session.user.name || "",
          email: session.user.email || "",
        };
      }
    } catch (error) {
      console.error("Failed to fetch user in layout:", error);
      // Fallback to basic session data
      initialProfileData = {
        name: session?.user?.name || "",
        email: session?.user?.email || "",
      };
    }
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >        <Providers>
          <ProfileProvider initialData={initialProfileData}>
            <CustomProvider theme="dark">
              <NavBar />
              <ReactQueryDevtools initialIsOpen={false} />
              <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
                {children}
              </main>
              <Footer />
            </CustomProvider>
          </ProfileProvider>
        </Providers>
        <SessionStorageCleaner />
      </body>

    </html>
  );
}
