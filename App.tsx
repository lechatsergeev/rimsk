import { useState, useEffect } from "react";
import { motion } from "motion/react";

// =============================================
// DESIGN TOKENS
// =============================================
const C = {
  navy: "#1C3F6E",
  gold: "#B8920A",
  silver: "#C0C0C0",
  gray: "#808080",
  black: "#000000",
  white: "#FFFFFF",
  lightGray: "#E8E6E0",
  teal: "#2D6B6B",
  bg: "#FAFAF8",
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
    "НЕТ ПОВАРА • МАРЖИНАЛЬНОСТЬ 300% • ИЗ МОРОЗИЛКИ В ПЕЧЬ • ГОТОВО ЗА 3 МИНУТЫ • ПОСТАВКИ B2B • ";
  return (
    <div
      style={{
        background: C.navy,
        overflow: "hidden",
        borderTop: `3px solid ${C.black}`,
        borderBottom: `3px solid ${C.black}`,
        padding: "9px 0",
      }}
    >
      <div
        className="marquee-track"
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
      >
        <span
          style={{
            color: C.gold,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.05em",
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

  const links = [
    { label: "Экономика", href: "#economics" },
    { label: "Ассортимент", href: "#assortment" },
    { label: "Приготовление", href: "#howtocook" },
    { label: "FAQ", href: "#faq" },
    { label: "Заказать", href: "#order" },
  ];

  return (
    <div
      style={{
        background: C.silver,
        borderBottom: `3px solid ${C.black}`,
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
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "-0.5px",
            color: C.black,
          }}
        >
          РИМСК
        </div>

        {!isMobile && (
          <nav style={{ display: "flex", gap: 2 }}>
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
                  el.style.background = "#d4d0c8";
                  el.style.borderTop = "2px solid #fff";
                  el.style.borderLeft = "2px solid #fff";
                  el.style.borderRight = "2px solid #808080";
                  el.style.borderBottom = "2px solid #808080";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.border = "none";
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
              background: C.silver,
            }}
          >
            {time}
          </div>

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: menuOpen ? C.navy : "transparent",
                border: `2px solid ${C.black}`,
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
          style={{
            background: C.silver,
            borderTop: `2px solid ${C.gray}`,
            borderBottom: `3px solid ${C.black}`,
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
    </div>
  );
}

// =============================================
// HERO
// =============================================
function Hero() {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section
      style={{
        background: C.bg,
        padding: isMobile ? "48px 20px 0" : "80px 40px 0",
        minHeight: isMobile ? "auto" : "85vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
            gap: isMobile ? "40px" : "64px",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div
              style={{
                display: "inline-block",
                background: C.navy,
                border: `2px solid ${C.black}`,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                padding: "4px 10px",
                marginBottom: 20,
                color: C.white,
              }}
            >
              Замороженная пицца для B2B
            </div>

            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: isMobile
                  ? "clamp(32px, 10vw, 44px)"
                  : "clamp(32px, 4vw, 52px)",
                lineHeight: 1.0,
                color: C.black,
                textTransform: "uppercase",
                letterSpacing: "-1.5px",
                marginBottom: 24,
              }}
            >
              ЗАМОРОЖЕННАЯ
              <br />
              РИМСКАЯ
              <br />
              ПИЦЦА
            </div>

            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "13px",
                color: "#333",
                marginBottom: 36,
                lineHeight: 1.8,
              }}
            >
              Оптовые поставки для кафе, баров и кейтеринга.
              <br />
              Готово за 3 минуты. Маржинальность от 300%.
            </div>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a
                href="#order"
                style={{
                  display: "inline-block",
                  background: C.navy,
                  color: C.white,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "14px 36px",
                  border: `3px solid ${C.black}`,
                  boxShadow: `5px 5px 0px ${C.black}`,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = C.teal;
                  el.style.boxShadow = `7px 7px 0px ${C.black}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = C.navy;
                  el.style.boxShadow = `5px 5px 0px ${C.black}`;
                }}
              >
                ЗАКАЗАТЬ
              </a>
              <a
                href="#economics"
                style={{
                  display: "inline-block",
                  background: C.white,
                  color: C.black,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "14px 28px",
                  border: `3px solid ${C.black}`,
                  boxShadow: `5px 5px 0px ${C.black}`,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = C.silver;
                  el.style.boxShadow = `7px 7px 0px ${C.black}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = C.white;
                  el.style.boxShadow = `5px 5px 0px ${C.black}`;
                }}
              >
                УЗНАТЬ ЦЕНЫ
              </a>
            </div>

            <div
              style={{
                display: "flex",
                gap: 0,
                marginTop: 44,
                borderTop: `3px solid ${C.black}`,
                flexWrap: "wrap",
              }}
            >
              {[
                { val: "3 мин", label: "до подачи" },
                { val: "300%", label: "маржинальность" },
                { val: "23 г", label: "на рынке" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 33%",
                    padding: "14px 0",
                    borderRight: i < 2 ? `3px solid ${C.black}` : "none",
                    paddingLeft: i > 0 ? 20 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "26px",
                      color: C.navy,
                      lineHeight: 1,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      color: "#555",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: C.navy,
                  transform: "translate(10px, 10px)",
                  border: `3px solid ${C.black}`,
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  border: `3px solid ${C.black}`,
                  overflow: "hidden",
                  background: C.black,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1773901435878-a996dee9270e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Римская пицца"
                  style={{
                    width: "100%",
                    height: isTablet ? "320px" : "420px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: C.black,
                    padding: "10px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      color: C.silver,
                      letterSpacing: "1px",
                    }}
                  >
                    RIMSK_pizza_001.bmp
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "10px",
                      color: C.gold,
                    }}
                  >
                    ■ LIVE
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 56 }}>
        <Marquee />
      </div>
    </section>
  );
}

// =============================================
// ECONOMICS
// =============================================
function Economics() {
  const { isMobile, isTablet } = useBreakpoint();

  const rows = [
    {
      label: "Себестоимость единицы",
      value: "270 ₽",
      sub: "включая упаковку и заморозку",
    },
    {
      label: "Рекомендованная розница",
      value: "620 ₽",
      sub: "средний чек по рынку",
    },
    {
      label: "Трудозатраты на подачу",
      value: "0 ₽",
      sub: "повар не требуется",
    },
  ];

  return (
    <section
      id="economics"
      style={{ background: C.bg, padding: isMobile ? "64px 20px" : "112px 40px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? "clamp(26px, 8vw, 36px)" : "clamp(26px, 3vw, 44px)",
              textTransform: "uppercase",
              color: C.black,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            ЮНИТ-ЭКОНОМИКА
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "13px",
              color: "#444",
              marginTop: 14,
              maxWidth: 480,
              lineHeight: 1.7,
            }}
          >
            Оптовая цена достаточно низкая, чтобы вы зарабатывали — без потери
            качества.
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 48,
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <div
              style={{
                background: C.navy,
                color: C.gold,
                display: "flex",
                justifyContent: "space-between",
                padding: "11px 22px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                border: `3px solid ${C.black}`,
                borderBottom: "0",
              }}
            >
              <span>ПОКАЗАТЕЛЬ</span>
              <span>СТОИМОСТЬ</span>
            </div>

            {rows.map((row, i) => (
              <div
                key={i}
                className="receipt-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 22px",
                  border: `3px solid ${C.black}`,
                  borderBottom:
                    i < rows.length - 1 ? `2px solid ${C.black}` : `3px solid ${C.black}`,
                  background: C.white,
                  cursor: "default",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: C.black,
                    }}
                  >
                    {row.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "10px",
                      color: C.gray,
                      marginTop: 2,
                    }}
                  >
                    {row.sub}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: C.black,
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {row.value}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div
              style={{
                background: C.navy,
                border: `3px solid ${C.black}`,
                boxShadow: `6px 6px 0px ${C.black}`,
                padding: "36px",
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 10,
                }}
              >
                ИТОГОВАЯ МАРЖА
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "72px",
                  color: C.gold,
                  lineHeight: 1,
                  letterSpacing: "-3px",
                }}
              >
                300%
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.85)",
                  marginTop: 14,
                  lineHeight: 1.7,
                }}
              >
                Прибыль с одной пиццы — около 350 ₽.
                <br />
                10 штук в день = 105 000 ₽ в месяц.
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: `3px solid ${C.black}`,
                boxShadow: `6px 6px 0px ${C.black}`,
              }}
            >
              {[
                { val: "0 мин", label: "обучение персонала" },
                { val: "3 мин", label: "от печи до стола" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "22px",
                    borderRight: i === 0 ? `3px solid ${C.black}` : "none",
                    background: i === 0 ? C.lightGray : C.white,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "28px",
                      color: C.black,
                      letterSpacing: "-1px",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      color: "#444",
                      marginTop: 6,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
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
    bg: C.navy,
    textColor: "#fff",
    accentColor: C.gold,
    price: "270 ₽",
    priceLabel: "от",
    desc: "Томаты · Моцарелла · Базилик",
    tag: "ХИТ ПРОДАЖ",
    img: "https://images.unsplash.com/photo-1592229005296-735b0f6c0722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    name: "ПЕППЕРОНИ",
    bg: C.lightGray,
    textColor: "#000",
    accentColor: C.navy,
    price: "320 ₽",
    priceLabel: "от",
    desc: "Пепперони · Сметана · Моцарелла",
    tag: "ПОПУЛЯРНОЕ",
    img: "https://images.unsplash.com/photo-1763478156969-4d7c0ab35590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    name: "ГРУША–ГОРГОНЗОЛА",
    bg: C.teal,
    textColor: "#fff",
    accentColor: C.gold,
    price: "390 ₽",
    priceLabel: "от",
    desc: "Груша · Горгонзола · Грецкий орех",
    tag: "ПРЕМИУМ",
    img: "https://images.unsplash.com/photo-1586934729750-2e32c19c2320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
];

function Assortment() {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <section
      id="assortment"
      style={{ background: C.silver, padding: isMobile ? "64px 20px" : "112px 40px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? "clamp(26px, 8vw, 36px)" : "clamp(26px, 3vw, 44px)",
              textTransform: "uppercase",
              color: C.black,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            АССОРТИМЕНТ
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "13px",
              color: "#333",
              marginTop: 14,
              lineHeight: 1.7,
            }}
          >
            Базовая линейка всегда в наличии. Разрабатываем рецептуру под ваш
            бренд.
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {PIZZAS.map((pizza, i) => (
            <motion.div
              key={pizza.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ height: "100%" }}
            >
              <div
                style={{
                  background: pizza.bg,
                  border: `3px solid ${C.black}`,
                  boxShadow: `6px 6px 0px ${C.black}`,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  transition: "box-shadow 0.15s ease, transform 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = `8px 8px 0px ${C.black}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = `6px 6px 0px ${C.black}`;
                }}
              >
                <div
                  style={{
                    height: "220px",
                    overflow: "hidden",
                    borderBottom: `3px solid ${C.black}`,
                    position: "relative",
                    flexShrink: 0,
                    background: "#111",
                  }}
                >
                  <img
                    src={pizza.img}
                    alt={pizza.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: C.black,
                      color: C.gold,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "3px 7px",
                      letterSpacing: "1px",
                    }}
                  >
                    {pizza.tag}
                  </div>
                </div>

                <div
                  style={{
                    background: C.black,
                    padding: "12px 18px",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      color: C.gray,
                      textTransform: "uppercase",
                    }}
                  >
                    {pizza.priceLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "30px",
                      color: pizza.accentColor,
                      lineHeight: 1,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {pizza.price}
                  </span>
                </div>

                <div
                  style={{
                    padding: "18px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      color: pizza.textColor,
                      textTransform: "uppercase",
                      letterSpacing: "-0.3px",
                      lineHeight: 1.1,
                    }}
                  >
                    {pizza.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: pizza.textColor,
                      opacity: 0.8,
                      lineHeight: 1.6,
                    }}
                  >
                    {pizza.desc}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================
// HOW TO COOK
// =============================================
const STEPS = [
  {
    num: "01",
    title: "ДОСТАНЬТЕ",
    text: "Извлеките пиццу из морозильной камеры. Предварительная разморозка не требуется.",
  },
  {
    num: "02",
    title: "ЗАПЕКАЙТЕ",
    text: "Поместите в разогретую до 220°C печь на 10–12 минут. Результат — хрустящее тесто.",
  },
  {
    num: "03",
    title: "ПОДАВАЙТЕ",
    text: "Нарежьте и немедленно подавайте гостям. Никаких дополнительных манипуляций.",
  },
];

function HowToCook() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="howtocook"
      style={{ background: C.bg, padding: isMobile ? "64px 20px" : "112px 40px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? "clamp(26px, 8vw, 36px)" : "clamp(26px, 3vw, 44px)",
              textTransform: "uppercase",
              color: C.black,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            КАК ГОТОВИТЬ
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "13px",
              color: "#444",
              marginTop: 14,
            }}
          >
            Три шага. Повар не нужен.
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 0,
          }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                border: `3px solid ${C.black}`,
                borderRight: !isMobile && i < STEPS.length - 1 ? `2px solid ${C.black}` : `3px solid ${C.black}`,
                borderBottom: isMobile && i < STEPS.length - 1 ? `2px solid ${C.black}` : `3px solid ${C.black}`,
                padding: "36px 28px",
                background: C.white,
                cursor: "default",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = C.lightGray;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = C.white;
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "56px",
                  lineHeight: 1,
                  color: C.navy,
                  letterSpacing: "-3px",
                  marginBottom: 18,
                  opacity: 0.5,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: C.black,
                  textTransform: "uppercase",
                  letterSpacing: "-0.3px",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12px",
                  color: "#444",
                  lineHeight: 1.75,
                }}
              >
                {step.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================
// FAQ
// =============================================
const FAQS = [
  {
    q: "Какой срок годности?",
    a: "12 месяцев в замороженном виде при температуре −18°C. После разморозки — сразу в печь, не хранить.",
  },
  {
    q: "Какой минимальный заказ?",
    a: "Минимальный заказ — 50 пицц одного вида. Комбинирование вкусов — при заказе от 100 штук.",
  },
  {
    q: "Есть ли скидка на объём?",
    a: "Да: от 200 шт — 10%, от 500 шт — 15%, от 1000 шт — персональные условия.",
  },
  {
    q: "Какое оборудование нужно?",
    a: "Стандартная конвекционная печь или пицца-печь. Специальное оборудование не требуется.",
  },
  {
    q: "Как происходит доставка?",
    a: "Доставляем в заморозке по Москве и МО собственной логистикой. Другие регионы — по согласованию.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="faq"
      style={{ background: C.silver, padding: isMobile ? "64px 20px" : "112px 40px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 40 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: isMobile ? "clamp(26px, 8vw, 36px)" : "clamp(26px, 3vw, 44px)",
              textTransform: "uppercase",
              color: C.black,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}
          >
            ВОПРОСЫ И ОТВЕТЫ
          </div>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div
                style={{
                  border: `3px solid ${C.black}`,
                  borderBottom:
                    i < FAQS.length - 1 && open !== i
                      ? `2px solid ${C.black}`
                      : `3px solid ${C.black}`,
                  background: open === i ? C.lightGray : C.white,
                  marginBottom: open === i ? 6 : 0,
                  boxShadow: open === i ? `5px 5px 0px ${C.black}` : "none",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 24px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: isMobile ? "14px" : "16px",
                      color: C.black,
                      textTransform: "uppercase",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: C.black,
                      flexShrink: 0,
                      display: "inline-block",
                      transform: open === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      paddingTop: 16,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "#333",
                      lineHeight: 1.8,
                      borderTop: "1px solid rgba(0,0,0,0.2)",
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
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  };

  return (
    <section
      id="order"
      style={{
        background: "#111",
        padding: isMobile ? "64px 20px" : "112px 40px",
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
              background: "#1a1a1a",
              border: "3px solid #333",
              padding: isMobile ? "36px 28px" : "44px",
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
                  color: C.gold,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  fontWeight: 700,
                  marginBottom: 18,
                }}
              >
                ★ СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: isMobile
                    ? "clamp(36px, 12vw, 52px)"
                    : "clamp(36px, 4.5vw, 56px)",
                  color: C.gold,
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "-1.5px",
                }}
              >
                СКИДКА
                <br />
                15%
                <br />
                НА ПЕРВУЮ
                <br />
                ОТГРУЗКУ
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12px",
                  color: "#aaa",
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                Оставьте заявку — получите персональный прайс-лист и скидку 15%
                на первый заказ. Ответим в течение 24 часов.
              </div>

              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "10px",
                  color: C.gray,
                  marginBottom: 7,
                  letterSpacing: "1px",
                }}
              >
                МЕСТ ДЛЯ НОВЫХ ПАРТНЁРОВ:
              </div>
              <div
                className="win98-inset"
                style={{
                  height: "20px",
                  background: "#333",
                  overflow: "hidden",
                  display: "flex",
                  padding: "2px",
                }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "73%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    background: C.navy,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 8,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
                    color: "#fff",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  73%
                </motion.div>
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
              border: `3px solid ${C.white}`,
              padding: isMobile ? "32px 28px" : "40px",
              boxShadow: `6px 6px 0px ${C.navy}`,
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
                  style={{
                    background: C.navy,
                    border: `3px solid ${C.black}`,
                    boxShadow: `6px 6px 0px ${C.black}`,
                    padding: "24px 28px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "28px",
                      textTransform: "uppercase",
                      color: C.gold,
                      lineHeight: 1,
                    }}
                  >
                    ✓ ЗАЯВКА ПРИНЯТА
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.8)",
                      marginTop: 10,
                    }}
                  >
                    Ответим в течение 24 часов.
                  </div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    textTransform: "uppercase",
                    color: C.black,
                    borderBottom: `3px solid ${C.black}`,
                    paddingBottom: 12,
                    marginBottom: 2,
                    letterSpacing: "-0.3px",
                  }}
                >
                  ОСТАВИТЬ ЗАЯВКУ
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
                        border: `3px solid ${C.black}`,
                        padding: "12px 14px",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "13px",
                        color: C.black,
                        outline: "none",
                        width: "100%",
                        boxSizing: "border-box" as const,
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = C.navy;
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = C.black;
                      }}
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  style={{
                    background: C.navy,
                    color: C.white,
                    border: `3px solid ${C.black}`,
                    boxShadow: `5px 5px 0px ${C.black}`,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    padding: "15px",
                    fontSize: "16px",
                    width: "100%",
                    marginTop: 4,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = C.teal;
                    el.style.boxShadow = `7px 7px 0px ${C.black}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = C.navy;
                    el.style.boxShadow = `5px 5px 0px ${C.black}`;
                  }}
                >
                  {status === "loading" ? (
                    <span className="blink-text">ОТПРАВЛЯЮ...</span>
                  ) : (
                    "ЗАКАЗАТЬ →"
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
                    href="#"
                    style={{ color: C.black, textDecoration: "underline" }}
                  >
                    политикой обработки данных
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
        borderTop: `3px solid ${C.black}`,
        padding: isMobile ? "44px 20px 20px" : "52px 40px 24px",
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
            gap: isMobile ? 28 : 36,
            paddingBottom: 36,
            borderBottom: `3px solid ${C.black}`,
          }}
        >
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "26px",
                letterSpacing: "-0.5px",
                color: C.black,
                marginBottom: 10,
              }}
            >
              РИМСК
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                color: "#333",
                lineHeight: 1.8,
              }}
            >
              Замороженная римская пицца
              <br />
              для B2B-сегмента.
              <br />
              Производство — Москва.
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: C.black,
                marginBottom: 12,
                borderBottom: `1px solid ${C.gray}`,
                paddingBottom: 7,
              }}
            >
              Контакты
            </div>
            {[
              { label: "Телефон", val: "+7 (495) 000-00-00" },
              { label: "Email", val: "b2b@rimsk.ru" },
              { label: "WhatsApp", val: "+7 (495) 000-00-00" },
            ].map((c) => (
              <div key={c.label} style={{ marginBottom: 9 }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
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
                letterSpacing: "2px",
                color: C.black,
                marginBottom: 12,
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
              { label: "Адрес", val: "г. Москва, ул. Пример, д. 1" },
            ].map((c) => (
              <div key={c.label} style={{ marginBottom: 9 }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "9px",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
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
                  letterSpacing: "2px",
                  color: C.black,
                  marginBottom: 12,
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
                  href="#"
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
            paddingTop: 18,
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
            className="win98-inset"
            style={{
              background: C.silver,
              padding: "3px 10px",
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
    <div style={{ minHeight: "100vh" }}>
      <Navigation />
      <Hero />
      <Economics />
      <Assortment />
      <HowToCook />
      <FAQ />
      <Order />
      <Footer />
    </div>
  );
}
