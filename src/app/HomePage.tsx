import { SegmentRedesignPage } from "@/components/landing/redesign";
import gorgonzolaModel from "../../images/gorgonzola.glb";
import margaritaModel from "../../images/margarita.glb";

export default function HomePage() {
  return (
    <SegmentRedesignPage
      marqueeText="РИМСКАЯ ПИЦЦА • 330 Г • БЕЗ КОНСЕРВАНТОВ • 6 МЕСЯЦЕВ ПРИ −18 °C • РУЧНАЯ ФОРМОВКА • САНКТ-ПЕТЕРБУРГ • "
      footerDescription={
        <>
          Замороженная римская пицца
          <br />
          ручной работы. Производство
          <br />в Санкт-Петербурге.
        </>
      }
      lineupTitle="Ассортимент"
      lineupDescription="Три позиции. Одинаковая масса, одинаковый срок хранения, разная начинка."
      lineupItems={[
        {
          sku: "PIZZA 01",
          title: "Маргарита",
          note: "Томатная пассата, моцарелла, оливковое масло. Базовый вкус без добавок — самая понятная позиция в морозильной витрине.",
          chips: ["томатная пассата", "моцарелла", "оливковое масло"],
          modelSrc: margaritaModel,
        },
        {
          sku: "PIZZA 02",
          title: "Пепперони",
          note: "Пепперони и моцарелла на том же тесте длительного холодного брожения. Самая оборачиваемая позиция категории.",
          chips: ["пепперони", "моцарелла", "томатная пассата"],
        },
        {
          sku: "PIZZA 03",
          title: "Груша / горгонзола",
          note: "Груша, горгонзола и моцарелла. Позиция для покупателя, который ищет в заморозке что-то помимо привычного.",
          chips: ["груша", "горгонзола", "моцарелла"],
          modelSrc: gorgonzolaModel,
        },
      ]}
      orderTitle="Контакты"
      orderDescription="Отправим состав, характеристики, фото продукта и документы по запросу."
      submitLabel="Отправить письмо"
    />
  );
}
