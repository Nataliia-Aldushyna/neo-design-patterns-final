# 📄 Resume Generator with Design Patterns (TypeScript)

### Домашнє завдання до Теми 12 — Фінальний проєкт курсу **Design Patterns (GoIT Neoversity)**.

## 🎯 Опис проєкту

У цьому проєкті реалізовано генератор резюме, який динамічно створює HTML-сторінку на основі даних із файлу `resume.json`.

Проєкт демонструє практичне застосування п'яти патернів проєктування:

- Facade
- Template Method
- Factory Method
- Composite
- Decorator

Усі дані завантажуються з JSON-файлу, перетворюються у внутрішню модель та відображаються на сторінці без використання сторонніх UI-бібліотек або фреймворків.

---

## 🔗 Реалізовані патерни проєктування

### 1️⃣ Facade

Клас `ResumePage` виступає єдиною точкою входу до системи.

Метод `init()` приховує всю складність роботи застосунку:

- завантаження JSON-файлу;
- створення імпортера;
- запуск валідації;
- рендеринг сторінки.

```ts
new ResumePage().init("/resume.json");
```

---

### 2️⃣ Template Method

Клас `AbstractImporter` визначає загальний алгоритм обробки даних:

```text
validate → map → render
```

Клас `ResumeImporter` реалізує конкретні кроки:

- перевіряє структуру JSON;
- перетворює дані у внутрішню модель;
- генерує HTML-блоки та додає їх у DOM.

---

### 3️⃣ Factory Method

Клас `BlockFactory` інкапсулює створення блоків резюме.

Метод `createBlock()` створює відповідний блок залежно від типу:

- HeaderBlock
- SummaryBlock
- ExperienceBlock
- EducationBlock
- SkillsBlock

```ts
factory.createBlock("header", model);
```

---

### 4️⃣ Composite

Клас `ExperienceBlock` виступає контейнером для проєктів.

Всередині нього використовуються дочірні елементи `ProjectBlock`.

Таким чином секція досвіду роботи може містити будь-яку кількість вкладених проєктів.

```text
ExperienceBlock
 ├── ProjectBlock
 ├── ProjectBlock
 └── ProjectBlock
```

---

### 5️⃣ Decorator

Клас `HighlightDecorator` динамічно додає CSS-клас `.highlight`.

Декоратор використовується для проєктів із прапорцем:

```json
"isRecent": true
```

При цьому код самого `ProjectBlock` не змінюється.

```ts
new HighlightDecorator(projectBlock);
```

---

## 🚀 Запуск проєкту

Встановлення залежностей:

```bash
npm install
```

Запуск режиму розробки:

```bash
npm run dev
```

Після запуску відкрийте:

```text
http://localhost:3000
```

---

## 🏗️ Збірка проєкту

Створення production-збірки:

```bash
npm run build
```

Попередній перегляд зібраного проєкту:

```bash
npm run preview
```

---

## 📋 Функціональність

Застосунок автоматично:

✅ Завантажує дані з `resume.json`

✅ Валідує структуру резюме

✅ Генерує HTML-сторінку

✅ Відображає:

- Header
- Summary
- Experience
- Education
- Skills

✅ Виділяє нещодавні проєкти (`isRecent: true`) червоним кольором

---

## ➕ Розширення проєкту

Для додавання нового блоку резюме (наприклад, `Certificates`) необхідно:

### Крок 1

Створити новий клас:

```text
src/blocks/CertificatesBlock.ts
```

### Крок 2

Реалізувати інтерфейс:

```ts
implements IBlock
```

### Крок 3

Додати новий тип у BlockFactory:

```ts
| "certificates"
```

та нову гілку:

```ts
case "certificates":
  return new CertificatesBlock(model.certificates);
```

### Крок 4

Додати відповідне поле до `ResumeModel`.

### Крок 5

Додати рендеринг нового блоку в `ResumeImporter`.

Завдяки використанню патернів проєкт легко розширюється без зміни існуючої архітектури.

---

## 🛠️ Технології

- TypeScript
- Vite
- HTML5
- CSS3
- JSON
- Design Patterns

---

## 🏗️ Структура проєкту

```text
/
├── index.html                  # Статичний макет сторінки
├── resume.json                 # Джерело даних для сторінки
├── vite.config.js              # Конфігурація Vite
├── tsconfig.json               # Конфігурація TypeScript
├── dist/                       # Директорія для збірки
└── src/
    ├── styles.css              # Базові стилі + .highlight
    ├── facade/
    │   └── ResumePage.ts       # Фасад проєкту
    ├── importer/
    │   ├── AbstractImporter.ts # Базовий Template Method
    │   └── ResumeImporter.ts   # Конкретна реалізація
    ├── blocks/                 # Конкретні блоки резюме
    │   ├── BlockFactory.ts     # Factory Method
    │   ├── HeaderBlock.ts
    │   ├── SummaryBlock.ts
    │   ├── ExperienceBlock.ts  # Composite‑контейнер
    │   ├── ProjectBlock.ts
    │   ├── EducationBlock.ts
    │   └── SkillsBlock.ts
    ├── decorators/
    │   └── HighlightDecorator.ts
    ├── models/
    │   └── ResumeModel.ts      # Типи внутрішньої моделі
    └── main.ts                 # Точка входу
```