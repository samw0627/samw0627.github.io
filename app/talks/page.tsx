import { getTalks } from "@/lib/data";

export const metadata = {
  title: "Talks — Sam Wong",
};

const CONTAINER = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "var(--spacing-64) var(--spacing-32) var(--spacing-128)",
};

export default function TalksPage() {
  const talks = getTalks();
  const toStr = (d: unknown) =>
    d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? "");

  const sorted = [...talks].sort((a, b) =>
    toStr(b.date).localeCompare(toStr(a.date))
  );

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
        Talks
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {sorted.map((talk, i) => (
          <div
            key={`${talk.title}-${toStr(talk.date)}-${i}`}
            style={{
              padding: "var(--spacing-16) 0",
              borderBottom: "1px solid var(--color-stone-moss)",
              display: "flex",
              gap: "var(--spacing-32)",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                fontFamily: "var(--font-fragmentmono)",
                letterSpacing: "0.02em",
                color: "var(--color-mist-gray)",
                whiteSpace: "nowrap",
                minWidth: 100,
              }}
            >
              {toStr(talk.date)}
            </span>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "var(--text-body)",
                  marginBottom: 4,
                }}
              >
                {talk.url ? (
                  <a
                    href={talk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit" }}
                  >
                    {talk.title}
                  </a>
                ) : (
                  talk.title
                )}
              </div>
              <div
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-mist-gray)",
                }}
              >
                {talk.location}
                {talk.city && ` · ${talk.city}`}
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                {talk.slides && (
                  <a
                    href={talk.slides}
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
                    }}
                  >
                    Slides
                  </a>
                )}
                {talk.recording && (
                  <a
                    href={talk.recording}
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
                    }}
                  >
                    Recording
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
