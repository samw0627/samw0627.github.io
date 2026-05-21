import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Publication } from "./types";

const PUBS_DIR = path.join(process.cwd(), "_publications");

async function parsePublication(file: string): Promise<Publication> {
  const raw = fs.readFileSync(path.join(PUBS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    slug: file.replace(/\.html$/, ""),
    year: data.year,
    title: data.title,
    authors: data.authors ?? [],
    type: data.type ?? [],
    venue: data.venue,
    venueLocation: data.venue_location,
    venueTags: data.venue_tags,
    venueUrl: data.venue_url,
    tags: data.tags,
    awards: data.awards,
    highlight: data.highlight === true,
    doi: data.doi,
    arxiv: data.arxiv,
    pdf: data.pdf,
    html: data.html,
    video: data.video,
    link: data.link,
    recording: data.recording,
    slides: data.slides,
    blog: data.blog,
    osf: data.osf,
    description: processed.toString().trim() || undefined,
    summary: data.summary,
  };
}

let _cache: Publication[] | null = null;

export async function getAllPublications(): Promise<Publication[]> {
  if (_cache) return _cache;
  const files = fs.readdirSync(PUBS_DIR).filter((f) => f.endsWith(".html"));
  const pubs = await Promise.all(files.map(parsePublication));
  _cache = pubs.sort((a, b) => b.year - a.year);
  return _cache;
}

export async function getHighlightedPublications(): Promise<Publication[]> {
  const all = await getAllPublications();
  return all.filter((p) => p.highlight === true);
}
