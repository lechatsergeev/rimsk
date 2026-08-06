import { useEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/blocks/hero-section-1";
import { Marquee } from "@/components/landing/marquee";
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

type Flight = {
  active: boolean;
  vars: Record<string, string>;
};

/**
 * Перелёт продукта в карточку товара.
 *
 * Ведём его по положению самой карточки: как только она въезжает в
 * кадр снизу, продукт переходит в position: fixed, запоминает своё
 * место в координатах окна и едет к центру карточки, уменьшаясь до её
 * размера. Пока карточки не видно, полёт не начинается.
 */
function useFlight(
  stageRef: React.RefObject<HTMLDivElement | null>,
  p: number
): Flight {
  const [flight, setFlight] = useState<Flight>({ active: false, vars: {} });
  const originRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const holder = stageRef.current?.querySelector(
      ".hero-pizza-holder"
    ) as HTMLElement | null;
    const target = document.querySelector(".lineup-card-media");
    if (!holder || !target) return;

    const t = target.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 — карточка ещё под экраном, 1 — доехала до своего места.
    const entry = Math.min(Math.max((vh - t.top) / (vh * 0.85), 0), 1);

    if (entry <= 0 || p < 0.6) {
      originRef.current = null;
      setFlight({ active: false, vars: {} });
      return;
    }

    if (!originRef.current) {
      originRef.current = holder.getBoundingClientRect();
    }

    const from = originRef.current;
    const toScale = Math.min(t.height / from.height, 1);
    const left = from.left + (t.left + t.width / 2 - from.width / 2 - from.left) * entry;
    const top = from.top + (t.top + t.height / 2 - from.height / 2 - from.top) * entry;
    const scale = 1 + (toScale - 1) * entry;

    setFlight({
      active: true,
      vars: {
        "--fly-left": `${left.toFixed(1)}px`,
        "--fly-top": `${top.toFixed(1)}px`,
        "--fly-w": `${from.width}px`,
        "--fly-h": `${from.height}px`,
        "--fly-scale": scale.toFixed(3),
        "--fly-opacity": String(
          1 - Math.max(entry - 0.88, 0) / 0.12
        ),
      },
    });
  }, [p, stageRef]);

  return flight;
}

function HeroTrack({ marqueeText }: { marqueeText: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(trackRef);

  // Продукт остаётся на своём месте справа: отъезд в центр читался
  // как чужое движение, не связанное ни с чем на экране.
  const chill = ramp(p, 0.12, 0.24) - ramp(p, 0.54, 0.72);
  const heat = ramp(p, 0.54, 0.72) - ramp(p, 0.84, 0.98);

  const copyOpacity = 1 - ramp(p, 0.06, 0.18);
  const freezeFigures = ramp(p, 0.14, 0.24) - ramp(p, 0.48, 0.58);
  const bakeFigures = ramp(p, 0.56, 0.66) - ramp(p, 0.84, 0.94);
  const freezeCount = ramp(p, 0.14, 0.3);
  const bakeCount = ramp(p, 0.56, 0.72);

  // Полёт в карточку ведём не по прогрессу трека, а по тому, как сама
  // карточка въезжает в кадр. Пока сцена приклеена, карточки на экране
  // нет — лететь было бы некуда. Поэтому продукт на время полёта
  // переводится в position: fixed и живёт в координатах окна, а цель
  // измеряется на каждом обновлении. Тот же приём, что в GSAP Flip.
  const flight = useFlight(stageRef, p);

  const saturate = (1 - chill * 0.72 + heat * 0.16).toFixed(2);
  const brightness = (1 + chill * 0.14 - heat * 0.05).toFixed(2);
  const pizzaFilter = `saturate(${saturate}) brightness(${brightness})`;

  return (
    <div ref={trackRef} className="hero-track">
      <div
        ref={stageRef}
        className={`hero-stage${flight.active ? " is-flying" : ""}`}
        style={
          {
            "--hero-copy-opacity": copyOpacity,
            "--pizza-filter": pizzaFilter,
            ...flight.vars,
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

        {/* Внутри сцены, а не после трека: иначе строку было бы видно
            только через три экрана прокрутки. */}
        <div className="hero-marquee">
          <Marquee text={marqueeText} />
        </div>
      </div>
    </div>
  );
}

export function HeroStory({ marqueeText }: { marqueeText: string }) {
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
