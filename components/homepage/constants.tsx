import { Ban, BotIcon, ChartBar, Clock, GoalIcon, ShieldCheck, Users, ZapIcon } from "lucide-react";

export const features = [
    {
        icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />,
        title: "Updated Daily",
        description: "Fresh opportunities, 1000+ fresh jobs everyday."
    },
    {
        icon: <ShieldCheck
            className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />,
        title: "Verified Jobs",
        description: "Every listing is manually vetted for authenticity."
    },
    {
        icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />,
        title: "Trusted Sources",
        description: "Aggregated from top career portals and company sites."
    },
    {
        icon: <Ban className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 dark:text-red-400" />,
        title: "Spam Free",
        description: "Zero scams or marketing spam. Pure job listings."
    }
];

export const manyOptions = [
    {
        icon: <BotIcon className="h-6 w-6 text-blue-200" />,
        title: "Intelligent Matching",
        desc: "Context-aware AI connects relevant candidates and roles.",
    },
    {
        icon: <ZapIcon className="h-6 w-6 text-amber-500" />,
        title: "Frictionless Flow",
        desc: "Reduced steps, faster decisions, cleaner hiring.",
    },
    {
        icon: <GoalIcon className="h-6 w-6 text-red-400" />,
        title: "Signal-Driven",
        desc: "Intent and skills matter more than keywords.",
    },
    {
        icon: <ChartBar className="h-6 w-6 text-amber-300" />,
        title: "Live Insights",
        desc: "Real-time visibility into reach and engagement.",
    },
]

export const slides = [
    {
        image: "/Career.png",
        title: "Tired of internship hunts?",
        description: "We've got you covered! Stop searching. Start your career.",
    },
    {
        image: "/Certification.png",
        title: "Get certified, get noticed",
        description: "Industry-recognized certifications that boost your profile.",
    },
    {
        image: "/Skill.png",
        title: "Build real skills",
        description: "Learn by doing with hands-on tasks and mentorship.",
    },
    {
        image: "/Project.png",
        title: "Showcase real projects",
        description: "Work on real-world projects recruiters care about.",
    },
];