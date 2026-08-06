import doughModel from "../../images/dough-opt.glb";
import rawModel from "../../images/raw-opt.glb";
import parBakeModel from "../../images/par-bake-opt.glb";
import frozenModel from "../../images/frozen-opt.glb";

export type Stage = {
  key: string;
  /** Порядковый номер для подписи шага. */
  index: string;
  title: string;
  note: string;
  modelSrc: string;
  /** Фон шага: две остановки градиента. */
  bg: [string, string];
  /** Цвет текста выбран по контрасту с фоном, не на глаз. */
  ink: string;
};

/**
 * Температурная дуга: холодно → теплеет → печь → снова холодно.
 * Последний шаг возвращается на фирменный голубой — в то состояние,
 * в котором продукт и лежит на полке.
 */
export const STAGES: Stage[] = [
  {
    key: "dough",
    index: "01",
    title: "Тесто",
    note: "Шарик после длительного холодного брожения. Созревает медленно, поэтому корка получается лёгкой.",
    modelSrc: doughModel,
    bg: ["#345995", "#25406b"],
    ink: "#ffffff",
  },
  {
    key: "raw",
    index: "02",
    title: "Формовка",
    note: "Тесто растягивают руками, без скалки. Пузыри воздуха остаются внутри и потом раскрываются в печи.",
    modelSrc: rawModel,
    bg: ["#ca1551", "#910f3a"],
    ink: "#ffffff",
  },
  {
    key: "par-bake",
    index: "03",
    title: "Печь",
    note: "Первый обжиг при высокой температуре. Основа схватывается, но остаётся светлой — допекать её будете вы.",
    modelSrc: parBakeModel,
    bg: ["#fb4d3d", "#b4372b"],
    ink: "#1a1d20",
  },
  {
    key: "frozen",
    index: "04",
    title: "Заморозка",
    note: "Сразу после печи, чтобы удержать влагу в тесте. Дальше — только холод, до вашей духовки.",
    modelSrc: frozenModel,
    bg: ["#dcefff", "#b9dbf7"],
    ink: "#1a1d20",
  },
];
