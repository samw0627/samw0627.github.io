import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPublicationBySlug } from "./publications";
import { PAPERS_DIR } from "./paper-index";
import { slugify } from "./slug";
import type { Publication } from "./types";

export { getAllPaperSlugs } from "./paper-index";

export interface PaperSection {
  id: string;
  label: string;
  roman: string;
}

export interface PaperContribution {
  title: string;
  body: string;
}

export interface Paper {
  slug: string;
  /** Title, authors, venue and links all come from the _publications/ entry */
  publication: Publication;
  /** Short display name, e.g. "VizGroup"; falls back to the paper title */
  name: string;
  tagline?: string;
  tldr: string;
  hero?: string;
  heroCaption?: string;
  code?: string;
  demo?: string;
  video?: string;
  bibtex?: string;
  contributions: PaperContribution[];
  /** Derived from the `## ` headings in the MDX body, in order */
  sections: PaperSection[];
  /** Raw MDX body, compiled by next-mdx-remote in the page */
  content: string;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export const toRoman = (i: number) => ROMAN[i] ?? String(i + 1);

function extractSections(markdown: string): PaperSection[] {
  const labels: string[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (line.trimStart().startsWith("```")) inFence = !inFence;
    const match = !inFence && /^## (.+?)\s*$/.exec(line);
    if (match) labels.push(match[1]);
  }
  return labels.map((label, i) => ({ id: slugify(label), label, roman: toRoman(i) }));
}

export async function getPaperBySlug(slug: string): Promise<Paper | null> {
  const file = path.join(PAPERS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const publication = await getPublicationBySlug(data.publication);
  if (!publication) {
    throw new Error(
      `content/papers/${slug}.mdx: publication "${data.publication}" not found in _publications/`
    );
  }

  return {
    slug,
    publication,
    name: data.name ?? publication.title,
    tagline: data.tagline,
    tldr: data.tldr ?? publication.summary ?? "",
    hero: data.hero,
    heroCaption: data.hero_caption,
    code: data.code,
    demo: data.demo,
    video: data.video,
    bibtex: data.bibtex?.trim(),
    contributions: data.contributions ?? [],
    sections: extractSections(content),
    content,
  };
}
