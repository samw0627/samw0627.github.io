export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "32px 24px",
        marginTop: "var(--space-8)",
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          fontSize: "var(--text-small)",
          color: "var(--color-text-tertiary)",
        }}
      >
        <span>Sam Wong · University of Washington</span>
        <a
          href="mailto:samw627@uw.edu"
          className="footer-link"
          style={{
            color: "var(--color-text-tertiary)",
            transition: "color 150ms ease",
          }}
        >
          samw627@uw.edu
        </a>
      </div>
    </footer>
  );
}
