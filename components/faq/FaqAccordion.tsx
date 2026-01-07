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

export default function FaqAccordion({ faqs, open, setOpen }: Props) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-10">
      {faqs.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-white/10 bg-zinc-950/60"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left"
          >
            <span className="text-sm cursor-pointer font-medium text-zinc-200">
              {item.q}
            </span>

            <ChevronDown
              className={`
                h-4 w-4 text-zinc-400
                transition-transform duration-300 ease-in-out
                ${open === i ? "rotate-180" : ""}
              `}
            />
          </button>

          {/* Smooth expandable content */}
          <div
            className={`
              overflow-hidden px-5
              transition-all duration-300 ease-in-out
              ${open === i ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"}
            `}
          >
            <p className="text-sm leading-relaxed text-zinc-400">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
