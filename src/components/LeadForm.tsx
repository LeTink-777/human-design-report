"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Shield, Users, ArrowRight } from "lucide-react";
import Bodygraph from "@/components/Bodygraph";
import { saveHDData } from "@/lib/storage";

const LOADING_MS = 3000;

export default function LeadForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    email: "",
  });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    saveHDData({
      name: form.name.trim(),
      birthDate: form.birthDate,
      birthTime: form.birthTime,
      birthPlace: form.birthPlace.trim(),
      email: form.email.trim(),
    });

    setLoading(true);
    window.setTimeout(() => router.push("/result"), LOADING_MS);
  };

  if (loading) {
    return (
      <div
        className="card"
        style={{
          padding: "36px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          textAlign: "center",
        }}
      >
        <Bodygraph size={210} mode="loading" />
        <div>
          <div className="font-display" style={{ fontSize: 22 }}>
            Рассчитываем твой бодиграф
          </div>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 6 }}>
            Определяем тип, профиль и авторитет по дате рождения
          </p>
        </div>
        <motion.div
          style={{
            width: "100%",
            maxWidth: 280,
            height: 3,
            borderRadius: 999,
            background: "var(--accent-rose-light)",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: LOADING_MS / 1000, ease: "linear" }}
            style={{ height: "100%", background: "var(--accent-rose)" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ padding: "26px 24px", maxWidth: 500, width: "100%" }}
      id="form"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label className="field-label" htmlFor="hd-name">
            Имя
          </label>
          <input
            id="hd-name"
            className="field"
            type="text"
            required
            autoComplete="given-name"
            placeholder="Как тебя зовут"
            value={form.name}
            onChange={update("name")}
          />
        </div>

        <div>
          <label className="field-label" htmlFor="hd-date">
            Дата рождения
          </label>
          <input
            id="hd-date"
            className="field"
            type="date"
            required
            value={form.birthDate}
            onChange={update("birthDate")}
          />
        </div>

        <div>
          <label className="field-label" htmlFor="hd-time">
            Время рождения
          </label>
          <input
            id="hd-time"
            className="field"
            type="time"
            required
            value={form.birthTime}
            onChange={update("birthTime")}
          />
          <p className="field-note">Важно для точного расчёта</p>
        </div>

        <div>
          <label className="field-label" htmlFor="hd-place">
            Место рождения
          </label>
          <input
            id="hd-place"
            className="field"
            type="text"
            required
            placeholder="Город рождения"
            value={form.birthPlace}
            onChange={update("birthPlace")}
          />
        </div>

        <div>
          <label className="field-label" htmlFor="hd-email">
            Email
          </label>
          <input
            id="hd-email"
            className="field"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
          />
        </div>

        <button className="btn-primary" type="submit">
          Рассчитать мой дизайн
          <ArrowRight size={18} />
        </button>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 20px",
            justifyContent: "center",
            paddingTop: 2,
          }}
        >
          <span className="trust-row">
            <Zap size={14} /> Расчёт за 30 секунд
          </span>
          <span className="trust-row">
            <Shield size={14} /> Бесплатно
          </span>
          <span className="trust-row">
            <Users size={14} /> 38 920 отчётов создано
          </span>
        </div>
      </div>
    </form>
  );
}
