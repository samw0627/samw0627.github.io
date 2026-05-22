import Image from "next/image";
import { getHighlightedProjects } from "@/lib/projects";
import { getHighlightedPublications } from "@/lib/publications";
import { getPeople } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";
import Button from "@/components/Button";
import ScrollReveal from "@/components/ScrollReveal";

const CONTAINER: React.CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "0 32px",
};

const LABEL: React.CSSProperties = {
  fontFamily: "var(--font-fragmentmono)",
  fontSize: "var(--text-caption)",
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: "var(--color-mist-gray)",
  marginBottom: 10,
};

const BULLET_LIST: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const BULLET_ITEM: React.CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: 10,
  fontSize: "var(--text-body)",
  lineHeight: 1.5,
  color: "var(--color-adaline-ink)",
};

const DOT: React.CSSProperties = {
  width: 5,
  height: 5,
  borderRadius: "50%",
  backgroundColor: "var(--color-valley-green)",
  flexShrink: 0,
  marginTop: 8,
};

const LINK: React.CSSProperties = {
  color: "var(--color-valley-green)",
  textDecoration: "underline",
  textDecorationColor: "var(--color-stone-moss)",
  textUnderlineOffset: 3,
};

interface BulletProps {
  children: React.ReactNode;
}

function Bullet({ children }: BulletProps) {
  return (
    <li style={BULLET_ITEM}>
      <span style={DOT} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

interface SectionHeaderProps {
  title: string;
  href: string;
}

function SectionHeader({ title, href }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 32,
        paddingBottom: 16,
        borderBottom: "1px solid var(--color-stone-moss)",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        {title}
      </h2>
      <Button href={href} variant="tertiary">
        View all
      </Button>
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
    <div style={{ paddingBottom: "var(--spacing-128)" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          ...CONTAINER,
          paddingTop: 80,
          paddingBottom: 80,
          borderBottom: "1px solid var(--color-stone-moss)",
        }}
      >
        <div
          className="hero-row"
          style={{
            display: "flex",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left: text */}
          <div style={{ flex: 1, minWidth: 0 }}>

            <h1
              className="anim-1"
              style={{
                fontSize: "clamp(36px, 6vw, 53px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                margin: "0 0 8px 0",
              }}
            >
              Sam Wong
            </h1>

            <p
              className="anim-2"
              style={{
                fontFamily: "var(--font-fragmentmono)",
                fontSize: "var(--text-body-sm)",
                letterSpacing: "0.02em",
                color: "var(--color-mist-gray)",
                margin: "0 0 40px 0",
              }}
            >
              Research Assistant · University of Washington
            </p>

            {/* Research bullets */}
            <div className="anim-3" style={{ marginBottom: 28 }}>
              <p style={LABEL}>Research</p>
              <ul style={BULLET_LIST}>
                <Bullet>
                  Human-Computer Interaction &amp; Social Computing
                </Bullet>
                <Bullet>
                  <a href="https://social.cs.washington.edu/" style={LINK} target="_blank" rel="noopener noreferrer">
                    Social Futures Lab
                  </a>{" "}
                  at{" "}
                  <a href="https://www.cs.washington.edu/" style={LINK} target="_blank" rel="noopener noreferrer">
                    Paul G. Allen School
                  </a>
                  , advised by{" "}
                  <a href="https://homes.cs.washington.edu/~axz/" style={LINK} target="_blank" rel="noopener noreferrer">
                    Amy Zhang
                  </a>
                </Bullet>
                <Bullet>
                  Building systems for online social understanding &amp; participation
                </Bullet>
              </ul>
            </div>

            {/* Education bullets */}
            <div className="anim-4" style={{ marginBottom: 36 }}>
              <p style={LABEL}>Education</p>
              <ul style={BULLET_LIST}>
                <Bullet>
                  MS ·{" "}
                  <a href="https://gix.uw.edu/" style={LINK} target="_blank" rel="noopener noreferrer">
                    Global Innovation Exchange
                  </a>
                  , UW
                </Bullet>
                <Bullet>
                  BS · Cognitive Science (minor: CS) ·{" "}
                  <a href="https://ucsd.edu/" style={LINK} target="_blank" rel="noopener noreferrer">
                    UC San Diego
                  </a>
                </Bullet>
              </ul>
            </div>

            {/* Social links */}
            <div
              className="anim-5"
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Email", href: "mailto:samw627@uw.edu" },
                { label: "GitHub", href: "https://github.com/samw0627" },
                { label: "Google Scholar", href: "https://scholar.google.com/citations?user=3ikhPPUAAAAJ&hl=en" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/samwong0627/" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-fragmentmono)",
                    fontSize: "var(--text-caption)",
                    letterSpacing: "0.02em",
                    color: "var(--color-valley-green)",
                    border: "1px solid var(--color-stone-moss)",
                    borderRadius: "var(--radius-buttons)",
                    padding: "5px 14px",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div
            className="anim-1 hero-photo"
            style={{ flexShrink: 0 }}
          >
            <Image
              src="/images/sam_wong.webp"
              alt="Sam Wong"
              width={260}
              height={260}
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      <section
        style={{
          ...CONTAINER,
          paddingTop: 72,
          paddingBottom: 72,
          borderBottom: "1px solid var(--color-stone-moss)",
        }}
      >
        <ScrollReveal>
          <SectionHeader title="Featured Projects" href="/projects/" />
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
            marginBottom: 32,
          }}
        >
          {projects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 80}>
              <ProjectCard project={p} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={projects.length * 80}>
          <Button href="/projects/" variant="secondary">
            Show More Projects
          </Button>
        </ScrollReveal>
      </section>

      {/* ── Featured Publications ─────────────────────────── */}
      <section
        style={{
          ...CONTAINER,
          paddingTop: 72,
          paddingBottom: 72,
        }}
      >
        <ScrollReveal>
          <SectionHeader title="Selected Publications" href="/publications/" />
        </ScrollReveal>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            marginBottom: 32,
          }}
        >
          {publications.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 60}>
              <PublicationCard pub={p} people={people} compact />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={publications.length * 60}>
          <Button href="/publications/" variant="secondary">
            Show All Publications
          </Button>
        </ScrollReveal>
      </section>

    </div>
  );
}
