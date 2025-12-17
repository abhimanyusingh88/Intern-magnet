// "use server"
// import { signOut } from "@/app/auth/actions";
import { signOutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";
// import { signOut } from "next-auth/react";

export default function LogOutButton({classApply, isLoggedIn}: {classApply: string, isLoggedIn: boolean}) {
    if (!isLoggedIn) return null;
    
    return (
         <form action={signOutAction} >
          <button className={classApply}><LogOut size={16} className="shrink-0" /><span>Sign out</span></button>
          </form>
    )
}