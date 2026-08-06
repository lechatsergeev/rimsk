import React, { useEffect, useRef, useState } from "react";
import { BAKE_STEPS } from "@/content/brand";
import { useMounted } from "@/lib/use-mounted";

const PizzaModel = React.lazy(() =>
  import("@/components/blocks/hero-pizza-model").then((module) => ({
    default: module.HeroPizzaModel,
  }))
);

/**
 * Прогресс прокрутки внутри трека, 0..1.
 *
 * Считается по getBoundingClientRect на обычном слушателе scroll, без
 * IntersectionObserver: наблюдение за видимостью в некоторых средах
 * молчит, а тут вся сцена на него завязана.
 */
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Считаем прямо в обработчике, без throttle через rAF: одно чтение
    // rect на событие прокрутки, React обновления батчит. Промежуточный
    // rAF добавлял бы риск — в средах, где кадры не идут, прогресс
    // замирал бы вместе с ними.
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const raw = -rect.top / total;
      setProgress(Math.min(Math.max(raw, 0), 1));
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

const FROZEN = BAKE_STEPS[0];
const OVEN = BAKE_STEPS[1];
const DONE = BAKE_STEPS[2];

/**
 * Статичный список — то, что видит сервер, человек без JS и тот, кто
 * отключил анимации в системе. Сцена подключается поверх, после
 * монтирования, поэтому гидрация не расходится.
 */
function BakeStepsStatic() {
  return (
    <ol className="bake-steps">
      {BAKE_STEPS.map((item) => (
        <li key={item.step} className="bake-step">
          <div className="bake-step-name">{item.step}</div>
          <div className="bake-step-value">
            {item.prefix}
            {item.target}
            <span className="bake-step-unit"> {item.unit}</span>
          </div>
          <div className="bake-step-caption">{item.caption}</div>
        </li>
      ))}
    </ol>
  );
}

function BakeStage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(trackRef);

  // Температура ползёт от −18 к 230 в середине трека: это и есть
  // главный жест — перепад в 248 градусов за один проход.
  const heat = ramp(p, 0.18, 0.62);
  const temperature = Math.round(-18 + heat * 248);
  const finished = p > 0.72;

  // Продукт оттаивает: холодный обесцвеченный тон уходит в тёплый.
  const thaw = ramp(p, 0.12, 0.78);
  const modelFilter = `saturate(${(0.28 + thaw * 0.78).toFixed(2)}) brightness(${(
    1.14 -
    thaw * 0.14
  ).toFixed(2)}) contrast(${(0.92 + thaw * 0.12).toFixed(2)})`;

  const step = finished ? DONE : heat > 0.5 ? OVEN : FROZEN;

  return (
    <div ref={trackRef} className="bake-track">
      <div className="bake-stage">
        <div className="bake-scene-inner">
          <div className="bake-readout">
            <div className="bake-phase">{step.step}</div>
            <div className="bake-figure">
              {finished ? (
                <>
                  {DONE.target}
                  <span className="bake-figure-unit"> {DONE.unit}</span>
                </>
              ) : (
                <>
                  {temperature}
                  <span className="bake-figure-unit"> °C</span>
                </>
              )}
            </div>
            <div className="bake-note">{step.caption}</div>
          </div>

          <div className="bake-visual">
            {/* Иней уходит, жар приходит — оба слоя поверх модели. */}
            <div
              className="bake-frost"
              style={{ opacity: 1 - ramp(p, 0.1, 0.6) }}
              aria-hidden
            />
            <div
              className="bake-heat"
              style={{ opacity: ramp(p, 0.4, 0.85) }}
              aria-hidden
            />
            <div className="bake-model" style={{ filter: modelFilter }}>
              <React.Suspense fallback={<div className="bake-model-slot" />}>
                <PizzaModel
                  lowResOnly
                  targetSize={3}
                  className="relative z-[2] h-full w-full touch-none"
                />
              </React.Suspense>
            </div>
          </div>
        </div>

        <ol className="bake-ticks" aria-hidden>
          {BAKE_STEPS.map((item, index) => (
            <li
              key={item.step}
              className={`bake-tick${
                p >= [0, 0.35, 0.72][index] ? " is-passed" : ""
              }`}
            >
              {item.step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function BakeScene() {
  const mounted = useMounted();
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Только на широком экране. Закреплённая прокрутка на телефоне
    // отбирает управление у пальца и раздражает сильнее всего, а
    // выигрыш там наименьший — сцена не помещается в узкий экран.
    if (window.innerWidth < 768) return;
    setEnhanced(true);
  }, []);

  if (!mounted || !enhanced) return <BakeStepsStatic />;
  return <BakeStage />;
}
