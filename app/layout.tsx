import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionProvider";
import { ProfileProvider } from "@/components/ProfileContext";
import { auth } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intern-Magnet",
  description: "A platform to help students find internships and companies find talent.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const initialProfileData = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ProfileProvider initialData={initialProfileData}>
            <NavBar />
            <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
              {children}
            </main>
            <Footer />
          </ProfileProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
