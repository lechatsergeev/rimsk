import { type CSSProperties, type ReactNode, useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { HeroSection } from "@/components/blocks/hero-section-1";

export const C = {
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

export const CONTACT_EMAIL = "b2b@rimsk.ru";

export type SideFact = {
  value: string;
  label: string;
};

export function useBreakpoint() {
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

function Marquee({ text }: { text: string }) {
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
            fontFamily: "'IBM Plex Serif', serif",
            fontWeight: 600,
            fontSize: "19px",
            letterSpacing: "-0.045em",
            color: C.black,
            textDecoration: "none",
            textTransform: "uppercase",
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
            style={{
              padding: "3px 10px",
              fontFamily: "'Martian Mono', monospace",
              fontSize: "11px",
              color: C.black,
              background: C.white,
              border: `1px solid ${C.black}`,
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

function Hero({ marqueeText }: { marqueeText: string }) {
  return (
    <>
      <HeroSection />
      <div style={{ marginTop: 0 }}>
        <Marquee text={marqueeText} />
      </div>
    </>
  );
}

export function SectionHeader({
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
            color: C.black,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function SideFactoid({
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
      <div style={{ borderTop: `1px solid ${C.gray}`, paddingTop: 12 }}>
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
            color: C.black,
          }}
        >
          {fact.label}
        </div>
      </div>
    </aside>
  );
}

function Footer({ description }: { description: ReactNode }) {
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
                  fontFamily: "'IBM Plex Serif', serif",
                  fontWeight: 600,
                  fontSize: "25px",
                  letterSpacing: "-0.045em",
                  color: C.black,
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                РИМСК
              </div>
              <div
                style={{
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: "12px",
                  color: C.black,
                  lineHeight: 1.75,
                  maxWidth: "30ch",
                }}
              >
                {description}
              </div>
            </div>

            <div>
              <div style={footerTitleStyle}>Контакты</div>
              <div style={footerHelperStyle}>Для тестовой поставки и B2B-вопросов</div>
              {[
                { label: "Телефон", val: "+7 (812) 000-00-00", href: "tel:+78120000000" },
                { label: "Email", val: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                { label: "WhatsApp", val: "+7 (812) 000-00-00", href: "https://wa.me/78120000000" },
              ].map((c) => (
                <div key={c.label} style={{ marginBottom: 9 }}>
                  <div style={footerLabelStyle}>{c.label}</div>
                  <a href={c.href} style={footerLinkStyle}>
                    {c.val}
                  </a>
                </div>
              ))}
            </div>

            <div>
              <div style={footerTitleStyle}>Юр. лицо</div>
              {[
                { label: "Компания", val: 'ООО "РИМСК"' },
                { label: "ИНН", val: "7700000000" },
                { label: "ОГРН", val: "1000000000000" },
                { label: "Адрес", val: "г. Санкт-Петербург, ул. Пример, д. 1" },
              ].map((c) => (
                <div key={c.label} style={{ marginBottom: 9 }}>
                  <div style={footerLabelStyle}>{c.label}</div>
                  <div style={footerTextStyle}>{c.val}</div>
                </div>
              ))}
            </div>

            {!isMobile && (
              <div>
                <div style={footerTitleStyle}>Документы</div>
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
                      color: C.black,
                      textDecoration: "none",
                      marginBottom: 9,
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
                color: C.black,
              }}
            >
              © 1998–{year} ООО «РИМСК». Все права защищены. Все цены указаны без НДС.
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

const footerTitleStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
  fontSize: "10px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: C.black,
  marginBottom: 14,
  borderBottom: `1px solid ${C.gray}`,
  paddingBottom: 7,
};

const footerHelperStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
  fontSize: "10px",
  lineHeight: 1.6,
  color: C.black,
  marginBottom: 12,
};

const footerLabelStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
  fontSize: "9px",
  color: C.black,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const footerLinkStyle: CSSProperties = {
  display: "inline-block",
  fontFamily: "'Martian Mono', monospace",
  fontSize: "12px",
  color: C.black,
  fontWeight: 700,
  textDecoration: "none",
};

const footerTextStyle: CSSProperties = {
  fontFamily: "'Martian Mono', monospace",
  fontSize: "11px",
  color: C.black,
  fontWeight: 500,
};

export function LandingPageShell({
  children,
  marqueeText,
  footerDescription,
}: {
  children: ReactNode;
  marqueeText: string;
  footerDescription: ReactNode;
}) {
  return (
    <div id="top" style={{ minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <main>
          <Hero marqueeText={marqueeText} />
          {children}
        </main>
        <Footer description={footerDescription} />
      </div>
    </div>
  );
}
