// Единая точка правды по бренду, контактам и характеристикам продукта.
// Название бренда пока не финальное — меняется здесь, подхватывается везде.

export const BRAND_NAME = "Мацца";
export const BRAND_NAME_UPPER = "МАЦЦА";

export const CONTACT_PHONE = "+7 (958) 178-10-78";
export const CONTACT_PHONE_HREF = "tel:+79581781078";
export const CONTACT_WHATSAPP_HREF = "https://wa.me/79581781078";

export const CONTACT_EMAIL = "eep.sergeev.alexey@gmail.com";
export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;

export const PRODUCTION_CITY = "Санкт-Петербург";

export const NET_WEIGHT = "330 г";
export const SHELF_LIFE = "6 месяцев при −18 °C";
export const BAKE_INSTRUCTION = "11 минут при 230 °C";

export const INGREDIENTS =
  "Мука пшеничная, вода, дрожжи, соль, оливковое масло, томатная пассата, моцарелла.";

export const NO_ADDITIVES =
  "Без консервантов, эмульгаторов и заменителей молочного жира.";

export const DOUGH_METHOD =
  "Тесто длительного холодного брожения, ручная формовка.";

export type ProductSpec = {
  label: string;
  value: string;
};

export type KeyNumber = {
  value: string;
  unit: string;
  caption: string;
};

/**
 * Три числа, которые сканируют: масса, хранение, приготовление.
 * Вынесены отдельно от прозы — их читают глазами по диагонали,
 * поэтому в вёрстке они идут крупно и первыми.
 */
export const KEY_NUMBERS: KeyNumber[] = [
  { value: "330", unit: "г", caption: "Масса нетто" },
  { value: "6", unit: "месяцев", caption: "Хранение при −18 °C" },
  { value: "11", unit: "минут", caption: "Допекание при 230 °C" },
];

/** Характеристики, которые читают текстом, а не сканируют. */
export const DETAIL_SPECS: ProductSpec[] = [
  { label: "Тесто", value: DOUGH_METHOD },
  { label: "Состав", value: INGREDIENTS },
  { label: "Добавки", value: NO_ADDITIVES },
];

/** Короткая выжимка для карточек — три цифры, которые нужны закупщику сразу. */
export const CARD_SPECS: ProductSpec[] = [
  { label: "Масса", value: NET_WEIGHT },
  { label: "Хранение", value: "6 мес / −18 °C" },
  { label: "Допекание", value: BAKE_INSTRUCTION },
];
