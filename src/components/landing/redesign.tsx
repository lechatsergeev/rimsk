import React, { type CSSProperties, type FormEvent, type ReactNode, useState } from "react";
import { motion } from "motion/react";
import { LandingPageShell } from "@/components/landing/shared";
import { useMounted } from "@/lib/use-mounted";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  NET_WEIGHT,
  PRODUCT_SPECS,
} from "@/content/brand";

const MiniPizzaModel = React.lazy(() =>
  import("@/components/blocks/hero-pizza-model").then((module) => ({
    default: module.HeroPizzaModel,
  }))
);

type LineupItem = {
  sku: string;
  title: string;
  note: string;
  modelSrc?: string;
};

type SegmentRedesignProps = {
  marqueeText: string;
  footerDescription: ReactNode;
  lineupTitle: string;
  lineupDescription: string;
  lineupItems: LineupItem[];
  orderTitle: string;
  orderDescription: string;
  submitLabel: string;
};

const sectionMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.35 },
};

// Тёплый белый вместо прежней бумажной текстуры: в ней были
// repeating-linear-gradient, дававшие сетку тонких линеек по всему фону.
const paperTexture = "var(--paper)";

// Холодные подложки: тёплая корка на них читается заметно сильнее,
// чем на прежних бежевых градиентах.
const cardAccents = [
  "radial-gradient(circle at 26% 18%, rgba(127,150,255,0.42), transparent 46%), linear-gradient(180deg, #dcefff 0%, #b9dbf7 100%)",
  "radial-gradient(circle at 74% 14%, rgba(229,99,153,0.28), transparent 44%), linear-gradient(180deg, #e3f2ff 0%, #c3e2f5 100%)",
  "radial-gradient(circle at 50% 6%, rgba(13,18,121,0.24), transparent 46%), linear-gradient(180deg, #d5e9fb 0%, #aed3f2 100%)",
];

export function SegmentRedesignPage(props: SegmentRedesignProps) {
  return (
    <LandingPageShell
      marqueeText={props.marqueeText}
      footerDescription={props.footerDescription}
    >
      <SwissSection
        id="assortment"
        title={props.lineupTitle}
        description={props.lineupDescription}
      >
        <LineupCards items={props.lineupItems} />
      </SwissSection>

      <SwissSection
        id="specs"
        title="Состав и хранение"
        description="Одинаково для всех позиций ассортимента. Полный комплект документов отправляем по запросу."
      >
        <SpecsBlock />
      </SwissSection>

      <SwissSection
        id="order"
        title={props.orderTitle}
        description={props.orderDescription}
      >
        <OrderBlock submitLabel={props.submitLabel} />
      </SwissSection>
    </LandingPageShell>
  );
}

function SwissSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="swiss-section"
      style={{ background: paperTexture }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <motion.div {...sectionMotion} style={{ minWidth: 0 }}>
          <div>
            <h2 className="swiss-title">{title}</h2>
            {description ? <p style={descriptionStyle}>{description}</p> : null}
          </div>
          <div className="swiss-body">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}

function LineupCards({ items }: { items: LineupItem[] }) {
  const mounted = useMounted();

  return (
    <div className="lineup-grid">
      {items.map((item, index) => (
        <motion.article
          key={item.sku}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          style={{
            border: "1px solid rgba(17,19,21,0.14)",
            borderRadius: 28,
            overflow: "hidden",
            background: "#fffdf9",
            boxShadow: "0 10px 30px rgba(17,19,21,0.06)",
          }}
        >
          <div
            style={{
              position: "relative",
              minHeight: "clamp(220px, 24vw, 260px)",
              padding: 18,
              background: cardAccents[index % cardAccents.length],
            }}
          >
            <div style={cardMetaRowStyle}>
              <span style={weightPillStyle}>{NET_WEIGHT}</span>
            </div>
            <div
              style={{
                marginTop: 10,
                height: "clamp(160px, 18vw, 190px)",
              }}
            >
              {/* Как и в шапке: модель монтируется после гидрации. */}
              {mounted ? (
                <React.Suspense fallback={<div style={{ width: "100%", height: "100%" }} />}>
                  <MiniPizzaModel
                    lowResOnly={true}
                    targetSize={2.6}
                    lowResModelSrc={item.modelSrc}
                    className="relative z-[2] h-full w-full touch-none"
                  />
                </React.Suspense>
              ) : (
                <div style={{ width: "100%", height: "100%" }} />
              )}
            </div>
          </div>

          <div style={{ padding: "clamp(18px, 2vw, 22px)" }}>
            <h3
              style={{
                margin: 0,
                fontFamily: "'LT Amber', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(26px, 3vw, 32px)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: "#111315",
              }}
            >
              {item.title}
            </h3>
            <p style={{ ...descriptionStyle, marginTop: 12 }}>{item.note}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function SpecsBlock() {
  // Без рамки, тени и разделительных линеек: характеристики читаются
  // списком, порядок держится отступами.
  return (
    <div style={{ marginBottom: "clamp(24px, 3vw, 32px)" }}>
      {PRODUCT_SPECS.map((spec) => (
        <div key={spec.label} className="spec-row">
          <div style={specLabelStyle}>{spec.label}</div>
          <div style={specValueStyle}>{spec.value}</div>
        </div>
      ))}
    </div>
  );
}

function OrderBlock({ submitLabel }: { submitLabel: string }) {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    city: "",
    comment: "",
  });
  const [error, setError] = useState("");
  const fields = [
    { key: "company", label: "Компания или сеть", placeholder: "Сеть, магазин, дарк-стор" },
    { key: "contact", label: "Телефон или email", placeholder: "+7 / name@company.ru" },
    { key: "city", label: "Город", placeholder: "Санкт-Петербург" },
    { key: "comment", label: "Что интересует", placeholder: "Позиции, объём, нужные документы" },
  ];

  // Приёмника заявок пока нет: форма собирает письмо и открывает почтовый клиент.
  // Прямые телефон и почта продублированы рядом — на случай, если mailto не настроен.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.company.trim() || !formData.contact.trim()) {
      setError("Укажите компанию и контакт для связи.");
      return;
    }

    setError("");

    const subject = `Запрос по продукту — ${formData.company.trim()}`;
    const body = [
      `Компания или сеть: ${formData.company.trim()}`,
      `Контакт: ${formData.contact.trim()}`,
      formData.city.trim() ? `Город: ${formData.city.trim()}` : "",
      formData.comment.trim() ? `Запрос: ${formData.comment.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div style={{ paddingTop: "clamp(12px, 1.6vw, 18px)" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "0 0 clamp(24px, 3vw, 32px)",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.4), transparent 28%), radial-gradient(circle at 82% 0%, rgba(27,35,230,0.14), transparent 36%), linear-gradient(180deg, #ffffff 0%, #e8f3ff 100%)",
            border: "1px solid rgba(17,19,21,0.14)",
            borderRadius: 28,
            boxShadow: "0 24px 60px rgba(17,19,21,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "clamp(18px, 2.4vw, 26px) clamp(18px, 2.6vw, 28px) clamp(16px, 2vw, 22px)",
            }}
          >
            <div style={offerMetaStyle}>contact</div>
            <div style={offerTitleStyle}>Напишите нам</div>
            <div style={offerTextStyle}>
              Отправим состав, характеристики и документы по позициям. Форма
              соберёт письмо и откроет вашу почту — или пишите напрямую.
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(10px, 1.4vw, 18px)",
                marginTop: 16,
              }}
            >
              <a href={CONTACT_PHONE_HREF} style={directContactStyle}>
                {CONTACT_PHONE}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} style={directContactStyle}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div
            className="order-fields"
          >
            {fields.map((field) => (
              <label
                key={field.key}
                style={{
                  display: "grid",
                  gap: 8,
                  gridColumn: field.key === "comment" ? "1 / -1" : "auto",
                }}
              >
                <span style={accentLabelStyle}>{field.label}</span>
                {field.key === "comment" ? (
                  <textarea
                    rows={5}
                    placeholder={field.placeholder}
                    style={accentInputStyle}
                    value={formData.comment}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        comment: event.target.value,
                      }))
                    }
                  />
                ) : (
                  <input
                    placeholder={field.placeholder}
                    style={accentInputStyle}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                  />
                )}
              </label>
            ))}

            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <button type="submit" style={submitStyle}>
                {submitLabel}
              </button>
              <div
                style={{
                  ...offerTextStyle,
                  marginTop: 0,
                  color: error ? "#b42318" : "#111315",
                }}
              >
                {error || "Отвечаем в течение рабочего дня."}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}



const descriptionStyle: CSSProperties = {
  margin: "12px 0 0",
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 12,
  lineHeight: 1.58,
  color: "#111315",
};

const cardMetaRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};


const weightPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "7px 10px",
  borderRadius: 999,
  border: "1px solid var(--signal)",
  background: "var(--signal)",
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 10,
  lineHeight: 1.2,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#111315",
};


const submitStyle: CSSProperties = {
  border: "1px solid var(--signal)",
  background: "var(--signal)",
  color: "#111315",
  padding: "12px 16px",
  borderRadius: 999,
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 11,
  lineHeight: 1.4,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const accentLabelStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#111315",
};

const accentInputStyle: CSSProperties = {
  width: "100%",
  padding: "0 0 10px",
  border: "none",
  borderBottom: "1px solid rgba(17,19,21,0.18)",
  background: "transparent",
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 12,
  lineHeight: 1.7,
  color: "#111315",
  outline: "none",
  resize: "vertical",
  borderRadius: 0,
};

const specLabelStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#111315",
};

const specValueStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 13,
  lineHeight: 1.6,
  color: "#111315",
};

const directContactStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 14,
  lineHeight: 1.4,
  color: "#111315",
  textDecoration: "none",
  borderBottom: "1px solid rgba(17,19,21,0.28)",
  paddingBottom: 2,
};

const offerMetaStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#111315",
};

const offerTitleStyle: CSSProperties = {
  marginTop: 8,
  fontFamily: "'LT Amber', sans-serif",
  fontWeight: 400,
  fontSize: 40,
  lineHeight: 0.9,
  letterSpacing: "-0.03em",
  color: "#111315",
  maxWidth: "11ch",
};

const offerTextStyle: CSSProperties = {
  marginTop: 12,
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 12,
  lineHeight: 1.58,
  color: "#111315",
  maxWidth: "42ch",
};
