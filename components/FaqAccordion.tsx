import { ChevronDown } from "lucide-react";

type Faq = {
  q: string
  a: string
}

type Props = {
  faqs: Faq[]
  open: number | null
  setOpen: (v: number | null) => void
}
export default function FaqAccordion({faqs, open, setOpen}:Props) {
   return  <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-10">
             {faqs.map((item, i) => (
               <div
                 key={i}
                 className="rounded-xl border border-white/10 bg-zinc-950/60"
               >
                 <button
                   onClick={() => setOpen(open === i ? null : i)}
                   className="flex cursor-pointer w-full items-center justify-between px-5 py-4 text-left"
                 >
                   <span className="text-sm font-medium text-zinc-200">
                     {item.q}
                   </span>
                   <ChevronDown
                     className={`h-4 w-4 text-zinc-400 transition ${
                       open === i ? "rotate-180" : ""
                     }`}
                   />
                 </button>
   
                 {open === i && (
                   <div className="px-5 pb-4 text-sm leading-relaxed text-zinc-400">
                     {item.a}
                   </div>
                 )}
               </div>
             ))}
           </div>
}