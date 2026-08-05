import React, { type CSSProperties, type FormEvent, type ReactNode, useState } from "react";
import { motion } from "motion/react";
import { LandingPageShell, useBreakpoint } from "@/components/landing/shared";
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
  chips: string[];
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

const paperTexture =
  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.48), transparent 28%), radial-gradient(circle at 80% 0%, rgba(0,0,0,0.03), transparent 32%), repeating-linear-gradient(0deg, rgba(0,0,0,0.018) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(255,255,255,0.14) 0 1px, transparent 1px 34px), linear-gradient(180deg, #f2ebdf 0%, #eee4d6 100%)";

// Холодные подложки: тёплая корка на них читается заметно сильнее,
// чем на прежних бежевых градиентах.
const cardAccents = [
  "radial-gradient(circle at 26% 18%, rgba(27,35,230,0.22), transparent 46%), linear-gradient(180deg, #dcefff 0%, #b9dbf7 100%)",
  "radial-gradient(circle at 74% 14%, rgba(216,255,60,0.32), transparent 44%), linear-gradient(180deg, #e3f2ff 0%, #c3e2f5 100%)",
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
        index="01"
        title={props.lineupTitle}
        description={props.lineupDescription}
      >
        <LineupCards items={props.lineupItems} />
      </SwissSection>

      <SwissSection
        id="specs"
        index="02"
        title="Состав и хранение"
        description="Одинаково для всех позиций ассортимента. Полный комплект документов отправляем по запросу."
      >
        <SpecsBlock />
      </SwissSection>

      <SwissSection
        id="order"
        index="03"
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
  index,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id={id}
      style={{
        background: paperTexture,
        borderTop: "1px solid rgba(20,20,20,0.14)",
        padding: isMobile ? "28px 20px 0" : "34px 48px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <motion.div {...sectionMotion} style={{ minWidth: 0 }}>
          <div style={ruleStyle} />
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1fr)",
              columnGap: isMobile ? 0 : 24,
              rowGap: 14,
            }}
          >
            <div style={indexStyle}>{index}</div>
            <div>
              <h2
                style={{
                  margin: 0,
                  maxWidth: "12ch",
                  fontFamily: "'LT Amber', sans-serif",
                  fontWeight: 400,
                  fontSize: isMobile ? 34 : 60,
                  lineHeight: 0.86,
                  letterSpacing: "-0.03em",
                  color: "#111315",
                }}
              >
                {title}
              </h2>
              {description ? <p style={descriptionStyle}>{description}</p> : null}
            </div>
          </div>
          <div style={{ marginTop: isMobile ? 20 : 28 }}>{children}</div>
        </motion.div>
      </div>
    </section>
  );
}

function LineupCards({ items }: { items: LineupItem[] }) {
  const { isMobile } = useBreakpoint();
  const mounted = useMounted();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
        gap: isMobile ? 16 : 18,
      }}
    >
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
            boxShadow: "0 18px 44px rgba(17,19,21,0.08)",
          }}
        >
          <div
            style={{
              position: "relative",
              minHeight: isMobile ? 220 : 260,
              padding: 18,
              background: cardAccents[index % cardAccents.length],
              borderBottom: "1px solid rgba(17,19,21,0.12)",
            }}
          >
            <div style={cardMetaRowStyle}>
              <span style={metaPillStyle}>{item.sku}</span>
              <span style={weightPillStyle}>{NET_WEIGHT}</span>
            </div>
            <div
              style={{
                marginTop: 10,
                height: isMobile ? 160 : 190,
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

          <div style={{ padding: isMobile ? 18 : 22 }}>
            <h3
              style={{
                margin: 0,
                fontFamily: "'LT Amber', sans-serif",
                fontWeight: 400,
                fontSize: isMobile ? 26 : 32,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: "#111315",
              }}
            >
              {item.title}
            </h3>
            <p style={{ ...descriptionStyle, marginTop: 12 }}>{item.note}</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 18,
              }}
            >
              {item.chips.map((chip) => (
                <span key={chip} style={chipStyle}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function SpecsBlock() {
  const { isMobile } = useBreakpoint();

  return (
    <div
      style={{
        border: "1px solid rgba(17,19,21,0.14)",
        borderRadius: 28,
        overflow: "hidden",
        background: "#fffdf9",
        boxShadow: "0 18px 44px rgba(17,19,21,0.08)",
        marginBottom: isMobile ? 24 : 32,
      }}
    >
      {PRODUCT_SPECS.map((spec, index) => (
        <div
          key={spec.label}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "180px minmax(0, 1fr)",
            columnGap: 24,
            rowGap: 6,
            padding: isMobile ? "14px 18px" : "16px 24px",
            borderTop: index === 0 ? "none" : "1px solid rgba(17,19,21,0.1)",
          }}
        >
          <div style={specLabelStyle}>{spec.label}</div>
          <div style={specValueStyle}>{spec.value}</div>
        </div>
      ))}
    </div>
  );
}

function OrderBlock({ submitLabel }: { submitLabel: string }) {
  const { isMobile } = useBreakpoint();
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
    <div style={{ borderTop: "1px solid rgba(20,20,20,0.16)", paddingTop: isMobile ? 12 : 18 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: isMobile ? "0 0 24px" : "0 0 32px",
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
              padding: isMobile ? "18px 18px 16px" : "26px 28px 22px",
              borderBottom: "1px solid rgba(17,19,21,0.12)",
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
                gap: isMobile ? 10 : 18,
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
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
              columnGap: 28,
              rowGap: 20,
              padding: isMobile ? "16px 18px 18px" : "20px 28px 24px",
            }}
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

const ruleStyle: CSSProperties = {
  width: "100%",
  height: 1,
  background: "rgba(20,20,20,0.16)",
};

const indexStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 11,
  lineHeight: 1.4,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#111315",
};

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

const metaPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "7px 10px",
  borderRadius: 999,
  border: "1px solid rgba(17,19,21,0.14)",
  background: "rgba(255,255,255,0.7)",
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 10,
  lineHeight: 1.2,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#111315",
};

const weightPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "7px 10px",
  borderRadius: 999,
  border: "1px solid #111315",
  background: "var(--signal)",
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 10,
  lineHeight: 1.2,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#111315",
};

const chipStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(17,19,21,0.12)",
  background: "#f7f0e8",
  fontFamily: "'LT Amber', sans-serif",
  fontSize: 10,
  lineHeight: 1.2,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#111315",
};

const submitStyle: CSSProperties = {
  border: "1px solid #111315",
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
  color: "rgba(17,19,21,0.72)",
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
  color: "var(--ultra)",
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
  color: "var(--ultra)",
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
