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

/**
 * Номер шага по прогрессу прокрутки.
 *
 * Сцена идёт состояниями, а не плавно за колесом: внутри шага все
 * значения зафиксированы, а переход между шагами делает CSS за своё
 * время. Иначе при медленной прокрутке ничего не двигалось, а при
 * быстрой числа пролетали так, что их не прочесть.
 */
const STEP_AT = [0, 0.26, 0.54, 0.82];

function stepFor(p: number) {
  let step = 0;
  for (let i = 0; i < STEP_AT.length; i += 1) {
    if (p >= STEP_AT[i]) step = i;
  }
  return step;
}

/**
 * Отсчёт числа при входе в шаг. Длительность фиксированная, поэтому
 * скорость прокрутки на читаемость не влияет. Страховка таймером: если
 * кадры не идут, значение всё равно встанет на место.
 */
function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const duration = 700;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    setValue(0);
    frame = requestAnimationFrame(tick);
    const safety = window.setTimeout(() => setValue(target), duration + 120);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(safety);
      // Шаг может смениться до конца отсчёта — тогда число застыло бы
      // на промежуточном значении или на нуле.
      setValue(target);
    };
  }, [active, target]);

  return value;
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
  visible,
}: {
  data: FigurePair;
  visible: boolean;
}) {
  const left = useCountUp(data.left[0], visible);
  const right = useCountUp(data.right[0], visible);
  const opacity = visible ? 1 : 0;

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

  // Шаг: 0 — шапка, 1 — заморозка, 2 — печь, 3 — готово.
  // Внутри шага значения не меняются, поэтому числа всегда читаются,
  // а плавность даёт CSS-переход, а не скорость колеса.
  const step = stepFor(p);

  const chill = step === 1 ? 1 : 0;
  const heat = step === 2 ? 1 : 0;
  const copyOpacity = step === 0 ? 1 : 0;

  // Продукт остаётся справа: отъезд в центр читался как чужое
  // движение, не связанное ни с чем на экране. Обесцвечиваем умеренно —
  // при сильном пицца выглядела серым тестом, а не замороженной.

  // Полёт в карточку ведём не по прогрессу трека, а по тому, как сама
  // карточка въезжает в кадр. Пока сцена приклеена, карточки на экране
  // нет — лететь было бы некуда. Поэтому продукт на время полёта
  // переводится в position: fixed и живёт в координатах окна, а цель
  // измеряется на каждом обновлении. Тот же приём, что в GSAP Flip.
  const flight = useFlight(stageRef, p);

  const saturate = (1 - chill * 0.38 + heat * 0.14).toFixed(2);
  const brightness = (1 + chill * 0.1 - heat * 0.04).toFixed(2);
  const pizzaFilter = `saturate(${saturate}) brightness(${brightness})`;

  return (
    <div ref={trackRef} className="hero-track">
      <div
        ref={stageRef}
        className={`hero-stage${step > 0 ? " is-transformed" : ""}${
          flight.active ? " is-flying" : ""
        }`}
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
          <Figures data={FREEZE} visible={step === 1} />
          <Figures data={BAKE} visible={step === 2} />
        </div>

        <div
          className="hero-frost"
          style={{ opacity: chill * 0.85 }}
          aria-hidden
        />
        <div
          className="hero-heat"
          style={{ opacity: heat * 0.8 }}
          aria-hidden
        />

        {/* Внутри сцены, а не после трека: иначе строку было бы видно
            только через три экрана прокрутки. */}
        <div className="hero-marquee">
          <Marquee text={marqueeText} />
        </div>
      </div>

      {/* Точки прилипания — по одной на шаг. Без них прокрутка идёт
          насквозь и остановок не чувствуется: значения-то менялись
          ступенями, а сам скролл оставался непрерывным. */}
      <div className="hero-snaps" aria-hidden>
        {STEP_AT.map((at) => (
          <div key={at} className="hero-snap" />
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
