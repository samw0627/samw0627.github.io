import type { Publication, Person } from "@/lib/types";

interface PublicationCardProps {
  pub: Publication;
  people: Record<string, Person>;
  compact?: boolean;
}

function AwardBadge({ award }: { award: string }) {
  const isBestPaper =
    award.toLowerCase().includes("best paper") ||
    award.toLowerCase().includes("best article");
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: "var(--text-caption)",
        fontFamily: "var(--font-fragmentmono)",
        letterSpacing: "0.02em",
        color: isBestPaper ? "#7a5200" : "var(--color-valley-green)",
        backgroundColor: isBestPaper ? "#fff8e6" : "var(--color-forest-dew)",
        padding: "2px 8px",
        borderRadius: 999,
        border: isBestPaper ? "1px solid #f0d080" : "1px solid var(--color-stone-moss)",
      }}
    >
      {isBestPaper ? "🏆" : "🏅"} {award}
    </span>
  );
}

function AuthorList({
  authors,
  people,
}: {
  authors: string[];
  people: Record<string, Person>;
}) {
  return (
    <span style={{ color: "var(--color-mist-gray)", fontSize: "var(--text-body-sm)" }}>
      {authors.map((name, i) => {
        const person = people[name];
        const isMe = person?.me === true;
        const inner = isMe ? <strong>{name}</strong> : name;
        const linked =
          person?.url ? (
            <a
              key={name}
              href={person.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", textDecorationColor: "var(--color-stone-moss)" }}
            >
              {inner}
            </a>
          ) : (
            <span key={name}>{inner}</span>
          );
        return (
          <span key={name}>
            {i > 0 && ", "}
            {linked}
          </span>
        );
      })}
    </span>
  );
}

function PubLink({
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
        transition: "background-color 0.15s ease",
      }}
    >
      {label}
    </a>
  );
}

export default function PublicationCard({
  pub,
  people,
  compact = false,
}: PublicationCardProps) {
  const pdfUrl =
    pub.pdf ??
    (pub.arxiv ? `https://arxiv.org/pdf/${pub.arxiv}` : undefined);
  const arxivUrl = pub.arxiv
    ? `https://arxiv.org/abs/${pub.arxiv}`
    : undefined;

  return (
    <article
      style={{
        paddingBottom: compact ? "var(--spacing-16)" : "var(--spacing-24)",
        borderBottom: "1px solid var(--color-stone-moss)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {pub.awards && pub.awards.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {pub.awards.map((a) => (
            <AwardBadge key={a} award={a} />
          ))}
        </div>
      )}

      <h3
        style={{
          margin: 0,
          fontSize: compact ? "var(--text-body)" : "var(--text-body)",
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: "-0.04em",
        }}
      >
        {pub.link ? (
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
          >
            {pub.title}
          </a>
        ) : (
          pub.title
        )}
      </h3>

      <AuthorList authors={pub.authors} people={people} />

      <div
        style={{
          fontSize: "var(--text-body-sm)",
          color: "var(--color-mist-gray)",
        }}
      >
        {pub.venueUrl ? (
          <a
            href={pub.venueUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", textDecorationColor: "var(--color-stone-moss)" }}
          >
            {pub.venue}
          </a>
        ) : (
          <span>{pub.venue}</span>
        )}
        {pub.venueLocation && <span> &middot; {pub.venueLocation}</span>}
        <span> &middot; {pub.year}</span>
      </div>

      {!compact && pub.summary && (
        <p
          style={{
            margin: 0,
            fontSize: "var(--text-body-sm)",
            color: "var(--color-adaline-ink)",
            lineHeight: 1.5,
          }}
        >
          {pub.summary}
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
        {pdfUrl && <PubLink href={pdfUrl} label="PDF" />}
        {arxivUrl && !pub.pdf && <PubLink href={arxivUrl} label="arXiv" />}
        {pub.html && <PubLink href={pub.html} label="HTML" />}
        {pub.link && <PubLink href={pub.link} label="Project" />}
        {pub.video && <PubLink href={pub.video} label="Video" />}
        {pub.recording && <PubLink href={pub.recording} label="Recording" />}
        {pub.slides && <PubLink href={pub.slides} label="Slides" />}
        {pub.doi && (
          <PubLink href={`https://doi.org/${pub.doi}`} label="DOI" />
        )}
        {pub.osf && (
          <PubLink href={`https://osf.io/${pub.osf}`} label="OSF" />
        )}
      </div>
    </article>
  );
}
