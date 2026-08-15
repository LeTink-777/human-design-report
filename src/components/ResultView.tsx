"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Lock, Compass, Layers, Sparkles, HeartHandshake } from "lucide-react";
import Bodygraph from "@/components/Bodygraph";
import Pricing from "@/components/Pricing";
import { calculateHD, DEFINITION_NOTES } from "@/lib/humandesign";
import { useHDData } from "@/lib/useHDData";

const LOCKED = [
  {
    icon: Compass,
    title: "Твой авторитет — как принимать решения",
    body: "Внутренний механизм, который безошибочно отличает твоё «да» от чужого. Разбираем, как он звучит именно у тебя и в какие моменты ему нельзя доверять.",
    accent: "rose" as const,
  },
  {
    icon: Layers,
    title: "Открытые и закрытые центры",
    body: "Все девять центров с расшифровкой: где ты стабилен и надёжен, а где впитываешь чужое состояние и принимаешь его за своё.",
    accent: "rose" as const,
  },
  {
    icon: Sparkles,
    title: "Твои каналы и таланты",
    body: "Активированные каналы и ворота — врождённые способности, которые работают на тебя без усилий, если знать, куда их направить.",
    accent: "rose" as const,
  },
  {
    icon: HeartHandshake,
    title: "Твои отношения и совместимость",
    body: "С какими типами тебе легко, а с какими нужна дистанция. Как твой дизайн ведёт себя в паре, в семье и в рабочей команде.",
    accent: "indigo" as const,
  },
];

export default function ResultView() {
  const { ready, data } = useHDData();

  const hd = useMemo(() => {
    if (!data) return null;
    return calculateHD(data.name, data.birthDate, data.birthTime, data.birthPlace);
  }, [data]);

  if (!ready) {
    return (
      <main style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <Bodygraph size={200} mode="loading" />
      </main>
    );
  }

  if (!data || !hd) {
    return (
      <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <h1 className="font-display" style={{ fontSize: 28, marginBottom: 12 }}>
            Данные не найдены
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
            Заполни форму на главной странице, чтобы рассчитать свой бодиграф.
          </p>
          <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
            Вернуться к расчёту
          </Link>
        </div>
      </main>
    );
  }

  const { typeData, profileData, definition } = hd;

  return (
    <main>
      {/* ---------------- HEADER ---------------- */}
      <section
        style={{
          background: "var(--bg-dark)",
          color: "#FFFFFF",
          padding: "44px 0 48px",
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 18,
          }}
        >
          <div className="result-graph">
            <Bodygraph size={200} defined={typeData.centers} theme="dark" />
          </div>

          <h1
            className="font-display"
            style={{ fontSize: 30, margin: 0, color: "#FFFFFF" }}
          >
            {data.name}, твой Human Design
          </h1>

          <span className="badge-mono">{typeData.name}</span>

          <span
            className="font-code"
            style={{
              fontSize: 13,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 999,
              padding: "6px 16px",
            }}
          >
            {profileData.code} Профиль
          </span>

          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              maxWidth: 520,
            }}
          >
            {typeData.tagline}
          </p>
        </div>
      </section>

      {/* ---------------- FREE SECTION ---------------- */}
      <section style={{ background: "var(--bg-card)", padding: "48px 0" }}>
        <div className="shell" style={{ maxWidth: 780 }}>
          {/* Card 1 */}
          <div className="card" style={{ padding: "28px 26px" }}>
            <p className="eyebrow" style={{ margin: 0 }}>
              ТВОЙ ТИП
            </p>
            <h2 className="font-display" style={{ fontSize: 36, margin: "10px 0 18px" }}>
              {typeData.name}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <div style={{ fontSize: 15.5, color: "var(--text-primary)" }}>
                <strong style={{ fontWeight: 600 }}>Стратегия:</strong>{" "}
                {typeData.strategy}
              </div>
              <div style={{ fontSize: 15.5, color: "var(--text-primary)" }}>
                <strong style={{ fontWeight: 600 }}>Когда живёшь правильно:</strong>{" "}
                <span style={{ color: "var(--accent-sage)", fontWeight: 600 }}>
                  {typeData.signature}
                </span>
              </div>
              <div style={{ fontSize: 15.5, color: "var(--text-primary)" }}>
                <strong style={{ fontWeight: 600 }}>Сигнал что что-то не так:</strong>{" "}
                <span style={{ color: "var(--accent-rose)", fontWeight: 600 }}>
                  {typeData.not_self_theme}
                </span>
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)", margin: 0 }}>
              {typeData.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 20,
              }}
            >
              <span className="badge-soft">{typeData.population}</span>
              <span className="badge-soft">{definition}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card" style={{ padding: "28px 26px", marginTop: 18 }}>
            <p className="eyebrow" style={{ margin: 0 }}>
              ТВОЙ ПРОФИЛЬ {profileData.code}
            </p>
            <h2 className="font-display" style={{ fontSize: 28, margin: "10px 0 14px" }}>
              {profileData.name}
            </h2>
            <p style={{ color: "var(--text-secondary)", margin: 0 }}>
              {profileData.description}
            </p>
            <p
              style={{
                color: "var(--accent-rose)",
                margin: "14px 0 0",
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              {profileData.life_theme}
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                margin: "14px 0 0",
                fontSize: 14,
              }}
            >
              {DEFINITION_NOTES[definition]}
            </p>
          </div>

          {/* Divider */}
          <div style={{ padding: "40px 0 26px", textAlign: "center" }}>
            <hr className="divider-rose" />
            <h2 className="section-title" style={{ marginTop: 26 }}>
              Полный отчёт Human Design
            </h2>
          </div>

          {/* Locked cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {LOCKED.map(({ icon: Icon, title, body, accent }) => (
              <div key={title} className="locked-wrap">
                <div
                  className="locked-content card"
                  style={{
                    padding: "26px 24px",
                    borderLeft: `3px solid ${
                      accent === "indigo" ? "var(--accent-indigo)" : "var(--accent-rose)"
                    }`,
                  }}
                >
                  <Icon
                    size={20}
                    color={
                      accent === "indigo" ? "var(--accent-indigo)" : "var(--accent-rose)"
                    }
                  />
                  <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 8px" }}>
                    {title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: 15 }}>
                    {body}
                  </p>
                </div>
                <div className="locked-veil">
                  <div style={{ textAlign: "center", padding: "0 20px" }}>
                    <Lock size={20} color="var(--accent-rose)" />
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        marginTop: 8,
                        color: "var(--text-primary)",
                      }}
                    >
                      Получи полный отчёт Human Design
                    </div>
                    <div style={{ fontSize: 13.5, color: "var(--text-secondary)", marginTop: 4 }}>
                      Авторитет, центры, каналы и твоя жизненная роль
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <div style={{ background: "var(--bg-secondary)" }}>
        <Pricing userData={data} />
      </div>
    </main>
  );
}
