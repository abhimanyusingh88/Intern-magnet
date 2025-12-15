import { LogOut } from "lucide-react";

export default function LogOutButton({classApply}: {classApply: string}) {
    return (
         
          <button className={classApply}><LogOut size={16} className="shrink-0" /><span>Sign out</span></button>
          
    )
}