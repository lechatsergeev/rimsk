import React, { type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import { CONTACT_EMAIL, LandingPageShell, useBreakpoint } from "@/components/landing/shared";

const MiniPizzaModel = React.lazy(() =>
  import("@/components/blocks/hero-pizza-model").then((module) => ({
    default: module.HeroPizzaModel,
  }))
);

type Poster = {
  code: string;
  title: string;
  caption: string;
  markers: string[];
  artwork: string[];
};

type LineupItem = {
  sku: string;
  title: string;
  note: string;
  badge: string;
  chips: string[];
};

type FlowStep = {
  index: string;
  label: string;
  detail: string;
};

type SnapshotStat = {
  label: string;
  value: string;
  note: string;
};

type StampAnswer = {
  stamp: string;
  question: string;
  answer: string;
};

type SegmentRedesignProps = {
  marqueeText: string;
  footerDescription: ReactNode;
  useCasesTitle: string;
  useCasesDescription: string;
  posters: Poster[];
  lineupTitle: string;
  lineupDescription: string;
  lineupBadge: string;
  lineupItems: LineupItem[];
  flowTitle: string;
  flowDescription: string;
  flowSteps: FlowStep[];
  snapshotTitle: string;
  snapshotDescription: string;
  snapshotHeroLabel: string;
  snapshotHeroValue: string;
  snapshotHeroNote: string;
  snapshotStats: SnapshotStat[];
  objectionsTitle: string;
  objectionsDescription: string;
  objections: StampAnswer[];
  orderTitle: string;
  orderDescription: string;
  orderStamp: string;
  orderChecklist: string[];
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

export function SegmentRedesignPage(props: SegmentRedesignProps) {
  return (
    <LandingPageShell
      marqueeText={props.marqueeText}
      footerDescription={props.footerDescription}
    >
      <SwissSection
        id="scenarios"
        index="01"
        title={props.useCasesTitle}
        description={props.useCasesDescription}
      >
        <UseCasesBlock posters={props.posters} />
      </SwissSection>

      <SwissSection
        id="assortment"
        index="02"
        title={props.lineupTitle}
        description={props.lineupDescription}
      >
        <LineupBlock badge={props.lineupBadge} items={props.lineupItems} />
      </SwissSection>

      <SwissSection
        id="flow"
        index="03"
        title={props.flowTitle}
        description={props.flowDescription}
      >
        <FlowBlock steps={props.flowSteps} />
      </SwissSection>

      <SwissSection
        id="economics"
        index="04"
        title={props.snapshotTitle}
        description={props.snapshotDescription}
      >
        <SnapshotBlock
          heroLabel={props.snapshotHeroLabel}
          heroValue={props.snapshotHeroValue}
          heroNote={props.snapshotHeroNote}
          stats={props.snapshotStats}
        />
      </SwissSection>

      <SwissSection
        id="objections"
        index="05"
        title={props.objectionsTitle}
        description={props.objectionsDescription}
      >
        <ObjectionsBlock stamps={props.objections} />
      </SwissSection>

      <SwissSection
        id="order"
        index="06"
        title=""
        description=""
      >
        <OrderBlock
          submitLabel={props.submitLabel}
        />
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
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 8fr) minmax(0, 4fr)",
          columnGap: isMobile ? 0 : 24,
          maxWidth: 1440,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        <motion.div
          {...sectionMotion}
          style={{
            minWidth: 0,
            gridColumn: title ? "auto" : "1 / -1",
          }}
        >
          <div style={ruleStyle} />
          {title ? (
            <>
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
                      fontFamily: "'Martian Grotesk', sans-serif",
                      fontSize: isMobile ? 34 : 60,
                      lineHeight: 0.86,
                      letterSpacing: "-0.085em",
                      color: "#111315",
                    }}
                  >
                    {title}
                  </h2>
                  {description ? <p style={descriptionStyle}>{description}</p> : null}
                </div>
              </div>
              <div style={{ marginTop: isMobile ? 20 : 28 }}>{children}</div>
            </>
          ) : (
            <div
              style={{
                marginTop: isMobile ? 14 : 18,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {children}
            </div>
          )}
        </motion.div>
        {!isMobile && <div />}
      </div>
    </section>
  );
}

function UseCasesBlock({ posters }: { posters: Poster[] }) {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{ display: "grid", gap: 0 }}>
      {posters.map((poster, index) => (
        <motion.article
          key={poster.code}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1.35fr) minmax(0, 0.65fr)",
            columnGap: isMobile ? 0 : 24,
            rowGap: 12,
            padding: isMobile ? "14px 0 16px" : "14px 0 18px",
            borderTop: index === 0 ? "1px solid rgba(20,20,20,0.16)" : "none",
            borderBottom: "1px solid rgba(20,20,20,0.16)",
          }}
        >
          <div style={metaStyle}>{poster.code}</div>
          <div>
            <div
              style={{
                fontFamily: "'Martian Grotesk', sans-serif",
                fontSize: isMobile ? 26 : 36,
                lineHeight: 0.93,
                letterSpacing: "-0.07em",
                color: "#111315",
                maxWidth: "12ch",
              }}
            >
              {poster.title}
            </div>
            <p style={{ ...descriptionStyle, marginTop: 12, maxWidth: "52ch" }}>{poster.caption}</p>
          </div>
          <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
            <div style={sideListStyle}>
              {poster.markers.map((marker) => (
                <div key={marker}>{marker}</div>
              ))}
            </div>
            <div style={artworkColumnStyle}>
              {poster.artwork.map((label) => (
                <div key={label} style={artworkLineStyle}>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function LineupBlock({
  badge,
  items,
}: {
  badge: string;
  items: LineupItem[];
}) {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{ display: "grid", gap: 0 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1fr)",
          columnGap: isMobile ? 0 : 24,
          rowGap: 10,
          paddingBottom: isMobile ? 12 : 16,
          borderBottom: "1px solid rgba(20,20,20,0.16)",
        }}
      >
        <div style={metaStyle}>sheet</div>
        <div
          style={{
            fontFamily: "'Martian Grotesk', sans-serif",
            fontSize: isMobile ? 26 : 34,
            lineHeight: 0.94,
            letterSpacing: "-0.06em",
            color: "#111315",
          }}
        >
          {badge}
        </div>
      </div>

      {items.map((item, index) => (
        <motion.article
          key={item.sku}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1fr) minmax(0, 0.55fr)",
            columnGap: isMobile ? 0 : 24,
            rowGap: 10,
            padding: isMobile ? "14px 0 16px" : "14px 0 18px",
            borderBottom: "1px solid rgba(20,20,20,0.16)",
          }}
        >
          <div style={metaStyle}>{item.sku}</div>
          <div>
            <div
              style={{
                fontFamily: "'Martian Grotesk', sans-serif",
                fontSize: isMobile ? 24 : 34,
                lineHeight: 0.94,
                letterSpacing: "-0.06em",
                color: "#111315",
              }}
            >
              {item.title}
            </div>
            <p style={{ ...descriptionStyle, marginTop: 10, maxWidth: "48ch" }}>{item.note}</p>
          </div>
          <div style={{ ...sideListStyle, alignSelf: "start" }}>
            <div>{item.badge}</div>
            {item.chips.map((chip) => (
              <div key={chip}>{chip}</div>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function FlowBlock({ steps }: { steps: FlowStep[] }) {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{ display: "grid", gap: 0 }}>
      {steps.map((step, index) => (
        <motion.div
          key={step.index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1fr) minmax(0, 0.4fr)",
            columnGap: isMobile ? 0 : 24,
            rowGap: 10,
            padding: isMobile ? "14px 0 16px" : "14px 0 18px",
            borderTop: index === 0 ? "1px solid rgba(20,20,20,0.16)" : "none",
            borderBottom: "1px solid rgba(20,20,20,0.16)",
          }}
        >
          <div style={metaStyle}>{step.index}</div>
          <div>
            <div
              style={{
                fontFamily: "'Martian Grotesk', sans-serif",
                fontSize: isMobile ? 24 : 34,
                lineHeight: 0.94,
                letterSpacing: "-0.06em",
                color: "#111315",
              }}
            >
              {step.label}
            </div>
            <p style={{ ...descriptionStyle, marginTop: 10, maxWidth: "48ch" }}>{step.detail}</p>
          </div>
          <div style={flowSymbolStyle}>{isMobile ? step.index : "\u2192"}</div>
        </motion.div>
      ))}
    </div>
  );
}

function SnapshotBlock({
  heroLabel,
  heroValue,
  heroNote,
  stats,
}: {
  heroLabel: string;
  heroValue: string;
  heroNote: string;
  stats: SnapshotStat[];
}) {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{ borderTop: "1px solid rgba(20,20,20,0.16)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1fr) minmax(0, 0.55fr)",
          columnGap: isMobile ? 0 : 24,
          rowGap: 14,
          padding: isMobile ? "14px 0 18px" : "16px 0 22px",
          borderBottom: "1px solid rgba(20,20,20,0.16)",
        }}
      >
        <div style={metaStyle}>main</div>
        <div>
          <div style={sideListStyle}>{heroLabel}</div>
          <div
            style={{
              marginTop: 12,
              fontFamily: "'Martian Grotesk', sans-serif",
              fontSize: isMobile ? 44 : 84,
              lineHeight: 0.82,
              letterSpacing: "-0.1em",
              color: "#111315",
            }}
          >
            {heroValue}
          </div>
          <p style={{ ...descriptionStyle, marginTop: 14, maxWidth: "48ch" }}>{heroNote}</p>
        </div>
        <div style={artworkColumnStyle}>
          <div style={artworkLineStyle}>
            <span>batch</span>
          </div>
          <div style={artworkLineStyle}>
            <span>price</span>
          </div>
          <div style={artworkLineStyle}>
            <span>menu</span>
          </div>
        </div>
      </div>

      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 0.6fr) minmax(0, 1fr)",
            columnGap: isMobile ? 0 : 24,
            rowGap: 10,
            padding: isMobile ? "12px 0 14px" : "12px 0 14px",
            borderBottom: "1px solid rgba(20,20,20,0.16)",
          }}
        >
          <div style={metaStyle}>{String(index + 1).padStart(2, "0")}</div>
          <div>
            <div style={sideListStyle}>{stat.label}</div>
            <div
              style={{
                marginTop: 8,
                fontFamily: "'Martian Grotesk', sans-serif",
                fontSize: isMobile ? 28 : 40,
                lineHeight: 0.9,
                letterSpacing: "-0.08em",
                color: "#111315",
              }}
            >
              {stat.value}
            </div>
          </div>
          <p style={{ ...descriptionStyle, marginTop: 0, maxWidth: "42ch" }}>{stat.note}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ObjectionsBlock({ stamps }: { stamps: StampAnswer[] }) {
  const { isMobile } = useBreakpoint();

  return (
    <div style={{ display: "grid", gap: 0 }}>
      {stamps.map((item, index) => (
        <motion.article
          key={item.stamp}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 0.9fr) minmax(0, 1fr)",
            columnGap: isMobile ? 0 : 24,
            rowGap: 10,
            padding: isMobile ? "14px 0 16px" : "14px 0 18px",
            borderTop: index === 0 ? "1px solid rgba(20,20,20,0.16)" : "none",
            borderBottom: "1px solid rgba(20,20,20,0.16)",
          }}
        >
          <div style={metaStyle}>{item.stamp}</div>
          <div
              style={{
                fontFamily: "'Martian Grotesk', sans-serif",
                fontSize: isMobile ? 24 : 34,
                lineHeight: 0.94,
                letterSpacing: "-0.06em",
                color: "#111315",
              maxWidth: "12ch",
            }}
          >
            {item.question}
          </div>
          <p style={{ ...descriptionStyle, marginTop: 0, maxWidth: "44ch" }}>{item.answer}</p>
        </motion.article>
      ))}
    </div>
  );
}

function OrderBlock({ submitLabel }: { submitLabel: string }) {
  const { isMobile } = useBreakpoint();
  const fields = [
    { key: "name", label: "Имя / компания", placeholder: "ООО РИМСК / Алексей" },
    { key: "contact", label: "Телефон или email", placeholder: "+7 / hello@company.ru" },
    { key: "city", label: "Город / контур", placeholder: "Москва / horeca или retail" },
    { key: "comment", label: "Что хотите проверить", placeholder: "Тест в одной точке / pilot по сети" },
  ];

  return (
    <div style={{ borderTop: "1px solid rgba(20,20,20,0.16)", paddingTop: isMobile ? 12 : 18 }}>
      <form
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: isMobile ? "0 0 24px" : "0 0 32px",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.22), transparent 28%), radial-gradient(circle at 82% 0%, rgba(217,92,60,0.16), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(248,244,238,0.9) 100%)",
            border: "1px solid rgba(17,19,21,0.14)",
            borderRadius: 28,
            boxShadow: "0 24px 60px rgba(17,19,21,0.08)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) 240px",
              columnGap: 28,
              rowGap: 18,
              alignItems: "center",
              padding: isMobile ? "18px 18px 16px" : "26px 28px 22px",
              borderBottom: "1px solid rgba(17,19,21,0.12)",
            }}
          >
            <div>
              <div style={offerMetaStyle}>final offer / rimsk</div>
              <div style={offerTitleStyle}>Тестовая поставка без длинного входа</div>
              <div style={offerTextStyle}>
                Оставьте контакт, и дальше уже обсуждаем формат точки, пилот и
                первый короткий запуск.
              </div>
            </div>
            <div
              style={{
                position: "relative",
                height: isMobile ? 116 : 156,
                width: "100%",
                minWidth: 0,
              }}
            >
              <React.Suspense fallback={<div style={{ width: "100%", height: "100%" }} />}>
                <MiniPizzaModel
                  lowResOnly={true}
                  targetSize={3.1}
                  className="relative z-[2] h-full w-full touch-none"
                />
              </React.Suspense>
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
                  <textarea rows={5} placeholder={field.placeholder} style={accentInputStyle} />
                ) : (
                  <input placeholder={field.placeholder} style={accentInputStyle} />
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
              <div style={offerTextStyle}>
                Отправка формы демонстрационная. При необходимости подключим рабочий submit.
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
  fontFamily: "'Martian Mono', monospace",
  fontSize: 11,
  lineHeight: 1.4,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#111315",
};

const metaStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#111315",
};

const descriptionStyle: CSSProperties = {
  margin: "12px 0 0",
  fontFamily: "'Martian Mono', monospace",
  fontSize: 12,
  lineHeight: 1.58,
  color: "#111315",
};

const sideListStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  fontFamily: "'Martian Mono', monospace",
  fontSize: 10,
  lineHeight: 1.45,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#111315",
};

const artworkColumnStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  alignContent: "start",
};

const artworkLineStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 34,
  borderTop: "1px solid rgba(20,20,20,0.16)",
  fontFamily: "'Martian Mono', monospace",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#111315",
  paddingTop: 8,
};

const flowSymbolStyle: CSSProperties = {
  alignSelf: "center",
  justifySelf: "end",
  fontFamily: "'Martian Grotesk', sans-serif",
  fontSize: 36,
  lineHeight: 1,
  letterSpacing: "-0.06em",
  color: "#111315",
};

const labelStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#111315",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "0 0 12px",
  border: "none",
  borderBottom: "1px solid rgba(20,20,20,0.18)",
  background: "transparent",
  fontFamily: "'Martian Mono', monospace",
  fontSize: 12,
  lineHeight: 1.7,
  color: "#111315",
  outline: "none",
  resize: "vertical",
  borderRadius: 0,
};

const submitStyle: CSSProperties = {
  border: "1px solid #111315",
  background: "#111315",
  color: "#ffffff",
  padding: "12px 16px",
  borderRadius: 999,
  fontFamily: "'Martian Mono', monospace",
  fontSize: 11,
  lineHeight: 1.4,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const accentLabelStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
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
  fontFamily: "'Martian Mono', monospace",
  fontSize: 12,
  lineHeight: 1.7,
  color: "#111315",
  outline: "none",
  resize: "vertical",
  borderRadius: 0,
};

const offerMetaStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
  fontSize: 10,
  lineHeight: 1.5,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#d95c3c",
};

const offerTitleStyle: CSSProperties = {
  marginTop: 8,
  fontFamily: "'Martian Grotesk', sans-serif",
  fontSize: 40,
  lineHeight: 0.9,
  letterSpacing: "-0.07em",
  color: "#111315",
  maxWidth: "11ch",
};

const offerTextStyle: CSSProperties = {
  marginTop: 12,
  fontFamily: "'Martian Mono', monospace",
  fontSize: 12,
  lineHeight: 1.58,
  color: "#111315",
  maxWidth: "42ch",
};
