import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { Post } from "./types";

const POSTS_DIR = path.join(process.cwd(), "_posts");
const FILE_REGEX = /^(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|markdown)$/;

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => FILE_REGEX.test(f));
  const posts = await Promise.all(
    files.map(async (file) => {
      const match = FILE_REGEX.exec(file)!;
      const [, year, month, , slug] = match;
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const processed = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(content);
      return {
        slug,
        date: `${year}-${month}-${match[3]}`,
        year,
        month,
        title: data.title ?? slug,
        description: data.description,
        permalink: data.permalink,
        content: processed.toString(),
      } as Post;
    })
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(
  year: string,
  month: string,
  slug: string
): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.year === year && p.month === month && p.slug === slug) ?? null;
}
