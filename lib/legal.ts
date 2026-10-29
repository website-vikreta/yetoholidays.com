import { readFileSync } from "node:fs";
import { join } from "node:path";
import { addressLine, site } from "@/lib/site";

export type LegalSlug = "privacy" | "terms" | "cancellation-policy";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalDoc = {
  /** True while front matter says `status: draft`; shows the draft banner. */
  draft: boolean;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; blocks: LegalBlock[] }[];
};

const TOKENS: Record<string, string> = {
  legalName: site.legalName,
  cin: site.cin,
  established: site.established,
  address: addressLine,
  domain: site.url,
};

const fill = (text: string) =>
  text.replace(/\{\{(\w+)\}\}/g, (_, key: string) => TOKENS[key] ?? "");

/**
 * Reads content/legal/<slug>.md at build time. Supports the small subset the
 * legal drafts use: a front-matter block (title, description, intro), `##`
 * headings, paragraphs and `-` bullet lists, plus {{token}} company facts.
 */
export function loadLegal(slug: LegalSlug): LegalDoc {
  const raw = readFileSync(join(process.cwd(), "content", "legal", `${slug}.md`), "utf8");
  const [, front, body] = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? [];
  if (!front) throw new Error(`content/legal/${slug}.md is missing front matter`);

  const meta: Record<string, string> = {};
  for (const line of front.split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = fill(line.slice(i + 1).trim());
  }

  const sections: LegalDoc["sections"] = [];
  for (const chunk of body.split(/^## /m).slice(1)) {
    const [heading, ...rest] = chunk.split(/\r?\n/);
    const blocks: LegalBlock[] = [];
    for (const para of rest.join("\n").split(/\n\s*\n/)) {
      const lines = para.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (!lines.length) continue;
      if (lines.every((l) => l.startsWith("- "))) {
        blocks.push({ type: "ul", items: lines.map((l) => fill(l.slice(2))) });
      } else {
        blocks.push({ type: "p", text: fill(lines.join(" ")) });
      }
    }
    sections.push({ heading: fill(heading.trim()), blocks });
  }

  return {
    draft: meta.status === "draft",
    title: meta.title,
    description: meta.description,
    intro: meta.intro,
    sections,
  };
}
