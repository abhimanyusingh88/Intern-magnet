import DashboardHeader from "./dashboardHeader";
import { formatName, formattedDate } from "./formatters";
import LeftMenu from "./leftMenu";
import TimerReminder from "./timerReminder";


export default function DashboardPage({ userName, children }: { userName: string, children?: React.ReactNode }) {

    return <div className="w-full flex flex-col gap-4" >

        <TimerReminder />

        <DashboardHeader />

        <LeftMenu mode="mobile" />

        <div className="flex relative gap-6 mt-2">
            {/* Desktop Sticky Sidebar */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5 sticky top-20 self-start h-[calc(100vh-120px)] bg-zinc-900/60 border border-white/5 rounded-2xl shadow-xl overflow-hidden">
                <LeftMenu mode="desktop" />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 space-y-4 min-w-0">
                <div className="flex-1 space-y-4 min-w-0">

                    <div className="relative overflow-hidden min-h-[120px] w-full flex flex-col gap-6 bg-zinc-900/60 rounded-2xl border border-zinc-800 p-6 shadow-sm">

                        {/* ABSTRACT RIGHT DESIGN */}
                        <div className="absolute -right-16 -top-10 w-[150px] h-[150px]  md:w-[240px] sm:w-[200px] sm:h-[200px] md:h-[240px] lg:w-[280px] lg:h-[280px] bg-linear-to-br from-indigo-600 via-purple-700 to-pink-600  rounded-full blur-2xl opacity-30" />
                        <div className="absolute right-10 top-0 w-[100px] h-[100px]  md:w-[150px] sm:w-[120px] sm:h-[120px] md:h-[150px] lg:w-[180px] lg:h-[180px] bg-linear-to-br from-indigo-600 to-pink-800 rounded-full blur-xl opacity-40" />
                        <div className="absolute right-24 top-6 w-[60px] h-[60px] md:w-[100px] sm:w-[80px] sm:h-[80px] md:h-[100px] lg:w-[120px] lg:h-[120px] bg-white/40 rounded-full blur-lg" />

                        {/* CONTENT */}
                        <div className="flex gap-4 items-center relative z-10">
                            <p className="text-sm text-zinc-300 md:text-lg">
                                {formattedDate()}
                            </p>
                        </div>

                        <p className="text-xl md:text-2xl text-zinc-300 font-semibold relative z-10">
                            Hi, {formatName(userName.split(" ")[0])} !
                        </p>
                    </div>

                </div>
                <div className="min-h-[500px] w-full bg-zinc-900/60 rounded-2xl border border-white/5 px-2 py-4 sm:p-6">
                    {children}
                </div>
            </div>
        </div>


    </div>
}