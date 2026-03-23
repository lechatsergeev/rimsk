import { useState, useEffect } from "react";
import { motion } from "motion/react";

// =============================================
// MARQUEE
// =============================================
function Marquee() {
  const text =
    "НЕТ ПОВАРА • МАРЖИНАЛЬНОСТЬ 300% • ИЗ МОРОЗИЛКИ В ПЕЧЬ • ГОТОВО ЗА 3 МИНУТЫ • ПОСТАВКИ B2B • ";
  return (
    <div
      style={{
        background: "#000",
        overflow: "hidden",
        borderTop: "4px solid #000",
        borderBottom: "4px solid #000",
        padding: "10px 0",
      }}
    >
      <div
        className="marquee-track"
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
      >
        <span
          style={{
            color: "#FFD700",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "15px",
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

  return (
    <div
      style={{
        background: "#C0C0C0",
        borderBottom: "4px solid #000",
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
          padding: "6px 40px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            letterSpacing: "-1px",
            color: "#000",
          }}
        >
          РИМСК
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: 2 }}>
          {[
            { label: "Экономика", href: "#economics" },
            { label: "Ассортимент", href: "#assortment" },
            { label: "Приготовление", href: "#howtocook" },
            { label: "FAQ", href: "#faq" },
            { label: "Заказать", href: "#order" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "12px",
                fontWeight: 500,
                color: "#000",
                textDecoration: "none",
                padding: "4px 12px",
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
                el.style.borderTop = "none";
                el.style.borderLeft = "none";
                el.style.borderRight = "none";
                el.style.borderBottom = "none";
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Win98 clock */}
        <div
          className="win98-inset"
          style={{
            padding: "3px 10px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "12px",
            color: "#000",
            background: "#C0C0C0",
          }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

// =============================================
// HERO
// =============================================
function Hero() {
  return (
    <section
      style={{ background: "#fff", padding: "64px 40px 0", minHeight: "88vh" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.17, 0.67, 0.83, 0.67] }}
          >
            {/* Tag */}
            <div
              style={{
                display: "inline-block",
                background: "#FFD700",
                border: "3px solid #000",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                padding: "4px 10px",
                marginBottom: 24,
              }}
            >
              Замороженная пицца для B2B
            </div>

            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(48px, 5.5vw, 72px)",
                lineHeight: 1.0,
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: "-2px",
                marginBottom: 28,
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
                fontSize: "15px",
                color: "#000",
                marginBottom: 40,
                lineHeight: 1.7,
              }}
            >
              Оптовые поставки для кафе, баров и кейтеринга.
              <br />
              Готово за 3 минуты. Маржинальность от 300%.
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a
                href="#order"
                className="btn-brutal-red"
                style={{
                  display: "inline-block",
                  padding: "18px 48px",
                  fontSize: "20px",
                  textDecoration: "none",
                }}
              >
                ЗАКАЗАТЬ
              </a>
              <a
                href="#economics"
                style={{
                  display: "inline-block",
                  background: "#fff",
                  color: "#000",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "18px 32px",
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0px #000",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#C0C0C0";
                  el.style.boxShadow = "12px 12px 0px #000";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#fff";
                  el.style.boxShadow = "8px 8px 0px #000";
                }}
              >
                УЗНАТЬ ЦЕНЫ
              </a>
            </div>

            {/* Quick stats */}
            <div
              style={{
                display: "flex",
                gap: 0,
                marginTop: 48,
                borderTop: "4px solid #000",
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
                    flex: 1,
                    padding: "16px 0",
                    borderRight: i < 2 ? "4px solid #000" : "none",
                    paddingLeft: i > 0 ? 24 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "32px",
                      color: "#FF2A2A",
                      lineHeight: 1,
                      letterSpacing: "-1px",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "#000",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Pizza image */}
          <motion.div
            initial={{ opacity: 0, y: -30, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.17, 0.67, 0.83, 0.67] }}
            style={{ position: "relative" }}
          >
            {/* Decorative offset block */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#FFD700",
                transform: "translate(12px, 12px)",
                border: "4px solid #000",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                border: "4px solid #000",
                overflow: "hidden",
                background: "#000",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1773901435878-a996dee9270e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Римская пицца"
                style={{
                  width: "100%",
                  height: "480px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Overlay label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "#000",
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "12px",
                    color: "#C0C0C0",
                    letterSpacing: "1px",
                  }}
                >
                  RIMSK_pizza_001.bmp
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "11px",
                    color: "#FFD700",
                  }}
                >
                  ■ LIVE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ marginTop: 64 }}>
        <Marquee />
      </div>
    </section>
  );
}

// =============================================
// ECONOMICS
// =============================================
function Economics() {
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
    <section id="economics" style={{ background: "#fff", padding: "96px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] }}
          style={{ marginBottom: 56 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              textTransform: "uppercase",
              color: "#000",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            ЮНИТ-ЭКОНОМИКА
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "15px",
              color: "#000",
              marginTop: 16,
              maxWidth: 560,
            }}
          >
            Оптовая цена достаточно низкая, чтобы вы зарабатывали — без потери
            качества.
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] }}
          >
            {/* Header */}
            <div
              style={{
                background: "#000",
                color: "#FFD700",
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 24px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                border: "4px solid #000",
                borderBottom: "0",
              }}
            >
              <span>ПОКАЗАТЕЛЬ</span>
              <span>СТОИМОСТЬ</span>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className="receipt-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  border: "4px solid #000",
                  borderBottom: i < rows.length - 1 ? "2px solid #000" : "4px solid #000",
                  background: "#fff",
                  cursor: "default",
                  gap: 16,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#000",
                    }}
                  >
                    {row.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      color: "#808080",
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
                    fontSize: "28px",
                    color: "#000",
                    whiteSpace: "nowrap",
                    letterSpacing: "-1px",
                  }}
                >
                  {row.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Big stat + note */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {/* Main margin block */}
            <div
              style={{
                background: "#FF2A2A",
                border: "4px solid #000",
                boxShadow: "8px 8px 0px #000",
                padding: "40px",
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 12,
                }}
              >
                ИТОГОВАЯ МАРЖА
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "96px",
                  color: "#FFD700",
                  lineHeight: 1,
                  letterSpacing: "-4px",
                }}
              >
                300%
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "14px",
                  color: "#fff",
                  marginTop: 16,
                  lineHeight: 1.6,
                }}
              >
                Прибыль с одной пиццы — около 350 ₽.
                <br />
                10 штук в день = 105 000 ₽ в месяц.
              </div>
            </div>

            {/* Secondary stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: "4px solid #000",
                boxShadow: "8px 8px 0px #000",
              }}
            >
              {[
                { val: "0 мин", label: "обучение персонала" },
                { val: "3 мин", label: "от печи до стола" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "24px",
                    borderRight: i === 0 ? "4px solid #000" : "none",
                    background: i === 0 ? "#FFD700" : "#fff",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "36px",
                      color: "#000",
                      letterSpacing: "-1px",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "#000",
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
    bg: "#FF2A2A",
    textColor: "#fff",
    price: "270 ₽",
    priceLabel: "от",
    desc: "Томаты · Моцарелла · Базилик",
    tag: "ХИТ ПРОДАЖ",
    img: "https://images.unsplash.com/photo-1592229005296-735b0f6c0722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    name: "ПЕППЕРОНИ",
    bg: "#FFD700",
    textColor: "#000",
    price: "320 ₽",
    priceLabel: "от",
    desc: "Пепперони · Сметана · Моцарелла",
    tag: "ПОПУЛЯРНОЕ",
    img: "https://images.unsplash.com/photo-1763478156969-4d7c0ab35590?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
  {
    name: "ГРУША–ГОРГОНЗОЛА",
    bg: "#00E5FF",
    textColor: "#000",
    price: "390 ₽",
    priceLabel: "от",
    desc: "Груша · Горгонзола · Грецкий орех",
    tag: "ПРЕМИУМ",
    img: "https://images.unsplash.com/photo-1586934729750-2e32c19c2320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  },
];

function Assortment() {
  return (
    <section id="assortment" style={{ background: "#C0C0C0", padding: "96px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] }}
          style={{ marginBottom: 56 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              textTransform: "uppercase",
              color: "#000",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            АССОРТИМЕНТ
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "15px",
              color: "#000",
              marginTop: 16,
            }}
          >
            Базовая линейка всегда в наличии. Разрабатываем рецептуру под ваш
            бренд.
          </div>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {PIZZAS.map((pizza, i) => (
            <motion.div
              key={pizza.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.17, 0.67, 0.83, 0.67],
              }}
              style={{ height: "100%" }}
            >
              <div
                className="pizza-card"
                style={{
                  background: pizza.bg,
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0px #000",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "12px 12px 0px #000";
                  const img = el.querySelector(".pizza-img") as HTMLImageElement;
                  if (img) img.style.transform = "rotate(12deg) scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "8px 8px 0px #000";
                  const img = el.querySelector(".pizza-img") as HTMLImageElement;
                  if (img) img.style.transform = "rotate(0deg) scale(1)";
                }}
              >
                {/* GIF / Image area */}
                <div
                  style={{
                    height: "240px",
                    overflow: "hidden",
                    borderBottom: "4px solid #000",
                    position: "relative",
                    flexShrink: 0,
                    background: "#111",
                  }}
                >
                  {/* Replace this img with your 3D GIF */}
                  <img
                    src={pizza.img}
                    alt={pizza.name}
                    className="pizza-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "none",
                    }}
                  />
                  {/* Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#000",
                      color: "#FFD700",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "4px 8px",
                      letterSpacing: "1px",
                    }}
                  >
                    {pizza.tag}
                  </div>
                </div>

                {/* Price (prominent) */}
                <div
                  style={{
                    background: "#000",
                    padding: "14px 20px",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "#808080",
                      textTransform: "uppercase",
                    }}
                  >
                    {pizza.priceLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "40px",
                      color: "#FFD700",
                      lineHeight: 1,
                      letterSpacing: "-1px",
                    }}
                  >
                    {pizza.price}
                  </span>
                </div>

                {/* Name and description */}
                <div
                  style={{
                    padding: "20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "22px",
                      color: pizza.textColor,
                      textTransform: "uppercase",
                      letterSpacing: "-0.5px",
                      lineHeight: 1.1,
                    }}
                  >
                    {pizza.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "13px",
                      color: pizza.textColor,
                      opacity: 0.85,
                      lineHeight: 1.5,
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
  return (
    <section id="howtocook" style={{ background: "#fff", padding: "96px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] }}
          style={{ marginBottom: 56 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              textTransform: "uppercase",
              color: "#000",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            КАК ГОТОВИТЬ
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "15px",
              color: "#000",
              marginTop: 16,
            }}
          >
            Три шага. Повар не нужен.
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: [0.17, 0.67, 0.83, 0.67],
              }}
              style={{
                border: "4px solid #000",
                borderRight: i < STEPS.length - 1 ? "2px solid #000" : "4px solid #000",
                padding: "40px 32px",
                background: "#fff",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#FFD700";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "#fff";
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "80px",
                  lineHeight: 1,
                  color: "#000",
                  letterSpacing: "-4px",
                  marginBottom: 20,
                }}
              >
                {step.num}
              </div>
              {/* Title */}
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "#000",
                  textTransform: "uppercase",
                  letterSpacing: "-0.5px",
                  marginBottom: 12,
                }}
              >
                {step.title}
              </div>
              {/* Text */}
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "13px",
                  color: "#000",
                  lineHeight: 1.7,
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

  return (
    <section id="faq" style={{ background: "#C0C0C0", padding: "96px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              textTransform: "uppercase",
              color: "#000",
              letterSpacing: "-2px",
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.35,
                delay: i * 0.05,
                ease: [0.17, 0.67, 0.83, 0.67],
              }}
            >
              <div
                style={{
                  border: "4px solid #000",
                  borderBottom: i < FAQS.length - 1 && open !== i ? "2px solid #000" : "4px solid #000",
                  background: open === i ? "#FFD700" : "#fff",
                  marginBottom: open === i ? 8 : 0,
                  boxShadow: open === i ? "8px 8px 0px #000" : "none",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "22px 28px",
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
                      fontSize: "18px",
                      color: "#000",
                      textTransform: "uppercase",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#000",
                      flexShrink: 0,
                      display: "inline-block",
                      transform: open === i ? "rotate(45deg)" : "none",
                      transition: "none",
                    }}
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <div
                    style={{
                      padding: "0 28px 24px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "14px",
                      color: "#000",
                      lineHeight: 1.75,
                      borderTop: "2px solid rgba(0,0,0,0.3)",
                      paddingTop: 20,
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
  const [form, setForm] = useState({ name: "", company: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  };

  return (
    <section id="order" style={{ background: "#000", padding: "96px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "stretch",
          }}
        >
          {/* Left banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] }}
            style={{
              background: "#111",
              border: "4px solid #333",
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  color: "#FF2A2A",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                ★ СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  color: "#FFD700",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  letterSpacing: "-2px",
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
                  fontSize: "14px",
                  color: "#C0C0C0",
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                Оставьте заявку — получите персональный прайс-лист и скидку 15%
                на первый заказ. Ответим в течение 24 часов.
              </div>

              {/* Win98-style progress bar */}
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  color: "#808080",
                  marginBottom: 8,
                  letterSpacing: "1px",
                }}
              >
                МЕСТ ДЛЯ НОВЫХ ПАРТНЁРОВ:
              </div>
              <div
                className="win98-inset"
                style={{
                  height: "22px",
                  background: "#333",
                  overflow: "hidden",
                  display: "flex",
                  gap: "2px",
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
                    background: "#FF2A2A",
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

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
            style={{
              background: "#fff",
              border: "4px solid #fff",
              padding: "40px",
              boxShadow: "8px 8px 0px #FF2A2A",
            }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: 300,
                  textAlign: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    background: "#00E5FF",
                    border: "4px solid #000",
                    boxShadow: "8px 8px 0px #000",
                    padding: "24px 32px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "36px",
                      textTransform: "uppercase",
                      color: "#000",
                      lineHeight: 1,
                    }}
                  >
                    ✓ ЗАЯВКА ПРИНЯТА
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "13px",
                      color: "#000",
                      marginTop: 12,
                    }}
                  >
                    Ответим в течение 24 часов.
                  </div>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "22px",
                    textTransform: "uppercase",
                    color: "#000",
                    borderBottom: "4px solid #000",
                    paddingBottom: 14,
                    marginBottom: 4,
                    letterSpacing: "-0.5px",
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
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <label
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "#000",
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
                        background: "#fff",
                        border: "4px solid #000",
                        padding: "14px 16px",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: "14px",
                        color: "#000",
                        outline: "none",
                        width: "100%",
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor =
                          "#FF2A2A";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor =
                          "#000";
                      }}
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="btn-brutal-red"
                  style={{ padding: "18px", fontSize: "20px", width: "100%", marginTop: 4 }}
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
                    fontSize: "11px",
                    color: "#808080",
                    textAlign: "center",
                    lineHeight: 1.5,
                  }}
                >
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a
                    href="#"
                    style={{ color: "#000", textDecoration: "underline" }}
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
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#C0C0C0",
        borderTop: "4px solid #000",
        padding: "48px 40px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            paddingBottom: 40,
            borderBottom: "4px solid #000",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "32px",
                letterSpacing: "-1px",
                color: "#000",
                marginBottom: 12,
              }}
            >
              РИМСК
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "12px",
                color: "#000",
                lineHeight: 1.7,
              }}
            >
              Замороженная римская пицца
              <br />
              для B2B-сегмента.
              <br />
              Производство — Москва.
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#000",
                marginBottom: 14,
                borderBottom: "2px solid #808080",
                paddingBottom: 8,
              }}
            >
              Контакты
            </div>
            {[
              { label: "Телефон", val: "+7 (495) 000-00-00" },
              { label: "Email", val: "b2b@rimsk.ru" },
              { label: "WhatsApp", val: "+7 (495) 000-00-00" },
            ].map((c) => (
              <div key={c.label} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
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
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: 500,
                  }}
                >
                  {c.val}
                </div>
              </div>
            ))}
          </div>

          {/* Legal info */}
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#000",
                marginBottom: 14,
                borderBottom: "2px solid #808080",
                paddingBottom: 8,
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
              <div key={c.label} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
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
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: 500,
                  }}
                >
                  {c.val}
                </div>
              </div>
            ))}
          </div>

          {/* Legal links */}
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "#000",
                marginBottom: 14,
                borderBottom: "2px solid #808080",
                paddingBottom: 8,
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
                  fontSize: "12px",
                  color: "#000",
                  textDecoration: "none",
                  marginBottom: 10,
                  borderBottom: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "#000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent";
                }}
              >
                {doc}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              color: "#666",
            }}
          >
            © 1998–{year} ООО «РИМСК». Все права защищены. Все цены указаны без
            НДС.
          </div>
          <div
            className="win98-inset"
            style={{
              background: "#C0C0C0",
              padding: "3px 10px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              color: "#000",
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
