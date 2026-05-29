import Link from "next/link";
import { CSSProperties } from "react";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  style?: CSSProperties;
}

const styles: Record<string, CSSProperties> = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "7px 20px",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--text-small)",
    fontFamily: "var(--font-sans)",
    letterSpacing: 0,
    fontWeight: 400,
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 150ms ease, border-color 150ms ease, background-color 150ms ease",
    whiteSpace: "nowrap",
  },
  primary: {
    backgroundColor: "var(--color-text-primary)",
    color: "var(--color-bg)",
    border: "1px solid var(--color-text-primary)",
  },
  secondary: {
    backgroundColor: "var(--color-bg)",
    color: "var(--color-text-primary)",
    border: "1px solid var(--color-border)",
  },
  tertiary: {
    backgroundColor: "transparent",
    color: "var(--color-text-secondary)",
    border: "none",
    padding: "0",
    fontSize: "var(--text-small)",
  },
};

export default function Button({
  href,
  variant = "secondary",
  children,
  style,
}: ButtonProps) {
  const combinedStyle = { ...styles.base, ...styles[variant], ...style };

  if (href) {
    return (
      <Link href={href} style={combinedStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" style={combinedStyle}>
      {children}
    </button>
  );
}
