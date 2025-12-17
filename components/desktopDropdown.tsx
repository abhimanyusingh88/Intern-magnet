import { ChevronDown, CreditCard, Settings, ShieldQuestion, User } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { useSession } from "next-auth/react";

type DesktopDropdownProps = { classApply: string; className?: string }
export default  function DesktopDropdown({ classApply, className = "" }: DesktopDropdownProps){
    const { data: session } = useSession()
    const isLoggedIn = !!session?.user
    return(
        <div className="relative group">
      <Link href="/profile" className={`flex items-center gap-1 ${className}`}>
        Profile
        <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-hover:rotate-180" />
      </Link>

      <div className="absolute right-0 top-full mt-2 w-44 origin-top-right rounded-xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-xl opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
        <div className="flex flex-col p-1 text-sm text-zinc-300">
          <Link href="/profile" className="flex items-center gap-6 rounded-lg px-3 py-2 hover:bg-white/10"><User size={16} className="shrink-0" /><span>Account Details</span></Link>
      <Link href="/settings" className="flex items-center gap-6 rounded-lg px-3 py-2 hover:bg-white/10"><Settings size={16} className="shrink-0" /><span>Settings</span></Link>
      <Link href="/career" className="flex items-center gap-6 rounded-lg px-3 py-2 hover:bg-white/10"><CreditCard size={16} className="shrink-0" /><span>Career guidence</span></Link>
      <Link href="/faqs" className="flex items-center gap-6 rounded-lg px-3 py-2 hover:bg-white/10"><ShieldQuestion size={16} className="shrink-0" /><span>User FAQs</span></Link>

          <div className="my-1 h-px bg-white/10" />
          
          <LogOutButton classApply={classApply} isLoggedIn={isLoggedIn}/>
          

        </div>
      </div>
    </div>
    )
}