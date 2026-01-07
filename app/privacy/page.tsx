import PrivacyPolicyContent from "@/components/privacy-policyContent"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Intern-Magnet",
  description: "Read our privacy policy to understand how we handle your data and protect your privacy.",
};


export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyContent />
  )
}
