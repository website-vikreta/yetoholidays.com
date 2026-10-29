"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Mounted once in the root layout. Writes scroll progress (0 to 1) to the
 * `--p` custom property of every `[data-scroll]` element; the `fx-*` classes in
 * globals.css turn that number into a transform.
 *
 *  - `data-scroll="out"`: 0 while the element's top is at the viewport top,
 *    1 once it has scrolled fully past (hero zoom).
 *  - `data-scroll="through"`: 0 as it enters at the bottom of the viewport,
 *    1 as it leaves at the top (banner parallax).
 *
 * Skipped under prefers-reduced-motion, so `--p` stays unset and the
 * `var(--p, 0)` fallbacks keep everything static.
 */
export default function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = document.querySelectorAll<HTMLElement>("[data-scroll]");
    if (els.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const { top, height } = el.getBoundingClientRect();
        const p = el.dataset.scroll === "out" ? -top / height : (vh - top) / (vh + height);
        el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return null;
}
