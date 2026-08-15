import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import ThankYouView from "@/components/ThankYouView";

export const metadata: Metadata = {
  title: "Заказ принят — отчёт Human Design готовится",
  description: "Твой персональный отчёт Human Design в работе.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <TopBar />
      <ThankYouView />
      <Footer />
    </>
  );
}
