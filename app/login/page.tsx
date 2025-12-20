import LoginCard from "@/components/LoginCard";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl = "/account" } = await searchParams;

  return <LoginCard callbackUrl={callbackUrl} />;
}
