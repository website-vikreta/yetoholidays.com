"use client";

import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * A <section> that writes `--p` (scroll progress, 0 to 1) for its children to
 * use in CSS. With reduced motion `--p` is written once as `staticValue`.
 */
export default function ScrollScope({
  children,
  className = "",
  id,
  mode = "enter",
  range,
  staticValue = 1,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  mode?: "enter" | "out" | "pin";
  range?: [number, number];
  staticValue?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, { mode, range, staticValue });
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
