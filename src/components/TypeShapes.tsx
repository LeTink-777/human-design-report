const ROSE = "#C4896B";
const INDIGO = "#3D3580";
const SAGE = "#7A9E7E";

interface ShapeCardProps {
  title: string;
  share: string;
  children: React.ReactNode;
}

function ShapeCard({ title, share, children }: ShapeCardProps) {
  return (
    <div
      className="card"
      style={{
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        textAlign: "center",
      }}
    >
      {children}
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
          {title}
        </div>
        <div className="font-code" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
          {share}
        </div>
      </div>
    </div>
  );
}

/** Четыре типа как геометрические знаки. */
export default function TypeShapes() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 14,
      }}
    >
      <ShapeCard title="Генератор" share="70%">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <rect
            x="10"
            y="10"
            width="36"
            height="36"
            rx="4"
            fill={ROSE}
            fillOpacity="0.16"
            stroke={ROSE}
            strokeWidth="1.8"
          />
          <circle cx="28" cy="28" r="8" fill={ROSE} />
        </svg>
      </ShapeCard>

      <ShapeCard title="Проектор" share="20%">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <polygon
            points="28,8 48,44 8,44"
            fill={INDIGO}
            fillOpacity="0.12"
            stroke={INDIGO}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="32" r="6" fill={INDIGO} />
        </svg>
      </ShapeCard>

      <ShapeCard title="Манифестор" share="8%">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <polygon
            points="28,10 44,28 28,46 12,28"
            fill={ROSE}
            fillOpacity="0.14"
            stroke={ROSE}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <polygon points="28,18 38,28 28,38 18,28" fill={ROSE} />
        </svg>
      </ShapeCard>

      <ShapeCard title="Рефлектор" share="2%">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <circle
            cx="28"
            cy="28"
            r="18"
            fill={SAGE}
            fillOpacity="0.12"
            stroke={SAGE}
            strokeWidth="1.8"
          />
          <circle cx="28" cy="28" r="9" fill="none" stroke={SAGE} strokeWidth="1.8" />
          <circle cx="28" cy="28" r="2.6" fill={SAGE} />
        </svg>
      </ShapeCard>
    </div>
  );
}
