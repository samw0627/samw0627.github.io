import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/project-content";
import ReadingProgress from "@/components/ReadingProgress";
import ProjectSideNav from "@/components/ProjectSideNav";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  // `output: "export"` rejects a dynamic route with no params. Until
  // content/projects/ has a case study, emit one placeholder that 404s.
  if (slugs.length === 0) return [{ slug: "_none" }];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Sam Wong`,
    description: project.summary,
  };
}

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-label)",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-tertiary)",
};

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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const externalLinks = [
    project.paper && { label: "Paper", href: project.paper },
    project.code && { label: "Code", href: project.code },
    project.demo && { label: "Demo", href: project.demo },
    project.video && { label: "Video", href: project.video },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <ReadingProgress />

      <div style={{ paddingBottom: 128 }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <div
          style={{
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: 64,
            marginBottom: 0,
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "64px 24px 0",
            }}
          >
            {/* Back + breadcrumb */}
            <div style={{ marginBottom: 40 }}>
              <Link
                href="/projects/"
                style={{
                  ...MONO,
                  color: "var(--color-text-tertiary)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                className="back-link"
              >
                ← Projects
              </Link>
            </div>

            {/* Top strip: type · venue · year */}
            <p style={{ ...MONO, marginBottom: 20 }}>
              {[project.type, project.venue, project.year]
                .filter(Boolean)
                .join(" · ")}
            </p>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(44px, 7vw, 68px)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                margin: "0 0 16px 0",
                color: "var(--color-text-primary)",
              }}
            >
              {project.title}
            </h1>

            {/* Tagline */}
            {project.tagline && (
              <p
                style={{
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontWeight: 400,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.35,
                  margin: "0 0 40px 0",
                  maxWidth: 560,
                  letterSpacing: "-0.02em",
                }}
              >
                {project.tagline}
              </p>
            )}

            {/* Metadata grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "16px 32px",
                paddingTop: 24,
                paddingBottom: 32,
                borderTop: "1px solid var(--color-border)",
                marginBottom: externalLinks.length > 0 ? 24 : 0,
              }}
            >
              {project.year && (
                <MetaItem label="Year" value={String(project.year)} />
              )}
              {project.role && (
                <MetaItem label="Role" value={project.role} />
              )}
              {project.venue && (
                <MetaItem label="Venue" value={project.venue} />
              )}
              {project.status && (
                <MetaItem label="Status" value={project.status} />
              )}
              {project.collaborators && project.collaborators.length > 0 && (
                <MetaItem
                  label="With"
                  value={project.collaborators.join(", ")}
                  wide
                />
              )}
            </div>

            {/* External links */}
            {externalLinks.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {externalLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-link"
                    style={LINK_CHIP}
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}

            {/* Hero image */}
            {project.image && (
              <div
                style={{
                  marginTop: 40,
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 0,
                  border: "1px solid var(--color-border)",
                }}
              >
                <Image
                  src={`/images/projects/${project.image}`}
                  alt={project.title}
                  width={760}
                  height={420}
                  unoptimized
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Body: side nav + content ──────────────────────── */}
        <div
          style={{
            maxWidth: 1060,
            margin: "0 auto",
            padding: "64px 24px 0",
            display: "flex",
            gap: 64,
            alignItems: "flex-start",
          }}
        >
          {/* Left: sticky section nav (hidden on narrow screens via CSS) */}
          <div className="project-sidenav">
            <ProjectSideNav sections={project.sections} />
          </div>

          {/* Right: main content */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Findings cards — before prose, if present */}
            {project.findings && project.findings.length > 0 && (
              <div style={{ marginBottom: 64 }}>
                <p style={{ ...MONO, marginBottom: 16 }}>Key Findings</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {project.findings.map((f) => (
                    <div
                      key={f.number}
                      style={{
                        display: "flex",
                        gap: 24,
                        padding: "24px",
                        borderBottom: "1px solid var(--color-border-faint)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-label)",
                          fontWeight: 500,
                          letterSpacing: "0.04em",
                          color: "var(--color-accent)",
                          flexShrink: 0,
                          paddingTop: 3,
                          minWidth: 24,
                        }}
                      >
                        {String(f.number).padStart(2, "0")}
                      </span>
                      <div>
                        <p
                          style={{
                            margin: "0 0 6px 0",
                            fontWeight: 600,
                            fontSize: "var(--text-body)",
                            lineHeight: 1.3,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {f.title}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "var(--text-small)",
                            color: "var(--color-text-secondary)",
                            lineHeight: 1.6,
                          }}
                        >
                          {f.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rendered markdown prose — split at h2 headings */}
            <ProjectProse
              html={project.contentHtml}
              sections={project.sections}
            />
          </div>
        </div>
      </div>

      <style>{`
        .project-sidenav {
          display: none;
        }
        @media (min-width: 1060px) {
          .project-sidenav {
            display: block;
          }
        }
        .back-link:hover {
          color: var(--color-text-primary) !important;
        }

        /* Prose styles */
        .project-prose {
          color: var(--color-text-primary);
          font-size: var(--text-body);
          line-height: 1.7;
        }
        .project-prose .section-anchor {
          scroll-margin-top: 80px;
        }
        .project-prose .section-header {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin: 64px 0 24px 0;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--color-border);
        }
        .project-prose .section-header:first-child {
          margin-top: 0;
        }
        .project-prose .section-roman {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-accent);
          flex-shrink: 0;
        }
        .project-prose h2 {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin: 0;
          line-height: 1.1;
          color: var(--color-text-primary);
        }
        .project-prose h3 {
          font-size: var(--text-body);
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 40px 0 12px;
          color: var(--color-text-primary);
        }
        .project-prose p {
          margin: 0 0 20px 0;
          color: var(--color-text-primary);
          font-size: var(--text-body);
          line-height: 1.7;
        }
        .project-prose p:last-child {
          margin-bottom: 0;
        }
        .project-prose a {
          color: var(--color-accent);
          text-decoration: underline;
          text-decoration-color: var(--color-border);
          text-underline-offset: 3px;
        }
        .project-prose a:hover {
          text-decoration-color: var(--color-accent);
        }
        .project-prose ul, .project-prose ol {
          margin: 0 0 20px 0;
          padding-left: 24px;
        }
        .project-prose li {
          margin-bottom: 8px;
          font-size: var(--text-body);
          line-height: 1.6;
        }
        .project-prose img {
          width: 100%;
          height: auto;
          display: block;
          border: 1px solid var(--color-border);
          margin: 32px 0 0 0;
        }
        .project-prose em {
          display: block;
          font-style: normal;
          font-family: var(--font-mono);
          font-size: var(--text-label);
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--color-text-tertiary);
          margin: 8px 0 32px 0;
        }
        .project-prose blockquote {
          margin: 32px 0;
          padding: 20px 24px;
          border-left: 3px solid var(--color-accent);
          background: var(--color-border-faint);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
        .project-prose blockquote p {
          margin: 0;
          font-size: 18px;
          font-style: italic;
          color: var(--color-text-primary);
          line-height: 1.5;
        }
        .project-prose strong {
          font-weight: 600;
        }
        .project-prose code {
          font-family: var(--font-mono);
          font-size: 13px;
          background: var(--color-border-faint);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }
        .project-prose hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 48px 0;
        }
      `}</style>
    </>
  );
}

function MetaItem({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div style={wide ? { gridColumn: "span 2" } : {}}>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-label)",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-text-tertiary)",
          margin: "0 0 4px 0",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "var(--text-small)",
          color: "var(--color-text-primary)",
          margin: 0,
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function ProjectProse({
  html,
  sections,
}: {
  html: string;
  sections: { id: string; label: string; roman: string }[];
}) {
  // Inject section anchors + § markers before each h2
  let processed = html;
  sections.forEach((s) => {
    const h2Regex = new RegExp(
      `<h2>(${escapeRegex(s.label)})</h2>`,
      "i"
    );
    const replacement = `
      <div id="${s.id}" class="section-anchor">
        <div class="section-header">
          <span class="section-roman">§ ${s.roman}</span>
          <h2>${s.label}</h2>
        </div>
      </div>`;
    processed = processed.replace(h2Regex, replacement);
  });

  return (
    <div
      className="project-prose"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
