import { createFileRoute } from '@tanstack/react-router'
import { Search, FileText, ChevronRight, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'

export const Route = createFileRoute('/knowledge')({
  component: KnowledgePage,
})

// Типизация
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

// ⚡ МАКСИМАЛЬНО ПРОКАЧАННАЯ БАЗА ЗНАНИЙ
const KNOWLEDGE_DOCS: DocItem[] = [
  {
    id: "pue-7",
    title: "ПУЭ 7-е издание",
    subtitle: "Ключевые выжимки из Правил устройства электроустановок (Глава 7.1).",
    category: "ПУЭ",
    tags: ["ПУЭ"],
    content: [
      "ПУЭ — библия электромонтажника. Основные жесткие требования для жилых зданий:",
      "• Проводка: В жилых зданиях применяется только медь (алюминий запрещен для сечений менее 16 мм²). Обязательна трехпроводная сеть (L, N, PE).",
      "• Соединения жил: Скрутка категорически запрещена (п. 2.1.21)! Только опрессовка (гильзы ГМЛ), сварка, пайка или клеммы (WAGO).",
      "• Разделение PEN: В системе TN-C-S разделение PEN-проводника на PE и N должно выполняться до вводного автомата. После разделения объединять их снова запрещено.",
      "• Ванные комнаты: Обязательна установка УЗО (с током утечки не более 30 мА, рекомендуется 10 мА) и система дополнительного уравнивания потенциалов (ДСУП)."
    ]
  },
  {
    id: "gost-31565",
    title: "ГОСТ 31565-2012",
    subtitle: "Классы пожарной опасности кабелей. Как правильно выбрать маркировку.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии", "Пожарная безопасность"],
    hasTable: true,
    content: [
      "Этот ГОСТ строго регламентирует, какой кабель можно класть в стену, а какой — только на улице. Неправильный выбор грозит отказом в приемке пожарной инспекцией."
    ],
    tableData: {
      headers: ["Маркировка", "Расшифровка", "Где применяется по ГОСТ"],
      rows: [
        ["Без индекса (ВВГ)", "Обычный", "Одиночная прокладка, на улице или в промзонах."],
        ["нг (ВВГнг)", "Не горит в пучке", "Открытые кабельные эстакады, нежилые помещения."],
        ["нг-LS (ВВГнг-LS)", "Low Smoke (мало дыма)", "Жилые дома, квартиры, офисы. Самый частый стандарт."],
        ["нг-HF (ВВГнг-HF)", "Halogen Free (без галогенов)", "Детские сады, школы, больницы, ТЦ (места массового скопления)."],
        ["нг-FRLS", "Fire Resistance (огнестойкий)", "Системы дымоудаления, пожарная сигнализация, эвакуационное освещение."]
      ]
    }
  },
  {
    id: "sp-256",
    title: "СП 256.1325800.2016",
    subtitle: "Свод правил по проектированию квартир. Расстояния и высоты.",
    category: "СНиП",
    tags: ["СНиП", "ПУЭ"],
    content: [
      "Документ, определяющий правила компоновки электрики в жилье. Важные цифры для разметки:",
      "• Расстояние от розеток до газовой трубы: не менее 0,5 метра.",
      "• Расстояние от розеток до дверного проема душевой кабины: не менее 0,6 метра (Зона 3).",
      "• Высота установки розеток: не нормируется жестко, но рекомендуется 1000 мм (или 300 мм по евростандарту). На кухне над столешницей — 1050-1100 мм.",
      "• Выключатели: устанавливаются со стороны дверной ручки на высоте 800-1000 мм от пола."
    ]
  },
  {
    id: "grounding-systems",
    title: "Системы заземления",
    subtitle: "TN-C, TN-S, TN-C-S, TT. Нормы сопротивления и область применения.",
    category: "Заземление",
    tags: ["ПУЭ", "Заземление"],
    hasTable: true,
    content: [
      "Требования к сопротивлению заземляющего контура (для сети 380/220 В): не более 4 Ом для глухозаземленной нейтрали, не более 30 Ом для системы TT (при наличии УЗО) и не более 10 Ом для контура молниезащиты."
    ],
    tableData: {
      headers: ["Система", "Проводники", "Применение", "Особенности"],
      rows: [
        ["TN-C", "PEN (совмещен)", "Старый фонд", "Опасно. При обрыве нуля на корпусе приборов появится фаза."],
        ["TN-S", "PE и N (раздельно)", "Новые здания", "PE идет прямо от подстанции. Самая надежная, но дорогая система."],
        ["TN-C-S", "PEN разделяется", "Частный сектор, МКД", "Разделение PEN на PE и N в ВРУ здания с повторным заземлением."],
        ["TT", "PE свой контур", "Бытовки, дачи по воздуху", "Обязательна установка УЗО, так как токи КЗ малы для срабатывания автомата."]
      ]
    }
  },
  {
    id: "gost-50571",
    title: "ГОСТ Р 50571",
    subtitle: "Защита от поражения током и уравнивание потенциалов (ОСУП/ДСУП).",
    category: "ГОСТ",
    tags: ["ГОСТ", "Заземление"],
    content: [
      "Ключевое требование: при косвенном прикосновении (пробой фазы на корпус) автомат должен отключить линию за время не более 0.4 секунды для сети 220 В.",
      "ОСУП (Основная система уравнивания): В главную заземляющую шину (ГЗШ) должны быть объединены PE-проводник питающей линии, контур заземления, стальные трубы коммуникаций (вода, газ, отопление) и арматура здания.",
      "ДСУП (Дополнительная система): Обязательна в санузлах. Отдельная коробка КУП, куда сводятся PE-проводники розеток, освещения, заземление чугунной/стальной ванны и металлических труб водопровода проводом не менее 4 мм² (или 2.5 мм² с мех. защитой)."
    ]
  },
  {
    id: "cable-lines-1kv",
    title: "Кабельные линии до 1 кВ",
    subtitle: "Правила прокладки по ПУЭ гл. 2.1. Радиусы изгиба и штробы.",
    category: "Кабельные линии",
    tags: ["ПУЭ", "Кабельные линии"],
    content: [
      "• Скрытая прокладка: Кабели должны прокладываться строго по вертикальным и горизонтальным линиям (никаких диагоналей).",
      "• Отступы: Горизонтальные трассы прокладываются на расстоянии 150-200 мм от потолка. Вертикальные — не ближе 100 мм от углов дверей и окон.",
      "• Защита при пересечении: При пересечении кабеля с трубами отопления или горячей воды расстояние должно быть не менее 50 мм (и кабель должен быть защищен от нагрева).",
      "• Радиус изгиба: Для кабелей с медными жилами (ВВГ) радиус изгиба должен быть не менее 10 наружных диаметров кабеля (для однопроволочных жил) и 7.5 диаметров (для многопроволочных)."
    ]
  },
  {
    id: "snip-30506",
    title: "СНиП 3.05.06-85",
    subtitle: "Правила приёмки электромонтажных работ и скрытых трасс.",
    category: "СНиП",
    tags: ["СНиП"],
    content: [
      "Этот документ регулирует, как сдавать работу заказчику и технадзору:",
      "• Акты скрытых работ: Перед заштукатуриванием штроб или закрытием потолка обязательно составляется акт освидетельствования скрытых работ.",
      "• Запас кабеля: На концах проводов в распаячных коробках, подрозетниках и щитах должен оставляться запас длины (не менее 50 мм) для повторного переподключения.",
      "• Запрет на соединения в трубах: Любые соединения жил проводов внутри гофр, труб или глухих стен категорически запрещены. Только в доступных коробках."
    ]
  },
  {
    id: "gost-50462",
    title: "ГОСТ Р 50462-2009",
    subtitle: "Идентификация проводников. Цветовая маркировка по ГОСТ.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии"],
    hasTable: true,
    content: [
      "Строгое соблюдение цветов изоляции — это безопасность следующего мастера, который откроет ваш щит. Желто-зеленый цвет запрещено использовать для любых целей, кроме PE!"
    ],
    tableData: {
      headers: ["Назначение", "Обозначение", "Цвет изоляции"],
      rows: [
        ["Фазный проводник", "L", "Коричневый, черный, серый, белый (в крайнем случае)"],
        ["Нейтральный (рабочий ноль)", "N", "Строго голубой / синий"],
        ["Защитный проводник", "PE", "Строго желто-зеленый (полосатый)"],
        ["Совмещенный нулевой", "PEN", "Желто-зеленый с синими метками на концах"]
      ]
    }
  },
  {
    id: "uzo-diff",
    title: "УЗО и Дифавтоматы",
    subtitle: "Выбор токов утечки, селективность и номиналы автоматов.",
    category: "ПУЭ",
    tags: ["ПУЭ", "Заземление", "Безопасность"],
    hasTable: true,
    content: [
      "• Правило номинала: Номинальный ток УЗО (In) должен быть больше или равен току вышестоящего защитного автомата. (Пример: Автомат 16А -> УЗО берем на 25А или 16А).",
      "• Тип А или АС: ПУЭ рекомендует тип А (реагирует на пульсирующий постоянный ток утечки от блоков питания ПК, ТВ, стиралок). Тип АС реагирует только на переменный ток.",
      "• Запрет УЗО: Запрещено ставить УЗО на линии, питающие пожарную сигнализацию и системы оповещения."
    ],
    tableData: {
      headers: ["Уставка (мА)", "Тип защиты", "Обязательное применение"],
      rows: [
        ["10 мА", "Сверхчувствительная", "Ванные, душевые, джакузи, бойлеры (особо опасные зоны)."],
        ["30 мА", "Стандартная (от удара)", "Все розеточные группы квартир, детские комнаты, кухня."],
        ["100 - 300 мА", "Противопожарная", "На вводе в щит. Отслеживает деградацию изоляции кабеля в стенах. Не защищает человека!"]
      ]
    }
  },
  {
    id: "co-153",
    title: "СО 153-34.21.122-2003",
    subtitle: "Молниезащита зданий и УЗИП (Защита от импульсных перенапряжений).",
    category: "СНиП",
    tags: ["СНиП", "Заземление"],
    content: [
      "• УЗИП (Устройства защиты от импульсных перенапряжений): В частных домах при воздушном вводе установка УЗИП обязательна для защиты от ударов молний.",
      "• Классы УЗИП: Класс I (B) ставится на улице в щитке учета на столбе. Класс II (C) ставится в домашнем распределительном щите. Класс III (D) — непосредственно у дорогой электроники.",
      "• Токоотводы: Минимальное сечение стального токоотвода молниезащиты — 50 мм² (пруток диаметром 8 мм). Соединения выполняются сваркой (длина шва не менее 2 диаметров)."
    ]
  },
  {
    id: "gost-iec-60364",
    title: "ГОСТ IEC 60364",
    subtitle: "Зоны в ванных комнатах и классификация внешних воздействий.",
    category: "ГОСТ",
    tags: ["ГОСТ"],
    content: [
      "Зонирование влажных помещений по ГОСТ:",
      "• Зона 0 (внутри ванны/поддона): Только приборы 12В (IPX7).",
      "• Зона 1 (над ванной до высоты 2.25м): Только водонагреватели (IPX5). Розетки запрещены.",
      "• Зона 2 (60 см от края ванны): Светильники, бойлеры, вытяжки (IPX4). Розетки запрещены.",
      "• Зона 3 (далее 60 см): Разрешена установка розеток (IPX4), но только при наличии защиты УЗО 30 мА и подключения через разделительный трансформатор."
    ]
  },
  {
    id: "fz-123",
    title: "ФЗ-123 «Технический регламент»",
    subtitle: "Противопожарные требования к электрощитам и проходкам.",
    category: "Пожарная безопасность",
    tags: ["Пожарная безопасность"],
    content: [
      "• Проходки стен: Отверстия в стенах после прокладки кабеля должны быть заделаны огнестойкой пеной или составом, обеспечивающим предел огнестойкости не ниже самой стены.",
      "• Щитовые: Распределительные щиты должны изготавливаться из негорючих материалов. Дверцы щитов в общественных зданиях должны запираться на ключ.",
      "• Деревянные дома: Скрытая прокладка кабеля в деревянных домах разрешена только в глухих металлических трубах (с локализационной способностью). Гофры и металлорукав для скрытой проводки по дереву запрещены!"
    ]
  },
  {
    id: "gost-50571-5-52",
    title: "ГОСТ Р 50571.5.52-2011",
    subtitle: "Выбор сечений кабеля и расчет номиналов автоматов.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии"],
    hasTable: true,
    content: [
      "Главное правило защиты: Автомат защищает кабель, а не прибор. Номинал автомата всегда подбирается строго по сечению самого слабого участка кабеля в линии."
    ],
    tableData: {
      headers: ["Сечение медного кабеля", "Макс. мощность (220В)", "Автомат (А)", "Назначение линии"],
      rows: [
        ["1.5 мм²", "3.3 кВт", "10 А (макс 13А)", "Освещение, роутеры, маломощные приборы."],
        ["2.5 мм²", "4.6 кВт", "16 А", "Обычные розеточные группы (спальни, зал)."],
        ["4.0 мм²", "5.9 кВт", "25 А (макс 20А на розетку)", "Стиральная машина + бойлер, духовка."],
        ["6.0 мм²", "7.4 кВт", "32 А", "Электрическая варочная панель."],
        ["10.0 мм²", "10.1 кВт", "40 А - 50 А", "Вводной кабель в квартиру (1 фаза)."]
      ]
    }
  },
  {
    id: "gost-32144",
    title: "ГОСТ 32144-2013",
    subtitle: "Качество электроэнергии и реле напряжения.",
    category: "ГОСТ",
    tags: ["ГОСТ"],
    hasTable: true,
    content: [
      "Для защиты от отгорания нуля в стояке МКД и скачков напряжения в щитке обязательно устанавливается Реле напряжения (РН). Настройки РН должны опираться на этот ГОСТ."
    ],
    tableData: {
      headers: ["Параметр сети", "Номинал", "Норма (настройка Реле Напряжения)"],
      rows: [
        ["Нижний порог отключения", "230 В", "198 - 207 В (Обычно ставят 200В)"],
        ["Верхний порог отключения", "230 В", "253 В (Обычно ставят 250В - 255В)"],
        ["Время задержки включения", "-", "Для холодильников и компрессоров: 300 секунд (5 мин)"]
      ]
    }
  },
  {
    id: "potee",
    title: "ПОТЭЭ",
    subtitle: "Правила охраны труда, наряды-допуски и снятие напряжения.",
    category: "Безопасность",
    tags: ["Безопасность", "ПУЭ"],
    hasTable: true,
    content: [
      "Золотое правило безопасной работы со снятием напряжения (Организационные мероприятия):",
      "1. Произвести необходимые отключения (выключить рубильник/автомат).",
      "2. Вывесить плакат «НЕ ВКЛЮЧАТЬ! РАБОТАЮТ ЛЮДИ».",
      "3. Проверить отсутствие напряжения указателем (тестером).",
      "4. Установить переносное заземление (если требуется).",
      "5. Оградить рабочее место."
    ],
    tableData: {
      headers: ["Группа", "Квалификация", "Что имеет право делать"],
      rows: [
        ["II", "Монтажник, стажер", "Работа с электроинструментом, прокладка трасс без подключения."],
        ["III", "Электромонтер", "Самостоятельное подключение, обслуживание электроустановок до 1000В."],
        ["IV", "Прораб, мастер", "Выдача нарядов-допусков, обучение персонала, ответственность за объект."]
      ]
    }
  },
  {
    id: "cable-joints",
    title: "Монтаж кабельных муфт и гильз",
    subtitle: "Технология опрессовки жил ГМЛ и термоусадки.",
    category: "Монтаж",
    tags: ["Кабельные линии", "Монтаж"],
    content: [
      "Правила качественного контакта (опрессовка):",
      "• Матрица пресса: Должна строго соответствовать сечению гильзы (ГМЛ 4 жмется матрицей на 4).",
      "• Количество жимков: Для гильз до 10 мм² обычно 1-2 жимка. Жимок делается от центра к краям гильзы.",
      "• Заполнение: Гильза должна быть плотно забита жилами (добивать кусками меди, если есть пустота).",
      "• Изоляция: Поверх опрессовки накладывается термоусадочная трубка с клеевым слоем (ТУТк), которая при нагреве феном обеспечивает герметичность сжатия и изоляцию лучше изоленты."
    ]
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
            Нормативы, ГОСТы и ПУЭ. Выжимка без воды для работы на объекте.
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
            className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95"
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

              {/* РЕАЛЬНАЯ ТАБЛИЦА */}
              {selectedDoc.tableData && (
                <div className="mt-6 border border-border rounded-xl overflow-hidden bg-background">
                  {/* Горизонтальный скролл для мобилок */}
                  <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-primary/10">
                          {selectedDoc.tableData.headers.map((header, idx) => (
                            <th key={idx} className="p-3 text-xs sm:text-sm font-black text-primary border-b border-border/50 uppercase tracking-wider whitespace-nowrap">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedDoc.tableData.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-muted/30 transition-colors border-b border-border/50 last:border-0">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className={`p-3 text-sm sm:text-base ${cellIdx === 0 ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
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
