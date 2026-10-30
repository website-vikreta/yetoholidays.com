"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Moves its content slower (positive speed) or faster (negative speed) than the page.
 *  The parent must have overflow hidden, and the child must be taller than the parent. */
export default function Parallax({
  speed = 0.15,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement; // the parent is never transformed, so its rect is stable
    if (!el || !box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const k = window.matchMedia("(pointer: coarse)").matches ? 0.5 : 1;
    let inView = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = box.getBoundingClientRect();
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-offset * speed * k).toFixed(1)}px, 0)`;
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
    io.observe(box);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
