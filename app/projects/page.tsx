import { getAllProjects } from "@/lib/projects";
import { getAllProjectSlugs } from "@/lib/project-content";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects — Sam Wong",
};

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "var(--text-label)",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-tertiary)",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const richSlugs = new Set(getAllProjectSlugs());

  const projectsWithSlugs = projects.map((p) => {
    const slug = p.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return { ...p, slug: richSlugs.has(slug) ? slug : undefined };
  });

  return (
    <div
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "64px 24px 128px",
      }}
    >
      <div style={{ marginBottom: 48 }}>
        <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "0 0 12px 0" }} />
        <p style={MONO}>All Projects</p>
      </div>

      <h1
        style={{
          fontSize: "clamp(36px, 6vw, 48px)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          margin: "0 0 48px 0",
        }}
      >
        Projects
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 0,
          border: "1px solid var(--color-border)",
        }}
      >
        {projectsWithSlugs.map((p) => (
          <ProjectCard key={p.title} project={p} slug={p.slug} />
        ))}
      </div>
    </div>
  );
}
