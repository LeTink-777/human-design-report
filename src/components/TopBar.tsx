import Link from "next/link";

export default function TopBar() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "rgba(253, 250, 246, 0.86)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        className="shell"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          height: 64,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          className="font-display"
          style={{
            fontSize: 22,
            color: "var(--accent-rose)",
            letterSpacing: "0.02em",
            textDecoration: "none",
          }}
        >
          HUMAN DESIGN
        </Link>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Персональный отчёт
        </span>
      </div>
    </header>
  );
}
