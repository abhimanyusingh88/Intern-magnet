// "use server"
// import { signOut } from "@/app/auth/actions";
// import { signOutAction } from "@/lib/actions"; // No longer needed for form action
import { LogOut } from "lucide-react";
// import { signOut } from "next-auth/react";
import { signOut } from "@/lib/auth-client";

export default function LogOutButton({ classApply, isLoggedIn }: { classApply: string, isLoggedIn: boolean }) {
    if (!isLoggedIn) return null;

    return (
        <button className={classApply} onClick={async () => {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        window.location.href = "/";
                    }
                }
            });
        }}>
            <LogOut size={16} className="shrink-0" /><span>Sign out</span>
        </button>
    )
}