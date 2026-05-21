import Link from "next/link";
import NavLink from "./NavLink";

const NAV_LINKS = [
  { href: "/projects/", label: "Projects" },
  { href: "/publications/", label: "Publications" },
  { href: "/talks/", label: "Talks" },
  { href: "/blog/", label: "Blog" },
  { href: "/cv/", label: "CV" },
];

export default function Nav() {
  return (
    <header
      style={{
        backgroundColor: "var(--color-canvas-ice)",
        borderBottom: "1px solid var(--color-stone-moss)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 var(--spacing-32)",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--spacing-16)",
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 700,
            fontSize: "var(--text-body-sm)",
            letterSpacing: "-0.04em",
            color: "var(--color-adaline-ink)",
            whiteSpace: "nowrap",
          }}
        >
          Sam Wong
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
