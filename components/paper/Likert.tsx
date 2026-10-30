"use client";

import {
  Children,
  isValidElement,
  useRef,
  useState,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";

interface ItemProps {
  label: string;
  /** Per-group counts for each scale point, low → high; groups separated by "|", e.g. "1,0,2,1,0,2,0|1,3,1,0,1,0,0" */
  counts: string;
}

/** One survey question inside <Likert>; its props are read and rendered by the parent. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Item(props: ItemProps) {
  return null;
}

interface Tip {
  x: number;
  y: number;
  value: string;
  detail: string;
}

/**
 * Diverging stacked bar for Likert responses: centered on the scale's
 * neutral point, low ratings extend left (red), high ratings right (blue).
 * Each segment shows its count, with a hover/focus tooltip and a table view.
 */
export function Likert({
  title,
  groups,
  points = "7",
  low = "Low",
  high = "High",
  note,
  children,
}: {
  title?: string;
  /** Condition names separated by "|", in the same order as each Item's counts */
  groups: string;
  /** Number of scale points; must be odd so there is a neutral midpoint */
  points?: string;
  low?: string;
  high?: string;
  note?: string;
  children: ReactNode;
}) {
  const groupNames = groups.split("|").map((g) => g.trim());
  const n = Number(points);
  const mid = (n - 1) / 2; // index of the neutral point
  const items = Children.toArray(children)
    .filter((c): c is ReactElement<ItemProps> => isValidElement(c))
    .map(({ props }) => ({
      label: props.label,
      rows: props.counts.split("|").map((g) => g.split(",").map(Number)),
    }));

  const ref = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  const show = (el: HTMLElement, e?: PointerEvent) => {
    const box = ref.current!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setTip({
      x: (e ? e.clientX : r.left + r.width / 2) - box.left,
      y: r.top - box.top,
      value: el.dataset.value!,
      detail: el.dataset.detail!,
    });
  };

  return (
    <div className="likert" ref={ref}>
      {title && <p className="likert__title">{title}</p>}

      <div className="likert__legend" aria-hidden="true">
        <span className="likert__end">{low}</span>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="likert__key">
            <span className={`likert__swatch likert-c${i - mid}`} />
            {i + 1}
          </span>
        ))}
        <span className="likert__end">{high}</span>
      </div>

      {items.map((item) => (
        <div key={item.label} className="likert__item">
          <p className="likert__label">{item.label}</p>
          {item.rows.map((counts, g) => {
            const total = counts.reduce((a, b) => a + b, 0);
            // Share of the full bar width (−100% … +100%) left of center
            const leftShare =
              (counts.slice(0, mid).reduce((a, b) => a + b, 0) + counts[mid] / 2) / total;
            return (
              <div key={g} className="likert__row">
                <span className="likert__group">{groupNames[g]}</span>
                <div className="likert__track">
                  <span className="likert__axis" aria-hidden="true" />
                  <div
                    className="likert__bar"
                    style={{ left: `${50 - leftShare * 50}%`, width: "50%" }}
                  >
                    {counts.map((c, i) =>
                      c === 0 ? null : (
                        <span
                          key={i}
                          tabIndex={0}
                          className={`likert__seg likert-c${i - mid}`}
                          // flex-grow (not width) so the 2px gaps come out of the bar, not past it
                          style={{ flex: `${c} 1 0` }}
                          data-value={`${c} of ${total}`}
                          data-detail={`${groupNames[g]} · ${item.label} · rated ${i + 1}`}
                          aria-label={`${groupNames[g]}, ${item.label}: ${c} of ${total} rated ${i + 1}`}
                          onPointerEnter={(e) => show(e.currentTarget, e)}
                          onPointerMove={(e) => show(e.currentTarget, e)}
                          onPointerLeave={() => setTip(null)}
                          onFocus={(e) => show(e.currentTarget)}
                          onBlur={() => setTip(null)}
                        >
                          <span className="likert__count">{c}</span>
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {tip && (
        <div className="likert__tip" role="tooltip" style={{ left: tip.x, top: tip.y }}>
          <strong>{tip.value}</strong>
          <span>{tip.detail}</span>
        </div>
      )}

      {note && <p className="likert__note">{note}</p>}

      <details className="likert__table">
        <summary>Show data table</summary>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Condition</th>
                {Array.from({ length: n }, (_, i) => (
                  <th key={i}>{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.flatMap((item) =>
                item.rows.map((counts, g) => (
                  <tr key={`${item.label}-${g}`}>
                    <td>{g === 0 ? item.label : ""}</td>
                    <td>{groupNames[g]}</td>
                    {counts.map((c, i) => (
                      <td key={i}>{c || "–"}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
