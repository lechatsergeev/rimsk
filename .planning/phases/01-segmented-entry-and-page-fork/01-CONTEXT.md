# Phase 1: Segmented Entry and Page Fork - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Сайт должен сначала спрашивать, из какого сегмента пользователь: хорека или ретейл. После выбора пользователь попадает в соответствующую ветку, при этом текущая horeca-страница сохраняется, а retail создаётся как отдельная копия для дальнейшей адаптации.

</domain>

<decisions>
## Implementation Decisions

### Segment entry
- **D-01:** Первый экран должен показываться до контента лендинга и задавать вопрос: пользователь из хорека или из ретейла
- **D-02:** Выбор сегмента должен быть явным и визуально отделённым, а не скрытым в меню
- **D-03:** Пользователь должен иметь возможность вернуться к экрану выбора и сменить сегмент

### Page structure
- **D-04:** Существующий horeca-лендинг нужно вынести в отдельную страницу/компонент
- **D-05:** Retail нужно создать как отдельную копию horeca-страницы, а не как условные ветки внутри одного большого файла
- **D-06:** Переключение сегмента может жить на клиенте без отдельного backend routing layer

### the agent's Discretion
- Точный визуальный стиль карточек выбора сегмента
- Способ хранения текущего сегмента в URL или локальном состоянии
- Техническая структура именования файлов для horeca/retail страниц

</decisions>

<specifics>
## Specific Ideas

- Текст вопроса на первом экране: "Вы из хорека или из ретейла?"
- Retail на старте не нужно полностью переписывать: достаточно завести копию страницы для последующей редактуры

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product and implementation context
- `src/app/App.tsx` — текущая точка входа приложения и экран выбора сегмента
- `src/app/HorecaPage.tsx` — текущая выделенная horeca-страница
- `src/app/RetailPage.tsx` — отдельная retail-копия для будущей адаптации
- `src/main.tsx` — bootstrap приложения

### Project metadata
- `README.md` — базовый контекст проекта и локальный запуск

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/HorecaPage.tsx`: уже содержит основную horeca-структуру лендинга
- `src/app/RetailPage.tsx`: может использоваться как самостоятельная база для retail

### Established Patterns
- Приложение собирается как единый React/Vite фронтенд без роутера
- В кодовой базе используется inline-style и существующая типографика/визуальный язык проекта

### Integration Points
- Новый сегментный экран и переключатель живут в `src/app/App.tsx`
- Обе ветки страницы подключаются на уровне root app-композиции

</code_context>

<deferred>
## Deferred Ideas

- Полная перепись retail-контента и аргументации — Phase 2
- Глубокая конверсионная оптимизация CTA и офферов — Phase 3

</deferred>

---

*Phase: 01-segmented-entry-and-page-fork*
*Context gathered: 2026-04-01*
