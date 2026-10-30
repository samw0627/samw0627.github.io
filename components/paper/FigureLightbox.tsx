"use client";

import { useCallback, useEffect, useState } from "react";

interface Slide {
  src: string;
  caption: string;
  trigger: HTMLElement;
}

// Mounted once per paper page. Collects figures from the DOM when one is
// clicked, so Figure itself can stay a server component.
export default function FigureLightbox() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => {
    setIndex((i) => {
      if (i !== null) slides[i]?.trigger.focus();
      return null;
    });
  }, [slides]);

  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + slides.length) % slides.length)),
    [slides.length]
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest<HTMLElement>("[data-figure]");
      if (!trigger) return;
      // Skip figures in inactive tab panels
      const all = Array.from(document.querySelectorAll<HTMLElement>("[data-figure]")).filter(
        (el) => !el.closest("[hidden]")
      );
      setSlides(
        all.map((el) => ({
          src: el.dataset.src ?? "",
          caption: el.dataset.caption ?? "",
          trigger: el,
        }))
      );
      setIndex(all.indexOf(trigger));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.getElementById("lightbox-close")?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  if (index === null || !slides[index]) return null;
  const slide = slides[index];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={slide.caption || "Figure"}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="lightbox__bar">
        <span className="lightbox__count">
          {index + 1} / {slides.length}
        </span>
        <button id="lightbox-close" type="button" className="lightbox__btn" onClick={close}>
          Close ✕
        </button>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- full-size zoom of an already-loaded image */}
      <img className="lightbox__img" src={slide.src} alt={slide.caption} />
      <div className="lightbox__foot">
        {slides.length > 1 && (
          <button type="button" className="lightbox__btn" onClick={() => step(-1)} aria-label="Previous figure">
            ←
          </button>
        )}
        <p className="lightbox__caption">{slide.caption}</p>
        {slides.length > 1 && (
          <button type="button" className="lightbox__btn" onClick={() => step(1)} aria-label="Next figure">
            →
          </button>
        )}
      </div>
    </div>
  );
}
