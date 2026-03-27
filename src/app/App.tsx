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
    title: "Гость уходит есть в другое место",
    text: "Когда в заведении можно только выпить, вечер часто обрывается на середине. Гость допивает свой заказ и уходит туда, где есть что-то горячее. Вместе с ним уходит и следующий заказ.",
    proofTitle: "что происходит",
    proofItems: [
      "гость сидит дольше одного заказа",
      "напитки уже проданы, а еды в меню почти нет",
      "после этого человек уходит поесть в соседнюю точку",
    ],
    note: "Еда здесь нужна не ради красоты меню, а чтобы не отдавать гостя дальше по улице.",
  },
  {
    stamp: "СЦЕНАРИЙ 02 · КАФЕ И БАРЫ С МАЛОЙ КУХНЕЙ",
    title: "Под одну позицию не хотят заводить ещё одну кухонную жизнь",
    text: "Заведению может быть нужна ещё одна горячая позиция, но вместе с ней не хотят получать тесто, соусы, отдельную сборку, новые остатки и ещё один кусок работы на смене. Если еда усложняет жизнь, её просто не запускают.",
    proofTitle: "что мешает запуску",
    proofItems: [
      "под одну позицию тянется новая заготовка",
      "появляются отдельные продукты и сроки хранения",
      "смена получает ещё один процесс вместо простой выдачи",
    ],
    note: "Проблема не в печи. Проблема в лишних действиях, которые прилипают к новой позиции.",
  },
  {
    stamp: "СЦЕНАРИЙ 03 · МИНИ-ОТЕЛИ И КЕЙТЕРИНГ",
    title: "Горячее нужно не весь день",
    text: "В мини-отеле, апартах и кейтеринге еда нужна не потоком, а по ситуации. Сегодня поздний заезд, завтра небольшой заказ на мероприятие, послезавтра тишина. В таком формате неудобно держать полноценную кухню в постоянной готовности.",
    proofTitle: "почему это больно",
    proofItems: [
      "спрос неровный и зависит от дня и часа",
      "готовить заранее неудобно",
      "нужна еда, которую можно запускать под конкретный заказ",
    ],
    note: "Здесь выигрывает не большой ассортимент, а возможность отдать горячее тогда, когда его реально попросили.",
  },
  {
    stamp: "СЦЕНАРИЙ 04 · ТЕСТОВЫЙ ЗАПУСК",
    title: "Спрос на еду хотят проверить без большого запуска",
    text: "О горячей позиции начинают думать, когда видно: гости могли бы оставаться дольше и заказывать больше. Но никто не хочет сразу строить под это отдельную кухню. Сначала хочется проверить спрос на реальной смене и только потом принимать большие решения.",
    proofTitle: "что здесь важно",
    proofItems: [
      "не вкладываться в новую кухню вслепую",
      "проверить спрос на одном понятном продукте",
      "сначала увидеть заказы вживую, потом расширяться",
    ],
    note: "Это не запуск большого food-направления, а аккуратная проверка гипотезы.",
  },
];

const ECONOMICS_FACTS = [
  { label: "ОПТ", value: "270 ₽", sub: "за одну пиццу" },
  { label: "РОЗНИЦА", value: "620 ₽", sub: "ориентир для меню" },
  { label: "ВРЕМЯ", value: "8 МИН", sub: "до подачи" },
];

const CONTACT_EMAIL = "b2b@rimsk.ru";

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
            fontFamily: "'IBM Plex Mono', monospace",
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
              fontFamily: "'Space Grotesk', sans-serif",
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
                  fontFamily: "'IBM Plex Mono', monospace",
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
              fontFamily: "'IBM Plex Mono', monospace",
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
                fontFamily: "'IBM Plex Mono', monospace",
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
                fontFamily: "'IBM Plex Mono', monospace",
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

function Scenarios() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="scenarios"
      style={{ background: C.white, padding: isMobile ? "28px 20px" : "56px 40px" }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          style={{ marginBottom: isMobile ? 10 : 14 }}
        >
          <div style={{ borderBottom: `1px solid ${C.black}`, paddingBottom: 14 }}>
            <h2
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: C.black,
                margin: 0,
              }}
            >
              scenarios / рабочие ситуации
            </h2>
          </div>
        </motion.div>

        <div style={{ display: "grid" }}>
          {SCENARIOS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "88px minmax(0, 1fr)",
                columnGap: isMobile ? 0 : 26,
                borderBottom: `1px solid ${C.gray}`,
                padding: isMobile ? "18px 0 20px" : "26px 0 28px",
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "#4f4b46",
                  paddingTop: isMobile ? 0 : 4,
                  marginBottom: isMobile ? 10 : 0,
                }}
              >
                No. {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: isMobile ? "26px" : "clamp(28px, 3vw, 42px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.05em",
                    color: C.black,
                    maxWidth: index === 1 ? "16ch" : index === 3 ? "15ch" : "13ch",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: isMobile ? "12px" : "13px",
                    lineHeight: 1.8,
                    color: "#4a4b4d",
                    maxWidth: "60ch",
                  }}
                >
                  {item.text}
                </div>

                <div
                  style={{
                    marginTop: 14,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
                    lineHeight: 1.7,
                    color: "#6a665f",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    maxWidth: "62ch",
                  }}
                >
                  {item.note}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Economics() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="economics"
      style={{ background: C.bg, padding: isMobile ? "56px 20px" : "116px 40px" }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          style={{ marginBottom: isMobile ? 26 : 34 }}
        >
          <div style={{ borderBottom: `1px solid ${C.black}`, paddingBottom: isMobile ? 18 : 22 }}>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: C.black,
              }}
            >
              economics / экономика тестового входа
            </div>
            <h2
              style={{
                margin: isMobile ? "12px 0 0" : "14px 0 0",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: isMobile ? "30px" : "42px",
                fontWeight: 500,
                lineHeight: 0.96,
                letterSpacing: "-0.05em",
                color: C.black,
                maxWidth: "10ch",
              }}
            >
              Экономика тестового запуска
            </h2>
            <p
              style={{
                margin: isMobile ? "12px 0 0" : "14px 0 0",
                maxWidth: "54ch",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: isMobile ? "12px" : "13px",
                lineHeight: 1.7,
                color: "#4a4b4d",
              }}
            >
              Простой ориентир для первой партии: сколько стоит вход, какой может
              быть розничная цена и как выглядит стартовый расчёт без сложной кухни.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          style={{ borderTop: `1px solid ${C.black}` }}
        >
          {[
            { label: "Тестовый вход", value: "15 шт", sub: "минимальный заказ на первый запуск" },
            { label: "Закупка партии", value: "4 050 ₽", sub: "15 пицц по 270 ₽" },
            { label: "Продажа в меню", value: "9 300 ₽", sub: "если продавать по 620 ₽" },
            { label: "Разница", value: "5 250 ₽", sub: "до учёта операционных расходов" },
          ].map((row, index) => (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) auto",
                gap: 10,
                alignItems: "start",
                padding: isMobile ? "18px 0 20px" : "22px 0 24px",
                borderBottom: `1px solid ${C.gray}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
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
                    fontFamily: "'IBM Plex Mono', monospace",
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
                  fontFamily: "'Space Grotesk', sans-serif",
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
          ))}

          <div
            style={{
              borderTop: `1px solid ${C.black}`,
              padding: isMobile ? "22px 0 0" : "30px 0 0",
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
                padding: isMobile ? "18px 20px 16px" : "22px 28px 18px",
                border: `1px solid ${C.black}`,
                background: "#fff",
                minWidth: isMobile ? "220px" : "280px",
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: isMobile ? "12px" : "13px",
                  lineHeight: 1.6,
                  color: "#4a4b4d",
                }}
              >
                рекомендуемая цена
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: isMobile ? "46px" : "72px",
                  lineHeight: 0.9,
                  letterSpacing: "-0.07em",
                  color: C.black,
                }}
              >
                620 ₽
              </div>
            </div>
          </div>
        </motion.div>
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
    img: "https://images.unsplash.com/photo-1592229005296-735b0f6c0722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    name: "ПЕППЕРОНИ",
    price: "320 ₽",
    priceLabel: "от",
    desc: "Рабочая позиция, когда в меню нужен более очевидный хит.",
    tag: "ХИТ",
    img: "https://images.unsplash.com/photo-1763478156969-4d7c0ab35590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    name: "ГРУША–ГОРГОНЗОЛА",
    price: "390 ₽",
    priceLabel: "от",
    desc: "Позиция для точек, которым нужен более сложный вкус в том же формате.",
    tag: "СЛОЖНЕЕ ВКУС",
    img: "https://images.unsplash.com/photo-1586934729750-2e32c19c2320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
];
const OBJECTIONS = [
  {
    q: "Нам не нужна ещё одна большая кухня",
    a: "И не нужно. Этот продукт нужен точкам, которым нужна одна рабочая горячая позиция, а не отдельное food-направление со своей жизнью.",
  },
  {
    q: "Мы не уверены, что еду будут брать стабильно",
    a: "Поэтому вход и должен быть маленьким. Минимальный заказ — 15 штук: этого хватает, чтобы проверить спрос в реальной смене и не строить большие планы заранее.",
  },
  {
    q: "У нас уже мало места и мало внимания на смене",
    a: "Если под новую еду приходится тащить отдельные заготовки и лишние процессы, проект обычно стопорится. Здесь смысл как раз в том, чтобы этого хвоста было меньше.",
  },
  {
    q: "Нам не нужен сложный гастрономический продукт",
    a: "Здесь важнее другое: понятный вкус, стабильная выдача и возможность удержать гостя у себя, а не отправлять его дальше по улице.",
  },
];

function Assortment() {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section
      id="assortment"
      style={{ background: C.silver, padding: isMobile ? "56px 20px" : "116px 40px" }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 14 }}
        >
          <div style={{ borderBottom: `1px solid ${C.black}`, paddingBottom: 14 }}>
            <h2
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: C.black,
                margin: 0,
              }}
            >
              assortment / что увидит гость
            </h2>
          </div>
        </motion.div>

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
              padding: isMobile ? "18px 0 20px" : "26px 0 28px",
            }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
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
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: isMobile ? "26px" : "clamp(28px, 3vw, 40px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.05em",
                  color: C.black,
                  maxWidth: "14ch",
                }}
              >
                На старте достаточно нескольких понятных вкусов
              </div>
              <p
                style={{
                  margin: "12px 0 0",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: isMobile ? "12px" : "13px",
                  lineHeight: 1.8,
                  color: "#4a4b4d",
                  maxWidth: "60ch",
                }}
              >
                Важнее не раздувать карту, а поставить в меню 2-3 позиции, которые
                быстро считываются гостем и подходят для первого теста.
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
                padding: isMobile ? "16px 0 18px" : "18px 0 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
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
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: isMobile ? "22px" : "26px",
                    lineHeight: 1.02,
                    letterSpacing: "-0.04em",
                    color: C.black,
                  }}
                >
                  {pizza.name}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: isMobile ? "12px" : "13px",
                    color: "#4a4b4d",
                    lineHeight: 1.8,
                    maxWidth: "54ch",
                  }}
                >
                  {pizza.desc}
                </div>
              </div>

              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  color: C.black,
                  whiteSpace: "nowrap",
                  alignSelf: isMobile ? "start" : "center",
                  marginTop: isMobile ? 10 : 0,
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
            paddingTop: isMobile ? 16 : 20,
            marginTop: 0,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "11px",
            lineHeight: 1.75,
            color: "#5a5854",
            maxWidth: "58ch",
          }}
        >
          Этого набора обычно хватает, чтобы понять, какой вкус работает у вас лучше:
          самый понятный, самый очевидный или чуть более сложный.
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="objections"
      style={{ background: C.bg, padding: isMobile ? "60px 20px" : "124px 40px" }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <div style={{ marginBottom: 30 }}>
          <h2
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "uppercase",
              color: C.black,
              letterSpacing: "0.16em",
              margin: 0,
            }}
          >
            objections / что обычно останавливает
          </h2>
        </div>

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
                    padding: isMobile ? "22px 0" : "30px 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: isMobile ? "20px" : "clamp(20px, 2.1vw, 30px)",
                      color: C.black,
                      lineHeight: 1.04,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
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
                      padding: isMobile ? "0 0 24px" : "0 36px 30px 0",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "#4a4b4d",
                      lineHeight: 1.85,
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validateForm = () => {
    const nextErrors = {
      name: form.name.trim() ? "" : "Введите имя.",
      company: form.company.trim() ? "" : "Укажите заведение.",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ? ""
        : "Введите корректный email.",
    };

    setErrors(nextErrors);
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
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="order"
      style={{
        background: C.bg,
        padding: isMobile ? "60px 20px" : "124px 40px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 48,
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
              padding: isMobile ? "30px 24px" : "36px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 28,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px",
                  color: "#6a665f",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  marginBottom: 24,
                }}
              >
                offer / тестовая поставка
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: isMobile
                    ? "clamp(28px, 8vw, 38px)"
                    : "clamp(30px, 3vw, 40px)",
                  color: C.black,
                  lineHeight: 1.02,
                  textTransform: "none",
                  letterSpacing: "-0.04em",
                }}
              >
                Обсудить
                <br />
                тестовый
                <br />
                запуск
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  color: "#3f3f40",
                  lineHeight: 1.8,
                  marginBottom: 24,
                  maxWidth: "44ch",
                }}
              >
                Если вы хотите проверить спрос на горячую позицию без большого запуска,
                оставьте заявку. Поможем собрать первую партию и выбрать вкусы под ваш формат.
              </div>

              <div
                style={{
                  borderTop: `1px solid ${C.gray}`,
                  paddingTop: 16,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  lineHeight: 1.75,
                  color: "#3f3f40",
                  maxWidth: "42ch",
                }}
              >
                Первый заказ обычно собирают как тест: посмотреть, как позиция ведет себя
                в вашей смене, какие вкусы заказывают чаще и нужен ли следующий шаг.
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
              padding: isMobile ? "26px 22px" : "32px 28px",
              boxShadow: "none",
            }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: 280,
                  textAlign: "center",
                }}
              >
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    background: C.silver,
                    border: `1px solid ${C.black}`,
                    boxShadow: "none",
                    padding: "24px 28px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 500,
                      fontSize: "24px",
                      textTransform: "none",
                      color: C.black,
                      lineHeight: 1,
                    }}
                  >
                    Заявка принята
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "#4a4b4d",
                      marginTop: 10,
                    }}
                  >
                    Почтовый клиент открыт. Если письмо не создалось автоматически,
                    напишите на {CONTACT_EMAIL}.
                  </div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    textTransform: "none",
                    color: C.black,
                    borderBottom: `1px solid ${C.black}`,
                    paddingBottom: 12,
                    marginBottom: 2,
                    letterSpacing: "-0.04em",
                    margin: 0,
                  }}
                >
                  ОБСУДИТЬ ЗАПУСК
                </h2>

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
                        fontFamily: "'IBM Plex Mono', monospace",
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
                        padding: "12px 14px",
                        fontFamily: "'IBM Plex Mono', monospace",
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
                      onBlur={() => {
                        validateForm();
                      }}
                    />
                    {errors[field.key as keyof typeof errors] && (
                      <div
                        id={`order-${field.key}-error`}
                        role="alert"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
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

                {status === "error" && (
                  <div
                    role="alert"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
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
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                    padding: "15px",
                    fontSize: "13px",
                    width: "100%",
                    marginTop: 4,
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
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
                    color: C.gray,
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
            )}
          </motion.div>
        </div>
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
        padding: isMobile ? "48px 20px 20px" : "84px 40px 28px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr 1fr"
              : isTablet
              ? "1fr 1fr 1fr"
              : "2fr 1fr 1fr 1fr",
            gap: isMobile ? 28 : 40,
            paddingBottom: 40,
            borderBottom: `1px solid ${C.black}`,
          }}
        >
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: "22px",
                letterSpacing: "-0.04em",
                color: C.black,
                marginBottom: 14,
              }}
            >
              РИМСК
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                color: "#333",
                lineHeight: 1.75,
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
                fontFamily: "'IBM Plex Mono', monospace",
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
            {[
              { label: "Телефон", val: "+7 (812) 000-00-00" },
              { label: "Email", val: "b2b@rimsk.ru" },
              { label: "WhatsApp", val: "+7 (812) 000-00-00" },
            ].map((c) => (
              <div key={c.label} style={{ marginBottom: 9 }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
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
                    fontFamily: "'IBM Plex Mono', monospace",
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

          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
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
                    fontFamily: "'IBM Plex Mono', monospace",
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
                    fontFamily: "'IBM Plex Mono', monospace",
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
                  fontFamily: "'IBM Plex Mono', monospace",
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
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    color: C.black,
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
              fontFamily: "'IBM Plex Mono', monospace",
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
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              color: C.black,
            }}
          >
            v1.0.98
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
