import { type CSSProperties } from "react";
import { EditorialPageShell } from "@/components/landing/shared";

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

export default function DeliveryPage() {
  return (
    <EditorialPageShell
      eyebrow="Delivery"
      title="Условия доставки"
      description="Здесь собраны базовые условия старта: куда везём, как согласуем формат и что нужно уточнить перед первой поставкой."
      footerDescription={
        <>
          Римская пицца из Санкт-Петербурга,
          <br />
          которую мы делаем вручную
          <br />
          и доставляем по согласованию.
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
          <div style={labelStyle}>География</div>
          <h2 style={titleStyle}>Санкт-Петербург и область</h2>
          <p style={textStyle}>
            На старте работаем локально, чтобы держать нормальный ритм поставки и
            предсказуемое качество сервиса.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Формат</div>
          <h2 style={titleStyle}>По согласованию</h2>
          <p style={textStyle}>
            Подстраиваем формат отгрузки под тип точки, объём и частоту. Детали
            обсуждаем после заявки.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Срок</div>
          <h2 style={titleStyle}>После подтверждения</h2>
          <p style={textStyle}>
            Сначала фиксируем состав заказа и контакт, после этого подтверждаем
            окно доставки и дальнейший процесс.
          </p>
        </article>
      </div>

      <section style={{ marginTop: 28, ...cardStyle }}>
        <div style={innerRuleStyle} />
        <div style={labelStyle}>Что уточняем</div>
        <h2 style={titleStyle}>Перед первой поставкой</h2>
        <div style={{ ...textStyle, marginTop: 16, display: "grid", gap: 10 }}>
          <div>Город и адрес точки</div>
          <div>Нужный ассортимент и объём</div>
          <div>Желаемая дата старта</div>
          <div>Контакт для согласования и приёмки</div>
        </div>
      </section>
    </EditorialPageShell>
  );
}
