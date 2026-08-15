import type { Metadata } from "next";
import {
  DM_Serif_Display,
  DM_Sans,
  Space_Mono,
  Playfair_Display,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

/* Основные гарнитуры бренда (латиница) */
const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
});

/* Кириллические дублёры: DM-семейство не содержит кириллицы,
   поэтому русский текст подхватывают эти гарнитуры того же характера. */
const playfair = Playfair_Display({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Human Design — Персональный отчёт по дате рождения",
  description:
    "Узнай свой тип Human Design бесплатно. Генератор, Проектор, Манифестор или Рефлектор — полный бодиграф и расшифровка по дате рождения. Результат за 30 секунд.",
  keywords: [
    "human design",
    "хьюман дизайн",
    "human design по дате рождения",
    "хьюман дизайн онлайн",
    "тип human design",
    "бодиграф human design",
    "human design бесплатно",
    "генератор human design",
    "проектор human design",
    "манифестор human design",
    "рефлектор human design",
    "манифестирующий генератор",
    "human design расчёт",
    "хьюман дизайн тип",
    "human design стратегия",
    "human design авторитет",
    "human design профиль",
    "human design 2026",
    "хьюман дизайн отчёт",
  ],
  authors: [{ name: "Human Design Report" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Human Design — Персональный отчёт",
    title: "Human Design — Персональный отчёт по дате рождения",
    description:
      "Узнай свой тип Human Design бесплатно. Генератор, Проектор, Манифестор или Рефлектор — полный бодиграф и расшифровка по дате рождения.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Human Design — Персональный отчёт по дате рождения",
    description:
      "Узнай свой тип Human Design бесплатно. Полный бодиграф и расшифровка по дате рождения за 30 секунд.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: { url: "/favicon.svg" },
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Human Design — Персональный отчёт",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Онлайн-расчёт типа Human Design по дате, времени и месту рождения: бодиграф, тип, стратегия, авторитет и профиль.",
    inLanguage: "ru-RU",
    offers: {
      "@type": "Offer",
      price: "290",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "38920",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Human Design — Персональный отчёт",
    url: SITE_URL,
    inLanguage: "ru-RU",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Что такое Human Design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Human Design — система самопознания, объединяющая астрологию, Каббалу, Ицзин и квантовую физику. Она описывает уникальную энергетическую конституцию человека через 5 типов и 64 ворота.",
        },
      },
      {
        "@type": "Question",
        name: "Какие бывают типы в Human Design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "В Human Design 5 типов: Генератор (70%), Манифестирующий Генератор, Проектор (20%), Манифестор (8%) и Рефлектор (2%). Каждый тип имеет свою стратегию и авторитет.",
        },
      },
      {
        "@type": "Question",
        name: "Зачем нужно время рождения?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Время рождения влияет на точный расчёт положения планет и определяет профиль, авторитет и точное расположение активированных ворот в бодиграфе.",
        },
      },
      {
        "@type": "Question",
        name: "Что такое авторитет в Human Design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Авторитет — твой внутренний компас для принятия решений. Эмоциональный авторитет требует ждать ясности, Сакральный — слушать интуитивный отклик тела, Селезёночный — доверять мгновенному чутью.",
        },
      },
      {
        "@type": "Question",
        name: "Как Human Design помогает в жизни?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Зная свой тип и стратегию, ты перестаёшь тратить энергию на то что не твоё, принимаешь решения в соответствии со своей природой и выстраиваешь отношения с пониманием разных типов.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body
        className={`${dmSerif.variable} ${dmSans.variable} ${spaceMono.variable} ${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
