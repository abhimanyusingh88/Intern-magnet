"use client"
import MobileDropdown from "./mobileDropdown"
import DesktopDropdown from "./desktopDropdown"
export default function ProfileDropdown({
  className = "",
  mobile = false,
}: {
  className?: string
  mobile?: boolean
}) {
  const classApply= mobile? "flex items-center gap-3 rounded-lg px-2 w-full cursor-pointer py-1.5 text-left text-red-400 transition  hover:bg-red-500/10 hover:text-red-500" : "flex w-full items-center gap-6 rounded-lg cursor-pointer px-3 py-2 text-left text-red-400 hover:bg-red-500/10";
  if (mobile) {
    return (
  <MobileDropdown classApply={classApply}/>
)

  }

  return (
    <DesktopDropdown classApply={classApply} className={className}/>
  )
}
