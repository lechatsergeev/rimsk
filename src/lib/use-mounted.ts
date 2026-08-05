import { useEffect, useState } from "react";

/**
 * false на сервере и в первом клиентском рендере, true после монтирования.
 *
 * Нужен для тяжёлых клиентских блоков (three.js, React.lazy): если рендерить
 * их сразу, структура серверного HTML расходится с клиентской и React
 * отбрасывает пререндер целиком. С этим хуком первый рендер совпадает,
 * а модель подключается уже после успешной гидрации.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
