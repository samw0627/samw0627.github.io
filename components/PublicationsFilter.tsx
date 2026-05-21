"use client";

import { useState, useMemo } from "react";
import type { Publication, Person } from "@/lib/types";
import PublicationCard from "./PublicationCard";

interface PublicationsFilterProps {
  publications: Publication[];
  people: Record<string, Person>;
}

const ALL_TYPES = [
  "Conference",
  "Journal",
  "Demo",
  "Workshop",
  "Short Paper",
  "Preprint",
  "Arxiv",
  "Thesis",
];

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontSize: "var(--text-caption)",
        fontFamily: "var(--font-fragmentmono)",
        letterSpacing: "0.02em",
        padding: "4px 12px",
        borderRadius: 999,
        border: active
          ? "1px solid var(--color-valley-green)"
          : "1px solid var(--color-stone-moss)",
        backgroundColor: active ? "var(--color-forest-dew)" : "transparent",
        color: active ? "var(--color-valley-green)" : "var(--color-mist-gray)",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

export default function PublicationsFilter({
  publications,
  people,
}: PublicationsFilterProps) {
  const [query, setQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedVenueTags, setSelectedVenueTags] = useState<string[]>([]);

  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [publications]
  );

  const allVenueTags = useMemo(() => {
    const tags = new Set<string>();
    publications.forEach((p) => p.venueTags?.forEach((t) => tags.add(t)));
    return [...tags].sort();
  }, [publications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((p) => {
      if (q) {
        const haystack = [
          p.title,
          ...p.authors,
          p.venue ?? "",
          ...(p.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (selectedTypes.length > 0) {
        if (!p.type.some((t) => selectedTypes.includes(t))) return false;
      }
      if (selectedYear !== null && p.year !== selectedYear) return false;
      if (selectedVenueTags.length > 0) {
        if (!p.venueTags?.some((t) => selectedVenueTags.includes(t))) return false;
      }
      return true;
    });
  }, [publications, query, selectedTypes, selectedYear, selectedVenueTags]);

  const grouped = useMemo(() => {
    const map = new Map<number, Publication[]>();
    filtered.forEach((p) => {
      if (!map.has(p.year)) map.set(p.year, []);
      map.get(p.year)!.push(p);
    });
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  const hasFilters =
    query || selectedTypes.length > 0 || selectedYear !== null || selectedVenueTags.length > 0;

  function toggleType(t: string) {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  function toggleVenueTag(t: string) {
    setSelectedVenueTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  function clearFilters() {
    setQuery("");
    setSelectedTypes([]);
    setSelectedYear(null);
    setSelectedVenueTags([]);
  }

  return (
    <div>
      {/* Search */}
      <input
        type="search"
        placeholder="Search publications…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 16px",
          borderRadius: "var(--radius-images)",
          border: "1px solid var(--color-stone-moss)",
          backgroundColor: "var(--color-canvas-ice)",
          color: "var(--color-adaline-ink)",
          fontSize: "var(--text-body-sm)",
          fontFamily: "var(--font-akkurat)",
          letterSpacing: "-0.04em",
          outline: "none",
          marginBottom: "var(--spacing-16)",
        }}
      />

      {/* Type filter */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: "var(--spacing-8)",
        }}
      >
        {ALL_TYPES.map((t) => (
          <FilterPill
            key={t}
            active={selectedTypes.includes(t)}
            onClick={() => toggleType(t)}
          >
            {t}
          </FilterPill>
        ))}
      </div>

      {/* Venue tags filter */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: "var(--spacing-8)",
        }}
      >
        {allVenueTags.map((t) => (
          <FilterPill
            key={t}
            active={selectedVenueTags.includes(t)}
            onClick={() => toggleVenueTag(t)}
          >
            {t}
          </FilterPill>
        ))}
      </div>

      {/* Year filter */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: "var(--spacing-24)",
        }}
      >
        {years.map((y) => (
          <FilterPill
            key={y}
            active={selectedYear === y}
            onClick={() => setSelectedYear(selectedYear === y ? null : y)}
          >
            {y}
          </FilterPill>
        ))}
      </div>

      {/* Results summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--spacing-24)",
          fontSize: "var(--text-body-sm)",
          color: "var(--color-mist-gray)",
          fontFamily: "var(--font-fragmentmono)",
          letterSpacing: "0.02em",
        }}
      >
        <span>
          {filtered.length} of {publications.length} publications
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-valley-green)",
              fontSize: "var(--text-body-sm)",
              fontFamily: "var(--font-fragmentmono)",
              letterSpacing: "0.02em",
              padding: 0,
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grouped results */}
      {grouped.map(([year, pubs]) => (
        <section key={year} style={{ marginBottom: "var(--spacing-48)" }}>
          <h2
            style={{
              fontSize: "var(--text-body-sm)",
              fontFamily: "var(--font-fragmentmono)",
              letterSpacing: "0.02em",
              color: "var(--color-mist-gray)",
              margin: "0 0 var(--spacing-16) 0",
              fontWeight: 400,
            }}
          >
            {year}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-24)" }}>
            {pubs.map((p) => (
              <PublicationCard key={p.slug} pub={p} people={people} />
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <p style={{ color: "var(--color-mist-gray)", textAlign: "center", padding: "var(--spacing-48) 0" }}>
          No publications match your filters.
        </p>
      )}
    </div>
  );
}
