import { useEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { useMounted } from "@/lib/use-mounted";

/**
 * Прогресс прокрутки внутри трека, 0..1.
 *
 * Считается прямо в обработчике scroll по getBoundingClientRect — без
 * IntersectionObserver и без throttle через requestAnimationFrame.
 * Оба этих механизма молчат в средах, где не идут кадры, и сцена
 * замирала бы целиком.
 */
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      setProgress(Math.min(Math.max(-rect.top / total, 0), 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  return progress;
}

/** Линейная интерполяция с зажимом на краях отрезка. */
function ramp(p: number, from: number, to: number) {
  if (p <= from) return 0;
  if (p >= to) return 1;
  return (p - from) / (to - from);
}

type Phase = {
  key: string;
  title: string;
  primary: { value: string; unit: string };
  secondary: { value: string; unit: string };
  note: string;
};

const PHASES: Phase[] = [
  {
    key: "freeze",
    title: "Заморозка",
    primary: { value: "6", unit: "месяцев" },
    secondary: { value: "−18", unit: "°C" },
    note: "Замораживаем сразу после выпечки и храним в морозильной камере.",
  },
  {
    key: "bake",
    title: "Печь",
    primary: { value: "11", unit: "минут" },
    secondary: { value: "230", unit: "°C" },
    note: "Допекается в домашней духовке, разогретой заранее.",
  },
];

function PhaseCard({ phase, opacity }: { phase: Phase; opacity: number }) {
  return (
    <div
      className="hero-phase"
      style={{ opacity, pointerEvents: opacity > 0.5 ? "auto" : "none" }}
      aria-hidden={opacity < 0.5}
    >
      <div className="hero-phase-title">{phase.title}</div>
      <div className="hero-phase-figures">
        <div className="hero-phase-figure">
          {phase.primary.value}
          <span className="hero-phase-unit"> {phase.primary.unit}</span>
        </div>
        <div className="hero-phase-figure">
          {phase.secondary.value}
          <span className="hero-phase-unit"> {phase.secondary.unit}</span>
        </div>
      </div>
      <p className="hero-phase-note">{phase.note}</p>
    </div>
  );
}

function HeroTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(trackRef);

  // Три акта: обычная пицца → заморозка → печь. Первый занимает
  // заметную часть трека, чтобы первый экран успел прочитаться.
  const freeze = ramp(p, 0.16, 0.4);
  const leaveFreeze = ramp(p, 0.52, 0.68);
  const bake = ramp(p, 0.56, 0.82);

  const copyOpacity = 1 - ramp(p, 0.1, 0.3);
  const frost = freeze - leaveFreeze;
  const heat = bake;

  // Продукт стынет, потом отогревается.
  const chill = frost;
  const warm = heat;
  const saturate = (1 - chill * 0.7 + warm * 0.18).toFixed(2);
  const brightness = (1 + chill * 0.12 - warm * 0.04).toFixed(2);
  const pizzaFilter = `saturate(${saturate}) brightness(${brightness})`;

  return (
    <div ref={trackRef} className="hero-track">
      <div
        className="hero-stage"
        style={
          {
            "--hero-copy-opacity": copyOpacity,
            "--pizza-filter": pizzaFilter,
          } as React.CSSProperties
        }
      >
        <HeroSection />

        <div className="hero-overlay">
          <PhaseCard phase={PHASES[0]} opacity={frost} />
          <PhaseCard phase={PHASES[1]} opacity={heat} />
        </div>

        <div
          className="hero-frost"
          style={{ opacity: frost * 0.9 }}
          aria-hidden
        />
        <div className="hero-heat" style={{ opacity: heat * 0.85 }} aria-hidden />
      </div>
    </div>
  );
}

export function HeroStory() {
  const mounted = useMounted();
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Только широкий экран: закреплённая прокрутка на телефоне отбирает
    // управление у пальца, а сцена в узкий экран не помещается.
    if (window.innerWidth < 768) return;
    setEnhanced(true);
  }, []);

  // Сервер, отсутствие JS, отключённые анимации и телефон получают
  // обычный первый экран — ровно такой, каким он был.
  if (!mounted || !enhanced) return <HeroSection />;
  return <HeroTrack />;
}
