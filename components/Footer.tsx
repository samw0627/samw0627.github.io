export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-stone-moss)",
        padding: "var(--spacing-32)",
        marginTop: "var(--spacing-64)",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--spacing-16)",
          fontSize: "var(--text-body-sm)",
          color: "var(--color-mist-gray)",
        }}
      >
        <span>Sam Wong &mdash; University of Washington</span>
        <span>samw627@uw.edu</span>
      </div>
    </footer>
  );
}
