import { useEffect, useRef, useState } from "react";
import { StageModels, type Slot } from "@/components/landing/stage-models";
import { STAGES } from "@/content/stages";
import { useMounted } from "@/lib/use-mounted";

/**
 * Доля пройденного пути внутри этажа, 0..1.
 *
 * Считается прямо в обработчике scroll по getBoundingClientRect — без
 * IntersectionObserver и без throttle через requestAnimationFrame: оба
 * механизма молчат в средах, где не идут кадры, и лента замирала бы на
 * первом шаге.
 */
function useFloorProgress(
  trackRef: React.RefObject<HTMLElement | null>,
  panelRef: React.RefObject<HTMLElement | null>
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track || !panel) return;

    const update = () => {
      const rect = track.getBoundingClientRect();
      const total = rect.height - panel.offsetHeight;
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
  }, [trackRef, panelRef]);

  return progress;
}

type Measure = {
  /** Окно, сквозь которое видно ленту. */
  width: number;
  height: number;
  /** Высота липкой панели: с неё начинается высота всего этажа. */
  panel: number;
  /** Насколько лента длиннее окна: столько ей и ехать вбок. */
  travel: number;
  slots: Slot[];
};

const EMPTY: Measure = {
  width: 0,
  height: 0,
  panel: 0,
  travel: 0,
  slots: [],
};

/**
 * Замер ленты по разметке.
 *
 * Размеры шагов заданы в CSS и меняются по брейкпоинтам, поэтому те же
 * числа не продублированы в скрипте: он читает готовую раскладку. Сцена
 * потом ставит модели ровно в измеренные места.
 */
function useMeasure(
  panelRef: React.RefObject<HTMLElement | null>,
  windowRef: React.RefObject<HTMLElement | null>,
  chainRef: React.RefObject<HTMLElement | null>
) {
  const [measure, setMeasure] = useState<Measure>(EMPTY);

  useEffect(() => {
    const panel = panelRef.current;
    const frame = windowRef.current;
    const chain = chainRef.current;
    if (!panel || !frame || !chain) return;

    const update = () => {
      const width = frame.clientWidth;
      const height = frame.clientHeight;
      const slots = Array.from(
        chain.querySelectorAll<HTMLElement>(".stage-figure")
      ).map((figure) => ({
        left: figure.offsetLeft,
        width: figure.offsetWidth,
        top: figure.offsetTop,
        height: figure.offsetHeight,
      }));
      setMeasure({
        width,
        height,
        panel: panel.offsetHeight,
        travel: Math.max(chain.scrollWidth - width, 0),
        slots,
      });
    };

    update();
    // Шрифты приезжают позже разметки и меняют высоту подписей.
    document.fonts?.ready.then(update).catch(() => {});
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [panelRef, windowRef, chainRef]);

  return measure;
}

/**
 * Этаж приготовления.
 *
 * Отдельная полоса во всю ширину: рядом с товаром презентация спорила с
 * ним за внимание и выигрывала, поэтому её вынесли на свой этаж. Панель
 * застыла, а лента едет сквозь неё вбок — шаг за шагом, слева направо.
 *
 * Прилипание держит CSS, скрипту остаётся посчитать смещение ленты.
 * Без JS лента просто стоит в начале, и первый шаг виден целиком.
 */
export function ProcessFloor() {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const chainRef = useRef<HTMLOListElement>(null);
  const mounted = useMounted();

  const progress = useFloorProgress(trackRef, panelRef);
  const { width, height, panel, travel, slots } = useMeasure(
    panelRef,
    windowRef,
    chainRef
  );
  const offset = progress * travel;

  // Шаг проявляется, когда въезжает в кадр, и дальше остаётся в полную
  // силу: до замера — только первый, чтобы статика не была бледной.
  const isReached = (index: number) =>
    slots.length === 0 ? index === 0 : slots[index].left - offset < width;

  return (
    <section
      id="process"
      ref={trackRef}
      className="floor"
      // Высота этажа — ровно панель плюс ход ленты. На глаз её пришлось
      // бы подбирать под каждую ширину: лента считается в vw, а
      // прокрутка в vh, и на телефоне лента заканчивалась за треть
      // экрана до конца этажа. В CSS остался запасной размер на случай,
      // когда замера ещё нет.
      style={travel > 0 ? { height: panel + travel } : undefined}
    >
      <div ref={panelRef} className="floor-panel">
        <div className="floor-head">
          <h2 className="swiss-title">Как её делают</h2>
          <p className="floor-lead">
            Пять шагов от шарика теста до пиццы, которая ждёт вас в
            морозилке.
          </p>
        </div>

        <div ref={windowRef} className="stage-window">
          {/* Сцена подключается после гидрации: three.js в серверном
              HTML не существует. */}
          {mounted ? (
            <StageModels
              slots={slots}
              offset={offset}
              unit={height}
              reached={STAGES.map((_, index) => isReached(index))}
            />
          ) : null}

          <ol
            ref={chainRef}
            className="stage-chain"
            style={{ transform: `translate3d(${-offset}px, 0, 0)` }}
          >
            {STAGES.map((item, index) => (
              <li
                key={item.key}
                className="stage-step"
                data-reached={isReached(index) ? "" : undefined}
              >
                <div className="stage-figure" />
                <div className="stage-caption">
                  <div className="stage-index">{item.index}</div>
                  <h3 className="stage-title">{item.title}</h3>
                  <p className="stage-note">{item.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
