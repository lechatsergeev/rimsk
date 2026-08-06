import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { BAKE_STEPS } from "@/content/brand";

/**
 * Отсчёт числа при появлении блока.
 *
 * Изначально возвращает финальное значение — так его видит и сервер, и
 * первый клиентский рендер, поэтому гидрация не расходится и число стоит
 * в статике даже без JS. Анимация запускается только после монтирования,
 * когда блок попал в кадр, и молчит при prefers-reduced-motion.
 */
function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic: быстрый разгон, мягкая остановка
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value ?? target;
}

function Step({
  data,
  active,
  index,
}: {
  data: (typeof BAKE_STEPS)[number];
  active: boolean;
  index: number;
}) {
  const value = useCountUp(data.target, active);

  return (
    <li className="bake-step" style={{ transitionDelay: `${index * 90}ms` }}>
      <div className="bake-step-name">{data.step}</div>
      <div className="bake-step-value">
        {data.prefix}
        {value}
        <span className="bake-step-unit"> {data.unit}</span>
      </div>
      <div className="bake-step-caption">{data.caption}</div>
    </li>
  );
}

export function BakeSteps() {
  const ref = useRef<HTMLOListElement>(null);
  // Штатный хук motion: на нём же построено появление секций, так что
  // механика проверена в этом проекте.
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [armed, setArmed] = useState(false);

  // Взводим анимацию только после монтирования и только если движение
  // не отключено в системе. До этого шаги просто видны — так они стоят
  // и в статике, и у человека без JS.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
  }, []);

  const className = [
    "bake-steps",
    armed ? "is-armed" : "",
    inView ? "is-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ol ref={ref} className={className}>
      {BAKE_STEPS.map((item, index) => (
        <Step key={item.step} data={item} active={inView} index={index} />
      ))}
    </ol>
  );
}
