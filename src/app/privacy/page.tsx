import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Human Design отчёт",
  description:
    "Как обрабатываются и защищаются персональные данные пользователей сервиса Human Design отчёт.",
  alternates: { canonical: "/privacy" },
};

const sectionStyle: React.CSSProperties = { marginTop: 28 };
const h2Style: React.CSSProperties = { fontSize: 20, fontWeight: 600, marginBottom: 10 };
const pStyle: React.CSSProperties = { color: "var(--text-secondary)", marginBottom: 10 };

export default function PrivacyPage() {
  return (
    <>
      <TopBar />
      <main style={{ padding: "48px 0 20px" }}>
        <article className="shell" style={{ maxWidth: 780 }}>
          <h1 className="font-display" style={{ fontSize: 36, margin: 0 }}>
            Политика конфиденциальности
          </h1>
          <p style={{ color: "var(--text-muted)", marginTop: 10, fontSize: 14 }}>
            Действует с 1 января 2026 года
          </p>

          <section style={sectionStyle}>
            <h2 style={h2Style}>1. Оператор персональных данных</h2>
            <p style={pStyle}>
              Оператором персональных данных является Евдокимов Даниил Владимирович,
              ИНН 381928138362, применяющий специальный налоговый режим «Налог на
              профессиональный доход» (самозанятый).
            </p>
            <p style={pStyle}>
              Контактный адрес электронной почты: danyavdkmvv3@gmail.com. Telegram:
              @dvdkmv.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>2. Какие данные обрабатываются</h2>
            <p style={pStyle}>
              Оператор обрабатывает данные, которые пользователь добровольно указывает
              в форме на сайте: имя, дата рождения, время рождения, место рождения,
              адрес электронной почты.
            </p>
            <p style={pStyle}>
              Дополнительно могут обрабатываться технические данные: IP-адрес, тип
              устройства и браузера, источник перехода, а также данные о совершённых
              платежах, передаваемые платёжным сервисом.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>3. Цели обработки</h2>
            <p style={pStyle}>
              Данные обрабатываются для расчёта персонального отчёта Human Design,
              отправки готового отчёта на указанный адрес электронной почты, обработки
              оплаты, ответов на обращения пользователя и улучшения работы сервиса.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>4. Правовое основание</h2>
            <p style={pStyle}>
              Обработка осуществляется на основании согласия пользователя, которое он
              даёт при отправке формы на сайте, а также для исполнения договора,
              заключаемого на условиях публичной оферты.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>5. Передача третьим лицам</h2>
            <p style={pStyle}>
              Оператор не продаёт и не передаёт персональные данные третьим лицам, за
              исключением случаев, необходимых для оказания услуги: платёжного сервиса
              ЮKassa для проведения оплаты, сервисов хостинга и отправки электронной
              почты, а также случаев, предусмотренных законодательством Российской
              Федерации.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>6. Хранение и защита</h2>
            <p style={pStyle}>
              Данные хранятся не дольше, чем этого требуют цели обработки, и удаляются
              по запросу пользователя. Оператор принимает разумные организационные и
              технические меры для защиты данных от неправомерного доступа,
              уничтожения и распространения.
            </p>
            <p style={pStyle}>
              Часть введённых данных сохраняется локально в браузере пользователя
              (localStorage) исключительно для отображения результата расчёта и не
              передаётся на сторонние серверы.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>7. Права пользователя</h2>
            <p style={pStyle}>
              Пользователь вправе в любой момент отозвать согласие на обработку
              персональных данных, запросить их копию, исправление или удаление,
              направив письмо на danyavdkmvv3@gmail.com. Запрос обрабатывается в
              течение 10 рабочих дней.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>8. Изменения политики</h2>
            <p style={pStyle}>
              Оператор вправе изменять настоящую политику. Актуальная редакция всегда
              опубликована на этой странице.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
