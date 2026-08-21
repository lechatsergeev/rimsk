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
};

/**
 * Цепочка приготовления от теста до готовой пиццы.
 *
 * Своего фона у шага больше нет: пять полноэкранных смен цвета
 * перекрикивали и продукт, и текст. Поле у панели одно на всю
 * презентацию.
 */
export const STAGES: Stage[] = [
  {
    key: "dough",
    index: "01",
    title: "Тесто",
    note: "Шарик после длительного холодного брожения. Созревает медленно, поэтому корка получается лёгкой.",
    modelSrc: doughModel,
  },
  {
    key: "raw",
    index: "02",
    title: "Формовка",
    note: "Тесто растягивают руками, без скалки. Пузыри воздуха остаются внутри и потом раскрываются в печи.",
    modelSrc: rawModel,
  },
  {
    key: "par-bake",
    index: "03",
    title: "Печь",
    note: "Первый обжиг при высокой температуре. Основа схватывается, но остаётся светлой — допекать её будете вы.",
    modelSrc: parBakeModel,
  },
  {
    key: "frozen",
    index: "04",
    title: "Заморозка",
    note: "Сразу после печи, чтобы удержать влагу в тесте. Дальше — только холод, до вашей духовки.",
    modelSrc: frozenModel,
  },
  {
    key: "ready",
    index: "05",
    title: "Готово",
    note: "Одиннадцать минут при 230 °C — и та самая корка, ради которой всё это затевалось.",
    modelSrc: readyModel,
  },
];
