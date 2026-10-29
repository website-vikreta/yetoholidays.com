"use client";

import { useEffect, useRef } from "react";

/*
 * Flight route for the hero: a line that leaves the "Plan My Trip" button,
 * dips, loops once and climbs to a plane over the open water on the right.
 * Origin (0, 0) of the viewBox is the button's right edge, vertically centred.
 *
 * The plane outline is taken from the supplied line-art vector (EPS), cut off
 * where its own trail begins. It is drawn at 0.24 scale with the cut end as its
 * anchor, so the plane sits on the end of the new line.
 */

const ROUTE =
  "M2 0 C70 0 112 36 192 38 C272 40 330 8 392 -14 C430 -28 472 -36 508 -26 " +
  "C540 -17 562 20 546 48 C532 74 492 76 474 52 C458 34 490 -2 500 -30 " +
  "C519 -82 588 -183 625 -200";

// Plane outline from the EPS, in the EPS's own units.
const PLANE =
  "M563.5 1247.8 C556.6 1247.8 549.9 1247.7 543.1 1247.4 C411.4 1241.9 321.7 1196.1 283.5 1115 C234.2 1010.1 274.3 851.9 388.1 702.1 C392 697 400.2 685.4 410.6 670.7 C418 660.2 426.4 648.3 435 636.3 L378 557.6 L378.4 557.6 C372.7 547.8 369.6 536.8 369.3 525.3 C368.8 507 375.5 489.6 388.1 476.2 C400.7 462.9 417.7 455.4 436.1 454.9 C454.4 454.4 471.8 461.1 485.1 473.7 C498.4 486.3 506 503.3 506.5 521.6 C507.2 548.8 480.2 586 451.7 625.4 C439.5 642.2 426.9 660 416.5 674.8 C406 689.6 397.8 701.2 393.8 706.5 C281.6 854.1 241.8 1009.5 290 1111.9 C327 1190.5 414.6 1234.8 543.4 1240.2 C765.7 1249.4 1027.4 1101.8 1280.3 959 C1531.2 817.4 1768.2 683.6 1930.3 731.2 C1945.5 735.6 1959.8 741.6 1973.3 749 C2100.8 605.3 2291.2 516.9 2478.8 438.6 L2486.4 435.5 L2483.6 443.2 C2471.3 477.1 2447.3 507.5 2416.7 544.5 L2441.6 536.3 C2458.5 530.7 2473.3 520.8 2484.3 507.8 C2505.1 483.2 2542 437.6 2556.2 407.6 L2556.8 406.3 L2558.1 405.8 C2569.5 401.1 2581.2 396.3 2593.6 391.2 C2698.3 348.6 2716.5 322.4 2715.6 317.7 C2712.7 314.1 2676.7 304.5 2638.7 313.4 C2623.8 316.9 2588.6 331.8 2537 356.3 L2535.5 357 L2534 356.4 C2502.9 342.7 2453.9 330.1 2427.5 323.9 C2410.9 320 2393.2 320.9 2376.2 326.5 L2351.2 334.7 C2408.2 349.4 2442.4 365.7 2472.4 381.1 L2481.4 383.4 L2472.7 387.7 C2461.5 393.3 2454.6 396.8 2454.6 396.8 C2413.6 415.2 2385.6 427.9 2364.9 437.4 C2341.5 448 2327.4 454.4 2314.5 460 C2301.1 465.8 2286.5 468.4 2272.4 467.6 C2255.2 466.7 2231.4 464.8 2215.4 460.8 L2217.1 453.8 C2232.6 457.7 2255.9 459.6 2272.8 460.5 C2285.8 461.2 2299.3 458.8 2311.7 453.4 C2324.5 447.9 2338.6 441.5 2361.9 430.9 C2382.7 421.4 2410.7 408.7 2451.5 390.3 C2451.5 390.3 2455.8 388.1 2463.2 384.4 C2432.8 369.1 2397.2 353.1 2337.5 338.7 L2325.3 335.7 L2374 319.7 C2392.2 313.7 2411.3 312.7 2429.2 316.9 C2461.2 324.5 2505.3 336.2 2535.4 349.1 C2587.4 324.5 2621.6 310.1 2637 306.4 C2674.2 297.7 2717.8 305.4 2722.2 314.8 C2722.8 316.2 2723.2 318.6 2721.8 322.1 C2718.3 330.9 2699 356 2596.3 397.9 C2584.4 402.7 2573.1 407.4 2562.1 411.9 C2547.1 442.6 2510.5 487.9 2489.8 512.4 C2477.9 526.5 2462 537.1 2443.8 543.1 L2395.3 559.1 L2403.2 549.5 C2434.7 511.6 2460 481.1 2473.8 448.5 C2289.9 525.4 2104.5 612.7 1979.7 752.7 C2016 774.6 2045.8 808 2070 853.9 C2094.3 899.9 2098.7 958.3 2081.7 1010.1 C2066.9 1055 2037.8 1089.9 1999.8 1108.2 C1962.7 1126.1 1923.8 1119.5 1895.8 1090.4 C1856.3 1049.5 1839.3 964.9 1890.3 868.2 C1912.2 826.8 1938.5 789.1 1968.5 754.6 C1955.9 747.7 1942.5 742.2 1928.3 738 C1769.2 691.4 1533.4 824.4 1283.9 965.3 C1037.7 1104.2 783.4 1247.8 563.5 1247.8 Z";
const PLANE_CLIP =
  "2195,300 2800,300 2800,640 2330,640 2340,545 2362,515 2395.5,488.7 2385,466 2374.5,443.3 2300,470 2195,470";
const PLANE_ANCHOR = { x: 2380, y: 458 };
const PLANE_TRAIL_ANGLE = -24.8; // heading of the trail where it was cut, degrees
const PLANE_SCALE = 0.24;

const END = { x: 625, y: -200, angle: -24.7 };

const planeTransform = (x: number, y: number, angle: number) =>
  `translate(${x} ${y}) rotate(${angle - PLANE_TRAIL_ANGLE}) scale(${PLANE_SCALE}) translate(${-PLANE_ANCHOR.x} ${-PLANE_ANCHOR.y})`;

const DELAY_MS = 700;
const DURATION_MS = 3800;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function FlightPath() {
  const route = useRef<SVGPathElement>(null);
  const plane = useRef<SVGGElement>(null);

  useEffect(() => {
    const line = route.current;
    const craft = plane.current;
    if (!line || !craft) return;

    // Reduced motion: show the finished route, no flight.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.strokeDashoffset = "0";
      craft.style.opacity = "1";
      return;
    }

    const total = line.getTotalLength();
    let frame = 0;
    let start = 0;

    const draw = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, Math.max(0, (now - start - DELAY_MS) / DURATION_MS));
      const eased = easeInOut(t);
      const at = eased * total;

      line.style.strokeDashoffset = String(1 - eased);

      const a = line.getPointAtLength(Math.max(0, at - 0.5));
      const b = line.getPointAtLength(Math.min(total, at + 0.5));
      const p = line.getPointAtLength(at);
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      craft.setAttribute("transform", planeTransform(p.x, p.y, t === 0 ? 0 : angle));
      craft.style.opacity = String(Math.min(1, eased * 14));

      if (t < 1) frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      aria-hidden
      viewBox="-20 -250 740 340"
      className="pointer-events-none absolute left-full top-1/2 hidden overflow-visible lg:block"
      style={{
        width: "min(740px, calc(100vw - 440px))",
        transform: "translate(-2.7%, -73.5%)",
        filter: "drop-shadow(0 1px 5px rgb(10 31 46 / 0.45))",
      }}
    >
      <defs>
        <clipPath id="flight-plane-clip">
          <polygon points={PLANE_CLIP} />
        </clipPath>
      </defs>

      <path
        ref={route}
        d={ROUTE}
        pathLength={1}
        className="flight-line"
        fill="none"
        stroke="white"
        strokeWidth={1.7}
        strokeLinecap="round"
      />

      <g
        ref={plane}
        className="flight-plane"
        transform={planeTransform(END.x, END.y, END.angle)}
      >
        <path d={PLANE} fill="white" clipPath="url(#flight-plane-clip)" />
      </g>
    </svg>
  );
}
