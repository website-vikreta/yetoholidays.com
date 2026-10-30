"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * Large screens: the section is tall, its inner frame is sticky, and vertical
 * scrolling slides the row of tickets sideways (the page still scrolls natively;
 * nothing is hijacked and the scrollbar is accurate).
 *
 *  - Section height = (row width - viewport width) + 100svh, so the sideways
 *    travel exactly matches the scroll distance. `--dist` holds the travel.
 *  - `--p` (0 to 1, pin mode) is written on the section; the row's transform
 *    and the progress line read it in CSS.
 *  - If a ticket takes keyboard focus, the window scrolls to the position that
 *    brings it into view, so keyboard users are never stuck behind the clip.
 *
 * Shown only where CSS says so (.pin-only in globals.css); elsewhere the same
 * tickets sit in a normal snap rail.
 */
export default function PinnedPasses({
  heading,
  note,
  children,
  count,
}: {
  heading: ReactNode;
  note: ReactNode;
  /** The tickets, one per child, already wrapped to a fixed width by the caller. */
  children: ReactNode;
  /** Number of tickets, for the progress dots. */
  count: number;
}) {
  const outer = useRef<HTMLElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dist = useRef(0);

  useScrollProgress(outer, { mode: "pin" });

  // Measure the row: its overflow beyond the viewport is the distance to travel.
  useEffect(() => {
    const el = outer.current;
    const row = track.current;
    if (!el || !row) return;
    const measure = () => {
      dist.current = Math.max(0, row.scrollWidth - window.innerWidth);
      el.style.setProperty("--dist", String(dist.current));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Keyboard: scroll the window so the focused ticket is inside the frame.
  useEffect(() => {
    const row = track.current;
    const frame = clip.current;
    const el = outer.current;
    if (!row || !frame || !el) return;

    const onFocusIn = (event: FocusEvent) => {
      frame.scrollLeft = 0; // the browser may have scrolled the clipped frame itself
      const ticket = (event.target as HTMLElement).closest<HTMLElement>("[data-pass]");
      if (!ticket || dist.current <= 0) return;

      const vw = window.innerWidth;
      const travelled = (() => {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
        return p * dist.current;
      })();
      const edge = 48;
      const left = ticket.offsetLeft;
      const right = left + ticket.offsetWidth;
      let target = travelled;
      if (left < travelled + edge) target = left - edge;
      else if (right > travelled + vw - edge) target = right - vw + edge;
      target = Math.min(dist.current, Math.max(0, target));

      const top = el.getBoundingClientRect().top + window.scrollY;
      const span = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (target / dist.current) * span, behavior: "instant" });
    };

    row.addEventListener("focusin", onFocusIn);
    const reset = () => {
      frame.scrollLeft = 0;
    };
    frame.addEventListener("scroll", reset, { passive: true });
    return () => {
      row.removeEventListener("focusin", onFocusIn);
      frame.removeEventListener("scroll", reset);
    };
  }, []);

  return (
    <section
      ref={outer}
      id="destinations"
      className="pin-only relative"
      style={{ height: "calc(var(--dist, 1900) * 1px + 100svh)" }}
    >
      <div ref={clip} className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pb-6 pt-24">
        <div
          ref={track}
          className="relative flex items-stretch gap-8 pl-[max(2rem,calc((100vw-72rem)/2+2rem))] pr-16 will-change-transform"
          style={{ transform: "translate3d(calc(var(--p, 0) * var(--dist, 0) * -1px), 0, 0)" }}
        >
          <div className="w-[24rem] shrink-0 pr-4">{heading}</div>
          {children}
        </div>

        {/* Progress line, one dot per ticket */}
        <div aria-hidden="true" className="mx-auto mt-8 w-full max-w-6xl px-8">
          <div className="relative h-4">
            <div className="absolute inset-x-0 top-1/2 h-px bg-ocean-900/15" />
            <div
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-ocean-700"
              style={{ transform: "scaleX(var(--p, 0))" }}
            />
            {Array.from({ length: count }, (_, i) => (
              <span
                key={i}
                className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-700"
                style={{
                  left: `${(i / Math.max(1, count - 1)) * 100}%`,
                  opacity: `clamp(0.25, calc(0.25 + (var(--p, 0) - ${(i / Math.max(1, count - 1)).toFixed(3)} + 0.03) * 40), 1)`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-4 w-full max-w-6xl px-8">{note}</div>
      </div>
    </section>
  );
}
