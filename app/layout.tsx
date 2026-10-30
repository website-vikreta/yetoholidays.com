import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ScrollFX from "@/components/ScrollFX";
import { site } from "@/lib/site";

// next/font self-hosts both families at build time, no request to Google at
// runtime, and no layout shift thanks to the generated fallback metrics.
// Both are variable fonts, so one file covers every weight. Fraunces' optional
// SOFT and WONK axes are deliberately not requested: enabling them grew the
// preloaded font payload from 107KB to 163KB for no visible benefit here.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "./" },
  title: {
    default: "Yeto Holidays | Travel agency in Nagpur",
    template: "%s | Yeto Holidays",
  },
  description:
    "Yeto Holidays plans international and domestic holidays, honeymoons, group tours and corporate trips from our office in Dharampeth, Nagpur.",
  keywords: [
    "Yeto Holidays",
    "travel agency",
    "international tour packages",
    "group tours",
    "honeymoon packages",
    "Nagpur travel agency",
    "Dubai packages",
    "Vietnam tour",
    "Thailand packages",
  ],
  openGraph: {
    title: "Yeto Holidays | Travel agency in Nagpur",
    description:
      "Yeto Holidays plans international and domestic holidays, honeymoons, group tours and corporate trips from our office in Dharampeth, Nagpur.",
    siteName: site.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeto Holidays | Travel agency in Nagpur",
    description:
      "Yeto Holidays plans international and domestic holidays, honeymoons, group tours and corporate trips from our office in Dharampeth, Nagpur.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e2f45",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <head>
        {/* Runs before first paint, and is the only inline script on the page.
            1. Marks that scripting is available, so scroll-reveal blocks start
               hidden, without JS the page still renders in full.
            2. One capturing listener hides any image that fails to load, so the
               brand gradient behind it shows through instead of a broken-image
               glyph. Doing this globally keeps <SmartImage> a server component:
               images stay in the initial HTML and are never gated behind an
               onLoad handler, which would push the LCP paint past hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-js","");addEventListener("error",function(e){var t=e.target;if(t&&t.tagName==="IMG"){t.style.visibility="hidden"}},true)`,
          }}
        />
      </head>
      <body className="bg-white text-ocean-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ocean-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <ScrollFX />
      </body>
    </html>
  );
}
