import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects — Sam Wong",
};

const CONTAINER = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "var(--spacing-64) var(--spacing-32) var(--spacing-128)",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

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
        Projects
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "var(--spacing-24)",
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  );
}
