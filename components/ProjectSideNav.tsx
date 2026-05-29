"use client";

import { useEffect, useState } from "react";
import type { ProjectSection } from "@/lib/project-content";

interface Props {
  sections: ProjectSection[];
}

export default function ProjectSideNav({ sections }: Props) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (sections.length === 0) return;

    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Page sections"
      style={{
        position: "sticky",
        top: 80,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: 160,
        flexShrink: 0,
      }}
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              padding: "5px 0",
              textDecoration: "none",
              transition: "color 150ms ease",
              color: isActive
                ? "var(--color-text-primary)"
                : "var(--color-text-tertiary)",
              borderLeft: `2px solid ${isActive ? "var(--color-accent)" : "var(--color-border)"}`,
              paddingLeft: 12,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: isActive ? "var(--color-accent)" : "var(--color-text-tertiary)",
                flexShrink: 0,
              }}
            >
              §{s.roman}
            </span>
            <span
              style={{
                fontSize: "var(--text-small)",
                fontWeight: isActive ? 500 : 400,
                lineHeight: 1.3,
                letterSpacing: 0,
              }}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
