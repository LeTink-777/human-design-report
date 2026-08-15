import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Публичная оферта — Human Design отчёт",
  description:
    "Условия оказания услуг по подготовке персонального отчёта Human Design, порядок оплаты и возврата.",
  alternates: { canonical: "/offer" },
};

const sectionStyle: React.CSSProperties = { marginTop: 28 };
const h2Style: React.CSSProperties = { fontSize: 20, fontWeight: 600, marginBottom: 10 };
const pStyle: React.CSSProperties = { color: "var(--text-secondary)", marginBottom: 10 };

export default function OfferPage() {
  return (
    <>
      <TopBar />
      <main style={{ padding: "48px 0 20px" }}>
        <article className="shell" style={{ maxWidth: 780 }}>
          <h1 className="font-display" style={{ fontSize: 36, margin: 0 }}>
            Публичная оферта
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 10, fontSize: 14 }}>
            Действует с 1 января 2026 года
          </p>

          <section style={sectionStyle}>
            <h2 style={h2Style}>1. Общие положения</h2>
            <p style={pStyle}>
              Настоящий документ является публичной офертой Евдокимова Даниила
              Владимировича, ИНН 381928138362, самозанятого (далее — Исполнитель),
              адресованной любому дееспособному физическому лицу (далее — Заказчик).
            </p>
            <p style={pStyle}>
              Оплата услуги означает полное и безоговорочное принятие условий
              настоящей оферты.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>2. Предмет договора</h2>
            <p style={pStyle}>
              Исполнитель оказывает информационно-консультационную услугу: подготовку
              и передачу персонального отчёта Human Design в электронном виде на
              основании данных, указанных Заказчиком, а в тарифе «Отчёт + Сессия» —
              дополнительно аудиосессию разбора продолжительностью 30 минут.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>3. Стоимость и оплата</h2>
            <p style={pStyle}>
              Базовый отчёт — 290 рублей. Полный отчёт — 590 рублей. Отчёт + Сессия —
              1 390 рублей. Стоимость указана в рублях Российской Федерации, НДС не
              облагается в связи с применением Исполнителем налога на профессиональный
              доход.
            </p>
            <p style={pStyle}>
              Оплата производится через платёжный сервис ЮKassa доступными способами:
              банковская карта, SberPay, СБП, T-Pay, ЮMoney и другие подключённые
              методы. Чек направляется Заказчику в соответствии с требованиями
              законодательства.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>4. Сроки оказания услуги</h2>
            <p style={pStyle}>
              Базовый отчёт направляется на указанный адрес электронной почты в
              течение 24 часов с момента оплаты, полный отчёт — в течение 12 часов,
              тариф «Отчёт + Сессия» — в течение 6 часов. Время проведения аудиосессии
              согласуется сторонами дополнительно.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>5. Возврат средств</h2>
            <p style={pStyle}>
              Заказчик вправе запросить возврат оплаты в течение 3 календарных дней с
              момента оплаты, направив запрос на danyavdkmvv3@gmail.com с указанием
              даты платежа и адреса электронной почты, использованного при заказе.
              Возврат производится на реквизиты платежа в течение 10 рабочих дней.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>6. Ограничение ответственности</h2>
            <p style={pStyle}>
              Отчёт носит информационно-развлекательный характер и не является
              медицинской, психологической, юридической или финансовой консультацией.
              Исполнитель не несёт ответственности за решения, принятые Заказчиком на
              основании материалов отчёта.
            </p>
            <p style={pStyle}>
              Точность расчёта зависит от корректности данных, указанных Заказчиком.
              Исполнитель не несёт ответственности за результат при указании неверных
              даты, времени или места рождения.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>7. Реквизиты Исполнителя</h2>
            <p style={pStyle}>
              Евдокимов Даниил Владимирович. ИНН 381928138362. Самозанятый (налог на
              профессиональный доход). Электронная почта: danyavdkmvv3@gmail.com.
              Telegram: @dvdkmv.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
