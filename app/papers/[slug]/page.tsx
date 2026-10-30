import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPaperBySlug, getAllPaperSlugs, toRoman } from "@/lib/papers";
import { getPeople } from "@/lib/data";
import ReadingProgress from "@/components/ReadingProgress";
import ProjectSideNav from "@/components/ProjectSideNav";
import FigureLightbox from "@/components/paper/FigureLightbox";
import CopyButton from "@/components/paper/CopyButton";
import Figure from "@/components/paper/Figure";
import { paperMdxComponents } from "@/components/paper/mdx-components";
import "@/components/paper/paper.css";

export async function generateStaticParams() {
  return getAllPaperSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);
  if (!paper) return {};
  return {
    title: `${paper.name} — Sam Wong`,
    description: paper.tldr,
    openGraph: paper.hero ? { images: [paper.hero] } : undefined,
  };
}

const LINK_CHIP: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-label)",
  fontWeight: 500,
  letterSpacing: "0.04em",
  color: "var(--color-accent)",
  border: "1px solid var(--color-accent)",
  borderRadius: "var(--radius-sm)",
  padding: "3px 10px",
  textDecoration: "none",
};

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);
  if (!paper) notFound();

  const pub = paper.publication;
  const people = getPeople();

  const links = [
    pub.pdf && { label: "PDF", href: pub.pdf },
    pub.link && { label: "ACM DL", href: pub.link },
    pub.arxiv && { label: "arXiv", href: `https://arxiv.org/abs/${pub.arxiv}` },
    pub.doi && { label: "DOI", href: `https://doi.org/${pub.doi}` },
    paper.code && { label: "Code", href: paper.code },
    paper.demo && { label: "Demo", href: paper.demo },
    (paper.video ?? pub.video) && { label: "Video", href: (paper.video ?? pub.video)! },
    pub.slides && { label: "Slides", href: pub.slides },
  ].filter(Boolean) as { label: string; href: string }[];

  const citeSection = paper.bibtex
    ? { id: "cite", label: "Cite", roman: toRoman(paper.sections.length) }
    : null;
  const navSections = citeSection ? [...paper.sections, citeSection] : paper.sections;

  return (
    <>
      <ReadingProgress />
      <FigureLightbox />

      <div style={{ paddingBottom: 128 }}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <header style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: 56 }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 0" }}>
            <div style={{ marginBottom: 40 }}>
              <Link
                href="/publications/"
                className="back-link mono-label"
                style={{ textDecoration: "none" }}
              >
                ← Publications
              </Link>
            </div>

            <p className="mono-label" style={{ margin: "0 0 20px" }}>
              {[pub.venue, pub.year, pub.venueLocation].filter(Boolean).join(" · ")}
            </p>

            <h1
              style={{
                fontSize: "clamp(40px, 7vw, 64px)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                margin: "0 0 16px",
              }}
            >
              {paper.name}
            </h1>

            {paper.tagline && (
              <p
                style={{
                  fontSize: "clamp(18px, 3vw, 22px)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.4,
                  margin: "0 0 28px",
                  maxWidth: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {paper.tagline}
              </p>
            )}

            {paper.name !== pub.title && (
              <p style={{ margin: "0 0 12px", fontSize: "var(--text-small)", fontWeight: 600, lineHeight: 1.4 }}>
                {pub.title}
              </p>
            )}

            <p style={{ margin: "0 0 28px", fontSize: "var(--text-small)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              {pub.authors.map((name, i) => {
                const person = people[name];
                const text = person?.me ? <strong style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{name}</strong> : name;
                return (
                  <span key={name}>
                    {i > 0 && ", "}
                    {person?.url ? (
                      <a href={person.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", textDecorationColor: "var(--color-border)", textUnderlineOffset: 2 }}>
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </span>
                );
              })}
            </p>

            {pub.awards && pub.awards.length > 0 && (
              <p className="mono-label" style={{ margin: "0 0 16px", color: "var(--color-accent)" }}>
                {pub.awards.join(" · ")}
              </p>
            )}

            {links.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {links.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="pub-link" style={LINK_CHIP}>
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {paper.hero && (
            <div style={{ maxWidth: 1060, margin: "48px auto 0", padding: "0 24px" }}>
              <Figure src={paper.hero} caption={paper.heroCaption} n="1" alt={pub.title} />
            </div>
          )}
        </header>

        {/* ── Body: side nav + content ──────────────────────── */}
        <div
          style={{
            maxWidth: 1060,
            margin: "0 auto",
            padding: "56px 24px 0",
            display: "flex",
            gap: 64,
            alignItems: "flex-start",
          }}
        >
          <div className="paper-sidenav">
            <ProjectSideNav sections={navSections} />
          </div>

          <div style={{ flex: 1, minWidth: 0, maxWidth: 712 }}>
            {paper.tldr && (
              <div className="tldr">
                <span className="mono-label" style={{ color: "var(--color-accent)" }}>TL;DR</span>
                <p>{paper.tldr}</p>
              </div>
            )}

            {pub.description && (
              <details className="abstract">
                <summary>Read the paper&apos;s abstract</summary>
                <div className="abstract__body" dangerouslySetInnerHTML={{ __html: pub.description }} />
              </details>
            )}

            {paper.contributions.length > 0 && (
              <>
                <p className="mono-label" style={{ margin: "0 0 16px" }}>Key contributions</p>
                <div className="contribs">
                  {paper.contributions.map((c, i) => (
                    <div key={c.title} className="contrib">
                      <span className="contrib__n">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="contrib__title">{c.title}</p>
                        <p className="contrib__body">{c.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <article className="paper-prose">
              <MDXRemote
                source={paper.content}
                components={paperMdxComponents(paper.sections)}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />

              {citeSection && (
                <>
                  <div id={citeSection.id} className="section-anchor section-header">
                    <span className="section-roman">§ {citeSection.roman}</span>
                    <h2>Cite this paper</h2>
                  </div>
                  <div className="bibtex">
                    <CopyButton text={paper.bibtex!} label="Copy BibTeX" />
                    <pre>{paper.bibtex}</pre>
                  </div>
                </>
              )}
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
