"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      style={{
        fontSize: "var(--text-body-sm)",
        letterSpacing: "-0.04em",
        padding: "6px 12px",
        borderRadius: "var(--radius-navitems)",
        backgroundColor: isActive ? "var(--color-forest-dew)" : "transparent",
        color: isActive ? "var(--color-valley-green)" : "var(--color-adaline-ink)",
        fontWeight: isActive ? 700 : 400,
        transition: "background-color 0.15s ease, color 0.15s ease",
      }}
    >
      {children}
    </Link>
  );
}
