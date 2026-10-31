// Tab through the pinned destination tickets and check each one lands inside
// the viewport. Needs playwright-core and Chrome.
//   node scripts/keyboard-check.mjs [baseUrl]
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome" });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto(base, { waitUntil: "networkidle" });

// Start just before the pinned section so the first Tab reaches its tickets.
await page.evaluate(() => {
  const top = document.getElementById("destinations").getBoundingClientRect().top + scrollY;
  scrollTo({ top: top - 200, behavior: "instant" });
  document.activeElement?.blur();
});

const seen = [];
for (let i = 0; i < 60 && seen.length < 7; i++) {
  await page.keyboard.press("Tab");
  await page.waitForTimeout(120);
  const info = await page.evaluate(() => {
    const el = document.activeElement;
    const pass = el?.closest("[data-pass]");
    if (!pass) return null;
    const r = el.getBoundingClientRect();
    return { name: el.getAttribute("aria-label"), left: Math.round(r.left), right: Math.round(r.right), vw: innerWidth };
  });
  if (info && !seen.some((s) => s.name === info.name)) seen.push(info);
}

let failed = 0;
for (const s of seen) {
  const visible = s.left >= 0 && s.right <= s.vw;
  if (!visible) failed++;
  console.log(`${visible ? "ok  " : "FAIL"} ${s.name}  (${s.left} to ${s.right} of ${s.vw})`);
}
console.log(`${seen.length} tickets reached by keyboard, ${failed} outside the viewport`);
await browser.close();
process.exit(failed || seen.length < 7 ? 1 : 0);
