import { type CSSProperties, Suspense, lazy, useEffect, useState } from "react";

const HorecaPage = lazy(() => import("./HorecaPage"));
const RetailPage = lazy(() => import("./RetailPage"));

type Segment = "horeca" | "retail";

type SegmentCard = {
  id: Segment;
  label: string;
};

const SEGMENTS: SegmentCard[] = [
  {
    id: "horeca",
    label: "Хорека",
  },
  {
    id: "retail",
    label: "Ритейл",
  },
];

function readSegmentFromUrl(): Segment | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = new URLSearchParams(window.location.search).get("segment");
  return value === "horeca" || value === "retail" ? value : null;
}

function writeSegmentToUrl(segment: Segment | null) {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  if (segment) {
    url.searchParams.set("segment", segment);
  } else {
    url.searchParams.delete("segment");
  }

  window.history.replaceState({}, "", url);
}

function SegmentEntryScreen({
  onSelect,
}: {
  onSelect: (segment: Segment) => void;
}) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        alignItems: "center",
        padding: "32px 20px",
        background:
          "radial-gradient(circle at 50% 0%, rgba(217,92,60,0.18), transparent 28%), linear-gradient(180deg, #f4efe7 0%, #ffffff 68%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 24,
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 820 }}>
            <div
              style={{
                fontFamily: "'Martian Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#d95c3c",
                marginBottom: 20,
              }}
            >
              Римская пицца для бизнеса
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: "'Martian Grotesk', sans-serif",
                fontSize: "clamp(44px, 8vw, 92px)",
                lineHeight: 0.88,
                letterSpacing: "-0.08em",
                color: "#1a1d20",
              }}
            >
              Римская пицца
              <br />
              для бизнеса
            </h1>
            <p
              style={{
                margin: "24px auto 0",
                maxWidth: 580,
                fontFamily: "'Martian Mono', monospace",
                fontSize: 14,
                lineHeight: 1.8,
                color: "rgba(26,29,32,0.72)",
              }}
            >
              Замороженная римская пицца для точек, которым нужно быстрое горячее
              предложение без лишней операционки.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: 20,
              width: "100%",
              justifyItems: "center",
              marginTop: 8,
            }}
          >
            <div
              style={{
                fontFamily: "'Martian Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#1a1d20",
              }}
            >
              А вы откуда?
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 12,
              }}
            >
              {SEGMENTS.map((segment) => (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => onSelect(segment.id)}
                  style={{
                    minWidth: 190,
                    padding: "18px 26px",
                    borderRadius: 999,
                    border: "1px solid #1a1d20",
                    background: segment.id === "horeca" ? "#1a1d20" : "#ffffff",
                    color: segment.id === "horeca" ? "#ffffff" : "#1a1d20",
                    cursor: "pointer",
                    fontFamily: "'Martian Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    boxShadow: "0 18px 44px rgba(26,29,32,0.1)",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-3px)";
                    event.currentTarget.style.boxShadow =
                      "0 24px 52px rgba(26,29,32,0.16)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.boxShadow =
                      "0 18px 44px rgba(26,29,32,0.1)";
                  }}
                >
                  {segment.label}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <span style={chipStyle}>8 минут до подачи</span>
              <span style={chipStyle}>B2B поставки</span>
              <span style={chipStyle}>Две отдельные страницы</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SegmentSwitch({
  activeSegment,
  onSelect,
  onReset,
}: {
  activeSegment: Segment;
  onSelect: (segment: Segment) => void;
  onReset: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        zIndex: 90,
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          gap: 6,
          padding: 6,
          borderRadius: 999,
          border: "1px solid rgba(26,29,32,0.16)",
          background: "rgba(255,255,255,0.86)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 16px 38px rgba(26,29,32,0.12)",
        }}
      >
        {SEGMENTS.map((segment) => {
          const isActive = activeSegment === segment.id;

          return (
            <button
              key={segment.id}
              type="button"
              onClick={() => onSelect(segment.id)}
              style={{
                border: "none",
                borderRadius: 999,
                padding: "10px 14px",
                background: isActive ? "#1a1d20" : "transparent",
                color: isActive ? "#ffffff" : "#1a1d20",
                cursor: "pointer",
                fontFamily: "'Martian Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {segment.id === "horeca" ? "Хорека" : "Ретейл"}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onReset}
        style={{
          border: "1px solid rgba(26,29,32,0.16)",
          borderRadius: 999,
          padding: "10px 14px",
          background: "rgba(255,255,255,0.86)",
          color: "#1a1d20",
          cursor: "pointer",
          fontFamily: "'Martian Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          backdropFilter: "blur(12px)",
          boxShadow: "0 16px 38px rgba(26,29,32,0.12)",
        }}
      >
        К выбору
      </button>
    </div>
  );
}

const chipStyle: CSSProperties = {
  padding: "8px 10px",
  border: "1px solid rgba(26,29,32,0.14)",
  borderRadius: 999,
  background: "rgba(255,255,255,0.72)",
};

export default function App() {
  const [activeSegment, setActiveSegment] = useState<Segment | null>(() =>
    readSegmentFromUrl()
  );

  useEffect(() => {
    writeSegmentToUrl(activeSegment);
  }, [activeSegment]);

  const ActivePage =
    activeSegment === "horeca"
      ? HorecaPage
      : activeSegment === "retail"
        ? RetailPage
        : null;

  const handleSelect = (segment: Segment) => {
    setActiveSegment(segment);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setActiveSegment(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    ActivePage ? (
      <>
        <SegmentSwitch
          activeSegment={activeSegment}
          onSelect={handleSelect}
          onReset={handleReset}
        />
        <Suspense fallback={<SegmentLoadingScreen />}>
          <ActivePage />
        </Suspense>
      </>
    ) : (
      <SegmentEntryScreen onSelect={handleSelect} />
    )
  );
}

function SegmentLoadingScreen() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
        background:
          "radial-gradient(circle at 50% 0%, rgba(217,92,60,0.18), transparent 28%), linear-gradient(180deg, #f4efe7 0%, #ffffff 68%)",
      }}
    >
      <div
        style={{
          fontFamily: "'Martian Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#1a1d20",
        }}
      >
        Открываем страницу сегмента
      </div>
    </section>
  );
}
