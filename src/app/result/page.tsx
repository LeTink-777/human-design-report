import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ResultView from "@/components/ResultView";

export const metadata: Metadata = {
  title: "Твой результат Human Design — тип, стратегия и профиль",
  description:
    "Персональный результат расчёта Human Design: тип, стратегия, профиль и авторитет по дате рождения.",
  robots: { index: false, follow: true },
};

export default function ResultPage() {
  return (
    <>
      <TopBar />
      <ResultView />
      <Footer />
    </>
  );
}
