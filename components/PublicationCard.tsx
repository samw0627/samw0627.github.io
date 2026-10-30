import Link from "next/link";
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
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-label)",
        fontWeight: 500,
        letterSpacing: "0.04em",
        color: isBestPaper ? "#7a5200" : "var(--color-accent)",
        backgroundColor: isBestPaper ? "#fff8e6" : "transparent",
        padding: "2px 8px",
        borderRadius: "var(--radius-sm)",
        border: isBestPaper ? "1px solid #f0d080" : "1px solid var(--color-accent)",
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
    <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-small)" }}>
      {authors.map((name, i) => {
        const person = people[name];
        const isMe = person?.me === true;
        const inner = isMe ? (
          <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{name}</span>
        ) : (
          <span>{name}</span>
        );
        const linked =
          person?.url ? (
            <a
              key={name}
              href={person.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                textDecorationColor: "var(--color-border)",
                textUnderlineOffset: 2,
              }}
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

const PUB_LINK_STYLE: React.CSSProperties = {
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
};

function PubLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="pub-link"
      style={PUB_LINK_STYLE}
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
        paddingTop: compact ? "var(--space-3)" : "var(--space-4)",
        paddingBottom: compact ? "var(--space-3)" : "var(--space-4)",
        borderBottom: `1px solid ${compact ? "var(--color-border-faint)" : "var(--color-border)"}`,
        display: "flex",
        gap: 20,
      }}
    >
      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
        {pub.awards && pub.awards.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
            {pub.awards.map((a) => (
              <AwardBadge key={a} award={a} />
            ))}
          </div>
        )}

        {pub.venue && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
            }}
          >
            {pub.venue}{pub.venueLocation ? ` · ${pub.venueLocation}` : ""}
          </span>
        )}

        <h3
          style={{
            margin: 0,
            fontSize: "var(--text-body)",
            fontWeight: 600,
            lineHeight: 1.3,
            letterSpacing: 0,
          }}
        >
          {pub.link ? (
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-title-link"
              style={{
                color: "inherit",
                transition: "color 150ms ease",
              }}
            >
              {pub.title}
            </a>
          ) : (
            pub.title
          )}
        </h3>

        <AuthorList authors={pub.authors} people={people} />

        {!compact && pub.summary && (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "var(--text-small)",
              color: "var(--color-text-primary)",
              lineHeight: 1.6,
            }}
          >
            {pub.summary}
          </p>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
          {pub.paperPage && (
            <Link
              href={pub.paperPage}
              className="pub-link"
              style={{ ...PUB_LINK_STYLE, color: "#fff", backgroundColor: "var(--color-accent)" }}
            >
              Project page →
            </Link>
          )}
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
      </div>

      {/* Year column */}
      <div
        style={{
          fontSize: "var(--text-small)",
          color: "var(--color-text-tertiary)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          paddingTop: pub.venue ? "22px" : "2px",
        }}
      >
        {pub.year}
      </div>
    </article>
  );
}
