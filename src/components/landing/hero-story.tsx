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

type FigurePair = {
  left: [number, string];
  right: [number, string];
};

const FREEZE: FigurePair = { left: [6, "месяцев"], right: [-18, "°C"] };
const BAKE: FigurePair = { left: [11, "минут"], right: [230, "°C"] };

/**
 * Числа набегают не по таймеру, а по самой прокрутке: пока идёт
 * появление, значение растёт от нуля к цели. Так отсчёт связан с
 * жестом пользователя и не зависит от кадров анимации.
 */
function Figures({
  data,
  opacity,
  count,
}: {
  data: FigurePair;
  opacity: number;
  count: number;
}) {
  const left = Math.round(data.left[0] * count);
  const right = Math.round(data.right[0] * count);

  return (
    <div
      className="hero-figures"
      style={{ opacity }}
      aria-hidden={opacity < 0.5}
    >
      <div className="hero-figure hero-figure-left">
        {left}
        <span className="hero-figure-unit"> {data.left[1]}</span>
      </div>
      <div className="hero-figure hero-figure-right">
        {right < 0 ? `−${Math.abs(right)}` : right}
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
  const applied = useRef({ dx: 0, dy: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const holder = stageRef.current?.querySelector(".hero-pizza-holder");
      if (!holder) return;
      const rect = holder.getBoundingClientRect();
      const naturalCenter = rect.left + rect.width / 2 - applied.current.dx;
      setShift(window.innerWidth / 2 - naturalCenter);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Акты: шапка → быстрый отъезд в центр с заморозкой → выдержка →
  // разморозка → полёт в первую карточку ассортимента.
  const travel = ramp(p, 0.1, 0.22);
  const chill = ramp(p, 0.12, 0.24) - ramp(p, 0.54, 0.72);
  const heat = ramp(p, 0.54, 0.72) - ramp(p, 0.84, 0.98);
  const leave = ramp(p, 0.78, 0.96);
  const vanish = ramp(p, 0.9, 1);

  const copyOpacity = 1 - ramp(p, 0.06, 0.18);
  const freezeFigures = ramp(p, 0.14, 0.24) - ramp(p, 0.48, 0.58);
  const bakeFigures = ramp(p, 0.56, 0.66) - ramp(p, 0.84, 0.94);
  const freezeCount = ramp(p, 0.14, 0.3);
  const bakeCount = ramp(p, 0.56, 0.72);

  // Куда лететь: центр медиа-области первой карточки товара. Мерим
  // каждый раз заново — карточка едет вместе со страницей.
  let dx = shift * travel;
  let dy = 0;
  let scale = 1 + travel * 0.18;

  if (leave > 0) {
    const holder = stageRef.current?.querySelector(".hero-pizza-holder");
    const target = document.querySelector(".lineup-card-media");
    if (holder && target) {
      const h = holder.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const naturalX = h.left + h.width / 2 - applied.current.dx;
      const naturalY = h.top + h.height / 2 - applied.current.dy;
      const toX = t.left + t.width / 2 - naturalX;
      const toY = t.top + t.height / 2 - naturalY;
      const toScale = Math.min(t.height / h.height, 1);

      dx = shift * travel + (toX - shift * travel) * leave;
      dy = toY * leave;
      scale = scale + (toScale - scale) * leave;
    }
  }

  applied.current = { dx, dy };

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
            "--pizza-fade": 1 - vanish,
          } as React.CSSProperties
        }
      >
        <HeroSection />

        <div className="hero-overlay">
          <Figures data={FREEZE} opacity={freezeFigures} count={freezeCount} />
          <Figures data={BAKE} opacity={bakeFigures} count={bakeCount} />
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
