import { createFileRoute } from '@tanstack/react-router'
import { Search, FileText, ChevronRight, X } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/knowledge')({
  component: KnowledgePage,
})

// Типизация документа
type DocItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  content: string[];
  hasTable?: boolean;
};

// ТВОЯ ОРИГИНАЛЬНАЯ БАЗА
const KNOWLEDGE_DOCS: DocItem[] = [
  {
    id: "pue-7",
    title: "ПУЭ 7-е издание",
    subtitle: "Правила устройства электроустановок — основной документ для проектирования и монтажа.",
    category: "ПУЭ",
    tags: ["ПУЭ"],
    content: [
      "ПУЭ (Правила устройства электроустановок) — главный нормативный документ для каждого электромонтажника в РФ.",
      "Основные разделы: общие правила, устройство электрооборудования, заземление и защитные меры безопасности, электропроводки и кабельные линии.",
      "Ключевые требования: обязательное применение трехпроводной системы питания (L, N, PE) в новых зданиях, запрет на скрытую прокладку алюминиевой проводки в жилых домах сечением менее 2.5 мм2 (с 2001 года только медь для розеточных групп), нормативы по сечениям кабелей и защитным аппаратам."
    ]
  },
  {
    id: "gost-31565",
    title: "ГОСТ 31565-2012",
    subtitle: "Требования пожарной безопасности к кабельным изделиям, классы пожарной опасности.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии", "Пожарная безопасность"],
    content: [
      "Стандарт определяет классификацию кабельных изделий по пожарной опасности.",
      "Маркировка кабелей по исполнению:",
      "• Без индекса — не распространяют горение при одиночной прокладке.",
      "• нг — не распространяют горение при пучковой прокладке.",
      "• нг-LS (Low Smoke) — не распространяют горение при пучковой прокладке, с пониженным дымо- и газовыделением (стандарт для жилых помещений).",
      "• нг-FRLS — огнестойкие, с пониженным дымовыделением (для систем пожаротушения, эвакуационного освещения)."
    ]
  },
  {
    id: "sp-256",
    title: "СП 256.1325800.2016",
    subtitle: "Электроустановки жилых и общественных зданий — правила проектирования и монтажа.",
    category: "СНиП",
    tags: ["СНиП", "ПУЭ"],
    content: [
      "Свод правил регламентирует расчет электрических нагрузок, проектирование групповых сетей в квартирах и домах.",
      "Основные положения: учет коэффициентов одновременности для бытовых электроприборов, требования к размещению розеток и выключателей в жилых комнатах, кухнях и санузлах.",
      "Нормативы высоты установки: выключатели обычно на высоте 900 мм, розеточные группы — 300 мм от пола, на кухне — на высоте 1100 мм."
    ]
  },
  {
    id: "grounding-systems",
    title: "Заземление и зануление",
    subtitle: "Системы TN-C, TN-S, TN-C-S, TT, IT. Сопротивление контура и проверка.",
    category: "Заземление",
    tags: ["ПУЭ", "Заземление"],
    hasTable: true,
    content: [
      "Системы заземления электроустановок зданий по классификации ГОСТ Р 50571.1:",
      "• TN-C — совмещенный нулевой защитный и рабочий проводник (PEN) на всем протяжении. Устаревшая система.",
      "• TN-S — раздельные защитный (PE) и рабочий (N) проводники от самого источника питания.",
      "• TN-C-S — разделение PEN-проводника на PE и N на вводе в здание (самый частый вариант в частном секторе и МКД при реконструкции).",
      "• TT — глухозаземленная нейтраль источника, а открытые проводящие части заземлены через независимый местный контур (обязательно применение УЗО)."
    ]
  },
  {
    id: "gost-50571",
    title: "ГОСТ Р 50571",
    subtitle: "Электроустановки низковольтные. Защита от поражения электрическим током.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Заземление"],
    content: [
      "Комплекс стандартов на проектирование и монтаж низковольтных электроустановок до 1000 В.",
      "Основные требования: обеспечение базовой защиты (изоляция токоведущих частей) и защиты при повреждении (автоматическое отключение питания, защитное заземление, уравнивание потенциалов).",
      "Обязательное выполнение дополнительной системы уравнивания потенциалов в ванных и душевых комнатах."
    ]
  },
  {
    id: "cable-lines-1kv",
    title: "Кабельные линии до 1 кВ",
    subtitle: "Прокладка, выбор сечения, защита от КЗ и перегрузок согласно ПУЭ гл. 2.1.",
    category: "Кабельные линии",
    tags: ["ПУЭ", "Кабельные линии"],
    content: [
      "Правила прокладки кабелей и проводов в трубах, коробах, лотках и открыто.",
      "Допустимые радиусы изгиба кабелей (обычно не менее 10-15 диаметров кабеля для предотвращения повреждения изоляции).",
      "Правила совместной прокладки силовых линий и слаботочных сетей (во избежание электромагнитных помех выдерживается расстояние не менее 100–500 мм)."
    ]
  },
  {
    id: "snip-30506",
    title: "СНиП 3.05.06-85",
    subtitle: "Электротехнические устройства — правила производства и приёмки работ.",
    category: "СНиП",
    tags: ["СНиП"],
    content: [
      "Нормативный документ на монтажные и пусконаладочные работы в электротехнических устройствах.",
      "Требования к качеству контактных соединений (опрессовка, сварка, пайка или сжим), контроль изоляции мегаомметром перед подачей напряжения, допуски при скрытой прокладке трасс."
    ]
  },
  {
    id: "gost-50462",
    title: "ГОСТ Р 50462-2009",
    subtitle: "Идентификация проводников по цветам и буквенно-цифровым обозначениям.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии"],
    hasTable: true,
    content: [
      "Цветовая гамма проводов и кабелей в электроустановках переменного тока согласно стандарту:",
      "• Фазные проводники (L): коричневый, черный, серый, белый.",
      "• Нейтральный рабочий проводник (N): голубой / синий.",
      "• Защитный проводник (PE / заземление): желто-зеленый."
    ]
  },
  {
    id: "uzo-diff",
    title: "УЗО и дифавтоматы",
    subtitle: "Выбор номинала, селективность, требования ПУЭ гл. 7.1 для жилых помещений.",
    category: "ПУЭ",
    tags: ["ПУЭ", "Заземление", "Безопасность"],
    hasTable: true,
    content: [
      "Устройство защитного отключения (УЗО) отключает сеть при утечке тока на землю (повреждение изоляции, прикосновение человека к фазе).",
      "Правило выбора по току: номинал УЗО должен быть на ступень выше номинала защитного автомата (автомат 16А — УЗО 25А).",
      "Ниже приведена шпаргалка по выбору токов утечки для разных зон:"
    ]
  },
  {
    id: "co-153",
    title: "СО 153-34.21.122-2003",
    subtitle: "Инструкция по устройству молниезащиты зданий и промышленных коммуникаций.",
    category: "СНиП",
    tags: ["СНиП", "Заземление"],
    content: [
      "Требования к проектированию и монтажу систем молниезащиты (молниеприемники, токоотводы, заземлители).",
      "Расчет зон защиты для жилых зданий, требования к сечению токоотводов и надежности сварных соединений контура заземления молниезащиты."
    ]
  },
  {
    id: "gost-iec-60364",
    title: "ГОСТ IEC 60364",
    subtitle: "Серия стандартов на электроустановки зданий, гармонизированная с МЭК.",
    category: "ГОСТ",
    tags: ["ГОСТ"],
    content: [
      "Международные и гармонизированные с ними российские стандарты безопасности низковольтных электроустановок зданий.",
      "Определяют общие характеристики, выбор электрооборудования в зависимости от внешних воздействий и условий среды."
    ]
  },
  {
    id: "fz-123",
    title: "ФЗ-123 «Технический регламент»",
    subtitle: "Требования пожарной безопасности к электропроводке и распределительным сетям.",
    category: "Пожарная безопасность",
    tags: ["Пожарная безопасность"],
    content: [
      "Федеральный закон о требованиях пожарной безопасности.",
      "Регламентирует предел огнестойкости кабельных линий, требования к материалам распределительных щитов, коробов и кабельных каналов в зданиях различного назначения."
    ]
  },
  {
    id: "gost-50571-5-52",
    title: "ГОСТ Р 50571.5.52-2011",
    subtitle: "Электроустановки низковольтные. Выбор и монтаж электропроводок.",
    category: "ГОСТ",
    tags: ["ГОСТ", "Кабельные линии"],
    hasTable: true,
    content: [
      "Устанавливает детальные требования к выбору и монтажу электропроводок в зависимости от внешних воздействий и условий окружающей среды.",
      "Ниже приведена таблица допустимых длительных токов для медных кабелей (например, ВВГнг-LS) в зависимости от сечения и способа прокладки:"
    ]
  },
  {
    id: "gost-32144",
    title: "ГОСТ 32144-2013",
    subtitle: "Электрическая энергия. Нормы качества в системах электроснабжения общего назначения.",
    category: "ГОСТ",
    tags: ["ГОСТ"],
    hasTable: true,
    content: [
      "Определяет показатели и установленные нормы качества электроэнергии в сетях переменного тока частотой 50 Гц.",
      "Регламентирует допустимые отклонения напряжения: в нормальном режиме работы отклонение напряжения в точке присоединения потребителя не должно превышать ±10% от номинального значения."
    ]
  },
  {
    id: "potee",
    title: "ПОТЭЭ",
    subtitle: "Правила по охране труда при эксплуатации электроустановок.",
    category: "Безопасность",
    tags: ["Безопасность", "ПУЭ"],
    hasTable: true,
    content: [
      "Обязательный нормативный документ по технике безопасности для всех специалистов, выполняющих работы в электроустановках.",
      "Регламентирует порядок организации и безопасного выполнения работ, требования к оформлению нарядов-допусков, распоряжений, а также квалификационные группы по электробезопасности.",
      "Ниже представлена шпаргалка по группам электробезопасности:"
    ]
  },
  {
    id: "cable-joints",
    title: "Монтаж кабельных муфт",
    subtitle: "Практическое руководство по разделке силовых кабелей и опрессовке.",
    category: "Монтаж",
    tags: ["Кабельные линии", "Монтаж"],
    content: [
      "Инструкция по правильной технологии разделки силовых кабелей (с пластмассовой и бумажной изоляцией) перед установкой соединительных и концевых муфт.",
      "Этапы работ: ступенчатая разделка брони и защитных покровов, установка термоусадочных трубок и перчаток с нагревом газовой горелкой, правильная опрессовка жил соединительными гильзами с помощью матричного пресса и контроль изоляции."
    ]
  }
];

const KNOWLEDGE_CATEGORIES = ["Все", "ПУЭ", "ГОСТ", "СНиП", "Кабельные линии", "Заземление", "Безопасность", "Монтаж"];

function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState("Все")
  // Состояние для открытого документа
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null)

  // Фильтрация
  const filteredDocs = KNOWLEDGE_DOCS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "Все" || doc.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Блокируем скролл фона, если модалка открыта
  React.useEffect(() => {
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
            Нормативы, ГОСТы и ПУЭ. Все правила монтажа в одном месте с быстрым поиском.
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-primary/20 shrink-0 self-start md:self-auto">
          <FileText className="w-4 h-4" />
          Документов: {KNOWLEDGE_DOCS.length}
        </div>
      </div>

      {/* Поиск и фильтры */}
      <div className="space-y-4 mb-8 sticky top-0 z-10 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        
        {/* Поисковая строка */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Найти норматив, например ПУЭ 7 или ГОСТ..."
            className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Категории (скролл на мобилках) */}
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
              className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col h-full group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Шапка карточки */}
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

              {/* Название и суть */}
              <h3 className="text-lg sm:text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {doc.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-3">
                {doc.subtitle}
              </p>

              {/* Кнопка "Читать" теперь открывает модалку */}
              <button 
                onClick={() => setSelectedDoc(doc)}
                className="mt-auto flex items-center justify-between w-full bg-background border border-border rounded-xl p-3 sm:p-4 text-sm font-bold text-foreground hover:bg-primary/5 hover:border-primary/50 transition-colors group/btn"
              >
                <span>Изучить норматив</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Состояние: Ничего не найдено */
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

      {/* МОДАЛЬНОЕ ОКНО ДЛЯ ЧТЕНИЯ ДОКУМЕНТА */}
      {selectedDoc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedDoc(null)} // Закрытие при клике на фон
        >
          <div 
            className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()} // Чтобы окно не закрывалось при клике внутри него
          >
            {/* Шапка модалки */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-border bg-muted/20">
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
              
              <div className="space-y-4">
                {selectedDoc.content.map((paragraph, index) => (
                  <p key={index} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {selectedDoc.hasTable && (
                <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-500/80">
                    К этому нормативу привязана таблица. В текущей MVP версии графики и таблицы находятся в процессе интеграции.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
