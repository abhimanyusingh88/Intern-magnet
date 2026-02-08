
import { LogOut } from "lucide-react";
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