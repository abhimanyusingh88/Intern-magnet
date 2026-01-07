import Contact from "@/components/contact/Contact"
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Intern-Magnet",
    description: "Get in touch with the Intern-Magnet team for support, inquiries, or feedback.",
};
export default function Contacts() {
    return <Contact />
}