import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Params {
  year: string;
  month: string;
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({ year: p.year, month: p.month, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { year, month, slug } = await params;
  const post = await getPostBySlug(year, month, slug);
  return { title: post ? `${post.title} — Sam Wong` : "Post not found" };
}

const CONTAINER = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "var(--spacing-64) var(--spacing-32) var(--spacing-128)",
};

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { year, month, slug } = await params;
  const post = await getPostBySlug(year, month, slug);
  if (!post) notFound();

  return (
    <div style={CONTAINER}>
      <Link
        href="/blog/"
        style={{
          fontSize: "var(--text-body-sm)",
          fontFamily: "var(--font-fragmentmono)",
          letterSpacing: "0.02em",
          color: "var(--color-mist-gray)",
          display: "inline-block",
          marginBottom: "var(--spacing-32)",
        }}
      >
        ← Blog
      </Link>

      <header style={{ marginBottom: "var(--spacing-48)" }}>
        <h1
          style={{
            fontSize: "var(--text-body-lg)",
            fontWeight: 700,
            lineHeight: "var(--leading-body-lg)",
            letterSpacing: "-0.04em",
            margin: "0 0 var(--spacing-8) 0",
          }}
        >
          {post.title}
        </h1>
        <time
          style={{
            fontSize: "var(--text-body-sm)",
            fontFamily: "var(--font-fragmentmono)",
            letterSpacing: "0.02em",
            color: "var(--color-mist-gray)",
          }}
        >
          {post.date}
        </time>
      </header>

      <div
        className="prose"
        style={{
          fontSize: "var(--text-body)",
          lineHeight: 1.7,
          color: "var(--color-adaline-ink)",
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
