"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  X,
  ChevronDown,
  Shield,
  RotateCcw,
  Star,
  Clock,
  Loader2,
} from "lucide-react";
import { formatTimer, getSpots, getTimerRemaining, type HDData } from "@/lib/storage";

export type PlanId = "basic" | "full" | "premium";

interface Plan {
  id: PlanId;
  title: string;
  price: number;
  oldPrice: string;
  featured: boolean;
  cta: string;
  features: { text: string; on: boolean }[];
}

const PLANS: Plan[] = [
  {
    id: "basic",
    title: "Базовый отчёт",
    price: 290,
    oldPrice: "890 ₽",
    featured: false,
    cta: "Получить базовый отчёт — 290 ₽",
    features: [
      { text: "Тип и стратегия (уже открыто)", on: true },
      { text: "Авторитет принятия решений", on: true },
      { text: "PDF 8 страниц", on: true },
      { text: "Email за 24 часа", on: true },
      { text: "Открытые центры", on: false },
      { text: "Каналы и таланты", on: false },
    ],
  },
  {
    id: "full",
    title: "Полный отчёт",
    price: 590,
    oldPrice: "2 790 ₽",
    featured: true,
    cta: "Получить полный отчёт — 590 ₽",
    features: [
      { text: "Тип, стратегия, профиль", on: true },
      { text: "Авторитет и как решать", on: true },
      { text: "Все 9 центров расшифрованы", on: true },
      { text: "Каналы и ворота (твои таланты)", on: true },
      { text: "Отношения и совместимость", on: true },
      { text: "Прогноз на 2026–2027", on: true },
      { text: "PDF 24 страницы", on: true },
      { text: "Email за 12 часов", on: true },
    ],
  },
  {
    id: "premium",
    title: "Отчёт + Сессия",
    price: 1390,
    oldPrice: "5 900 ₽",
    featured: false,
    cta: "Получить отчёт + сессию — 1 390 ₽",
    features: [
      { text: "Всё из полного отчёта", on: true },
      { text: "Живая сессия разбора 30 минут (аудио)", on: true },
      { text: "Ответы на личные вопросы", on: true },
      { text: "PDF + аудио файл", on: true },
      { text: "Приоритет: 6 часов", on: true },
    ],
  },
];

interface PricingProps {
  userData: HDData | null;
}

export default function Pricing({ userData }: PricingProps) {
  const [open, setOpen] = useState<PlanId>("full");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [spots, setSpots] = useState<number | null>(null);
  const [pending, setPending] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      setRemaining(getTimerRemaining());
      setSpots(getSpots());
    };
    // первый замер асинхронно: чтение localStorage не должно ломать гидрацию
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  const checkout = async (plan: PlanId) => {
    if (pending) return;
    setPending(plan);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          userData: {
            name: userData?.name ?? "",
            email: userData?.email ?? "",
            birthDate: userData?.birthDate ?? "",
          },
        }),
      });
      const data = (await res.json()) as { confirmationUrl?: string; error?: string };
      if (!res.ok || !data.confirmationUrl) {
        throw new Error(data.error || "Не удалось создать платёж");
      }
      window.location.assign(data.confirmationUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось создать платёж");
      setPending(null);
    }
  };

  return (
    <section style={{ padding: "56px 0" }}>
      <div className="shell">
        <h2 className="section-title" style={{ textAlign: "center", margin: "0 0 28px" }}>
          Выбери свой отчёт
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          {PLANS.map((plan) => {
            const isOpen = open === plan.id;
            const scarcity =
              plan.id === "basic"
                ? "Осталось 9 мест"
                : plan.id === "premium"
                  ? `Осталось ${spots ?? 4} мест`
                  : null;

            return (
              <div
                key={plan.id}
                className={`acc-item${plan.featured ? " is-featured" : ""}`}
              >
                <button
                  type="button"
                  className={`acc-head${plan.featured ? " is-featured" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(plan.id)}
                >
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: 17,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {plan.title}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 8,
                        marginTop: 6,
                      }}
                    >
                      {plan.featured ? (
                        <span className="badge-gold">ВЫБОР 77%</span>
                      ) : null}
                      {scarcity ? <span className="badge-scarce">{scarcity}</span> : null}
                    </span>
                  </span>

                  <span style={{ textAlign: "right" }}>
                    <span className="acc-price" style={{ display: "block" }}>
                      {plan.price.toLocaleString("ru-RU")} ₽
                    </span>
                    <span className="acc-price-old">{plan.oldPrice}</span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "inline-flex", color: "var(--text-muted)" }}
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="acc-body">
                        <div style={{ marginBottom: 16 }}>
                          {plan.features.map((f) => (
                            <div
                              key={f.text}
                              className={`feature-row${f.on ? "" : " is-off"}`}
                            >
                              {f.on ? (
                                <Check
                                  size={16}
                                  color="var(--accent-sage)"
                                  style={{ marginTop: 3, flexShrink: 0 }}
                                />
                              ) : (
                                <X
                                  size={16}
                                  color="var(--text-muted)"
                                  style={{ marginTop: 3, flexShrink: 0 }}
                                />
                              )}
                              <span>{f.text}</span>
                            </div>
                          ))}
                        </div>

                        {plan.featured ? (
                          <div
                            className="trust-row"
                            style={{
                              justifyContent: "center",
                              marginBottom: 14,
                              color: "var(--accent-rose)",
                              fontWeight: 500,
                            }}
                          >
                            <Clock size={15} />
                            <span>
                              Цена вырастет через{" "}
                              <span className="font-code">
                                {remaining === null ? "24:00:00" : formatTimer(remaining)}
                              </span>
                            </span>
                          </div>
                        ) : null}

                        <button
                          type="button"
                          className={
                            plan.featured ? "btn-primary pulse-cta" : "btn-outline"
                          }
                          disabled={pending !== null}
                          onClick={() => checkout(plan.id)}
                        >
                          {pending === plan.id ? (
                            <>
                              <Loader2 size={18} className="spin" />
                              Переходим к оплате
                            </>
                          ) : (
                            plan.cta
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {error ? (
          <p
            style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: 14,
              color: "#B04A3A",
            }}
          >
            {error}
          </p>
        ) : null}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px 26px",
            marginTop: 28,
          }}
        >
          <span className="trust-row">
            <Shield size={16} /> Оплата ЮKassa — все методы
          </span>
          <span className="trust-row">
            <RotateCcw size={16} /> Возврат за 3 дня
          </span>
          <span className="trust-row">
            <Star size={16} /> 38 920 отчётов создано
          </span>
        </div>
      </div>
    </section>
  );
}
