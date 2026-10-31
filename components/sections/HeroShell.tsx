"use client";

import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * The hero <section>. It writes `--p` (0 while the top of the hero is at the top
 * of the viewport, 1 once 60 percent of its height has scrolled past), and the
 * `.hero-fade` class turns that into opacity 1 to 0 and a 40px rise.
 */
export default function HeroShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  // staticValue 0: with reduced motion the content stays fully visible and in place.
  useScrollProgress(ref, { mode: "out", range: [0, 0.6], staticValue: 0 });
  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
