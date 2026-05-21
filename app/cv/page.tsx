import {
  getPositions,
  getEducation,
  getAwards,
  getTeaching,
  getMentoring,
} from "@/lib/data";
import { getAllPublications } from "@/lib/publications";

export const metadata = {
  title: "CV — Sam Wong",
};

const CONTAINER = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "var(--spacing-64) var(--spacing-32) var(--spacing-128)",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "var(--spacing-48)" }}>
      <h2
        style={{
          fontSize: "var(--text-body)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          margin: "0 0 var(--spacing-24) 0",
          paddingBottom: "var(--spacing-8)",
          borderBottom: "1px solid var(--color-stone-moss)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({
  years,
  children,
}: {
  years: string | number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-32)",
        marginBottom: "var(--spacing-16)",
      }}
    >
      <span
        style={{
          fontSize: "var(--text-body-sm)",
          fontFamily: "var(--font-fragmentmono)",
          letterSpacing: "0.02em",
          color: "var(--color-mist-gray)",
          minWidth: 100,
          whiteSpace: "nowrap",
        }}
      >
        {years}
      </span>
      <div style={{ flex: 1, fontSize: "var(--text-body-sm)" }}>{children}</div>
    </div>
  );
}

export default async function CVPage() {
  const [positions, education, awards, teaching, mentoring, pubs] =
    await Promise.all([
      getPositions(),
      getEducation(),
      getAwards(),
      getTeaching(),
      getMentoring(),
      getAllPublications(),
    ]);

  const pubsByType = new Map<string, typeof pubs>();
  pubs.forEach((p) => {
    p.type.forEach((t) => {
      if (!pubsByType.has(t)) pubsByType.set(t, []);
      pubsByType.get(t)!.push(p);
    });
  });

  return (
    <div style={CONTAINER}>
      <div style={{ marginBottom: "var(--spacing-64)" }}>
        <h1
          style={{
            fontSize: "var(--text-heading-sm)",
            fontWeight: 700,
            lineHeight: "var(--leading-heading-sm)",
            letterSpacing: "-0.04em",
            margin: "0 0 var(--spacing-8) 0",
          }}
        >
          Sam Wong
        </h1>
        <p style={{ margin: 0, color: "var(--color-mist-gray)", fontSize: "var(--text-body-sm)" }}>
          Paul G. Allen School of Computer Science &amp; Engineering ·{" "}
          University of Washington ·{" "}
          <a href="mailto:samw627@uw.edu" style={{ color: "var(--color-valley-green)" }}>
            samw627@uw.edu
          </a>
        </p>
      </div>

      <Section title="Positions">
        {positions.map((p, i) => (
          <Row key={i} years={p.years}>
            <strong>{p.title}</strong>, {p.company}
            {p.location && <span style={{ color: "var(--color-mist-gray)" }}> · {p.location}</span>}
            {p.short_desc && (
              <p style={{ margin: "4px 0 0", color: "var(--color-mist-gray)" }}>
                {p.short_desc}
              </p>
            )}
          </Row>
        ))}
      </Section>

      <Section title="Education">
        {education.map((e, i) => (
          <Row key={i} years={e.years}>
            <strong>{e.degree}</strong>, {e.university}
            {e.location && <span style={{ color: "var(--color-mist-gray)" }}> · {e.location}</span>}
          </Row>
        ))}
      </Section>

      <Section title="Awards">
        {awards.map((a, i) => (
          <Row key={i} years={a.years}>
            <strong>{a.name}</strong>
            {a.sponsor && <span style={{ color: "var(--color-mist-gray)" }}> · {a.sponsor}</span>}
            {a.description && (
              <p style={{ margin: "4px 0 0", color: "var(--color-mist-gray)" }}>
                {a.description}
              </p>
            )}
          </Row>
        ))}
      </Section>

      <Section title="Publications">
        {["Conference", "Journal", "Workshop", "Demo", "Thesis"].map((type) => {
          const typePubs = pubsByType.get(type);
          if (!typePubs?.length) return null;
          return (
            <div key={type} style={{ marginBottom: "var(--spacing-24)" }}>
              <h3
                style={{
                  fontSize: "var(--text-body-sm)",
                  fontFamily: "var(--font-fragmentmono)",
                  letterSpacing: "0.02em",
                  color: "var(--color-mist-gray)",
                  fontWeight: 400,
                  margin: "0 0 var(--spacing-8) 0",
                }}
              >
                {type}
              </h3>
              {typePubs.map((p) => (
                <div
                  key={p.slug}
                  style={{ marginBottom: "var(--spacing-8)", fontSize: "var(--text-body-sm)" }}
                >
                  {p.authors.join(", ")}. &ldquo;{p.title}&rdquo;.{" "}
                  <em>{p.venue}</em>, {p.year}.{" "}
                  {p.awards?.map((a) => (
                    <span
                      key={a}
                      style={{ color: "var(--color-valley-green)", fontWeight: 700 }}
                    >
                      {a}.{" "}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </Section>

      <Section title="Teaching">
        {(teaching as Record<string, string>[]).map((t, i) => (
          <Row key={i} years={t.year ?? ""}>
            <strong>{t.title ?? ""}</strong>
            {t.location && (
              <span style={{ color: "var(--color-mist-gray)" }}> · {t.location}</span>
            )}
            {t.role && (
              <span style={{ color: "var(--color-mist-gray)" }}> · {t.role}</span>
            )}
          </Row>
        ))}
      </Section>

      <Section title="Mentoring">
        <div style={{ color: "var(--color-mist-gray)", fontSize: "var(--text-body-sm)" }}>
          {(mentoring as Record<string, string>[]).slice(0, 10).map((m, i) => (
            <span key={i}>
              {m.name ?? m.names ?? ""}
              {i < Math.min(mentoring.length, 10) - 1 ? ", " : ""}
            </span>
          ))}
          {mentoring.length > 10 && ` and ${mentoring.length - 10} more.`}
        </div>
      </Section>
    </div>
  );
}
