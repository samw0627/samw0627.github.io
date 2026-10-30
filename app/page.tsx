import Image from "next/image";
import { getHighlightedProjects } from "@/lib/projects";
import { getHighlightedPublications } from "@/lib/publications";
import { getPeople } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";
import Button from "@/components/Button";
import ScrollReveal from "@/components/ScrollReveal";

const CONTAINER: React.CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
  padding: "0 24px",
};

const SECTION_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-label)",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-tertiary)",
  margin: "12px 0 0 0",
};

const SOCIAL_LINKS = [
  { label: "Email", href: "mailto:samw627@uw.edu" },
  { label: "GitHub", href: "https://github.com/samw0627" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=nV15uCcAAAAJ&hl=en" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samwong0627/" },
];

function SectionRule({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: 0 }} />
      <p style={SECTION_LABEL}>{label}</p>
    </div>
  );
}

export default async function HomePage() {
  const [projects, publications, people] = await Promise.all([
    getHighlightedProjects(),
    getHighlightedPublications(),
    getPeople(),
  ]);

  return (
    <div style={{ paddingBottom: 128 }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ ...CONTAINER, paddingTop: 80, paddingBottom: 80 }}>
        <div
          className="hero-row"
          style={{ display: "flex", gap: 64, alignItems: "flex-start" }}
        >
          {/* Left: text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              className="anim-1"
              style={{
                fontSize: "clamp(40px, 8vw, 60px)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                margin: "0 0 12px 0",
                color: "var(--color-text-primary)",
              }}
            >
              Sam Wong
            </h1>

            <p
              className="anim-2"
              style={{
                fontSize: "var(--text-body)",
                fontWeight: 400,
                color: "var(--color-text-secondary)",
                margin: "0 0 28px 0",
                lineHeight: 1.4,
              }}
            >
              Research Assistant · Human-Computer Interaction · University of Washington
            </p>

            <p
              className="anim-3"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--color-text-primary)",
                lineHeight: 1.7,
                margin: "0 0 32px 0",
              }}
            >
              I study how people form understanding and participate in online social environments.
              Working with{" "}
              <a
                href="https://homes.cs.washington.edu/~axz/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "var(--color-border)",
                  textUnderlineOffset: 3,
                }}
              >
                Amy Zhang
              </a>{" "}
              at the{" "}
              <a
                href="https://social.cs.washington.edu/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "var(--color-border)",
                  textUnderlineOffset: 3,
                }}
              >
                Social Futures Lab
              </a>
              , I build systems that facilitate collective sensemaking in digital communities.
              Previously at{" "}
              <a
                href="https://gix.uw.edu/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "var(--color-border)",
                  textUnderlineOffset: 3,
                }}
              >
                GIX
              </a>{" "}
              (MS) and{" "}
              <a
                href="https://ucsd.edu/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "var(--color-border)",
                  textUnderlineOffset: 3,
                }}
              >
                UC San Diego
              </a>{" "}
              (BS, Cognitive Science).
            </p>

            {/* Slash-separated social links */}
            <div
              className="anim-4"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 0,
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-caption)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              {SOCIAL_LINKS.map(({ label, href }, i) => (
                <span key={label} style={{ display: "flex", alignItems: "center" }}>
                  {i > 0 && (
                    <span style={{ color: "var(--color-border)", margin: "0 10px" }}>/</span>
                  )}
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{
                      color: "var(--color-text-secondary)",
                      transition: "color 150ms ease",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </a>
                </span>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div className="anim-1 hero-photo" style={{ flexShrink: 0 }}>
            <Image
              src="/images/sam_wong.webp"
              alt="Sam Wong"
              width={200}
              height={200}
              priority
              unoptimized
              style={{ display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      <section style={{ ...CONTAINER, paddingTop: 64, paddingBottom: 64 }}>
        <ScrollReveal>
          <SectionRule label="Selected Projects" />
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 0,
            marginBottom: 32,
            border: "1px solid var(--color-border)",
          }}
        >
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 60}>
              <ProjectCard project={p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={projects.length * 60}>
          <Button href="/projects/" variant="secondary">
            All projects →
          </Button>
        </ScrollReveal>
      </section>

      {/* ── Featured Publications ─────────────────────────── */}
      <section style={{ ...CONTAINER, paddingTop: 64, paddingBottom: 64 }}>
        <ScrollReveal>
          <SectionRule label="Selected Publications" />
        </ScrollReveal>

        <div style={{ marginBottom: 32 }}>
          {publications.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 50}>
              <PublicationCard pub={p} people={people} compact />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={publications.length * 50}>
          <Button href="/publications/" variant="secondary">
            All publications →
          </Button>
        </ScrollReveal>
      </section>

    </div>
  );
}
