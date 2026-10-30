import type { ReactNode } from "react";
import RouteScene from "@/components/ui/RouteScene";
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

// Route geometry. Stops sit on the path at the centre line.
// Desktop: 240px per stop. Mobile: 176px per stop, route on the left.
const DESKTOP_PATH =
  "M120 0 L120 120 C190 180 190 300 120 360 C50 420 50 540 120 600 C190 660 190 780 120 840 L120 960";
const MOBILE_PATH =
  "M32 0 L32 88 C60 118 60 234 32 264 C4 294 4 410 32 440 C60 470 60 586 32 616 L32 704";

/** Where on the route (0 to 1) each stop sits. */
const at = (i: number) => 0.125 + i * 0.25;

/**
 * Lights up as the plane passes: --p is the plane's progress. The circle goes
 * from 0.4 to 1. The text only goes from 0.72 to 1, because ocean-900 text
 * below that drops under 4.5 to 1 contrast on the page background.
 */
const lit = (i: number, from: number) =>
  `clamp(${from}, calc(${from} + (var(--p, 1) - ${at(i).toFixed(3)} + 0.05) * 30), 1)`;

function Dot({ icon, i }: { icon: string; i: number }) {
  return (
    <span style={{ opacity: lit(i, 0.4) }} className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean-900 text-white ring-4 ring-white">
      {ICONS[icon]}
    </span>
  );
}

export default function WhyYeto() {
  return (
    <Section id="about" className="bg-sand-50/50">
      <SectionHeading title="Why book with Yeto" />

      {/* Desktop: stops alternate left and right of the route */}
      <RouteScene
        d={DESKTOP_PATH}
        viewBox="0 0 240 960"
        svgClassName="absolute left-1/2 top-0 h-[960px] w-[240px] -translate-x-1/2"
        className="mx-auto mt-14 hidden max-w-5xl md:block"
        range={[0.2, 0.75]}
      >
        <ol className="relative">
          {whyYeto.map((item, i) => (
            <li
              key={item.title}
              className="relative grid h-[240px] grid-cols-[1fr_240px_1fr] items-center"
              
            >
              <div style={{ opacity: lit(i, 0.72) }} className={i % 2 === 0 ? "col-start-1 pr-6 text-right" : "col-start-3 pl-6"}>
                <h3 className="font-display text-2xl text-ocean-900">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ocean-900">{item.body}</p>
              </div>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dot icon={item.icon} i={i} />
              </span>
            </li>
          ))}
        </ol>
      </RouteScene>

      {/* Phones: stops stacked beside the route */}
      <RouteScene
        d={MOBILE_PATH}
        viewBox="0 0 64 704"
        svgClassName="absolute left-0 top-0 h-[704px] w-16"
        className="mt-10 md:hidden"
        range={[0.1, 0.85]}
      >
        <ol className="relative">
          {whyYeto.map((item, i) => (
            <li key={item.title} className="relative flex h-[176px] items-center pl-24" >
              <span className="absolute left-2 top-1/2 -translate-y-1/2">
                <Dot icon={item.icon} i={i} />
              </span>
              <div style={{ opacity: lit(i, 0.72) }}>
                <h3 className="font-display text-xl text-ocean-900">{item.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ocean-900">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </RouteScene>
    </Section>
  );
}
