import { type CSSProperties } from "react";
import { CONTACT_EMAIL, EditorialPageShell } from "@/components/landing/shared";

const cardStyle: CSSProperties = {
  border: "1px solid rgba(17,19,21,0.14)",
  borderRadius: 20,
  padding: 22,
  background: "rgba(255,255,255,0.72)",
};

const labelStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(17,19,21,0.72)",
};

const titleStyle: CSSProperties = {
  margin: "10px 0 0",
  fontFamily: "'Martian Grotesk', sans-serif",
  fontSize: 34,
  lineHeight: 0.95,
  letterSpacing: "-0.06em",
  color: "#111315",
};

const textStyle: CSSProperties = {
  margin: "12px 0 0",
  fontFamily: "'Martian Mono', monospace",
  fontSize: 12,
  lineHeight: 1.7,
  color: "#111315",
};

const innerRuleStyle: CSSProperties = {
  width: "100%",
  height: 1,
  background: "rgba(17,19,21,0.14)",
  marginBottom: 14,
};

export default function ContactsPage() {
  return (
    <EditorialPageShell
      eyebrow="Contacts"
      title="Контакты"
      description="Если хотите обсудить заказ, поставку, ассортимент или документы, здесь вся базовая контактная информация."
      footerDescription={
        <>
          Римская пицца из Санкт-Петербурга,
          <br />
          с понятным контактом для связи
          <br />
          и быстрым ответом по запросу.
        </>
      }
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Телефон</div>
          <h2 style={titleStyle}>+7 (812) 000-00-00</h2>
          <p style={textStyle}>
            Для короткой связи по заказу, условиям и первичным вопросам.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Email</div>
          <h2 style={titleStyle}>{CONTACT_EMAIL}</h2>
          <p style={textStyle}>
            Для заявок, документов и переписки по ассортименту.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Город</div>
          <h2 style={titleStyle}>Санкт-Петербург</h2>
          <p style={textStyle}>
            Локальное производство и базовая география запуска сейчас здесь.
          </p>
        </article>
      </div>

      <section style={{ marginTop: 28, ...cardStyle }}>
        <div style={innerRuleStyle} />
        <div style={labelStyle}>Реквизиты</div>
        <h2 style={titleStyle}>Юридическая информация</h2>
        <div style={{ ...textStyle, marginTop: 16, display: "grid", gap: 10 }}>
          <div>ООО «ПИЦЦА ПИЦЦА»</div>
          <div>ИНН 7700000000</div>
          <div>ОГРН 1000000000000</div>
          <div>г. Санкт-Петербург, ул. Пример, д. 1</div>
        </div>
      </section>
    </EditorialPageShell>
  );
}
