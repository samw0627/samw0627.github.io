import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

// Small server-rendered MDX components for paper pages. Interactivity here
// is CSS-only (hover/focus, <details>); see paper.css.

/** Hover or tap a technical term to see its definition. */
export function Term({ def, children }: { def: string; children: ReactNode }) {
  return (
    <span className="term" tabIndex={0}>
      {children}
      <span className="term__pop" role="tooltip">
        {def}
      </span>
    </span>
  );
}

/** Collapsible "go deeper" box for technical detail. */
export function Deeper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="deeper">
      <summary>
        <span className="deeper__label">Go deeper</span>
        {title}
      </summary>
      <div className="deeper__body">{children}</div>
    </details>
  );
}

/** Row of headline numbers. */
export function Stats({ children }: { children: ReactNode }) {
  return <div className="stats">{children}</div>;
}

export function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="stat">
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
      {note && <span className="stat__note">{note}</span>}
    </div>
  );
}

/** Participant or interview quote. */
export function Quote({ who, children }: { who?: string; children: ReactNode }) {
  return (
    <blockquote className="paper-quote">
      <div>{children}</div>
      {who && <cite>— {who}</cite>}
    </blockquote>
  );
}

interface BarProps {
  label: string;
  value: string;
  /** Text shown instead of the raw value, e.g. "224 s" */
  display?: string;
  highlight?: boolean;
}

/** Declares one bar inside <Bars>; its props are read and rendered by the parent. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Bar(props: BarProps) {
  return null;
}

/** Horizontal bar comparison; hover a bar to emphasise it. */
export function Bars({
  title,
  max,
  note,
  children,
}: {
  title?: string;
  /** Fixed scale maximum, e.g. "1" for proportions; defaults to the largest value */
  max?: string;
  note?: string;
  children: ReactNode;
}) {
  const bars = Children.toArray(children).filter(
    (c): c is ReactElement<BarProps> => isValidElement(c) && c.type === Bar
  );
  const scale = max ? Number(max) : Math.max(...bars.map((b) => Number(b.props.value)));

  return (
    <div className="bars">
      {title && <p className="bars__title">{title}</p>}
      {bars.map(({ props: b }) => (
        <div key={b.label} className={`bars__row${b.highlight ? " bars__row--hi" : ""}`}>
          <span className="bars__label">{b.label}</span>
          <span className="bars__track">
            <span
              className="bars__fill"
              style={{ width: `${(Number(b.value) / scale) * 100}%` }}
            />
          </span>
          <span className="bars__value">{b.display ?? b.value}</span>
        </div>
      ))}
      {note && <p className="bars__note">{note}</p>}
    </div>
  );
}

/** Embedded demo video: YouTube/Vimeo embed URLs use an iframe, files use <video>. */
export function Video({ src, title }: { src: string; title?: string }) {
  const isEmbed = /youtube\.com|youtu\.be|vimeo\.com/.test(src);
  return (
    <figure className="paper-video">
      {isEmbed ? (
        <iframe
          src={src}
          title={title ?? "Video"}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <video src={src} controls preload="metadata" />
      )}
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
}
