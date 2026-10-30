import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  slug?: string;
}

function TagChip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="tag-chip"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-label)",
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: "var(--color-accent)",
        border: "1px solid var(--color-accent)",
        borderRadius: "var(--radius-sm)",
        padding: "2px 8px",
        textDecoration: "none",
        transition: "background-color 150ms ease, color 150ms ease",
      }}
    >
      {label}
    </a>
  );
}

export default function ProjectCard({ project, slug }: ProjectCardProps) {
  const externalLink = project.url ?? project.demo ?? project.code ?? project.paper;
  // Case studies live at /projects/<slug>/; paper pages set `page` in projects.yml
  const pageHref = slug ? `/projects/${slug}/` : project.page;
  const imageSrc = project.image?.startsWith("/")
    ? project.image
    : `/images/projects/${project.image}`;

  return (
    <article
      className="project-card"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-none)",
        overflow: "hidden",
        backgroundColor: "var(--color-bg)",
        transition: "border-color 150ms ease",
      }}
    >
      {project.image && (
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            backgroundColor: "var(--color-border-faint)",
            overflow: "hidden",
          }}
        >
          {pageHref ? (
            <Link href={pageHref} style={{ display: "block", position: "absolute", inset: 0 }}>
              <Image
                src={imageSrc}
                alt={project.title}
                fill
                unoptimized
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
          ) : (
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              unoptimized
              style={{ objectFit: "cover", position: "absolute", inset: 0 }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      )}

      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "var(--text-h3)",
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: 0,
          }}
        >
          {pageHref ? (
            <Link href={pageHref} style={{ color: "inherit" }}>
              {project.title}
            </Link>
          ) : externalLink ? (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        {project.description && (
          <p
            style={{
              margin: 0,
              fontSize: "var(--text-small)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.55,
              flex: 1,
            }}
          >
            {project.description}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
          {pageHref && (
            <Link
              href={pageHref}
              className="tag-chip"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "var(--color-accent)",
                border: "1px solid var(--color-accent)",
                borderRadius: "var(--radius-sm)",
                padding: "2px 8px",
                textDecoration: "none",
              }}
            >
              {slug ? "Case Study →" : "Paper Summary →"}
            </Link>
          )}
          {project.demo && <TagChip href={project.demo} label="Demo" />}
          {project.url && !project.demo && !pageHref && (
            <TagChip href={project.url} label="Website" />
          )}
          {project.code && <TagChip href={project.code} label="Code" />}
          {project.paper && <TagChip href={project.paper} label="Paper" />}
          {project.video && <TagChip href={project.video} label="Video" />}
        </div>
      </div>
    </article>
  );
}
