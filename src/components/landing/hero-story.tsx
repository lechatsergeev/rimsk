import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/blocks/hero-section-1";
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

const FREEZE = { left: ["6", "месяцев"], right: ["−18", "°C"] };
const BAKE = { left: ["11", "минут"], right: ["230", "°C"] };

function Figures({
  data,
  opacity,
}: {
  data: typeof FREEZE;
  opacity: number;
}) {
  return (
    <div
      className="hero-figures"
      style={{ opacity }}
      aria-hidden={opacity < 0.5}
    >
      <div className="hero-figure hero-figure-left">
        {data.left[0]}
        <span className="hero-figure-unit"> {data.left[1]}</span>
      </div>
      <div className="hero-figure hero-figure-right">
        {data.right[0]}
        <span className="hero-figure-unit"> {data.right[1]}</span>
      </div>
    </div>
  );
}

function HeroTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(trackRef);

  // Сколько пикселей до центра экрана. Меряем реальное положение
  // продукта, а не прикидываем в vw: колонка съезжает по-разному на
  // разных ширинах. Смещение, уже applied, вычитаем — иначе замер
  // поплывёт на второй итерации.
  const [shift, setShift] = useState(0);
  const appliedRef = useRef(0);

  useLayoutEffect(() => {
    const measure = () => {
      const holder = stageRef.current?.querySelector(".hero-pizza-holder");
      if (!holder) return;
      const rect = holder.getBoundingClientRect();
      const naturalCenter = rect.left + rect.width / 2 - appliedRef.current;
      setShift(window.innerWidth / 2 - naturalCenter);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Акты: шапка → отъезд в центр с заморозкой → выдержка →
  // разморозка → улёт вниз, к ассортименту.
  const travel = ramp(p, 0.12, 0.36);
  const chill = ramp(p, 0.14, 0.36) - ramp(p, 0.56, 0.76);
  const heat = ramp(p, 0.56, 0.78) - ramp(p, 0.86, 1);
  const leave = ramp(p, 0.84, 1);

  const copyOpacity = 1 - ramp(p, 0.08, 0.26);
  const freezeFigures = ramp(p, 0.2, 0.34) - ramp(p, 0.5, 0.6);
  const bakeFigures = ramp(p, 0.58, 0.7) - ramp(p, 0.88, 1);

  const dx = shift * travel;
  appliedRef.current = dx;

  const scale = 1 + travel * 0.16 - leave * 0.5;
  const dy = leave * window.innerHeight * 0.55;
  const pizzaTransform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(
    1
  )}px, 0) scale(${scale.toFixed(3)})`;

  const saturate = (1 - chill * 0.72 + heat * 0.16).toFixed(2);
  const brightness = (1 + chill * 0.14 - heat * 0.05).toFixed(2);
  const pizzaFilter = `saturate(${saturate}) brightness(${brightness})`;

  return (
    <div ref={trackRef} className="hero-track">
      <div
        ref={stageRef}
        className="hero-stage"
        style={
          {
            "--hero-copy-opacity": copyOpacity,
            "--pizza-transform": pizzaTransform,
            "--pizza-filter": pizzaFilter,
            "--pizza-fade": 1 - leave,
          } as React.CSSProperties
        }
      >
        <HeroSection />

        <div className="hero-overlay">
          <Figures data={FREEZE} opacity={freezeFigures} />
          <Figures data={BAKE} opacity={bakeFigures} />
        </div>

        <div
          className="hero-frost"
          style={{ opacity: Math.max(chill, 0) * 0.9 }}
          aria-hidden
        />
        <div
          className="hero-heat"
          style={{ opacity: Math.max(heat, 0) * 0.8 }}
          aria-hidden
        />
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
    // управление у пальца, а числа по бокам туда не помещаются.
    if (window.innerWidth < 768) return;
    setEnhanced(true);
  }, []);

  // Сервер, отсутствие JS, отключённые анимации и телефон получают
  // обычный первый экран — ровно такой, каким он был.
  if (!mounted || !enhanced) return <HeroSection />;
  return <HeroTrack />;
}
