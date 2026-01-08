import LoginCard from "@/components/login/LoginCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Intern-Magnet",
  description: "Sign in to your Intern-Magnet account to manage your profile and applications.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/account" } = await searchParams;

  return <LoginCard callbackUrl={callbackUrl} />;
}
