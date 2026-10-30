import Image from "next/image";

interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
  /** Figure number as printed in the paper, e.g. "3" */
  n?: string;
  /** "wide" breaks out of the text column on large screens */
  size?: "wide";
}

// Rendered on the server; FigureLightbox picks up every [data-figure]
// button on the page for click-to-zoom and gallery navigation.
export default function Figure({ src, alt, caption, n, size }: FigureProps) {
  const label = n ? `Figure ${n}` : undefined;
  return (
    <figure className={`paper-figure${size === "wide" ? " paper-figure--wide" : ""}`}>
      <button
        type="button"
        className="paper-figure__zoom"
        data-figure
        data-src={src}
        data-caption={[label, caption].filter(Boolean).join(". ")}
        aria-label={`Enlarge ${label ?? "figure"}`}
      >
        <Image
          src={src}
          alt={alt ?? caption ?? ""}
          width={1800}
          height={1000}
          unoptimized
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <span className="paper-figure__hint" aria-hidden="true">
          ⤢ Zoom
        </span>
      </button>
      {(label || caption) && (
        <figcaption>
          {label && <span className="paper-figure__n">{label}</span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
