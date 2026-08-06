import { BAKE_STEPS } from "@/content/brand";

/**
 * Спокойный список шагов.
 *
 * Превращение продукта переехало в шапку — повторять аттракцион ниже
 * незачем, здесь достаточно, чтобы цифры можно было перечитать.
 */
export function BakeScene() {
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
