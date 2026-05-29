import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export interface ProjectSection {
  id: string;
  label: string;
  roman: string;
}

export interface ProjectFinding {
  number: number;
  title: string;
  body: string;
}

export interface RichProject {
  slug: string;
  title: string;
  tagline?: string;
  year: number;
  role?: string;
  collaborators?: string[];
  venue?: string;
  type?: string;
  status?: string;
  paper?: string;
  code?: string;
  demo?: string;
  video?: string;
  tags?: string[];
  image?: string;
  summary: string;
  sections: ProjectSection[];
  findings?: ProjectFinding[];
  contentHtml: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return result.toString();
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getProjectBySlug(slug: string): Promise<RichProject | null> {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const contentHtml = await markdownToHtml(content);

  return {
    slug,
    title: data.title ?? slug,
    tagline: data.tagline,
    year: data.year ?? new Date().getFullYear(),
    role: data.role,
    collaborators: data.collaborators ?? [],
    venue: data.venue,
    type: data.type,
    status: data.status,
    paper: data.paper,
    code: data.code,
    demo: data.demo,
    video: data.video,
    tags: data.tags ?? [],
    image: data.image,
    summary: data.summary ?? "",
    sections: data.sections ?? [],
    findings: data.findings ?? [],
    contentHtml,
  };
}
