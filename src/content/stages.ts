import doughModel from "../../images/dough-opt.glb";
import rawModel from "../../images/raw-opt.glb";
import parBakeModel from "../../images/par-bake-opt.glb";
import frozenModel from "../../images/frozen-opt.glb";
import readyModel from "../../images/pizza.glb";

export type Stage = {
  key: string;
  /** Порядковый номер для подписи шага. */
  index: string;
  title: string;
  note: string;
  modelSrc: string;
  /** Фон шага: две остановки градиента. */
  bg: [string, string];
  /** Свечение поверх заливки — даёт полю глубину, как в шапке. */
  glow: string;
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
    bg: ["#345995", "#1d3358"],
    glow: "rgba(126,170,240,0.5)",
    ink: "#ffffff",
  },
  {
    key: "raw",
    index: "02",
    title: "Формовка",
    note: "Тесто растягивают руками, без скалки. Пузыри воздуха остаются внутри и потом раскрываются в печи.",
    modelSrc: rawModel,
    bg: ["#ca1551", "#7d0d32"],
    glow: "rgba(255,110,170,0.45)",
    ink: "#ffffff",
  },
  {
    key: "par-bake",
    index: "03",
    title: "Печь",
    note: "Первый обжиг при высокой температуре. Основа схватывается, но остаётся светлой — допекать её будете вы.",
    modelSrc: parBakeModel,
    bg: ["#fb4d3d", "#9c2c20"],
    glow: "rgba(255,186,110,0.55)",
    ink: "#1a1d20",
  },
  {
    key: "frozen",
    index: "04",
    title: "Заморозка",
    note: "Сразу после печи, чтобы удержать влагу в тесте. Дальше — только холод, до вашей духовки.",
    modelSrc: frozenModel,
    bg: ["#dcefff", "#b9dbf7"],
    glow: "rgba(127,150,255,0.5)",
    ink: "#1a1d20",
  },
  {
    key: "ready",
    index: "05",
    title: "Готово",
    note: "Одиннадцать минут при 230 °C — и та самая корка, ради которой всё это затевалось.",
    modelSrc: readyModel,
    bg: ["#faf9f6", "#ece5d8"],
    glow: "rgba(255,193,69,0.34)",
    ink: "#1a1d20",
  },
];
