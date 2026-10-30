import type { ReactNode } from "react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { PaperSection } from "@/lib/papers";
import { slugify } from "@/lib/slug";
import Figure from "./Figure";
import { Tabs, Tab } from "./Tabs";
import { Term, Deeper, Stats, Stat, Quote, Bars, Bar, Video } from "./Inline";
import { Likert, Item } from "./Likert";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

// Every component an MDX paper page may use. h2 gets the § marker and
// anchor id that the side nav (built from the same headings) links to.
export function paperMdxComponents(
  sections: PaperSection[]
): NonNullable<MDXRemoteProps["components"]> {
  return {
    h2: ({ children }: { children?: ReactNode }) => {
      const id = slugify(textOf(children));
      const section = sections.find((s) => s.id === id);
      return (
        <div id={id} className="section-anchor section-header">
          {section && <span className="section-roman">§ {section.roman}</span>}
          <h2>{children}</h2>
        </div>
      );
    },
    Figure,
    Tabs,
    Tab,
    Term,
    Deeper,
    Stats,
    Stat,
    Quote,
    Bars,
    Bar,
    Video,
    Likert,
    Item,
  };
}
