import { Bell } from "lucide-react";
import Link from "next/link";

export default function NotificationBell() {
    return (
     <Link href="/notifications">
  <Bell size={16} className="transition-transform hover:scale-125" />
  </Link>
    )
}