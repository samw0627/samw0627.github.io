import {
  getPeople,
  getPositions,
  getEducation,
  getTeaching,
  getSkills,
} from "@/lib/data";
import type { Publication } from "@/lib/types";
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
        flexWrap: "wrap",
        columnGap: "var(--spacing-32)",
        rowGap: 4,
        marginBottom: "var(--spacing-16)",
      }}
    >
      <span
        style={{
          fontSize: "var(--text-body-sm)",
          fontFamily: "var(--font-fragmentmono)",
          letterSpacing: "0.02em",
          color: "var(--color-mist-gray)",
          // Fixed width keeps the right column aligned; on narrow screens the
          // content wraps below the label instead
          flex: "0 0 168px",
        }}
      >
        {years}
      </span>
      <div style={{ flex: "1 1 320px", minWidth: 0, fontSize: "var(--text-body-sm)" }}>{children}</div>
    </div>
  );
}

const MUTED = { color: "var(--color-mist-gray)" };
const LINK = { color: "var(--color-valley-green)" };

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul style={{ margin: "6px 0 0", paddingLeft: 18, ...MUTED }}>
      {items.map((d) => (
        <li key={d} style={{ marginBottom: 4 }}>
          {d}
        </li>
      ))}
    </ul>
  );
}

// Matches the CV's numbering: [C.n] for full papers and preprints, [P.n] for posters
const PUB_GROUPS = [
  { title: "Full Papers / Preprints", prefix: "C", types: ["Conference", "Journal", "Preprint"] },
  { title: "Posters", prefix: "P", types: ["Poster"] },
];

function groupPubs(pubs: Publication[], types: string[]) {
  const isPreprint = (p: Publication) => p.type.includes("Preprint");
  return pubs
    .filter((p) => p.type.some((t) => types.includes(t)))
    .sort((a, b) => Number(isPreprint(a)) - Number(isPreprint(b)) || a.year - b.year);
}

export default async function CVPage() {
  const [positions, education, teaching, skills, people, pubs] = await Promise.all([
    getPositions(),
    getEducation(),
    getTeaching(),
    getSkills(),
    getPeople(),
    getAllPublications(),
  ]);

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
        <p style={{ margin: 0, fontSize: "var(--text-body-sm)", ...MUTED }}>
          Master&rsquo;s Student · University of Washington ·{" "}
          <a href="mailto:samw627@uw.edu" style={LINK}>
            samw627@uw.edu
          </a>{" "}
          ·{" "}
          <a href="https://chwong.com" style={LINK}>
            chwong.com
          </a>
        </p>
      </div>

      <Section title="Research Interests">
        <p style={{ margin: 0, fontSize: "var(--text-body-sm)" }}>
          Human-Computer Interaction, Human-AI Interaction, Social Computing
        </p>
      </Section>

      <Section title="Education">
        {education.map((e, i) => (
          <Row key={i} years={e.years}>
            <strong>{e.university}</strong>
            {e.location && <span style={MUTED}> · {e.location}</span>}
            <div>{e.degree}</div>
            <Bullets items={e.description} />
          </Row>
        ))}
      </Section>

      <Section title="Research Experience">
        {positions.map((p, i) => (
          <Row key={i} years={p.years}>
            <strong>{p.company}</strong>
            <div>
              {p.title}
              {p.mentors?.length ? (
                <span style={MUTED}>
                  {" "}
                  · {p.mentor_label ?? (p.mentors.length > 1 ? "Advisors" : "Advisor")}:{" "}
                  {p.mentors.join(", ")}
                </span>
              ) : null}
            </div>
            <Bullets items={p.description} />
          </Row>
        ))}
      </Section>

      {PUB_GROUPS.map(({ title, prefix, types }) => {
        const group = groupPubs(pubs, types);
        if (!group.length) return null;
        return (
          <Section key={title} title={title}>
            {group.map((p, i) => (
              <Row key={p.slug} years={`[${prefix}.${i + 1}] ${p.venue ?? ""} ${p.year}`}>
                <strong>{p.title}</strong>
                <div style={MUTED}>
                  {p.authors.map((a, j) => (
                    <span key={a}>
                      {people[a]?.me ? (
                        <strong style={{ color: "var(--color-text-primary)" }}>{a}</strong>
                      ) : (
                        a
                      )}
                      {j < p.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  {(p.pdf ?? p.link) && (
                    <>
                      {" "}
                      <a href={p.pdf ?? p.link} style={LINK}>
                        [{p.type.includes("Preprint") ? "preprint" : "paper"}]
                      </a>
                    </>
                  )}
                </div>
              </Row>
            ))}
          </Section>
        );
      })}

      <Section title="Teaching Experience">
        {teaching.map((t, i) => (
          <Row key={i} years={t.year}>
            <strong>{t.title}</strong>
            <div>
              {t.role}
              {t.location && <span style={MUTED}> · {t.location}</span>}
            </div>
            <Bullets items={t.description} />
          </Row>
        ))}
      </Section>

      <Section title="Languages and Tools">
        {skills.map((s) => (
          <Row key={s.category} years={s.category}>
            {s.items.join(", ")}
          </Row>
        ))}
      </Section>
    </div>
  );
}
