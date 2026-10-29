import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sand-600">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`reveal max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-3 font-display text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === "light" ? "text-white" : "text-ocean-900"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-[0.975rem] leading-relaxed sm:text-lg ${
            tone === "light" ? "text-white/75" : "text-ocean-800/70"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3";

const VARIANTS = {
  primary:
    "bg-ocean-900 text-white hover:bg-ocean-800 shadow-lg shadow-ocean-900/15 hover:shadow-xl hover:shadow-ocean-900/20",
  sand: "bg-sand-400 text-ocean-950 hover:bg-sand-300 shadow-lg shadow-sand-500/25",
  outline:
    "border border-ocean-900/20 bg-white/80 text-ocean-900 backdrop-blur hover:border-ocean-900/40 hover:bg-white",
  ghostLight:
    "border border-white/35 bg-white/10 text-white backdrop-blur hover:bg-white/20",
  white: "bg-white text-ocean-900 hover:bg-sand-50 shadow-lg shadow-ocean-950/15",
} as const;

const SIZES = {
  sm: "px-4 py-2.5 text-[0.8rem]",
  md: "px-5 py-3 sm:px-6 sm:py-3.5",
  lg: "px-6 py-3.5 sm:px-8 sm:py-4 sm:text-base",
} as const;

type ButtonLinkProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
} & ComponentProps<typeof Link>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`${BUTTON_BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    />
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`px-5 py-16 sm:px-8 sm:py-20 lg:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`h-4 w-4 ${className}`}
    >
      <path
        d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
