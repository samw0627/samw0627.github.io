import Image from "next/image";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

function LinkChip({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: "var(--text-caption)",
        fontFamily: "var(--font-fragmentmono)",
        letterSpacing: "0.02em",
        color: "var(--color-valley-green)",
        border: "1px solid var(--color-stone-moss)",
        borderRadius: 999,
        padding: "2px 10px",
        textDecoration: "none",
      }}
    >
      {label}
    </a>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const mainLink = project.url ?? project.demo ?? project.code ?? project.paper;

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-stone-moss)",
        borderRadius: "var(--radius-images)",
        overflow: "hidden",
        boxShadow: "var(--shadow-subtle)",
        backgroundColor: "var(--color-canvas-ice)",
      }}
    >
      {project.image && (
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            backgroundColor: "var(--color-stone-moss)",
            overflow: "hidden",
          }}
        >
          <Image
            src={`/images/projects/${project.image}`}
            alt={project.title}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div
        style={{
          padding: "var(--spacing-24)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-8)",
          flex: 1,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "var(--text-body)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.2,
          }}
        >
          {mainLink ? (
            <a
              href={mainLink}
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
              fontSize: "var(--text-body-sm)",
              color: "var(--color-mist-gray)",
              lineHeight: 1.5,
              flex: 1,
            }}
          >
            {project.description}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
          {project.demo && <LinkChip href={project.demo} label="Demo" />}
          {project.url && !project.demo && (
            <LinkChip href={project.url} label="Website" />
          )}
          {project.code && <LinkChip href={project.code} label="Code" />}
          {project.paper && <LinkChip href={project.paper} label="Paper" />}
          {project.video && <LinkChip href={project.video} label="Video" />}
        </div>
      </div>
    </article>
  );
}
