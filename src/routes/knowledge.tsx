import { createFileRoute } from '@tanstack/react-router'
import { Search, FileText, ChevronRight, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'

export const Route = createFileRoute('/knowledge')({
  component: KnowledgePage,
})

type TableRow = string[];
type TableData = {
  headers: string[];
  rows: TableRow[];
};

type DocItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  content: string[];
  hasTable?: boolean;
  tableData?: TableData;
};

// 🔥 МАКСИМАЛЬНО ПРОКАЧАННАЯ БАЗА ЗНАНИЙ (ЭКСПЕРТНЫЙ УРОВЕНЬ)
const KNOWLEDGE_DOCS: DocItem[] = [
  {
    id: "pue-7",
    title: "ПУЭ 7-е издание",
    subtitle: "Главы 1.7 и 7.1. Ключевые выжимки по заземлению и проводке в жилых зданиях.",
    category: "ПУЭ",
    tags: ["ПУЭ"],
    hasTable: true,
    content: [
      "ПУЭ — главный нормативный документ. Основные жесткие требования для жилых и общественных зданий:",
      "• Материал жил: В жилых зданиях применяется только медь (алюминий разрешен только для питающих сетей сечением от 16 мм²).",
      "• Соединения (п. 2.1.21): Соединение, ответвление и оконцевание жил проводов должны производиться опрессовкой, сваркой, пайкой или сжимами (винтовые, пружинные). Скрутка категорически запрещена!",
      "• Разделение PEN (п. 1.7.135): Когда нулевой рабочий и нулевой защитный проводники разделены, объединять их снова запрещено. В месте разделения необходимо предусмотреть отдельные зажимы или шины.",
      "• Коммутация PEN: В цепях PE и PEN проводников запрещается иметь коммутирующие аппараты (автоматы не должны рвать защитный ноль)."
    ],
    tableData: {
      headers: ["Сечение фазного проводника (S, мм²)", "Мин. сечение защитного PE (мм²)", "Материал"],
      rows: [
        ["S ≤ 16", "S (равно фазному)", "Медь"],
        ["16 < S ≤ 35", "16", "Медь"],
        ["S > 35", "S / 2", "Медь"]
      ]
    }
  },
  {
    id: "gost-31565",
    title: "ГОСТ 31565-2012",
    subtitle: "Классы пожарной опасности кабелей. Индексы LS, HF, LTx, FRLS.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии", "Пожарная безопасность"],
    hasTable: true,
    content: [
      "Определяет типы исполнения кабелей по показателям пожарной опасности. Неправильный выбор грозит предписанием от МЧС при вводе объекта в эксплуатацию.",
      "• Предел огнестойкости (FR): Время, которое кабель сохраняет работоспособность в открытом пламени (от 30 до 180 минут).",
      "• Токсичность (LTx): Показатель эквивалента токсичности продуктов горения. Обязателен для детских учреждений."
    ],
    tableData: {
      headers: ["Маркировка", "Расшифровка", "Область применения по ГОСТ"],
      rows: [
        ["нг(А)", "Не распространяет горение", "Открытые пром. установки, нежилые помещения."],
        ["нг(А)-LS", "Low Smoke (низкое дымовыделение)", "Жилые и общественные здания, квартиры, офисы."],
        ["нг(А)-HF", "Halogen Free (без галогенов)", "ТЦ, кинотеатры, серверные (скопление людей, микропроцессорная техника)."],
        ["нг(А)-FRLS", "Fire Resistance (огнестойкий)", "Системы дымоудаления, пожарные насосы, эвакуационное освещение."],
        ["нг(А)-LSLTx", "Low Toxic (низкотоксичный)", "Детские сады, школы, больницы, дома престарелых."]
      ]
    }
  },
  {
    id: "sp-256",
    title: "СП 256.1325800.2016",
    subtitle: "Проектирование электроустановок квартир. Нагрузки и коэффициенты.",
    category: "СНиП",
    tags: ["СНиП", "ПУЭ"],
    hasTable: true,
    content: [
      "Документ регламентирует правила компоновки электрики и расчет мощностей в жилье.",
      "• Размещение: От розеток до газовой трубы — не менее 0.5 м. Высота установки розеток в комнатах удобна на уровне 0.3 м, выключателей — 0.9-1.0 м.",
      "• Кухня: Розетки над столешницей — 1.05-1.1 м. Обязательно разделение линий питания мощных потребителей (варочная панель, духовка).",
      "Расчетная нагрузка на вводной кабель считается с учетом коэффициента спроса (Кс) — нельзя просто суммировать номиналы всех автоматов!"
    ],
    tableData: {
      headers: ["Кол-во квартир на стояке", "Кс (Квартиры с газ. плитами)", "Кс (Квартиры с эл. плитами)"],
      rows: [
        ["1 - 4", "1.0", "1.0"],
        ["5 - 9", "0.8", "0.9"],
        ["10 - 14", "0.6", "0.8"],
        ["15 - 19", "0.5", "0.7"]
      ]
    }
  },
  {
    id: "grounding-systems",
    title: "Системы заземления",
    subtitle: "TN-C, TN-S, TN-C-S, TT, IT. Точные параметры контуров.",
    category: "Заземление",
    tags: ["ПУЭ", "Заземление"],
    hasTable: true,
    content: [
      "Правильно организованная система заземления — основа работы защиты от поражения током.",
      "• Сопротивление ЗУ: В сетях 380/220В с глухозаземленной нейтралью сопротивление контура не должно превышать 4 Ом (с учетом естественных заземлителей) и не более 30 Ом для отдельного контура (система ТТ с УЗО).",
      "• Заземлители: Черная сталь быстро ржавеет. Рекомендуется омедненная сталь (модульное штыревое заземление) или нержавейка."
    ],
    tableData: {
      headers: ["Система", "Схема проводников", "Особенности и ограничения"],
      rows: [
        ["TN-C", "PEN совмещен везде", "Запрещена в новом жилом фонде. УЗО не работает корректно."],
        ["TN-S", "PE и N разделены от ТП", "Самая безопасная. Исключает токи на корпусах приборов."],
        ["TN-C-S", "PEN делится во ВРУ дома", "Требует повторного заземления на вводе (R ≤ 10 Ом)."],
        ["TT", "N от ТП, PE свой местный", "Обязательна двухступенчатая защита УЗО. Применяется, если TN не обеспечивает безопасность."],
        ["IT", "Нейтраль изолирована", "Больницы, шахты. Первое замыкание на землю не отключает питание."]
      ]
    }
  },
  {
    id: "gost-50571",
    title: "ГОСТ Р 50571",
    subtitle: "Защита от поражения током. Время отключения и ОСУП/ДСУП.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Заземление"],
    hasTable: true,
    content: [
      "Стандарт задает максимальное время, за которое автоматика обязана обесточить линию при пробое фазы на корпус (косвенное прикосновение).",
      "• ОСУП (Основная система): В главную заземляющую шину (ГЗШ) сводятся PE-ввода, контур ЗУ, стальные трубы здания.",
      "• ДСУП (Дополнительная система): Обязательна в санузлах. Шина КУП соединяет PE-розетки, поддоны, трубы. Минимальное сечение провода ДСУП — 4 мм² (медь без мех. защиты) или 2.5 мм² (с защитой)."
    ],
    tableData: {
      headers: ["Номинальное напряжение Uo (В)", "Время отключения (сеть TN), сек", "Время отключения (сеть TT), сек"],
      rows: [
        ["120 В", "0.8 с", "0.3 с"],
        ["230 В (обычная однофазная сеть)", "0.4 с", "0.2 с"],
        ["400 В (межфазное)", "0.2 с", "0.07 с"],
        ["> 400 В", "0.1 с", "0.04 с"]
      ]
    }
  },
  {
    id: "cable-lines-1kv",
    title: "Кабельные линии до 1 кВ",
    subtitle: "Радиусы изгиба, заполняемость труб и правила траншей.",
    category: "Кабельные линии",
    tags: ["ПУЭ", "Кабельные линии"],
    hasTable: true,
    content: [
      "Правила скрытой и открытой прокладки трасс (гл. 2.1 ПУЭ):",
      "• Штробы: Только вертикальные и горизонтальные трассы. Отступ от потолка — 150-200 мм. Отступ от дверных проемов — 100 мм.",
      "• Трубы и гофры: Кабели в трубах должны прокладываться так, чтобы их можно было перетянуть. Суммарное сечение кабелей не должно превышать 35-40% внутреннего сечения трубы (для охлаждения).",
      "• Траншеи: Глубина заложения кабеля (АВБбШв, ВБШв) — не менее 0.7 м. Под автодорогой — 1.0 м в трубе. Сигнальная лента «Осторожно кабель» укладывается на 250 мм выше кабеля."
    ],
    tableData: {
      headers: ["Тип кабеля / жилы", "Мин. радиус изгиба (D - наружный диаметр)"],
      rows: [
        ["Однопроволочная жила (ВВГ)", "10 D"],
        ["Многопроволочная жила гибкая (КГ, ПВС)", "5 D - 7.5 D"],
        ["С броней (ВБШв)", "15 D"],
        ["С изоляцией из сшитого полиэтилена", "15 D"]
      ]
    }
  },
  {
    id: "snip-30506",
    title: "СНиП 3.05.06-85",
    subtitle: "Испытания, приёмка работ и мегаомметр.",
    category: "СНиП",
    tags: ["СНиП"],
    hasTable: true,
    content: [
      "Правила ввода в эксплуатацию и проверки сопротивления изоляции перед подачей напряжения.",
      "• Сопротивление изоляции: Проверяется мегаомметром между всеми фазами, между фазами и нулем, между фазами и PE. Допустимое сопротивление для сетей до 1000 В — не менее 0.5 МОм.",
      "• Акты скрытых работ: Обязательно составляются до замоноличивания штроб, заливки стяжки и монтажа натяжных потолков."
    ],
    tableData: {
      headers: ["Тип электроустановки / Кабель", "Напряжение мегаомметра (В)", "Норма сопротивления"],
      rows: [
        ["Кабели силовые до 1000 В (ВВГ)", "1000 В или 2500 В", "Не менее 0.5 МОм"],
        ["Аппараты и щиты до 1000 В", "500 В или 1000 В", "Не менее 0.5 МОм"],
        ["Вторичные цепи и слаботочка", "100 В или 250 В", "Не менее 1.0 МОм"]
      ]
    }
  },
  {
    id: "gost-50462",
    title: "ГОСТ Р 50462-2009",
    subtitle: "Цветовая и буквенно-цифровая маркировка проводников (AC/DC).",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии"],
    hasTable: true,
    content: [
      "Единый стандарт для исключения ошибок при монтаже и обслуживании. Использование желто-зеленого цвета для любых целей, кроме заземления, строжайше запрещено!"
    ],
    tableData: {
      headers: ["Цепь / Назначение", "Обозначение", "Цвет изоляции (стандарт)"],
      rows: [
        ["ФАЗА 1 (Переменный ток)", "L1", "Коричневый"],
        ["ФАЗА 2 (Переменный ток)", "L2", "Черный"],
        ["ФАЗА 3 (Переменный ток)", "L3", "Серый"],
        ["РАБОЧИЙ НОЛЬ", "N", "Синий / Голубой"],
        ["ЗАЩИТНЫЙ НОЛЬ", "PE", "Желто-зеленый"],
        ["ПОЛОЖИТЕЛЬНЫЙ (Постоянный ток)", "L+", "Красный (допускается коричневый)"],
        ["ОТРИЦАТЕЛЬНЫЙ (Постоянный ток)", "L-", "Белый (допускается серый)"]
      ]
    }
  },
  {
    id: "uzo-diff",
    title: "УЗО и Дифавтоматы",
    subtitle: "Классы УЗО (AC, A, B), селективность и расчет токов утечки.",
    category: "ПУЭ",
    tags: ["ПУЭ", "Заземление", "Безопасность"],
    hasTable: true,
    content: [
      "• Расчет фоновой утечки: По ПУЭ 7.1.83 естественный ток утечки сети принимается как 0.4 мА на 1 А нагрузки, плюс 10 мА на 1 км длины фазного провода.",
      "• Правило срабатывания: Суммарный фоновый ток не должен превышать 33% от номинала УЗО (иначе будут ложные срабатывания).",
      "• Селективность: В многоуровневых щитах вводное УЗО (противопожарное 100-300 мА) должно быть с маркировкой «S» (Selective) — задержка отключения 0.2-0.5 сек, чтобы первым успело отработать групповое УЗО."
    ],
    tableData: {
      headers: ["Класс УЗО", "На что реагирует", "Где применяется"],
      rows: [
        ["Тип AC", "Переменный синусоидальный ток", "Обычные нагреватели, лампы накаливания (устаревает)."],
        ["Тип A", "Переменный + пульсирующий постоянный", "Стиральные машины, ПК, инверторные кондиционеры, ТВ. Рекомендуется ПУЭ."],
        ["Тип B", "Любые виды токов, включая сглаженный DC", "Зарядные станции электромобилей, мед. оборудование, трехфазные приводы."],
        ["Тип S", "Задержка времени срабатывания", "Вводные щиты (противопожарная защита и обеспечение селективности)."]
      ]
    }
  },
  {
    id: "co-153",
    title: "СО 153-34.21.122-2003",
    subtitle: "Молниезащита зданий и классы УЗИП (I, II, III).",
    category: "СНиП",
    tags: ["СНиП", "Заземление"],
    hasTable: true,
    content: [
      "Внешняя защита (молниеприемники, токоотводы) и внутренняя (УЗИП).",
      "• Токоотводы: Стальной пруток Ø 8 мм (50 мм²) или медь Ø 5 мм (16 мм²). Шаг крепления по стене — не более 1 метра.",
      "• Зоны защиты: Рассчитываются методом «катящейся сферы» или защитного угла."
    ],
    tableData: {
      headers: ["Класс УЗИП", "Зона установки", "Форма волны", "Назначение"],
      rows: [
        ["Тип 1 (Класс I / B)", "ВРУ дома / ЩУ на столбе", "10/350 мкс", "Защита от прямого попадания молнии в ЛЭП. Отводит основную энергию."],
        ["Тип 2 (Класс II / C)", "Распределительный щит (РЩ)", "8/20 мкс", "Защита от наведенных скачков напряжения. Снижает бросок до безопасных 1.5 кВ."],
        ["Тип 3 (Класс III / D)", "В розетке / удлинителе", "8/20 мкс", "Тонкая защита чувствительной электроники (серверы, медтехника)."]
      ]
    }
  },
  {
    id: "gost-iec-60364",
    title: "ГОСТ IEC 60364-7-701",
    subtitle: "Зонирование ванных комнат (IP защита и допуски).",
    category: "ГОСТ",
    tags: ["ГОСТ", "Безопасность"],
    hasTable: true,
    content: [
      "Установка розеток и оборудования в помещениях с ваннами и душевыми строго регламентирована зонами от 0 до 3.",
      "Вся проводка в ванных комнатах должна быть скрытой. Использование металлорукава или стальных труб для прокладки запрещено!"
    ],
    tableData: {
      headers: ["Зона", "Границы зоны", "Мин. IP", "Что разрешено устанавливать"],
      rows: [
        ["Зона 0", "Внутренний объем ванны/поддона", "IPX7", "Только приборы ≤ 12В (SELV). Источник питания выносится за пределы Зон 0 и 1."],
        ["Зона 1", "Над ванной до высоты 2.25 м", "IPX5", "Только водонагреватели (бойлеры) и вытяжные вентиляторы. Розетки запрещены!"],
        ["Зона 2", "До 60 см в стороны от Зоны 1", "IPX4", "Светильники класса II, бойлеры. Розетки запрещены (кроме спец. розеток для бритв с трансформатором)."],
        ["Зона 3", "Далее 60 см (остальное помещение)", "IPX4", "Розетки 220В разрешены ПРИ УСЛОВИИ защиты их через УЗО 30 мА."]
      ]
    }
  },
  {
    id: "fz-123",
    title: "ФЗ-123 «Технический регламент»",
    subtitle: "Огнестойкость проходок (EI) и скрытая проводка в дереве.",
    category: "Пожарная безопасность",
    tags: ["Пожарная безопасность"],
    hasTable: true,
    content: [
      "Самая частая причина пожаров — короткое замыкание в скрытой проводке по сгораемым основаниям (деревянные дома).",
      "• Проводка в дереве: ПУЭ и ФЗ-123 требуют прокладывать кабель в конструкциях из сгораемых материалов строго в металлических трубах, обладающих ЛОКАЛИЗАЦИОННОЙ способностью (способность трубы выдержать КЗ внутри без прогорания стенки). Гофра, металлорукав и фольга для скрытой проводки по дереву ЗАПРЕЩЕНЫ."
    ],
    tableData: {
      headers: ["Сечение медного кабеля, мм²", "Толщина стенки стальной трубы (мин), мм"],
      rows: [
        ["До 2.5 включительно", "Труба не нормируется (любая стальная водогазопроводная)"],
        ["4.0", "Не менее 2.8 мм"],
        ["6.0 - 10.0", "Не менее 3.2 мм"],
        ["16.0 - 25.0", "Не менее 3.5 мм"]
      ]
    }
  },
  {
    id: "gost-50571-5-52",
    title: "ГОСТ Р 50571.5.52-2011",
    subtitle: "Выбор сечений кабеля, падение напряжения и номиналы автоматов.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии"],
    hasTable: true,
    content: [
      "Автоматический выключатель (АВ) защищает исключительно КАБЕЛЬ от плавления изоляции, а не телевизор от поломки.",
      "• Падение напряжения (∆U): Для длинных линий (от щита до прибора) падение напряжения не должно превышать 4% для освещения и 5% для силовых розеток."
    ],
    tableData: {
      headers: ["Сечение меди", "I длительно доп. (А)", "Макс. Автомат (А)", "Идеальный Автомат (А)"],
      rows: [
        ["1.5 мм² (свет)", "19 А (в стене 15 А)", "16 А", "10 А (надежнее для защиты тонких жил)"],
        ["2.5 мм² (розетки)", "27 А (в стене 21 А)", "20 А", "16 А (стандарт для розеток)"],
        ["4.0 мм² (силовая)", "38 А (в стене 27 А)", "25 А", "25 А"],
        ["6.0 мм² (варочная)", "50 А (в стене 34 А)", "32 А", "32 А"],
        ["10.0 мм² (ввод 1ф)", "70 А (в стене 46 А)", "50 А", "40 А - 50 А"]
      ]
    }
  },
  {
    id: "gost-32144",
    title: "ГОСТ 32144-2013",
    subtitle: "Нормы качества электроэнергии (Настройки реле напряжения).",
    category: "ГОСТ",
    tags: ["ГОСТ"],
    hasTable: true,
    content: [
      "Определяет показатели качества электроэнергии (ПКЭ). Реле напряжения (УЗМ) на вводе в щит настраивается на основе этих допусков."
    ],
    tableData: {
      headers: ["Параметр сети", "Номинал ГОСТ 29322", "Нормальные допуски (±10%)", "Рекомендуемая уставка РН"],
      rows: [
        ["Напряжение фазное (U)", "230 В", "От 207 В до 253 В", "Верх: 250-255 В | Низ: 195-200 В"],
        ["Напряжение линейное", "400 В", "От 360 В до 440 В", "-"],
        ["Частота переменного тока", "50 Гц", "±0.2 Гц", "-"],
        ["Задержка включения РН", "-", "-", "Для инверторов/компрессоров: 300 сек (5 мин)"]
      ]
    }
  },
  {
    id: "potee",
    title: "ПОТЭЭ",
    subtitle: "Правила охраны труда, наряды-допуски и СИЗ.",
    category: "Безопасность",
    tags: ["Безопасность"],
    hasTable: true,
    content: [
      "Организационные и технические мероприятия по безопасности. Работы со снятием напряжения требуют 5 шагов:",
      "1. Отключение (видимый разрыв). 2. Вывешивание плакатов. 3. Проверка отсутствия напряжения (ТОЛЬКО двуполюсным тестером, отвертка-индикатор не является СИЗ). 4. Заземление. 5. Ограждение.",
      "Сроки поверки средств индивидуальной защиты (СИЗ) строго регламентированы."
    ],
    tableData: {
      headers: ["СИЗ / Инструмент", "Напряжение до 1000В", "Сроки периодических испытаний"],
      rows: [
        ["Диэлектрические перчатки", "Обязательно", "1 раз в 6 месяцев"],
        ["Указатели напряжения", "Обязательно", "1 раз в 12 месяцев"],
        ["Ручной изолирующий инструмент", "Обязательно", "1 раз в 12 месяцев"],
        ["Диэлектрические галоши/боты", "Доп. средство", "Галоши - 1 раз в 12 мес, боты - раз в 36 мес"]
      ]
    }
  },
  {
    id: "cable-joints",
    title: "Опрессовка гильз ГМЛ и термоусадка",
    subtitle: "Технологические нормы соединений кабельных трасс.",
    category: "Монтаж",
    tags: ["Кабельные линии", "Монтаж"],
    hasTable: true,
    content: [
      "Только надежный контакт спасает от отгорания нуля и пожаров.",
      "• Гильзы: ГМЛ (медные луженые) подходят для меди. ГАМ (алюмо-медные) — для перехода с алюминия на медь (строго соблюдать полярность металлов).",
      "• Матрица ПКВ/ПГР: Обжим должен производиться строго гексагональной (шестигранной) или точечной матрицей, соответствующей сечению гильзы.",
      "• Изоляция: Используется термоусадочная трубка с клеевым слоем (ТУТк). Усадка производится строительным феном (температура 120-150°C), от центра к краям, до выступления валика клея."
    ],
    tableData: {
      headers: ["Сечение гильзы ГМЛ (мм²)", "Добивка медью (жил 2.5 мм²)", "Количество жимков прессом"],
      rows: [
        ["ГМЛ 4.0", "1 - 2 жилы", "1 жимок по центру"],
        ["ГМЛ 6.0", "3 жилы", "1-2 жимка"],
        ["ГМЛ 10.0", "4 - 5 жил", "2 жимка"],
        ["ГМЛ 16.0", "6 - 7 жил", "2-3 жимка (от центра к краям)"]
      ]
    }
  }
];

const KNOWLEDGE_CATEGORIES = ["Все", "ПУЭ", "ГОСТ", "СНиП", "Кабельные линии", "Заземление", "Безопасность", "Монтаж"];

function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState("Все")
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null)

  const filteredDocs = KNOWLEDGE_DOCS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "Все" || doc.category === activeCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    if (selectedDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedDoc]);

  return (
    <div className="container mx-auto max-w-5xl animate-in fade-in duration-500 pb-24 relative">
      
      {/* Шапка */}
      <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-2">База знаний</h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Нормативы, ГОСТы и ПУЭ. Экспертная выжимка допусков, цифр и таблиц для объектов любой сложности.
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-primary/20 shrink-0 self-start md:self-auto">
          <FileText className="w-4 h-4" />
          Документов: {KNOWLEDGE_DOCS.length}
        </div>
      </div>

      {/* Поиск и фильтры */}
      <div className="space-y-4 mb-8 sticky top-0 z-10 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Найти норматив, например ПУЭ 7, розетки или ГОСТ..."
            className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden w-full">
          {KNOWLEDGE_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                activeCategory === category 
                ? 'bg-primary border-primary text-primary-foreground shadow-sm scale-[1.02]' 
                : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Сетка документов */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredDocs.map((doc, idx) => (
            <div 
              key={doc.id} 
              className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col h-full group cursor-pointer"
              style={{ animationDelay: `${idx * 50}ms` }}
              onClick={() => setSelectedDoc(doc)}
            >
              <div className="flex items-start justify-between mb-4 gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md">
                    {doc.category}
                  </span>
                  {doc.hasTable && (
                    <span className="bg-blue-500/10 text-blue-500 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Таблица
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {doc.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-3">
                {doc.subtitle}
              </p>

              <button 
                className="mt-auto flex items-center justify-between w-full bg-background border border-border rounded-xl p-3 sm:p-4 text-sm font-bold text-foreground hover:bg-primary/5 hover:border-primary/50 transition-colors group/btn"
              >
                <span>Изучить норматив</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-black text-foreground mb-2">Ничего не найдено</h3>
          <p className="text-muted-foreground">
            Попробуйте изменить поисковой запрос или выбрать другую категорию.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('Все'); }}
            className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            Сбросить фильтры
          </button>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО */}
      {selectedDoc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedDoc(null)}
        >
          <div 
            className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-4xl lg:max-w-5xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Шапка модалки */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-border bg-muted/20 shrink-0">
              <div className="pr-4">
                <span className="bg-primary/10 text-primary text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md mb-3 inline-block">
                  {selectedDoc.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-foreground leading-tight">
                  {selectedDoc.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="p-2 -mr-2 -mt-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-full transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Тело модалки */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 bg-card">
              <p className="text-sm sm:text-base font-bold text-foreground border-l-4 border-primary pl-4 py-1 mb-6">
                {selectedDoc.subtitle}
              </p>
              
              <div className="space-y-4 mb-6">
                {selectedDoc.content.map((paragraph, index) => (
                  <p key={index} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* РЕАЛЬНАЯ ТАБЛИЦА С АДАПТИВОМ */}
              {selectedDoc.tableData && (
                <div className="mt-6">
                  
                  {/* === ВЕРСИЯ ДЛЯ МОБИЛОК (КАРТОЧКИ В СТОЛБИК) === */}
                  <div className="block md:hidden space-y-3">
                    <p className="text-[10px] text-muted-foreground/70 uppercase tracking-widest text-center mb-3">
                      💡 Рекомендуется просматривать горизонтально
                    </p>
                    {selectedDoc.tableData.rows.map((row, rowIdx) => (
                      <div key={rowIdx} className="bg-background border border-border rounded-xl p-4 space-y-3 shadow-sm">
                        {row.map((cell, cellIdx) => (
                          <div key={cellIdx} className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-primary uppercase tracking-wider">
                              {selectedDoc.tableData!.headers[cellIdx]}
                            </span>
                            <span className={`text-sm ${cellIdx === 0 ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                              {cell}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* === ВЕРСИЯ ДЛЯ ДЕСКТОПА (КЛАССИЧЕСКАЯ ТАБЛИЦА БЕЗ СКРОЛЛА) === */}
                  <div className="hidden md:block border border-border rounded-xl overflow-hidden bg-background">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-primary/10">
                          {selectedDoc.tableData.headers.map((header, idx) => (
                            <th key={idx} className="p-4 text-sm font-black text-primary border-b border-border/50 uppercase tracking-wider">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDoc.tableData.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-muted/30 transition-colors border-b border-border/50 last:border-0">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className={`p-4 text-sm align-top ${cellIdx === 0 ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
