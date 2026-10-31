"use client";
import { useEffect, useRef, type RefObject } from "react";

type Options = {
  /**
   * enter: 0 as the element reaches the viewport bottom, 1 as it leaves the top (default).
   * out:   0 while its top is at the viewport top, 1 once it has scrolled fully past.
   * pin:   progress through a tall sticky section, 0 at its top to 1 at its end.
   */
  mode?: "enter" | "out" | "pin";
  /** Remap progress so it runs 0 to 1 between these two raw values. */
  range?: [number, number];
  /** Value written once under prefers-reduced-motion (the finished, static state). */
  staticValue?: number;
  /** Called each frame with the final progress, for work CSS cannot do (a plane on a path). */
  onProgress?: (p: number) => void;
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Writes scroll progress (0 to 1) into the `--p` CSS variable of the element.
 * No React state, so scrolling never re-renders anything. Work happens only
 * while the element is near the viewport, once per animation frame.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { mode = "enter", range, staticValue = 1, onProgress }: Options = {},
) {
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  });

  const from = range?.[0] ?? 0;
  const to = range?.[1] ?? 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const write = (p: number) => {
      el.style.setProperty("--p", p.toFixed(4));
      callback.current?.(p);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      write(staticValue);
      return;
    }

    let inView = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const raw =
        mode === "pin"
          ? -r.top / Math.max(1, r.height - vh)
          : mode === "out"
            ? -r.top / Math.max(1, r.height)
            : (vh - r.top) / (vh + r.height);
      write(clamp((clamp(raw) - from) / (to - from)));
    };
    const request = () => {
      if (inView && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        request();
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(el);
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, [ref, mode, from, to, staticValue]);
}
