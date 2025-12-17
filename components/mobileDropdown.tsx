import { CreditCard, Settings, ShieldQuestion, User } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { useSession } from "next-auth/react";

export default function MobileDropdown({classApply}: {classApply: string})
{
    const { data: session } = useSession()
    const isLoggedIn = !!session?.user
    return (
        <div className="flex flex-col gap-2 text-sm text-zinc-300">
    <Link
      href="/profile"
      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:text-white hover:bg-white/5"
    >
      <User size={16} />
      <span>Account Details</span>
    </Link>

    <Link
      href="/settings"
      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:text-white hover:bg-white/5"
    >
      <Settings size={16} />
      <span>Settings</span>
    </Link>

    <Link
      href="/career"
      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:text-white hover:bg-white/5"
    >
      <CreditCard size={16} />
      <span>Career guidence</span>
    </Link>
    <Link
      href="/faqs"
      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:text-white hover:bg-white/5"
    >
      <ShieldQuestion size={16} />
      <span>User FAQs</span>
    </Link>

   
      <LogOutButton classApply={classApply} isLoggedIn={isLoggedIn}/>
    
    
  </div>
    )
}