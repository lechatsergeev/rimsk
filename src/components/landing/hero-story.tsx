import { useEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { Marquee } from "@/components/landing/marquee";
import { PizzaQueue } from "@/components/landing/pizza-queue";
import { STAGES } from "@/content/stages";
import { useMounted } from "@/lib/use-mounted";

/**
 * Прогресс прокрутки внутри трека, 0..1.
 *
 * Считается прямо в обработчике scroll по getBoundingClientRect — без
 * IntersectionObserver и без throttle через requestAnimationFrame:
 * оба механизма молчат в средах, где не идут кадры, и сцена замирала
 * бы целиком.
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

      // Прилипание держим включённым, только пока сцена занимает кадр.
      const inScene = rect.top <= 1 && rect.bottom > window.innerHeight;
      document.documentElement.classList.toggle("is-stepping", inScene);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.documentElement.classList.remove("is-stepping");
    };
  }, [ref]);

  return progress;
}

/** Шаг 0 — первый экран, дальше по стадии на шаг. */
const STEP_COUNT = STAGES.length + 1;

function stepFor(p: number) {
  return Math.min(Math.floor(p * STEP_COUNT), STEP_COUNT - 1);
}

function HeroTrack({ marqueeText }: { marqueeText: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(trackRef);
  const step = stepFor(p);

  // На первом экране показываем готовый продукт — то, что лежит на
  // полке. Дальше рассказ отматывает назад: тесто, формовка, печь,
  // заморозка, и очередь возвращается к тому же кадру.
  const stage = step === 0 ? null : STAGES[step - 1];
  const active = step === 0 ? STAGES.length - 1 : step - 1;
  const bg = stage ? stage.bg : STAGES[STAGES.length - 1].bg;
  const ink = stage ? stage.ink : STAGES[STAGES.length - 1].ink;

  return (
    <div ref={trackRef} className="hero-track">
      <div
        className={`hero-stage${step > 0 ? " is-transformed" : ""}`}
        style={
          {
            "--hero-copy-opacity": step === 0 ? 1 : 0,
            "--stage-a": bg[0],
            "--stage-b": bg[1],
            "--stage-ink": ink,
          } as React.CSSProperties
        }
      >
        <HeroSection />

        <div className="stage-overlay">
          {STAGES.map((s, i) => (
            <div
              key={s.key}
              className="stage-card"
              style={{ opacity: step === i + 1 ? 1 : 0 }}
              aria-hidden={step !== i + 1}
            >
              <div className="stage-index">
                {s.index} / {String(STAGES.length).padStart(2, "0")}
              </div>
              <h2 className="stage-title">{s.title}</h2>
              <p className="stage-note">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="stage-queue">
          <PizzaQueue active={active} />
        </div>

        {/* Внутри сцены, а не после трека: иначе строку было бы видно
            только через все шаги прокрутки. */}
        <div className="hero-marquee">
          <Marquee text={marqueeText} />
        </div>
      </div>

      {/* Точки прилипания — по одной на шаг. Без них прокрутка идёт
          насквозь и остановок не чувствуется. */}
      <div className="hero-snaps" aria-hidden>
        {Array.from({ length: STEP_COUNT }).map((_, i) => (
          <div key={i} className="hero-snap" />
        ))}
      </div>
    </div>
  );
}

export function HeroStory({ marqueeText }: { marqueeText: string }) {
  const mounted = useMounted();
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnhanced(true);
  }, []);

  // Сервер, отсутствие JS и отключённые анимации получают обычный
  // первый экран — ровно такой, каким он был.
  if (!mounted || !enhanced) {
    return (
      <>
        <HeroSection />
        <Marquee text={marqueeText} />
      </>
    );
  }

  return <HeroTrack marqueeText={marqueeText} />;
}
