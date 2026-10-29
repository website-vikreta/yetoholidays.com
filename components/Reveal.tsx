"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Mounted once in the root layout. Any element with the `reveal` class fades
 * and lifts into place the first time it scrolls into view.
 *
 * A one-off querySelectorAll is not enough: content inside a Suspense boundary
 * (or any client component that hydrates later) mounts after this effect runs,
 * and would otherwise stay stuck at opacity 0 forever. A MutationObserver
 * picks those up as they arrive.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-visible");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      const showAll = () => document.querySelectorAll(".reveal").forEach(reveal);
      showAll();
      const mo = new MutationObserver(showAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    // Re-observing an element already being observed is a no-op, so this is
    // safe to call as often as the DOM changes.
    const observeAll = () =>
      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((el) => io.observe(el));

    observeAll();

    let queued = 0;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        observeAll();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (queued) cancelAnimationFrame(queued);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
