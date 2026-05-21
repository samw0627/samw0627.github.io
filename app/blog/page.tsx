import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog — Sam Wong",
};

const CONTAINER = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "var(--spacing-64) var(--spacing-32) var(--spacing-128)",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const byYear = new Map<string, typeof posts>();
  posts.forEach((p) => {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year)!.push(p);
  });
  const years = [...byYear.keys()].sort((a, b) => Number(b) - Number(a));

  return (
    <div style={CONTAINER}>
      <h1
        style={{
          fontSize: "var(--text-heading-sm)",
          fontWeight: 700,
          lineHeight: "var(--leading-heading-sm)",
          letterSpacing: "-0.04em",
          margin: "0 0 var(--spacing-48) 0",
        }}
      >
        Blog
      </h1>

      {years.map((year) => (
        <section key={year} style={{ marginBottom: "var(--spacing-48)" }}>
          <h2
            style={{
              fontSize: "var(--text-body-sm)",
              fontFamily: "var(--font-fragmentmono)",
              letterSpacing: "0.02em",
              color: "var(--color-mist-gray)",
              fontWeight: 400,
              margin: "0 0 var(--spacing-16) 0",
            }}
          >
            {year}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
            {byYear.get(year)!.map((post) => (
              <div
                key={post.slug}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "var(--spacing-16)",
                  padding: "var(--spacing-8) 0",
                  borderBottom: "1px solid var(--color-stone-moss)",
                }}
              >
                <Link
                  href={`/blog/${post.year}/${post.month}/${post.slug}/`}
                  style={{
                    fontWeight: 400,
                    fontSize: "var(--text-body)",
                    color: "var(--color-adaline-ink)",
                  }}
                >
                  {post.title}
                </Link>
                <span
                  style={{
                    fontSize: "var(--text-body-sm)",
                    fontFamily: "var(--font-fragmentmono)",
                    letterSpacing: "0.02em",
                    color: "var(--color-mist-gray)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {post.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
