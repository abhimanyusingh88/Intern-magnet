import { CreditCard, Settings, ShieldQuestion, User } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function MobileDropdown({ classApply, session, setOpen }: { classApply: string, session?: any, setOpen?: (open: boolean) => void }) {
  const { data: Usersession } = useSession()
  console.log(session);
  const isLoggedIn = !!Usersession?.user
  const img = session?.user?.image
  return (
    <div className="flex flex-col gap-2 text-sm text-zinc-300">
      <Link href="/profile" onClick={() => setOpen?.(false)}>
        {img &&
          <div className="flex items-center gap-3">
            <Image className="rounded-full h-12 w-12 ml-[8px]" src={img || "/avatar-placeholder.png"} alt="profile" width={40} height={40} /> <span className="hover:text-white p-2 hover:rounded-lg hover:bg-white/5">{session?.user?.name}</span>
          </div>
        }
      </Link>
      <Link
        href="/profile"
        onClick={() => setOpen?.(false)}
        className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:text-white hover:bg-white/5"
      >
        <User size={16} />
        <span>Account Details</span>
      </Link>

      <Link
        href="/settings"
        onClick={() => setOpen?.(false)}
        className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:text-white hover:bg-white/5"
      >
        <Settings size={16} />
        <span>Settings</span>
      </Link>

      <Link
        href="/career"
        onClick={() => setOpen?.(false)}
        className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:text-white hover:bg-white/5"
      >
        <CreditCard size={16} />
        <span>Career guidence</span>
      </Link>
      <Link
        href="/faqs"
        onClick={() => setOpen?.(false)}
        className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:text-white hover:bg-white/5"
      >
        <ShieldQuestion size={16} />
        <span>User FAQs</span>
      </Link>


      <LogOutButton classApply={classApply} isLoggedIn={isLoggedIn} />


    </div>
  )
}