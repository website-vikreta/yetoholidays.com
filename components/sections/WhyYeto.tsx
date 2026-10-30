import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { whyYeto } from "@/lib/data";

const ICONS: Record<string, ReactNode> = {
  globe: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
      <path
        d="M2.5 12.5 7 8l3 2 2-1.6 5 4.1M2.5 12.5l3 3 2-1.7m-5-1.3 3.2 3.6a2 2 0 0 0 2.9.1l.4-.4M21.5 12l-3 3.4-2-1.6m5-1.8-3-3.5-3.8 3 3 3.4a2 2 0 0 0 2.8.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
      <path
        d="M4 7l1.6 1.6L8.5 5.5M4 13l1.6 1.6 2.9-3.1M4 19l1.6 1.6 2.9-3.1M12 7h8M12 13h8M12 19h8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
      <path
        d="M6.5 3.5h3l1.3 4-2 1.5a11 11 0 0 0 5.2 5.2l1.5-2 4 1.3v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function WhyYeto() {
  return (
    <Section id="about" className="bg-sand-50/50">
      <SectionHeading title="Why book with Yeto" />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {whyYeto.map((item, i) => (
          <div
            key={item.title}
            className="reveal rounded-2xl border border-ocean-900/8 bg-white p-6 shadow-sm shadow-ocean-950/5 sm:p-7"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-50 text-ocean-600">
              {ICONS[item.icon]}
            </div>
            <h3 className="mt-5 font-display text-xl text-ocean-900">
              {item.title}
            </h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ocean-800/70">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
