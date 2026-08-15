"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle, Download, Zap, Loader2 } from "lucide-react";
import Bodygraph from "@/components/Bodygraph";
import { calculateHD } from "@/lib/humandesign";
import { useHDData } from "@/lib/useHDData";
import { readPendingOrder } from "@/lib/storage";
import { generateResultSections } from "@/lib/result-sections";

export default function ThankYouView() {
  const { ready, data } = useHDData();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [storedPlan, setStoredPlan] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    const order = readPendingOrder();
    if (order) {
      setPaymentId(order.paymentId);
      setStoredPlan(order.plan);
    }
  }, []);

  const hd = useMemo(() => {
    if (!data) return null;
    return calculateHD(data.name, data.birthDate, data.birthTime, data.birthPlace);
  }, [data]);

  // Тот же построитель, что использует PDF в письме — страница и вложение
  // всегда показывают одно и то же.
  const sections = useMemo(
    () => (data ? generateResultSections(data, storedPlan) : []),
    [data, storedPlan],
  );

  const downloadPDF = async () => {
    if (!paymentId) {
      setDownloadError(
        "Не нашли номер платежа в этом браузере. Отчёт отправлен тебе на почту.",
      );
      return;
    }

    setDownloading(true);
    setDownloadError(null);

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      });

      if (!res.ok) throw new Error(`PDF request failed with ${res.status}`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "human-design.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Немедленный revoke в некоторых браузерах отменяет загрузку.
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      setDownloadError("Не удалось скачать PDF. Он также отправлен тебе на почту.");
    } finally {
      setDownloading(false);
    }
  };

  const buyUpsell = async () => {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: "full",
          userData: {
            name: data?.name ?? "",
            email: data?.email ?? "",
            birthDate: data?.birthDate ?? "",
          },
        }),
      });
      const payload = (await res.json()) as { confirmationUrl?: string; error?: string };
      if (!res.ok || !payload.confirmationUrl) {
        throw new Error(payload.error || "Не удалось создать платёж");
      }
      window.location.assign(payload.confirmationUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось создать платёж");
      setPending(false);
    }
  };

  return (
    <main
      className="geo-pattern"
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        padding: "48px 0 64px",
      }}
    >
      <div
        className="shell"
        style={{
          maxWidth: 620,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 18,
        }}
      >
        <Bodygraph
          size={200}
          defined={hd ? hd.typeData.centers : ["sacral", "root", "g"]}
        />

        <CheckCircle size={56} color="var(--accent-rose)" />

        <h1 className="font-display" style={{ fontSize: 32, margin: 0 }}>
          Оплата прошла успешно!
        </h1>

        {hd ? <span className="badge-mono">{hd.typeData.name}</span> : null}

        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          {ready && data?.name ? `${data.name}, твой` : "Твой"} отчёт Human Design
          открыт ниже. Копия отправлена на{" "}
          <span className="font-code" style={{ color: "var(--text-primary)" }}>
            {data?.email ?? "твою почту"}
          </span>
        </p>

        <div style={{ width: "100%" }}>
          <button
            type="button"
            className="btn-primary"
            onClick={downloadPDF}
            disabled={downloading}
          >
            <Download size={18} />
            {downloading ? "Готовим PDF…" : "Скачать PDF"}
          </button>
          {downloadError ? (
            <p style={{ fontSize: 13.5, color: "#B04A3A", margin: "12px 0 0" }}>
              {downloadError}
            </p>
          ) : null}
        </div>

        {sections.length > 0 ? (
          <section style={{ width: "100%", textAlign: "left", marginTop: 8 }}>
            {sections.map((section) => (
              <article
                key={section.title}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "22px 22px",
                  marginBottom: 14,
                }}
              >
                <h2
                  className="font-display"
                  style={{ fontSize: 19, margin: "0 0 8px", color: "var(--accent-rose)" }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.65,
                    whiteSpace: "pre-line",
                  }}
                >
                  {section.content}
                </p>
              </article>
            ))}
          </section>
        ) : null}

        {/* Upsell */}
        <div
          style={{
            marginTop: 20,
            width: "100%",
            background: "var(--bg-card)",
            border: "1.5px solid var(--accent-rose)",
            borderRadius: 14,
            padding: "26px 24px",
            boxShadow: "var(--shadow)",
            textAlign: "left",
          }}
        >
          <Zap size={20} color="var(--accent-rose)" />
          <h2
            className="font-display"
            style={{ fontSize: 23, margin: "12px 0 8px" }}
          >
            Добавить разбор совместимости?
          </h2>
          <p style={{ color: "var(--text-secondary)", margin: "0 0 18px", fontSize: 15 }}>
            Введи дату рождения партнёра — разберём вашу пару по Human Design. 590 ₽
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={buyUpsell}
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 size={18} className="spin" />
                Переходим к оплате
              </>
            ) : (
              "Добавить разбор пары"
            )}
          </button>
          {error ? (
            <p style={{ fontSize: 13.5, color: "#B04A3A", margin: "12px 0 0" }}>{error}</p>
          ) : null}
        </div>

        <Link
          href="/"
          style={{
            marginTop: 10,
            fontSize: 14,
            color: "var(--text-muted)",
            textDecoration: "none",
          }}
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
