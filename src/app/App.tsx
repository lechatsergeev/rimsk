import { useId, useState, useEffect } from "react";
import { motion } from "motion/react";
import { HeroSection } from "@/components/blocks/hero-section-1";

// =============================================
// DESIGN TOKENS
// =============================================
const C = {
  navy: "#1A1D20",
  gold: "#D95C3C",
  silver: "#FFFFFF",
  gray: "#A8A39A",
  black: "#1A1D20",
  white: "#FFFFFF",
  lightGray: "#FFFFFF",
  teal: "#6C645A",
  bg: "#FFFFFF",
};

const SCENARIOS = [
  {
    stamp: "СЦЕНАРИЙ 01 · БАРЫ И КОФЕЙНИ",
    title: "Гость уходит за горячим",
    text: "Если в точке можно только выпить, вечер заканчивается раньше. Гость уходит туда, где есть горячее, и забирает с собой следующий чек.",
    proofTitle: "что происходит",
    proofItems: [
      "еды в меню почти нет",
      "следующий заказ уходит соседям",
    ],
    takeaway: "что это даёт",
    takeawayText: "Горячая позиция помогает удержать гостя у себя.",
  },
  {
    stamp: "СЦЕНАРИЙ 02 · КАФЕ И БАРЫ С МАЛОЙ КУХНЕЙ",
    title: "Не хотят заводить новую кухню",
    text: "Точке нужна горячая позиция, но не нужен хвост из заготовок, остатков и лишней работы. Если еда усложняет смену, её просто не запускают.",
    proofTitle: "что мешает запуску",
    proofItems: [
      "под одну позицию тянется новая заготовка",
      "смена получает ещё один процесс",
    ],
    takeaway: "что это даёт",
    takeawayText: "Горячее появляется без лишнего хвоста из процессов.",
  },
  {
    stamp: "СЦЕНАРИЙ 03 · МИНИ-ОТЕЛИ И КЕЙТЕРИНГ",
    title: "Горячее нужно не весь день",
    text: "В мини-отеле, апартах и кейтеринге горячее нужно по ситуации: поздний заезд, маленькое мероприятие, единичный заказ. Ради этого неудобно держать полноценную кухню.",
    proofTitle: "почему это больно",
    proofItems: [
      "спрос зависит от дня и часа",
      "кухня нужна не постоянно",
    ],
    takeaway: "что это даёт",
    takeawayText: "Горячее работает под запрос, а не требует кухни наготове.",
  },
  {
    stamp: "СЦЕНАРИЙ 04 · ТЕСТОВЫЙ ЗАПУСК",
    title: "Сначала хотят проверить спрос",
    text: "Когда видно, что гости могли бы оставаться дольше и заказывать больше, сначала важно проверить спрос в смене. Большой запуск до проверки здесь только мешает.",
    proofTitle: "что здесь важно",
    proofItems: [
      "не вкладываться в кухню вслепую",
      "сначала увидеть заказы вживую",
    ],
    takeaway: "что это даёт",
    takeawayText: "Сначала проверяете гипотезу, потом принимаете большие решения.",
  },
];

const CONTACT_EMAIL = "b2b@rimsk.ru";

type SideFact = {
  value: string;
  label: string;
};

// =============================================
// BREAKPOINT HOOK
// =============================================
function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { isMobile: width < 768, isTablet: width < 1024 };
}

// =============================================
// MARQUEE
// =============================================
function Marquee() {
  const text =
    "ХРАНЕНИЕ В МОРОЗИЛЬНИКЕ • ПЕЧЬ ИЛИ КОНВЕКТОМАТ • 8 МИНУТ ДО ПОДАЧИ • МИН. ЗАКАЗ 15 ШТ • B2B ПОСТАВКИ • ";
  return (
    <div
      style={{
        background: C.bg,
        overflow: "hidden",
        borderTop: `1px solid ${C.black}`,
        borderBottom: `1px solid ${C.black}`,
        padding: "8px 0",
      }}
    >
      <div
        className="marquee-track"
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
      >
        <span
          style={{
            color: C.black,
            fontFamily: "'Martian Mono', monospace",
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.08em",
            paddingRight: "40px",
          }}
        >
          {text}
          {text}
          {text}
          {text}
        </span>
      </div>
    </div>
  );
}

// =============================================
// NAVIGATION
// =============================================
function Navigation() {
  const { isMobile } = useBreakpoint();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDesktopLinks, setShowDesktopLinks] = useState(false);
  const mobileMenuId = useId();
  const [time, setTime] = useState(
    () =>
      new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })
  );

  useEffect(() => {
    const t = setInterval(
      () =>
        setTime(
          new Date().toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })
        ),
      30000
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowDesktopLinks(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Сценарии", href: "#scenarios" },
    { label: "Ассортимент", href: "#assortment" },
    { label: "Экономика", href: "#economics" },
    { label: "Возражения", href: "#objections" },
    { label: "Оффер", href: "#order" },
  ];

  return (
    <header
      style={{
        background: C.bg,
        borderBottom: `1px solid ${C.black}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "7px 20px" : "7px 40px",
        }}
      >
          <a
            href="#top"
            style={{
              fontFamily: "'Martian Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "-0.04em",
              color: C.black,
              textDecoration: "none",
            }}
          >
            РИМСК
          </a>

        {!isMobile && (
          <nav
            style={{
              display: "flex",
              gap: 2,
              opacity: showDesktopLinks ? 1 : 0,
              pointerEvents: showDesktopLinks ? "auto" : "none",
              transform: showDesktopLinks ? "translateY(0)" : "translateY(-4px)",
              transition: "opacity 180ms ease, transform 180ms ease",
            }}
            aria-hidden={!showDesktopLinks}
          >
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: C.black,
                  textDecoration: "none",
                  padding: "4px 11px",
                  display: "block",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = C.silver;
                  el.style.borderBottom = `1px solid ${C.black}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.borderBottom = "1px solid transparent";
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            className="win98-inset"
            style={{
              padding: "3px 10px",
              fontFamily: "'Martian Mono', monospace",
              fontSize: "11px",
              color: C.black,
              background: C.white,
            }}
          >
            {time}
          </div>

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls={mobileMenuId}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              style={{
                background: menuOpen ? C.black : "transparent",
                border: `1px solid ${C.black}`,
                padding: "4px 8px",
                cursor: "pointer",
                fontFamily: "'Martian Mono', monospace",
                fontSize: "14px",
                color: menuOpen ? C.white : C.black,
                lineHeight: 1,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </div>

      {isMobile && menuOpen && (
        <div
          id={mobileMenuId}
          style={{
            background: C.bg,
            borderTop: `1px solid ${C.gray}`,
            borderBottom: `1px solid ${C.black}`,
          }}
        >
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "'Martian Mono', monospace",
                fontSize: "13px",
                fontWeight: 500,
                color: C.black,
                textDecoration: "none",
                padding: "12px 20px",
                borderBottom: `1px solid ${C.gray}`,
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// =============================================
// HERO
// =============================================
function Hero() {
  return (
    <>
      <HeroSection />
      <div style={{ marginTop: 0 }}>
        <Marquee />
      </div>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  isMobile,
  titleMaxWidth = "12ch",
}: {
  eyebrow: string;
  title: string;
  description: string;
  isMobile: boolean;
  titleMaxWidth?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      style={{ marginBottom: isMobile ? 22 : 28 }}
    >
      <div style={{ borderBottom: `1px solid ${C.black}`, paddingBottom: isMobile ? 18 : 22 }}>
        <div
          style={{
            fontFamily: "'Martian Mono', monospace",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: C.black,
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            margin: isMobile ? "12px 0 0" : "14px 0 0",
            fontFamily: "'Martian Grotesk', sans-serif",
            fontSize: isMobile ? "30px" : "42px",
            fontWeight: 500,
            lineHeight: 0.96,
            letterSpacing: "-0.05em",
            color: C.black,
            maxWidth: titleMaxWidth,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: isMobile ? "12px 0 0" : "14px 0 0",
            maxWidth: "58ch",
            fontFamily: "'Martian Mono', monospace",
            fontSize: isMobile ? "12px" : "13px",
            lineHeight: 1.7,
            color: "#4a4b4d",
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function SideFactoid({
  fact,
  isMobile,
}: {
  fact: SideFact;
  isMobile: boolean;
}) {
  return (
    <aside
      style={{
        justifySelf: "end",
        alignSelf: "start",
        maxWidth: "170px",
        textAlign: "right",
        paddingTop: isMobile ? 0 : 10,
      }}
    >
      <div
        style={{
          borderTop: `1px solid ${C.gray}`,
          paddingTop: 12,
        }}
      >
        <div
          style={{
            fontFamily: "'Martian Grotesk', sans-serif",
            fontSize: isMobile ? "34px" : "56px",
            fontWeight: 500,
            lineHeight: 0.88,
            letterSpacing: "-0.07em",
            color: C.black,
          }}
        >
          {fact.value}
        </div>
        <div
          style={{
            marginTop: 10,
            marginLeft: "auto",
            maxWidth: "15ch",
            fontFamily: "'Martian Mono', monospace",
            fontSize: "10px",
            lineHeight: 1.55,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#5a5854",
          }}
        >
          {fact.label}
        </div>
      </div>
    </aside>
  );
}

function Scenarios() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="scenarios"
      style={{ background: C.white, padding: isMobile ? "22px 20px" : "44px 40px" }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0",
          display: "grid",
          gridTemplateColumns: "minmax(0, 960px)",
          gap: isMobile ? 20 : 24,
          alignItems: "start",
        }}
      >
        <div>
          <SectionHeader
            eyebrow="scenarios / рабочие ситуации"
            title="Где это работает"
            description="Это не универсальное блюдо для всех подряд. Формат нужен там, где важно удержать гостя, добавить горячее без новой кухни или проверить спрос без большого запуска."
            isMobile={isMobile}
            titleMaxWidth="10ch"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 18,
            }}
          >
            {SCENARIOS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              style={{
                border: `1px solid ${C.gray}`,
                padding: isMobile ? "16px 14px 18px" : "18px 18px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: isMobile ? "auto" : 420,
              }}
            >
              <div
                style={{
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#4f4b46",
                }}
              >
                No. {String(index + 1).padStart(2, "0")} · {item.stamp.split("·")[1]?.trim() ?? ""}
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'Martian Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: isMobile ? "26px" : "clamp(28px, 2.4vw, 36px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.05em",
                  color: C.black,
                  maxWidth: "14ch",
                  minHeight: isMobile ? "auto" : 74,
                }}
              >
                {item.title}
              </div>
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: isMobile ? "12px" : "12px",
                    lineHeight: 1.7,
                    color: "#4a4b4d",
                    maxWidth: "42ch",
                    minHeight: isMobile ? "auto" : 84,
                  }}
                >
                  {item.text}
                </div>
              </div>

              <div
                style={{
                  borderTop: `1px solid ${C.gray}`,
                  paddingTop: 12,
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Martian Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#66625d",
                    }}
                  >
                    {item.proofTitle}
                  </div>
                  <ul
                    style={{
                      margin: "8px 0 0",
                      paddingLeft: 18,
                      fontFamily: "'Martian Mono', monospace",
                      fontSize: "11px",
                      lineHeight: 1.65,
                      color: "#4a4b4d",
                      minHeight: isMobile ? "auto" : 48,
                    }}
                  >
                    {item.proofItems.map((proof) => (
                      <li key={proof}>{proof}</li>
                    ))}
                  </ul>
                </div>
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "10px",
                    lineHeight: 1.7,
                    color: "#66625d",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  {item.takeaway}
                </div>
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "11px",
                    lineHeight: 1.65,
                    color: C.black,
                    maxWidth: "40ch",
                  }}
                >
                  {item.takeawayText}
                </div>
              </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Economics() {
  const { isMobile } = useBreakpoint();
  const rows = [
    { label: "Тестовый вход", value: "15 шт", sub: "минимальный заказ на первый запуск" },
    { label: "Закупка партии", value: "4 050 ₽", sub: "15 пицц по 270 ₽" },
    { label: "Продажа в меню", value: "9 300 ₽", sub: "если продавать по 620 ₽" },
    { label: "Потенциал", value: "5 250 ₽", sub: "до операционных расходов" },
  ];

  return (
    <section
      id="economics"
      style={{ background: C.bg, padding: isMobile ? "44px 20px" : "80px 40px" }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 960px) minmax(0, 1fr)",
          gap: isMobile ? 20 : 24,
          alignItems: "start",
        }}
      >
        <div>
          <SectionHeader
            eyebrow="economics / экономика тестового входа"
            title="Экономика теста"
            description="Простой расчёт первого входа: минимальный заказ, закупка партии, ориентир по цене в меню и потенциал до расходов."
            isMobile={isMobile}
            titleMaxWidth="11ch"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            style={{ borderTop: `1px solid ${C.black}` }}
          >
            {rows.map((row) => (
              <div>
                <div
                  key={row.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) auto",
                    gap: 10,
                    alignItems: "start",
                    padding: isMobile ? "16px 0 18px" : "18px 0 20px",
                    borderBottom: `1px solid ${C.gray}`,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Martian Mono', monospace",
                        fontSize: "10px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "#66625d",
                      }}
                    >
                      {row.label}
                    </div>
                    <div
                      style={{
                        marginTop: 9,
                        fontFamily: "'Martian Mono', monospace",
                        fontSize: "12px",
                        lineHeight: 1.7,
                        color: "#4a4b4d",
                      }}
                    >
                      {row.sub}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Martian Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: isMobile ? "24px" : "32px",
                      lineHeight: 1,
                      letterSpacing: "-0.04em",
                      color: C.black,
                      textAlign: isMobile ? "left" : "right",
                    }}
                  >
                    {row.value}
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                borderTop: `1px solid ${C.black}`,
                padding: isMobile ? "18px 0 0" : "22px 0 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: isMobile ? "16px 18px 14px" : "18px 24px 16px",
                  border: `1px solid ${C.black}`,
                  background: "#fff",
                  minWidth: isMobile ? "220px" : "280px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: isMobile ? "12px" : "13px",
                    lineHeight: 1.6,
                    color: "#4a4b4d",
                  }}
                >
                  рекомендуемая цена
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: "'Martian Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: isMobile ? "42px" : "64px",
                    lineHeight: 0.9,
                    letterSpacing: "-0.07em",
                    color: C.black,
                  }}
                >
                  620 ₽
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  maxWidth: "48ch",
                  textAlign: "center",
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "11px",
                  lineHeight: 1.7,
                  color: "#4a4b4d",
                }}
              >
                Такого входа хватает, чтобы проверить спрос на реальной смене и не
                строить новую кухню вслепую.
              </div>
              <a
                href="#order"
                style={{
                  border: `1px solid ${C.black}`,
                  padding: "11px 14px",
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: C.black,
                  textDecoration: "none",
                }}
              >
                Обсудить тестовую партию
              </a>
            </div>
          </motion.div>
        </div>
        {!isMobile && (
          <SideFactoid
            isMobile={isMobile}
            fact={{ value: "4 050 ₽", label: "закупка первой тестовой партии" }}
          />
        )}
      </div>
    </section>
  );
}

// =============================================
// ASSORTMENT
// =============================================
const PIZZAS = [
  {
    name: "МАРГАРИТА",
    price: "270 ₽",
    priceLabel: "от",
    desc: "Понятный вкус для бара, кофейни и первой тестовой поставки.",
    tag: "СТАРТ",
    helper: "для первого теста",
  },
  {
    name: "ПЕППЕРОНИ",
    price: "320 ₽",
    priceLabel: "от",
    desc: "Рабочая позиция, когда в меню нужен более очевидный хит.",
    tag: "ХИТ",
    helper: "самый очевидный вкус",
  },
  {
    name: "ГРУША–ГОРГОНЗОЛА",
    price: "390 ₽",
    priceLabel: "от",
    desc: "Позиция для точек, которым нужен более сложный вкус в том же формате.",
    tag: "СЛОЖНЕЕ ВКУС",
    helper: "для более выразительного меню",
  },
];
const OBJECTIONS = [
  {
    q: "Нам не нужна ещё одна большая кухня",
    a: "Вам не нужна большая кухня. Нужна одна рабочая горячая позиция, которая не тянет за собой отдельное food-направление.",
  },
  {
    q: "Мы не уверены, что еду будут брать стабильно",
    a: "Минимальный заказ — 15 штук. Этого хватает, чтобы проверить спрос в реальной смене и не строить большие планы заранее.",
  },
  {
    q: "У нас уже мало места и мало внимания на смене",
    a: "Если новая еда тянет за собой отдельные заготовки и лишние процессы, проект стопорится. Здесь задача обратная: дать горячее без этого хвоста.",
  },
  {
    q: "Нам не нужен сложный гастрономический продукт",
    a: "Сложный гастрономический продукт и не нужен. Важнее понятный вкус, стабильная выдача и возможность удержать гостя у себя.",
  },
];

function Assortment() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="assortment"
      style={{ background: C.silver, padding: isMobile ? "44px 20px" : "80px 40px" }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0",
          display: "grid",
          gridTemplateColumns: "minmax(0, 960px)",
          gap: isMobile ? 20 : 24,
          alignItems: "start",
        }}
      >
        <div>
          <SectionHeader
            eyebrow="assortment / что увидит гость"
            title="С чего начать"
            description="Для первого теста не нужен длинный список. Нужны несколько вкусов, которые быстро считываются гостем и показывают реальный спрос."
            isMobile={isMobile}
            titleMaxWidth="12ch"
          />

          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1fr)",
                columnGap: isMobile ? 0 : 26,
                borderTop: `1px solid ${C.black}`,
                borderBottom: `1px solid ${C.gray}`,
                padding: isMobile ? "16px 0 18px" : "20px 0 22px",
              }}
            >
            <div
              style={{
                fontFamily: "'Martian Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#4f4b46",
                marginBottom: isMobile ? 10 : 0,
                paddingTop: isMobile ? 0 : 4,
              }}
            >
              Menu
            </div>

            <div>
              <div
                style={{
                  display: "inline-block",
                  border: `1px solid ${C.black}`,
                  padding: "5px 8px",
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: C.black,
                }}
              >
                стартовый набор: 2 понятных + 1 более выразительный вкус
              </div>
              <div
                style={{
                  fontFamily: "'Martian Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: isMobile ? "26px" : "clamp(28px, 3vw, 40px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.05em",
                  color: C.black,
                  maxWidth: "14ch",
                  marginTop: 10,
                }}
              >
                На старте хватает нескольких понятных вкусов
              </div>
              <p
                style={{
                  margin: "10px 0 0",
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: isMobile ? "12px" : "13px",
                  lineHeight: 1.7,
                  color: "#4a4b4d",
                  maxWidth: "60ch",
                }}
              >
                Сначала важен не ассортимент, а читаемость: гость быстро понимает, что
                заказать, а вы видите, какие позиции действительно работают.
              </p>
            </div>
            </motion.div>
          </div>

          <div style={{ display: "grid", marginTop: isMobile ? 0 : 0 }}>
            {PIZZAS.map((pizza, i) => (
            <motion.div
              key={pizza.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1fr) auto",
                columnGap: isMobile ? 0 : 26,
                borderBottom: `1px solid ${C.gray}`,
                padding: isMobile ? "14px 0 16px" : "14px 0 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#4f4b46",
                  marginBottom: isMobile ? 8 : 0,
                  paddingTop: isMobile ? 0 : 4,
                }}
              >
                No. {String(i + 1).padStart(2, "0")}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "'Martian Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: isMobile ? "22px" : "26px",
                    lineHeight: 1.02,
                    letterSpacing: "-0.04em",
                    color: C.black,
                  }}
                >
                  <span>{pizza.name}</span>
                  <span
                    style={{
                      border: `1px solid ${C.gray}`,
                      padding: "4px 6px",
                      fontFamily: "'Martian Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {pizza.tag}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: isMobile ? "12px" : "13px",
                    color: "#4a4b4d",
                    lineHeight: 1.7,
                    maxWidth: "54ch",
                  }}
                >
                  {pizza.desc}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#66625d",
                  }}
                >
                  {pizza.helper}
                </div>
              </div>

              <div
                style={{
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "12px",
                  color: C.black,
                  whiteSpace: "nowrap",
                  alignSelf: isMobile ? "start" : "center",
                  marginTop: isMobile ? 10 : 0,
                  textAlign: isMobile ? "left" : "right",
                }}
              >
                {pizza.priceLabel} {pizza.price}
              </div>
            </motion.div>
            ))}
          </div>

          <div
            style={{
              borderTop: `1px solid ${C.black}`,
              paddingTop: isMobile ? 14 : 16,
              marginTop: 0,
              fontFamily: "'Martian Mono', monospace",
              fontSize: "11px",
              lineHeight: 1.65,
              color: "#5a5854",
              maxWidth: "62ch",
            }}
          >
            По первому набору видно главное: что считывается сразу, что берут чаще и
            стоит ли расширять меню дальше.
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="objections"
      style={{ background: C.bg, padding: isMobile ? "44px 20px" : "80px 40px" }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0",
          display: "grid",
          gridTemplateColumns: "minmax(0, 980px)",
          gap: isMobile ? 20 : 24,
          alignItems: "start",
        }}
      >
        <div>
          <SectionHeader
            eyebrow="objections / что обычно останавливает"
            title="Что мешает"
            description="Обычно дело не во вкусе. Точку останавливают лишняя кухня, неровный спрос и страх усложнить смену ради одной позиции."
            isMobile={isMobile}
            titleMaxWidth="9ch"
          />

          <div style={{ display: "flex", flexDirection: "column", borderTop: `1px solid ${C.black}` }}>
            {OBJECTIONS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div
                style={{
                  width: "100%",
                  borderBottom: `1px solid ${C.black}`,
                  background: open === i ? C.silver : C.bg,
                  transition: "background 160ms ease",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: isMobile ? "18px 0" : "20px 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Martian Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: isMobile ? "18px" : "clamp(18px, 1.6vw, 22px)",
                      color: C.black,
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Martian Mono', monospace",
                      fontSize: "22px",
                      color: C.black,
                      flexShrink: 0,
                      width: 24,
                      textAlign: "center",
                    }}
                  >
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                {open === i && (
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    style={{
                      padding: isMobile ? "0 0 18px" : "0 24px 20px 0",
                      fontFamily: "'Martian Mono', monospace",
                      fontSize: "11px",
                      color: "#4a4b4d",
                      lineHeight: 1.7,
                      maxWidth: "58ch",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================
// ORDER / CTA
// =============================================
function Order() {
  const { isMobile, isTablet } = useBreakpoint();
  const [form, setForm] = useState({ name: "", company: "", email: "" });
  const [errors, setErrors] = useState({ name: "", company: "", email: "" });
  const [touched, setTouched] = useState({ name: false, company: false, email: false });
  const [status, setStatus] = useState<"idle" | "loading" | "mailFallback" | "error">("idle");

  const validateField = (key: keyof typeof form, value: string) => {
    if (key === "name") return value.trim() ? "" : "Введите имя.";
    if (key === "company") return value.trim() ? "" : "Укажите заведение.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ""
      : "Введите корректный email.";
  };

  const validateForm = () => {
    const nextErrors = {
      name: validateField("name", form.name),
      company: validateField("company", form.company),
      email: validateField("email", form.email),
    };

    setErrors(nextErrors);
    setTouched({ name: true, company: true, email: true });
    return Object.values(nextErrors).every((value) => !value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const subject = encodeURIComponent(
        `Запрос на тестовую поставку от ${form.company.trim()}`
      );
      const body = encodeURIComponent(
        [
          `Имя: ${form.name.trim()}`,
          `Заведение: ${form.company.trim()}`,
          `Email: ${form.email.trim()}`,
          "",
          "Интерес: первая тестовая партия римской пиццы.",
        ].join("\n")
      );

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      window.setTimeout(() => {
        setStatus("mailFallback");
      }, 400);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="order"
      style={{
        background: C.bg,
        padding: isMobile ? "44px 20px" : "84px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1200px) minmax(0, 1fr)",
          gap: isMobile ? 20 : 24,
          alignItems: "start",
        }}
      >
        <div>
          <SectionHeader
            eyebrow="offer / тестовый запуск"
            title="Запросить тест"
            description="Оставьте контакт, если хотите проверить спрос на горячую позицию без большой кухни, длинного входа и лишней операционки."
            isMobile={isMobile}
            titleMaxWidth="11ch"
          />

          <div
            initial={{ opacity: 0, x: -20 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
              gap: isMobile ? 24 : 36,
              alignItems: "stretch",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              style={{
                background: C.silver,
                border: `1px solid ${C.black}`,
                padding: isMobile ? "24px 20px" : "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "10px",
                    color: "#6a665f",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontWeight: 700,
                    marginBottom: 18,
                  }}
                >
                  что будет дальше
                </div>
                <div
                  style={{
                    fontFamily: "'Martian Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: isMobile
                      ? "clamp(26px, 7vw, 34px)"
                      : "clamp(28px, 2.8vw, 36px)",
                    color: C.black,
                    lineHeight: 1.02,
                    textTransform: "none",
                    letterSpacing: "-0.04em",
                  }}
                >
                  Первая партия
                  <br />
                  как проверяемый
                  <br />
                  тест спроса
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "11px",
                    color: "#3f3f40",
                    lineHeight: 1.8,
                    marginBottom: 18,
                    maxWidth: "44ch",
                  }}
                >
                  Сначала не строим новую кухню. Сначала собираем понятный тест:
                  небольшую партию, стартовые вкусы и простой сценарий для смены.
                </div>

                <div
                  style={{
                    borderTop: `1px solid ${C.gray}`,
                    paddingTop: 14,
                    display: "grid",
                    gap: 10,
                  }}
                >
                  {[
                    "Собираем тестовую партию под ваш формат точки.",
                    "Помогаем выбрать стартовые вкусы без раздутого меню.",
                    "Смотрите спрос в реальной смене и решаете, что делать дальше.",
                  ].map((step, index) => (
                    <div
                      key={step}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "28px minmax(0, 1fr)",
                        gap: 10,
                        alignItems: "start",
                      }}
                    >
                      <div
                        style={{
                          border: `1px solid ${C.gray}`,
                          padding: "4px 0",
                          textAlign: "center",
                          fontFamily: "'Martian Mono', monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: C.black,
                        }}
                      >
                        0{index + 1}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Martian Mono', monospace",
                          fontSize: "11px",
                          lineHeight: 1.65,
                          color: "#3f3f40",
                        }}
                      >
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                background: C.white,
                border: `1px solid ${C.black}`,
                padding: isMobile ? "22px 20px" : "26px 24px",
                boxShadow: "none",
              }}
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <h2
                  style={{
                    fontFamily: "'Martian Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: "26px",
                    textTransform: "none",
                    color: C.black,
                    borderBottom: `1px solid ${C.black}`,
                    paddingBottom: 14,
                    marginBottom: 4,
                    letterSpacing: "-0.04em",
                    margin: 0,
                  }}
                >
                  Оставить заявку на тест
                </h2>
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "11px",
                    lineHeight: 1.6,
                    color: "#4a4b4d",
                  }}
                >
                  Ответим по заявке и поможем собрать первую тестовую партию под ваш формат.
                </div>

                {[
                  { key: "name", label: "ИМЯ", placeholder: "Иван Иванов" },
                  {
                    key: "company",
                    label: "ЗАВЕДЕНИЕ",
                    placeholder: "Кафе «Название»",
                  },
                  {
                    key: "email",
                    label: "EMAIL",
                    placeholder: "ivan@cafe.ru",
                    type: "email",
                  },
                ].map((field) => (
                  <div
                    key={field.key}
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label
                      htmlFor={`order-${field.key}`}
                      style={{
                        fontFamily: "'Martian Mono', monospace",
                        fontSize: "10px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: C.black,
                        letterSpacing: "2px",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={`order-${field.key}`}
                      name={field.key}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      style={{
                        background: C.bg,
                        border: `1px solid ${C.black}`,
                        padding: "11px 12px",
                        fontFamily: "'Martian Mono', monospace",
                        fontSize: "13px",
                        color: C.black,
                        width: "100%",
                        boxSizing: "border-box" as const,
                      }}
                      autoComplete={
                        field.key === "name"
                          ? "name"
                          : field.key === "email"
                            ? "email"
                            : "organization"
                      }
                      aria-invalid={Boolean(errors[field.key as keyof typeof errors])}
                      aria-describedby={
                        errors[field.key as keyof typeof errors]
                          ? `order-${field.key}-error`
                          : undefined
                      }
                      onBlur={(e) => {
                        const key = field.key as keyof typeof form;
                        setTouched((prev) => ({ ...prev, [key]: true }));
                        setErrors((prev) => ({
                          ...prev,
                          [key]: validateField(key, e.target.value),
                        }));
                      }}
                    />
                    {touched[field.key as keyof typeof touched] &&
                      errors[field.key as keyof typeof errors] && (
                      <div
                        id={`order-${field.key}-error`}
                        role="alert"
                        style={{
                          fontFamily: "'Martian Mono', monospace",
                          fontSize: "11px",
                          color: C.gold,
                          lineHeight: 1.5,
                        }}
                      >
                        {errors[field.key as keyof typeof errors]}
                      </div>
                      )}
                  </div>
                ))}

                {status === "mailFallback" && (
                  <div
                    role="status"
                    aria-live="polite"
                    style={{
                      background: C.silver,
                      border: `1px solid ${C.black}`,
                      padding: "14px 16px",
                      fontFamily: "'Martian Mono', monospace",
                      fontSize: "11px",
                      color: C.black,
                      lineHeight: 1.7,
                    }}
                  >
                    Откроем письмо в почтовом клиенте. Если он не настроен, используйте email
                    или WhatsApp ниже.
                  </div>
                )}

                {status === "error" && (
                  <div
                    role="alert"
                    style={{
                      fontFamily: "'Martian Mono', monospace",
                      fontSize: "11px",
                      color: C.gold,
                      lineHeight: 1.6,
                    }}
                  >
                    Проверьте обязательные поля. Если почтовый клиент не откроется,
                    напишите на {CONTACT_EMAIL}.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    background: C.navy,
                    color: C.white,
                    border: `1px solid ${C.black}`,
                    boxShadow: "none",
                    fontFamily: "'Martian Mono', monospace",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                    padding: "13px",
                    fontSize: "13px",
                    width: "100%",
                    marginTop: 2,
                    transition: "background 160ms ease",
                    opacity: status === "loading" ? 0.8 : 1,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = C.gold;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = C.navy;
                  }}
                >
                  {status === "loading" ? (
                    <span className="blink-text">ОТКРЫВАЮ ПОЧТУ...</span>
                  ) : (
                    "ОТПРАВИТЬ ЗАПРОС →"
                  )}
                </button>

                {status === "mailFallback" && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      style={{
                        border: `1px solid ${C.black}`,
                        padding: "10px 12px",
                        fontFamily: "'Martian Mono', monospace",
                        fontSize: "11px",
                        color: C.black,
                        textDecoration: "none",
                      }}
                    >
                      Написать на email
                    </a>
                    <a
                      href="https://wa.me/78120000000"
                      style={{
                        border: `1px solid ${C.black}`,
                        padding: "10px 12px",
                        fontFamily: "'Martian Mono', monospace",
                        fontSize: "11px",
                        color: C.black,
                        textDecoration: "none",
                      }}
                    >
                      Открыть WhatsApp
                    </a>
                  </div>
                )}
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "10px",
                    color: "#66625d",
                    textAlign: "center",
                    lineHeight: 1.6,
                  }}
                >
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    style={{ color: C.black, textDecoration: "underline" }}
                  >
                    обработкой заявки по email
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
        {!isMobile && (
          <SideFactoid
            isMobile={isMobile}
            fact={{ value: "15 шт", label: "минимальный заказ на первый тест" }}
          />
        )}
      </div>
    </section>
  );
}

// =============================================
// FOOTER
// =============================================
function Footer() {
  const { isMobile, isTablet } = useBreakpoint();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: C.silver,
        borderTop: `1px solid ${C.black}`,
        padding: isMobile ? "36px 20px 18px" : "56px 40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1200px)",
          gap: isMobile ? 20 : 24,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : isTablet
                ? "1fr 1fr 1fr"
                : "2fr 1fr 1fr 1fr",
              gap: isMobile ? 24 : 32,
              paddingBottom: 28,
              borderBottom: `1px solid ${C.black}`,
            }}
          >
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div
              style={{
                fontFamily: "'Martian Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "24px",
                letterSpacing: "-0.04em",
                color: C.black,
                marginBottom: 14,
              }}
            >
              РИМСК
            </div>
            <div
              style={{
                fontFamily: "'Martian Mono', monospace",
                fontSize: "12px",
                color: "#333",
                lineHeight: 1.75,
                maxWidth: "30ch",
              }}
            >
              Замороженная римская пицца для заведений,
              <br />
              которым нужна горячая позиция
              <br />
              без отдельной пицца-кухни.
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Martian Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: C.black,
                marginBottom: 14,
                borderBottom: `1px solid ${C.gray}`,
                paddingBottom: 7,
              }}
            >
              Контакты
            </div>
            <div
              style={{
                fontFamily: "'Martian Mono', monospace",
                fontSize: "10px",
                lineHeight: 1.6,
                color: "#4a4b4d",
                marginBottom: 12,
              }}
            >
              Для тестовой поставки и B2B-вопросов
            </div>
            {[
              { label: "Телефон", val: "+7 (812) 000-00-00", href: "tel:+78120000000" },
              { label: "Email", val: "b2b@rimsk.ru", href: "mailto:b2b@rimsk.ru" },
              { label: "WhatsApp", val: "+7 (812) 000-00-00", href: "https://wa.me/78120000000" },
            ].map((c) => (
              <div key={c.label} style={{ marginBottom: 9 }}>
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "9px",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {c.label}
                </div>
                <a
                  href={c.href}
                  style={{
                    display: "inline-block",
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "12px",
                    color: C.black,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  {c.val}
                </a>
              </div>
            ))}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Martian Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: C.black,
                marginBottom: 14,
                borderBottom: `1px solid ${C.gray}`,
                paddingBottom: 7,
              }}
            >
              Юр. лицо
            </div>
            {[
              { label: "Компания", val: 'ООО "РИМСК"' },
              { label: "ИНН", val: "7700000000" },
              { label: "ОГРН", val: "1000000000000" },
              { label: "Адрес", val: "г. Санкт-Петербург, ул. Пример, д. 1" },
            ].map((c) => (
              <div key={c.label} style={{ marginBottom: 9 }}>
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "9px",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "11px",
                    color: C.black,
                    fontWeight: 500,
                  }}
                >
                  {c.val}
                </div>
              </div>
            ))}
          </div>

          {!isMobile && (
            <div>
              <div
                style={{
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                letterSpacing: "0.14em",
                  color: C.black,
                marginBottom: 14,
                  borderBottom: `1px solid ${C.gray}`,
                  paddingBottom: 7,
                }}
              >
                Документы
              </div>
              {[
                "Пользовательское соглашение",
                "Политика конфиденциальности",
                "Согласие на обработку данных",
                "Договор оферты",
              ].map((doc) => (
                <a
                  key={doc}
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(doc)}`}
                  style={{
                    display: "block",
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: "10px",
                    color: "#5a5854",
                    textDecoration: "none",
                    marginBottom: 9,
                    borderBottom: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = C.black;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent";
                  }}
                >
                  {doc}
                </a>
              ))}
            </div>
          )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 20,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div
              style={{
                fontFamily: "'Martian Mono', monospace",
                fontSize: "10px",
                color: "#666",
              }}
            >
              © 1998–{year} ООО «РИМСК». Все права защищены. Все цены указаны без
              НДС.
            </div>
            <div
              style={{
                border: `1px solid ${C.gray}`,
                padding: "4px 10px",
                fontFamily: "'Martian Mono', monospace",
                fontSize: "10px",
                color: C.black,
              }}
            >
              v1.0.98
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// =============================================
// MAIN APP
// =============================================
export default function App() {
  return (
    <div id="top" style={{ minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <main>
          <Hero />
          <Scenarios />
          <Assortment />
          <Economics />
          <FAQ />
          <Order />
        </main>
        <Footer />
      </div>
    </div>
  );
}
