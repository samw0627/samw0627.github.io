import { getAllPublications } from "@/lib/publications";
import { getPeople } from "@/lib/data";
import PublicationsFilter from "@/components/PublicationsFilter";

export const metadata = {
  title: "Publications — Sam Wong",
};

const CONTAINER = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "var(--spacing-64) var(--spacing-32) var(--spacing-128)",
};

export default async function PublicationsPage() {
  const [publications, people] = await Promise.all([
    getAllPublications(),
    getPeople(),
  ]);

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
        Publications
      </h1>
      <PublicationsFilter publications={publications} people={people} />
    </div>
  );
}
