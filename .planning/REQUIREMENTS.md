# Requirements: Мацца B2B Segmented Landing

**Defined:** 2026-04-01
**Core Value:** Пользователь должен быстро попасть в свой сценарий бизнеса и увидеть релевантное предложение без путаницы между хорекой и ретейлом

## v1 Requirements

### Segmentation

- [ ] **SEG-01**: Пользователь видит первый экран с выбором сегмента `horeca` или `retail`
- [ ] **SEG-02**: Выбор сегмента переводит пользователя на соответствующую страницу без потери текущего фронтенд-потока
- [ ] **SEG-03**: Пользователь может вернуться к экрану выбора и сменить сегмент

### Horeca

- [ ] **HOR-01**: Существующая horeca-страница остаётся доступной после внедрения сегментации
- [ ] **HOR-02**: Horeca-контент не теряется и не деградирует после выноса в отдельный экран

### Retail

- [ ] **RET-01**: В кодовой базе существует отдельная retail-страница
- [ ] **RET-02**: Retail-страница стартует как копия horeca-страницы для дальнейшей независимой правки

### Quality

- [ ] **QLT-01**: Проект собирается после изменений без ошибок
- [ ] **QLT-02**: Локальный запуск позволяет проверить новый экран и обе ветки сегментации

## v2 Requirements

### Retail Content

- **RET-03**: Retail-страница получает собственные тексты, оффер и аргументацию для магазинов
- **RET-04**: Навигация и CTA адаптируются под retail-конверсию

## Out of Scope

| Feature | Reason |
|---------|--------|
| Полный новый контент для retail в этой фазе | Сначала нужна структурная развилка и отдельная страница |
| CMS, формы CRM и интеграции | Не относятся к текущей задаче сегментации |
| Новый backend routing layer | Для текущего объёма достаточно фронтенд-переключения |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SEG-01 | Phase 1 | Pending |
| SEG-02 | Phase 1 | Pending |
| SEG-03 | Phase 1 | Pending |
| HOR-01 | Phase 1 | Pending |
| HOR-02 | Phase 1 | Pending |
| RET-01 | Phase 1 | Pending |
| RET-02 | Phase 1 | Pending |
| QLT-01 | Phase 1 | Pending |
| QLT-02 | Phase 1 | Pending |
| RET-03 | Phase 2 | Pending |
| RET-04 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0

---
*Requirements defined: 2026-04-01*
*Last updated: 2026-04-01 after GSD initialization*
