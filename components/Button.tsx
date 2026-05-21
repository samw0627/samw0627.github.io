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
    gap: 8,
    padding: "8px 24px",
    borderRadius: "var(--radius-buttons)",
    fontSize: "var(--text-body-sm)",
    fontFamily: "var(--font-akkurat)",
    letterSpacing: "-0.04em",
    fontWeight: 400,
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.15s ease, border-color 0.15s ease, background-color 0.15s ease",
    whiteSpace: "nowrap",
  },
  primary: {
    backgroundColor: "var(--color-amber-seed)",
    color: "var(--color-canvas-ice)",
    border: "1px solid var(--color-amber-seed)",
  },
  secondary: {
    backgroundColor: "var(--color-canvas-ice)",
    color: "var(--color-adaline-ink)",
    border: "1px solid var(--color-adaline-ink)",
  },
  tertiary: {
    backgroundColor: "var(--color-canvas-ice)",
    color: "var(--color-valley-green)",
    border: "1px solid var(--color-stone-moss)",
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
