import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { motion } from "motion/react";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { Marquee } from "@/components/landing/marquee";
import { getRouteHref } from "@/app/routes";
import {
  BRAND_NAME_UPPER,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
} from "@/content/brand";

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

export type SideFact = {
  value: string;
  label: string;
};

/**
 * Ширина окна для нераскладочных решений.
 *
 * Первый рендер обязан совпасть с серверным, иначе React оставит серверные
 * inline-стили как есть (в проде он расхождения в атрибутах не чинит) и
 * десктопная раскладка залипнет на телефоне. Поэтому стартуем с той же
 * заглушки, что и на сервере, а настоящую ширину берём после монтирования.
 *
 * Раскладку на этом хуке строить нельзя — только CSS: иначе на мобильном
 * будет виден скачок с десктопного макета на мобильный.
 */
export function useBreakpoint() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const resolved = width ?? 1200;
  return { isMobile: resolved < 768, isTablet: resolved < 1024 };
}

/**
 * Первый экран во всю ширину и без прикрас: презентация переехала
 * ниже, в сплит, и делить с ней шапку больше не нужно.
 */
function Hero({ marqueeText }: { marqueeText: string }) {
  return (
    <>
      <HeroSection />
      <Marquee text={marqueeText} />
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
            fontFamily: "'LT Amber', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
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
            fontFamily: "'LT Amber', sans-serif",
            fontSize: isMobile ? "30px" : "42px",
            fontWeight: 400,
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
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
            fontFamily: "'LT Amber', sans-serif",
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
            fontFamily: "'LT Amber', sans-serif",
            fontSize: isMobile ? "34px" : "56px",
            fontWeight: 400,
            lineHeight: 0.88,
            letterSpacing: "-0.03em",
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
            fontFamily: "'LT Amber', sans-serif",
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

export const LEGAL_FIELDS = ["Компания", "ИНН", "ОГРН", "Адрес"];

/**
 * Реквизитов пока нет — ИП не зарегистрирован. Блок остаётся на месте,
 * значения прочерками, сверху полупрозрачная плашка с объяснением.
 */
export function PendingDocs({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      <div aria-hidden style={{ opacity: 0.45 }}>
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          border: `1px solid ${C.gray}`,
          borderRadius: 12,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'LT Amber', sans-serif",
            fontSize: "10px",
            lineHeight: 1.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: C.black,
          }}
        >
          Оформляем документы
        </span>
      </div>
    </div>
  );
}

function Footer({ description }: { description: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="site-footer"
      style={{
        background: "var(--paper)",
        borderTop: `1px solid ${C.black}`,
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1200px)",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div>
          <div
            className="footer-cols"
            style={{ borderBottom: `1px solid ${C.black}` }}
          >
            <div className="footer-brand">
              <div
                style={{
                  fontFamily: "'Libertinus Sans', serif",
                  fontWeight: 700,
                  fontSize: "25px",
                  letterSpacing: "0.025em",
                  color: C.black,
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                {BRAND_NAME_UPPER}
              </div>
              <div
                style={{
                  fontFamily: "'LT Amber', sans-serif",
                  fontSize: "12px",
                  color: C.black,
                  lineHeight: 1.75,
                  maxWidth: "30ch",
                }}
              >
                {description}
              </div>
            </div>

            <div id="contacts">
              <div style={footerTitleStyle}>Контакты</div>
              <div style={footerHelperStyle}>Вопросы по продукту, составу и документам</div>
              {[
                { label: "Телефон", val: CONTACT_PHONE, href: CONTACT_PHONE_HREF },
                { label: "Email", val: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                { label: "WhatsApp", val: CONTACT_PHONE, href: CONTACT_WHATSAPP_HREF },
              ].map((c) => (
                <div key={c.label} style={{ marginBottom: 9 }}>
                  <div style={footerLabelStyle}>{c.label}</div>
                  <a href={c.href} style={footerLinkStyle}>
                    {c.val}
                  </a>
                </div>
              ))}
            </div>

            <div id="delivery">
              <div style={footerTitleStyle}>Доставка</div>
              <div style={footerHelperStyle}>Рабочие условия и география поставки</div>
              {[
                { label: "Регион", val: "Санкт-Петербург и область" },
                { label: "Формат", val: "По согласованию с клиентом" },
                { label: "Старт", val: "После подтверждения заявки" },
              ].map((c) => (
                <div key={c.label} style={{ marginBottom: 9 }}>
                  <div style={footerLabelStyle}>{c.label}</div>
                  <div style={footerTextStyle}>{c.val}</div>
                </div>
              ))}
            </div>

            <div id="certificates">
              <div style={footerTitleStyle}>Сертификаты</div>
              <div style={footerHelperStyle}>Документы и декларации по запросу</div>
              {[
                { label: "Декларации", val: "Отправим по email" },
                { label: "Состав", val: "По каждой позиции отдельно" },
                { label: "Запрос", val: CONTACT_EMAIL },
              ].map((c) => (
                <div key={c.label} style={{ marginBottom: 9 }}>
                  <div style={footerLabelStyle}>{c.label}</div>
                  {c.label === "Запрос" ? (
                    <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Запрос документов")}`} style={footerLinkStyle}>
                      {c.val}
                    </a>
                  ) : (
                    <div style={footerTextStyle}>{c.val}</div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div style={footerTitleStyle}>Юр. лицо</div>
              <PendingDocs>
                {LEGAL_FIELDS.map((label) => (
                  <div key={label} style={{ marginBottom: 9 }}>
                    <div style={footerLabelStyle}>{label}</div>
                    <div style={footerTextStyle}>—</div>
                  </div>
                ))}
              </PendingDocs>
            </div>
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
                fontFamily: "'LT Amber', sans-serif",
                fontSize: "10px",
                color: C.black,
              }}
            >
              © {year} {BRAND_NAME_UPPER}. Замороженная римская пицца, Санкт-Петербург.
            </div>
            <div
              style={{
                border: `1px solid ${C.gray}`,
                padding: "4px 10px",
                fontFamily: "'LT Amber', sans-serif",
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

type SubpageLink = {
  label: string;
  href: string;
};

export function EditorialPageShell({
  children,
  title,
  eyebrow,
  description,
  footerDescription,
}: {
  children: ReactNode;
  title: string;
  eyebrow: string;
  description: string;
  footerDescription: ReactNode;
}) {
  return (
    <div id="top" style={{ minHeight: "100vh", position: "relative", background: "var(--paper)" }}>
      <SubpageHeader />
      <main
        style={{
          padding: "108px 20px 0",
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <section
            style={{
              paddingBottom: 40,
              borderBottom: `1px solid ${C.black}`,
            }}
          >
            <div
              style={{
                fontFamily: "'LT Amber', sans-serif",
                fontSize: 11,
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: C.black,
              }}
            >
              {eyebrow}
            </div>
            <h1
              style={{
                margin: "18px 0 0",
                maxWidth: "11ch",
                fontFamily: "'LT Amber', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(42px, 7vw, 92px)",
                lineHeight: 0.88,
                letterSpacing: "-0.035em",
                color: C.black,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                margin: "18px 0 0",
                maxWidth: "58ch",
                fontFamily: "'LT Amber', sans-serif",
                fontSize: 13,
                lineHeight: 1.8,
                color: C.black,
              }}
            >
              {description}
            </p>
          </section>
          <div style={{ padding: "28px 0 56px" }}>{children}</div>
        </div>
      </main>
      <Footer description={footerDescription} />
    </div>
  );
}

function SubpageHeader() {
  const links: SubpageLink[] = [
    { label: "Главная", href: getRouteHref("/") },
    { label: "Доставка", href: getRouteHref("/delivery") },
    { label: "Сертификаты", href: getRouteHref("/certificates") },
    { label: "Контакты", href: getRouteHref("/contacts") },
  ];

  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        zIndex: 110,
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.black}`,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <a
          href={getRouteHref("/")}
          style={{
            fontFamily: "'Libertinus Sans', serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "0.025em",
            color: C.black,
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          {BRAND_NAME_UPPER}
        </a>
        <nav className="subpage-nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'LT Amber', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                color: C.black,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

const footerTitleStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: "10px",
  fontWeight: 400,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: C.black,
  marginBottom: 14,
  borderBottom: `1px solid ${C.gray}`,
  paddingBottom: 7,
};

const footerHelperStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: "10px",
  lineHeight: 1.6,
  color: C.black,
  marginBottom: 12,
};

const footerLabelStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
  fontSize: "9px",
  color: C.black,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const footerLinkStyle: CSSProperties = {
  display: "inline-block",
  fontFamily: "'LT Amber', sans-serif",
  fontSize: "12px",
  color: C.black,
  fontWeight: 400,
  textDecoration: "none",
};

const footerTextStyle: CSSProperties = {
  fontFamily: "'LT Amber', sans-serif",
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
