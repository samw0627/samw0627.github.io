import Image from "next/image";
import { getHighlightedProjects } from "@/lib/projects";
import { getHighlightedPublications } from "@/lib/publications";
import { getPeople } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import PublicationCard from "@/components/PublicationCard";
import Button from "@/components/Button";

const CONTAINER = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "0 var(--spacing-32)",
};

export default async function HomePage() {
  const [projects, publications, people] = await Promise.all([
    getHighlightedProjects(),
    getHighlightedPublications(),
    getPeople(),
  ]);

  return (
    <div style={{ paddingTop: "var(--spacing-64)", paddingBottom: "var(--spacing-128)" }}>
      {/* Hero */}
      <section style={CONTAINER}>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-64)",
            alignItems: "flex-start",
            marginBottom: "var(--spacing-64)",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: "var(--text-heading-sm)",
                fontWeight: 700,
                lineHeight: "var(--leading-heading-sm)",
                letterSpacing: "-0.04em",
                margin: "0 0 var(--spacing-24) 0",
              }}
            >
              Hi, I&apos;m Sam Wong
            </h1>
            <div
              style={{
                fontSize: "var(--text-body)",
                lineHeight: 1.6,
                color: "var(--color-adaline-ink)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-16)",
              }}
            >
              <p style={{ margin: 0 }}>
                I&apos;m a Research Assistant at the{" "}
                <a
                  href="https://www.cs.washington.edu/"
                  style={{ color: "var(--color-valley-green)", textDecoration: "underline" }}
                >
                  Paul G. Allen School
                </a>{" "}
                at{" "}
                <a
                  href="https://www.washington.edu/"
                  style={{ color: "var(--color-valley-green)", textDecoration: "underline" }}
                >
                  University of Washington
                </a>
                , working with{" "}
                <a
                  href="https://homes.cs.washington.edu/~axz/"
                  style={{ color: "var(--color-valley-green)", textDecoration: "underline" }}
                >
                  Amy Zhang
                </a>{" "}
                at the{" "}
                <a
                  href="https://social.cs.washington.edu/index.html"
                  style={{ color: "var(--color-valley-green)", textDecoration: "underline" }}
                >
                  Social Futures Lab
                </a>
                . My research is in Human Computer Interaction and Social Computing,
                building systems that facilitate understanding and participation in online social settings.
              </p>
              <p style={{ margin: 0 }}>
                I recently graduated from my Master&apos;s degree at the{" "}
                <a
                  href="https://gix.uw.edu/"
                  style={{ color: "var(--color-valley-green)", textDecoration: "underline" }}
                >
                  Global Innovation Exchange
                </a>{" "}
                at UW, and hold a Bachelor&apos;s in{" "}
                <a
                  href="https://cogsci.ucsd.edu/"
                  style={{ color: "var(--color-valley-green)", textDecoration: "underline" }}
                >
                  Cognitive Science
                </a>{" "}
                from UC San Diego.
              </p>
              <p style={{ margin: 0, fontSize: "var(--text-body-sm)", color: "var(--color-mist-gray)" }}>
                <a
                  href="mailto:samw627@uw.edu"
                  style={{ color: "var(--color-valley-green)" }}
                >
                  samw627@uw.edu
                </a>
                {" · "}
                <a
                  href="https://github.com/samw0627"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-valley-green)" }}
                >
                  GitHub
                </a>
                {" · "}
                <a
                  href="https://scholar.google.com/citations?user=3ikhPPUAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--color-valley-green)" }}
                >
                  Google Scholar
                </a>
              </p>
            </div>
          </div>

          <div style={{ flexShrink: 0 }}>
            <Image
              src="/images/sam_wong.webp"
              alt="Sam Wong"
              width={200}
              height={200}
              priority
              unoptimized
              style={{
                borderRadius: "var(--radius-images)",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ ...CONTAINER, marginBottom: "var(--spacing-64)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "var(--spacing-32)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "var(--text-body-lg)",
              fontWeight: 700,
              lineHeight: "var(--leading-body-lg)",
              letterSpacing: "-0.04em",
            }}
          >
            Projects
          </h2>
          <Button href="/projects/" variant="tertiary">
            View all
          </Button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--spacing-24)",
            marginBottom: "var(--spacing-32)",
          }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>

        <Button href="/projects/" variant="secondary">
          Show More Projects
        </Button>
      </section>

      {/* Featured Publications */}
      <section style={CONTAINER}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "var(--spacing-32)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "var(--text-body-lg)",
              fontWeight: 700,
              lineHeight: "var(--leading-body-lg)",
              letterSpacing: "-0.04em",
            }}
          >
            Publications
          </h2>
          <Button href="/publications/" variant="tertiary">
            View all
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-24)",
            marginBottom: "var(--spacing-32)",
          }}
        >
          {publications.map((p) => (
            <PublicationCard key={p.slug} pub={p} people={people} compact />
          ))}
        </div>

        <Button href="/publications/" variant="secondary">
          Show All Publications
        </Button>
      </section>
    </div>
  );
}
