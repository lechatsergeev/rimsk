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

export default function CertificatesPage() {
  return (
    <EditorialPageShell
      eyebrow="Certificates"
      title="Сертификаты и документы"
      description="На этой странице собрана базовая информация о документах. Полный комплект по позициям отправляем по запросу."
      footerDescription={
        <>
          Римская пицца из Санкт-Петербурга,
          <br />
          с документами по продукту
          <br />
          и прозрачным запросом по позициям.
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
          <div style={labelStyle}>Декларации</div>
          <h2 style={titleStyle}>По запросу</h2>
          <p style={textStyle}>
            Отправляем документы после обращения, чтобы вы получили актуальный
            комплект под нужные позиции.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Состав</div>
          <h2 style={titleStyle}>По каждой пицце отдельно</h2>
          <p style={textStyle}>
            Даём информацию по составу и базовым характеристикам отдельно по
            каждой позиции ассортимента.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Запрос</div>
          <h2 style={titleStyle}>Через email</h2>
          <p style={textStyle}>
            Основной способ запроса документов сейчас простой: письмо на{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#111315" }}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </article>
      </div>

      <section style={{ marginTop: 28, ...cardStyle }}>
        <div style={innerRuleStyle} />
        <div style={labelStyle}>Как запросить</div>
        <h2 style={titleStyle}>Что написать в письме</h2>
        <div style={{ ...textStyle, marginTop: 16, display: "grid", gap: 10 }}>
          <div>Какие позиции вас интересуют</div>
          <div>Для какой компании или точки нужен комплект</div>
          <div>Куда отправить документы</div>
          <div>Если нужен срочный ответ, укажите это в теме письма</div>
        </div>
      </section>
    </EditorialPageShell>
  );
}
