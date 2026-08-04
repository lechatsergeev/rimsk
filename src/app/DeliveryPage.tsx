import { type CSSProperties } from "react";
import { EditorialPageShell } from "@/components/landing/shared";

const cardStyle: CSSProperties = {
  border: "1px solid rgba(17,19,21,0.14)",
  borderRadius: 20,
  padding: 22,
  background: "rgba(255,255,255,0.72)",
};

const labelStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(17,19,21,0.72)",
};

const titleStyle: CSSProperties = {
  margin: "10px 0 0",
  fontFamily: "'LT Amber', sans-serif",
  fontWeight: 400,
  fontSize: 34,
  lineHeight: 0.95,
  letterSpacing: "-0.022em",
  color: "#111315",
};

const textStyle: CSSProperties = {
  margin: "12px 0 0",
  fontFamily: "'LT Amber', sans-serif",
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
      description="Продукт хранится и перевозится при −18 °C. Здесь базовые условия старта и то, что уточняем перед первой отгрузкой."
      footerDescription={
        <>
          Замороженная римская пицца
          <br />
          ручной работы. Производство
          <br />в Санкт-Петербурге.
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
            На старте работаем локально: короткое плечо и предсказуемый ритм
            отгрузок.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Температура</div>
          <h2 style={titleStyle}>−18 °C</h2>
          <p style={textStyle}>
            Непрерывная холодовая цепь от производства до вашего склада. Срок
            годности — 6 месяцев.
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
        <h2 style={titleStyle}>Перед первой отгрузкой</h2>
        <div style={{ ...textStyle, marginTop: 16, display: "grid", gap: 10 }}>
          <div>Адрес склада или распределительного центра</div>
          <div>Позиции и объём партии</div>
          <div>Требования к маркировке и упаковке</div>
          <div>Желаемая дата старта</div>
          <div>Контакт для согласования и приёмки</div>
        </div>
      </section>
    </EditorialPageShell>
  );
}
