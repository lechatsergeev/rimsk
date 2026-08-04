import { type CSSProperties } from "react";
import {
  EditorialPageShell,
  LEGAL_FIELDS,
  PendingDocs,
} from "@/components/landing/shared";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from "@/content/brand";

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

export default function ContactsPage() {
  return (
    <EditorialPageShell
      eyebrow="Contacts"
      title="Контакты"
      description="Состав, характеристики, фото продукта и документы отправляем по запросу. Пишите или звоните напрямую."
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
          <div style={labelStyle}>Телефон</div>
          <h2 style={titleStyle}>
            <a href={CONTACT_PHONE_HREF} style={{ color: "#111315", textDecoration: "none" }}>
              {CONTACT_PHONE}
            </a>
          </h2>
          <p style={textStyle}>
            Короткие вопросы по продукту, объёмам и срокам.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Email</div>
          <h2 style={titleStyle}>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#111315", textDecoration: "none" }}>
              {CONTACT_EMAIL}
            </a>
          </h2>
          <p style={textStyle}>
            Состав, характеристики, документы и фото продукта.
          </p>
        </article>

        <article style={cardStyle}>
          <div style={innerRuleStyle} />
          <div style={labelStyle}>Производство</div>
          <h2 style={titleStyle}>Санкт-Петербург</h2>
          <p style={textStyle}>
            Печём и замораживаем здесь же, без промежуточных производств.
          </p>
        </article>
      </div>

      <section style={{ marginTop: 28, ...cardStyle }}>
        <div style={innerRuleStyle} />
        <div style={labelStyle}>Реквизиты</div>
        <h2 style={titleStyle}>Юридическая информация</h2>
        <div style={{ marginTop: 16 }}>
          <PendingDocs>
            <div style={{ ...textStyle, marginTop: 0, display: "grid", gap: 10 }}>
              {LEGAL_FIELDS.map((label) => (
                <div key={label}>{label} —</div>
              ))}
            </div>
          </PendingDocs>
        </div>
      </section>
    </EditorialPageShell>
  );
}
