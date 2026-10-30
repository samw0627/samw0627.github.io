import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const PAPERS_DIR = path.join(process.cwd(), "content", "papers");

// Files starting with "_" (e.g. _template.mdx) are authoring aids, not pages
export function getAllPaperSlugs(): string[] {
  if (!fs.existsSync(PAPERS_DIR)) return [];
  return fs
    .readdirSync(PAPERS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// Maps a _publications/ slug to the paper page that summarizes it.
// Kept separate from lib/papers.ts so lib/publications.ts can use it
// without a circular import.
export function getPaperSlugsByPublication(): Map<string, string> {
  const index = new Map<string, string>();
  for (const slug of getAllPaperSlugs()) {
    const raw = fs.readFileSync(path.join(PAPERS_DIR, `${slug}.mdx`), "utf8");
    const { data } = matter(raw);
    if (data.publication) index.set(data.publication, slug);
  }
  return index;
}
