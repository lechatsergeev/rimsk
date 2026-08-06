const INK = "#1A1D20";

/**
 * Вынесена из shared.tsx отдельным файлом: сцена первого экрана
 * показывает её внутри себя, а shared импортирует саму сцену —
 * без разделения получился бы кольцевой импорт.
 */
export function Marquee({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "var(--signal)",
        overflow: "hidden",
        borderTop: `1px solid ${INK}`,
        borderBottom: `1px solid ${INK}`,
        padding: "10px 0",
      }}
    >
      <div
        className="marquee-track"
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
      >
        <span
          style={{
            color: INK,
            fontFamily: "'LT Amber', sans-serif",
            fontWeight: 400,
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
