import { useId } from "react";
import RouteScene from "@/components/ui/RouteScene";

const PLANE_PATH =
  "M-10 -1.6 L2 -1.6 L-2 -8 L1 -8 L8 -1.6 L11 -1.6 C12.6 -1.6 12.6 1.6 11 1.6 L8 1.6 L1 8 L-2 8 L2 1.6 L-10 1.6 L-12 4.4 L-13.6 4.4 L-12.4 0 L-13.6 -4.4 L-12 -4.4 Z";

type DividerProps = {
  variant: "dashed" | "wave" | "route";
  /** Extra classes on the outer element, for spacing. */
  className?: string;
  /** Wave only: flip vertically for the bottom edge of a photo section. */
  flip?: boolean;
};

/**
 * Section separators. All inline SVG, aria-hidden, full width, 24px tall.
 *  - dashed: round dots with a small plane in the middle
 *  - wave:   one thin double wave line for the edges of photo sections
 *  - route:  a curved path that draws itself as you scroll, with a plane on it
 */
export default function Divider({ variant, className = "", flip = false }: DividerProps) {
  const id = useId();

  if (variant === "route") {
    return (
      <div aria-hidden="true" className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
        <RouteScene
          d="M0 12 C150 -2 250 26 400 12 S650 -2 800 12 S1050 26 1200 12"
          viewBox="0 0 1200 24"
          svgClassName="block h-auto min-h-[24px] w-full"
          range={[0.15, 0.85]}
        />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        width="100%"
        height="24"
        className={`block w-full ${flip ? "-scale-y-100" : ""} ${className}`}
      >
        <defs>
          <pattern id={id} width="80" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 9 Q20 1 40 9 T80 9" fill="none" stroke="var(--color-ocean-200)" strokeWidth="1.5" />
            <path d="M0 16 Q20 8 40 16 T80 16" fill="none" stroke="var(--color-ocean-200)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="24" fill={`url(#${id})`} />
      </svg>
    );
  }

  const dots = (
    <svg focusable="false" width="100%" height="24" className="block min-w-0 flex-1">
      <line
        x1="2"
        x2="100%"
        y1="12"
        y2="12"
        stroke="var(--color-ocean-300)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
    </svg>
  );

  return (
    <div aria-hidden="true" className={`mx-auto flex w-full max-w-6xl items-center gap-3 px-5 sm:px-8 ${className}`}>
      {dots}
      <svg focusable="false" width="28" height="24" viewBox="-14 -12 28 24" className="shrink-0">
        <path d={PLANE_PATH} fill="var(--color-ocean-400)" />
      </svg>
      {dots}
    </div>
  );
}
