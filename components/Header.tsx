"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ButtonLink } from "@/components/ui";
import Logo from "@/components/Logo";
import { whatsappDisplay, whatsappLink } from "@/lib/site";

const whatsappHref = whatsappLink("Hi Yeto Holidays, I'd like to plan a trip.");

// Pages with no dark hero behind the header: it stays solid so the logo is visible.
const SOLID_HEADER_PATHS = ["/privacy", "/terms", "/cancellation-policy"];

const NAV_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Tours", href: "/#tours" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Corporate", href: "/#corporate" },
  { label: "About Us", href: "/#about" },
];

function Wordmark({ light }: { light: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Yeto Holidays home"
      className="group flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand-400"
    >
      <Logo light={light} priority />
    </Link>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-6 flex-col justify-between">
      <span
        aria-hidden
        className={`h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        aria-hidden
        className={`h-[1.5px] w-full rounded-full bg-current transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        aria-hidden
        className={`h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    // Coalesce scroll events into one read per frame; reading scrollY straight
    // from the handler forces layout on every event during a fast scroll.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const solid = scrolled || open || SOLID_HEADER_PATHS.includes(pathname);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/90 shadow-sm shadow-ocean-950/5 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:py-5">
        <Wordmark light={!solid} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand-400 ${
                solid ? "text-ocean-900" : "text-white"
              }`}
            >
              {link.label}
              <span
                aria-hidden
                className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                  solid ? "bg-ocean-900" : "bg-white"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/plan" variant={solid ? "primary" : "white"} size="sm">
            Plan My Trip
            <span aria-hidden>→</span>
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sand-400 lg:hidden ${
            solid ? "text-ocean-900" : "text-white"
          }`}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <div
        id={menuId}
        inert={!open}
        className={`fixed inset-x-0 top-0 z-40 flex h-dvh flex-col bg-white transition-all duration-300 ease-out lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        {/* The fixed bar above keeps rendering the wordmark and the toggle
            (which becomes a close button while open), so the panel starts
            below it rather than repeating them. */}
        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col justify-center gap-2 px-6 pt-20"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`flex min-h-[44px] items-center border-b border-ocean-900/10 py-4 font-display text-3xl text-ocean-900 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand-400 ${
                open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 px-6 pb-10">
          <ButtonLink
            href="/plan"
            variant="primary"
            size="lg"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Plan My Trip
            <span aria-hidden>→</span>
          </ButtonLink>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center justify-center gap-2 text-sm font-semibold text-ocean-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand-400"
            >
              WhatsApp us — {whatsappDisplay}
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
