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
        fontSize: "var(--text-nav)",
        letterSpacing: 0,
        color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        fontWeight: 400,
        transition: "color 150ms ease",
        paddingBottom: isActive ? "2px" : "2px",
        borderBottom: isActive
          ? "1.5px solid var(--color-accent)"
          : "1.5px solid transparent",
      }}
    >
      {children}
    </Link>
  );
}
