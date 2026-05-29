import Link from "next/link";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";

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
        backgroundColor: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 500,
            fontSize: "var(--text-nav)",
            color: "var(--color-text-primary)",
            whiteSpace: "nowrap",
            letterSpacing: 0,
          }}
        >
          Sam Wong
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div
            style={{
              width: 1,
              height: 16,
              backgroundColor: "var(--color-border)",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
