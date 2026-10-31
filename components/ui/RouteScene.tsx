"use client";

import { useRef, type ReactNode } from "react";
import { useScrollProgress } from "@/components/motion/useScrollProgress";

/**
 * A dotted track with a line that draws itself as you scroll and a small plane
 * that follows it. The wrapper carries `--p` (0 to 1, the plane's progress), so
 * children can react to it in CSS, for example stops that light up as the
 * plane passes (`opacity: calc(...var(--p)...)`).
 *
 * The wrapper is `relative`; put the stops inside as children.
 */
export default function RouteScene({
  d,
  viewBox,
  svgClassName = "",
  className = "",
  range = [0.1, 0.9],
  children,
}: {
  /** SVG path, in `viewBox` units. */
  d: string;
  viewBox: string;
  svgClassName?: string;
  className?: string;
  /** Raw scroll progress that maps to the start and end of the route. */
  range?: [number, number];
  children?: ReactNode;
}) {
  const box = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const plane = useRef<SVGGElement>(null);

  useScrollProgress(box, {
    range,
    onProgress: (p) => {
      const line = path.current;
      const craft = plane.current;
      if (!line || !craft) return;
      const len = line.getTotalLength();
      const here = line.getPointAtLength(p * len);
      const ahead = line.getPointAtLength(Math.min(len, p * len + 2));
      const angle = (Math.atan2(ahead.y - here.y, ahead.x - here.x) * 180) / Math.PI;
      craft.setAttribute("transform", `translate(${here.x.toFixed(1)} ${here.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
      craft.style.opacity = p > 0.005 ? "1" : "0";
    },
  });

  return (
    <div ref={box} className={`relative ${className}`}>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={viewBox}
        className={`pointer-events-none overflow-visible ${svgClassName}`}
        fill="none"
      >
        {/* dotted track, always visible */}
        <path d={d} stroke="var(--color-ocean-300)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 9" />
        {/* the line that draws itself */}
        <path
          ref={path}
          d={d}
          pathLength={1}
          className="route-draw"
          stroke="var(--color-ocean-600)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <g ref={plane} opacity="0" style={{ opacity: 0 }}>
          <path
            d="M-10 -1.6 L2 -1.6 L-2 -8 L1 -8 L8 -1.6 L11 -1.6 C12.6 -1.6 12.6 1.6 11 1.6 L8 1.6 L1 8 L-2 8 L2 1.6 L-10 1.6 L-12 4.4 L-13.6 4.4 L-12.4 0 L-13.6 -4.4 L-12 -4.4 Z"
            fill="var(--color-ocean-900)"
          />
        </g>
      </svg>
      {children}
    </div>
  );
}
