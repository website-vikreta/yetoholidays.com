// Scroll through the landing page and save screenshots.
//   node scripts/screenshots.mjs [baseUrl] [outDir]
// Needs playwright-core and an installed Chrome. For every width it scrolls to
// 0, 25, 50, 75 and 100 percent of the page, once normally and once with
// reduced motion, and prints what it finds (hidden reveals, moving parallax).
import { mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "qa-screenshots";
const widths = [375, 768, 1440];
const stops = [0, 0.25, 0.5, 0.75, 1];

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });

for (const reduced of [false, true]) {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 812 : 900 },
      reducedMotion: reduced ? "reduce" : "no-preference",
      hasTouch: width < 768,
      isMobile: width < 768,
    });
    const page = await context.newPage();
    await page.goto(base, { waitUntil: "networkidle" });

    for (const stop of stops) {
      await page.evaluate((s) => {
        const max = document.documentElement.scrollHeight - innerHeight;
        scrollTo({ top: max * s, behavior: "instant" });
      }, stop);
      await page.waitForTimeout(900);
      await page.screenshot({
        path: `${out}/${reduced ? "reduced" : "motion"}-${width}-${Math.round(stop * 100)}.png`,
      });
    }

    if (reduced) {
      // Nothing should be hidden and nothing should be moving.
      const report = await page.evaluate(() => {
        const hidden = [...document.querySelectorAll(".reveal, .reveal-up, .reveal-settle")].filter(
          (el) => el.getClientRects().length && getComputedStyle(el).opacity !== "1",
        ).length;
        const maskHidden = [...document.querySelectorAll(".reveal-mask-line")].filter(
          (el) => el.getClientRects().length && getComputedStyle(el).transform !== "none",
        ).length;
        const moved = [...document.querySelectorAll("*")].filter((el) => /translate3d\(0px, -?[1-9]/.test(el.style.transform)).length;
        return { hidden, maskHidden, moved };
      });
      console.log(`reduced motion @${width}:`, JSON.stringify(report));
    }
    await context.close();
  }
}
await browser.close();
console.log(`screenshots saved in ${out}`);
