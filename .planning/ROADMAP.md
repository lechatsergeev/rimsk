# Roadmap: Мацца B2B Segmented Landing

## Overview

Сначала сайт получает сегментированный вход и разветвление на две отдельные страницы, чтобы убрать смешение аудиторий. Затем retail-ветка наполняется собственным контентом и конверсионной логикой, после чего проект доводится через QA и финальную шлифовку до стабильного коммерческого лендинга.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions if needed

- [ ] **Phase 1: Segmented Entry and Page Fork** - Первый экран выбора сегмента и разделение horeca/retail на отдельные страницы
- [ ] **Phase 2: Retail Content Adaptation** - Адаптация retail-страницы под ритейл-сценарий и отдельный оффер
- [ ] **Phase 3: QA and Conversion Polish** - Проверка целостности, навигации, CTA и финальная доводка

## Phase Details

### Phase 1: Segmented Entry and Page Fork
**Goal**: Пользователь выбирает сегмент на первом экране и попадает в отдельную horeca- или retail-ветку, при этом retail существует как самостоятельная копия horeca-страницы.
**Depends on**: Nothing (first phase)
**Requirements**: [SEG-01, SEG-02, SEG-03, HOR-01, HOR-02, RET-01, RET-02, QLT-01, QLT-02]
**Success Criteria** (what must be TRUE):
  1. Пользователь видит экран выбора сегмента до входа в лендинг
  2. После выбора открывается отдельная ветка `horeca` или `retail`
  3. Horeca-страница остаётся рабочей после выноса в отдельный компонент
  4. Retail-страница существует отдельно и может редактироваться независимо
  5. Сайт собирается и локально запускается для визуальной проверки
**Plans**: 2 plans

Plans:
- [ ] 01-01: Вынести сегментный вход и маршрутизацию/переключение страниц
- [ ] 01-02: Выделить horeca и retail в отдельные страницы и проверить сборку/локальный запуск

### Phase 2: Retail Content Adaptation
**Goal**: Retail-страница перестаёт быть копией horeca и получает собственную структуру аргументации, тексты и CTA под магазины и ready-to-eat сценарии.
**Depends on**: Phase 1
**Requirements**: [RET-03, RET-04]
**Success Criteria** (what must be TRUE):
  1. Retail-страница визуально и по смыслу отличается от horeca
  2. Hero, аргументы и CTA на retail-странице адресуют магазины и полку/витрину
  3. Horeca-ветка при этом не деградирует
**Plans**: TBD

Plans:
- [ ] 02-01: Переписать hero и структуру retail-страницы под retail use-case
- [ ] 02-02: Адаптировать блоки аргументации, CTA и навигацию для retail

### Phase 3: QA and Conversion Polish
**Goal**: Обе сегментные ветки проходят сборку, визуальную проверку и приводятся к консистентному коммерческому состоянию.
**Depends on**: Phase 2
**Requirements**: [QLT-01, QLT-02]
**Success Criteria** (what must be TRUE):
  1. Нет критических визуальных или навигационных дефектов на обоих сегментах
  2. Все CTA и переходы между выбором сегмента и страницами работают
  3. Проект готов к дальнейшему review и shipping
**Plans**: TBD

Plans:
- [ ] 03-01: Провести QA по desktop/mobile для horeca и retail
- [ ] 03-02: Дошлифовать визуальные и конверсионные детали

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Segmented Entry and Page Fork | 0/2 | In progress | - |
| 2. Retail Content Adaptation | 0/2 | Not started | - |
| 3. QA and Conversion Polish | 0/2 | Not started | - |
