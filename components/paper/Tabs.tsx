"use client";

import {
  Children,
  isValidElement,
  useId,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";

interface TabProps {
  label: string;
  children: ReactNode;
}

/** One panel of <Tabs>; its label becomes the tab button. */
export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

/** Switch between alternative views, e.g. baseline vs. system or Q1 vs. Q2. */
export function Tabs({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter(
    (c): c is ReactElement<TabProps> => isValidElement(c)
  );
  const [active, setActive] = useState(0);
  const id = useId();

  const onKeyDown = (e: KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" onKeyDown={onKeyDown}>
        {tabs.map((t, i) => (
          <button
            key={t.props.label}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className="tabs__tab"
            onClick={() => setActive(i)}
          >
            {t.props.label}
          </button>
        ))}
      </div>
      {/* All panels stay in the DOM so the content is in the static HTML */}
      {tabs.map((t, i) => (
        <div
          key={t.props.label}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
          className="tabs__panel"
        >
          {t}
        </div>
      ))}
    </div>
  );
}
