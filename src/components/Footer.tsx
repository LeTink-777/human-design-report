import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        paddingTop: 34,
        paddingBottom: 40,
        marginTop: 64,
      }}
    >
      <div
        className="shell"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <div
            className="font-display"
            style={{ fontSize: 18, color: "var(--accent-rose)", marginBottom: 8 }}
          >
            HUMAN DESIGN
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
            Евдокимов Даниил Владимирович, ИНН 381928138362. Самозанятый.
            Материалы носят информационно-развлекательный характер и не заменяют
            консультацию специалиста.
          </p>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link
            href="/privacy"
            style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}
          >
            Политика конфиденциальности
          </Link>
          <Link
            href="/offer"
            style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}
          >
            Публичная оферта
          </Link>
          <a
            href="mailto:danyavdkmvv3@gmail.com"
            style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}
          >
            danyavdkmvv3@gmail.com
          </a>
        </nav>
      </div>
    </footer>
  );
}
