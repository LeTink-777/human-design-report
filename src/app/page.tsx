import { Zap, Heart, Circle, Target, TrendingUp, Star } from "lucide-react";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Bodygraph from "@/components/Bodygraph";
import LeadForm from "@/components/LeadForm";
import TypeShapes from "@/components/TypeShapes";

const REPORT_ITEMS = [
  {
    icon: Zap,
    title: "Тип и стратегия",
    text: "как принимать правильные решения",
  },
  {
    icon: Heart,
    title: "Авторитет",
    text: "твой внутренний компас",
  },
  {
    icon: Circle,
    title: "Определение",
    text: "как ты взаимодействуешь с миром",
  },
  {
    icon: Target,
    title: "Профиль",
    text: "твоя жизненная роль",
  },
  {
    icon: TrendingUp,
    title: "Открытые центры",
    text: "где ты уязвим и гибок",
  },
  {
    icon: Star,
    title: "Каналы и ворота",
    text: "твои уникальные таланты",
  },
];

const QUOTES = [
  {
    text: "Тип Проектор полностью объяснил почему я устаю от работы в команде.",
    author: "Анастасия, 29 лет",
  },
  {
    text: "Стратегия Генератора изменила мой подход к работе и решениям.",
    author: "Илья, 35 лет",
  },
  {
    text: "Наконец поняла почему мне нужно больше времени на восстановление.",
    author: "Мария, 31 год",
  },
];

export default function Home() {
  return (
    <>
      <TopBar />

      <main>
        {/* ---------------- HERO ---------------- */}
        <section
          className="geo-pattern"
          style={{ paddingTop: 56, paddingBottom: 56 }}
        >
          <div className="shell">
            <div className="hero-grid">
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>
                  ТВОЙ ЭНЕРГЕТИЧЕСКИЙ ДИЗАЙН
                </p>
                <h1 className="hero-title font-display" style={{ margin: "18px 0 0" }}>
                  Узнай как ты устроен — и перестань жить чужую жизнь
                </h1>
                <p
                  style={{
                    fontSize: 17,
                    color: "var(--text-secondary)",
                    marginTop: 20,
                    maxWidth: 520,
                  }}
                >
                  Введи дату, время и место рождения — получи персональный бодиграф
                  и расшифровку твоего типа Human Design
                </p>
              </div>

              <div className="hero-graph">
                <Bodygraph size={300} defined={["sacral", "root", "spleen", "g"]} />
              </div>
            </div>

            <div style={{ marginTop: 44, display: "flex", justifyContent: "center" }}>
              <LeadForm />
            </div>
          </div>
        </section>

        {/* ---------------- WHAT IS HD ---------------- */}
        <section style={{ background: "var(--bg-secondary)", padding: "68px 0" }}>
          <div className="shell">
            <div className="split-grid">
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>
                  ОСНОВА СИСТЕМЫ
                </p>
                <h2 className="section-title" style={{ margin: "14px 0 20px" }}>
                  Что такое Human Design
                </h2>
                <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
                  Human Design — это система самопознания, которая соединяет
                  астрологию, Каббалу, китайскую Книгу Перемен и современное
                  понимание генетики. Она не предсказывает будущее и не даёт готовых
                  ответов — она показывает, как именно устроена твоя энергия и по
                  каким правилам она работает лучше всего.
                </p>
                <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
                  По дате, времени и месту рождения строится бодиграф — карта из
                  девяти энергетических центров. Одни центры у тебя определены и
                  работают стабильно, другие открыты и делают тебя чувствительным к
                  окружению. Из этой карты складывается твой тип, стратегия и
                  внутренний авторитет — три вещи, которые определяют, будет ли твоя
                  жизнь ощущаться своей.
                </p>
                <p className="pull-quote" style={{ margin: 0 }}>
                  «Human Design — это карта твоей уникальной энергии»
                </p>
              </div>

              <div>
                <TypeShapes />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- WHAT REPORT REVEALS ---------------- */}
        <section style={{ padding: "68px 0" }}>
          <div className="shell">
            <p className="eyebrow" style={{ margin: 0 }}>
              СОДЕРЖАНИЕ
            </p>
            <h2 className="section-title" style={{ margin: "14px 0 30px" }}>
              Что раскрывает твой отчёт
            </h2>

            <div className="cards-grid">
              {REPORT_ITEMS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="card-rose-edge" style={{ padding: "20px 22px" }}>
                  <Icon size={20} color="var(--accent-rose)" />
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      margin: "12px 0 6px",
                      color: "var(--text-primary)",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: 14.5, color: "var(--text-secondary)", margin: 0 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- SOCIAL PROOF ---------------- */}
        <section style={{ background: "var(--bg-secondary)", padding: "68px 0" }}>
          <div className="shell">
            <p className="eyebrow" style={{ margin: 0 }}>
              ОТЗЫВЫ
            </p>
            <h2 className="section-title" style={{ margin: "14px 0 30px" }}>
              38 920 человек уже получили свой отчёт
            </h2>

            <div className="cards-grid">
              {QUOTES.map((q) => (
                <div key={q.author} className="quote-card">
                  <p style={{ margin: 0, color: "var(--text-primary)", fontSize: 15.5 }}>
                    {q.text}
                  </p>
                  <p
                    style={{
                      margin: "12px 0 0",
                      fontSize: 13,
                      color: "var(--text-muted)",
                    }}
                  >
                    {q.author}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 36, textAlign: "center" }}>
              <a
                href="#form"
                className="btn-primary"
                style={{ maxWidth: 360, margin: "0 auto", textDecoration: "none" }}
              >
                Рассчитать мой дизайн
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
