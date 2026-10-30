"use client";

import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the text stays selectable
    }
  };

  return (
    <button type="button" className="copy-btn" onClick={copy} aria-live="polite">
      {copied ? "Copied ✓" : label}
    </button>
  );
}
