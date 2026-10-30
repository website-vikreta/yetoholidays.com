// Fails the build when visitor-facing text has long dashes, filler glyphs,
// banned phrases or emoji flags. Run: npm run check:copy
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOTS = ["app", "components", "lib", "content"];
const EXTENSIONS = new Set([".ts", ".tsx", ".md", ".json", ".css"]);

const RULES = [
  { name: "em dash", re: /—|&mdash;|\u2014/ },
  { name: "en dash", re: /–|&ndash;|\u2013/ },
  { name: "emoji flag", re: /[\u{1F1E6}-\u{1F1FF}]/u },
  { name: "bullet glyph", re: /•|&bull;/ },
  { name: "arrow glyph", re: /→|&rarr;/ },
  ...[
    "unforgettable",
    "discover",
    "carefully planned",
    "curated",
    "handpicked",
    "seamless",
    "tailored",
    "memories",
    "adventure is waiting",
    "next adventure",
    "take care of the rest",
    "built around how people actually travel",
    "a destination begins with a journey",
    "down to the last transfer",
    "just has to show up",
    "all you have to do is show up",
    "elevate",
    "embark",
    "nestled",
    "bucket list",
    "bucket-list",
    "hidden gem",
    "immerse",
    "world-class",
    "trusted partners",
    "personal assistance",
    "transparent pricing",
    "global destinations",
  ].map((p) => ({ name: `banned phrase "${p}"`, re: new RegExp(p, "i") })),
  // The unconfirmed tagline may live only in lib/site.ts.
  {
    name: "tagline outside lib/site.ts",
    re: /your journey\.\s*your story/i,
    allow: ["lib/site.ts"],
  },
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (EXTENSIONS.has(path.slice(path.lastIndexOf(".")))) yield path;
  }
}

let hits = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = relative(".", file).split(sep).join("/");
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .forEach((line, i) => {
        for (const rule of RULES) {
          if (rule.allow?.includes(rel)) continue;
          if (rule.re.test(line)) {
            hits++;
            console.log(`${rel}:${i + 1}  ${rule.name}  ${line.trim().slice(0, 90)}`);
          }
        }
      });
  }
}

if (hits) {
  console.error(`\ncheck:copy found ${hits} problem(s).`);
  process.exit(1);
}
console.log("check:copy: clean");
