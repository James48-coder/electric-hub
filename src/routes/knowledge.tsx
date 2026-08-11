import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  X,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/knowledge")({
  component: KnowledgePage,
});

type DocItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  content: string[];
  hasTable?: boolean;
};

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
      "Ключевые требования: обязательное применение трехпроводной системы питания (L, N, PE) в новых зданиях, запрет на скрытую прокладку алюминиевой проводки в жилых домах сечением менее 2.5 мм² (с 2001 года только медь для розеточных групп), нормативы по сечениям кабелей и защитным аппаратам."
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
      "Нормативы высоты установки: выключатели обычно на высоте 900 мм (или 300 мм по евростандарту), розеточные группы — 300 мм от пола, на кухне — на высоте 1100 мм."
    ]
  },
  {
    id: "grounding-systems",
    title: "Заземление и зануление",
    subtitle: "Системы TN-C, TN-S, TN-C-S, TT, IT. Сопротивление контура и проверка.",
    category: "Заземление",
    tags: ["ПУЭ", "Заземление"],
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

export function KnowledgePage() {
  const [activeTab, setActiveTab] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);

  const tabs = ["Все", "ПУЭ", "ГОСТ", "СНиП", "Заземление", "Кабельные линии", "Пожарная безопасность", "Безопасность", "Монтаж"];

  const filteredDocs = KNOWLEDGE_DOCS.filter((doc) => {
    const matchesTab = activeTab === "Все" || doc.tags.includes(activeTab);
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="mx-auto w-full max-w-6xl py-6 space-y-8 text-slate-100">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">База знаний</h1>
        <p className="text-muted-foreground">Нормы, правила и стандарты под рукой</p>
      </header>

      {/* Search Input */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по нормам и правилам..."
          className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl h-12 pl-12 pr-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-xl px-4 h-9 text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Document Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Документы ({filteredDocs.length})</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="group glass neu rounded-2xl p-6 flex flex-col justify-between space-y-4 border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 grid place-items-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-white leading-tight">{doc.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{doc.subtitle}</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400 border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-blue-400 hover:text-blue-300 pt-2 border-t border-slate-800 transition-colors group-hover:translate-x-0.5"
                >
                  <span>Читать документ</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal / Drawer */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-6 text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex gap-2">
                  {selectedDoc.tags.map((t) => (
                    <span key={t} className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white pt-1">{selectedDoc.title}</h2>
                <p className="text-sm text-slate-400">{selectedDoc.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:text-white grid place-items-center transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              {selectedDoc.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              {/* Table: UZO / DIFF */}
              {selectedDoc.id === 'uzo-diff' && (
                <div className="border border-slate-700 rounded-xl overflow-hidden mt-4 text-xs">
                  <div className="bg-slate-800 px-4 py-2 font-semibold text-slate-200 flex justify-between">
                    <span>Зона применения</span>
                    <span>Ток утечки ($I_{\Delta n}$)</span>
                  </div>
                  <div className="divide-y divide-slate-800">
                    <div className="px-4 py-2 flex justify-between"><span>Ванная / Бассейн</span><span className="text-emerald-400">10 мА</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>Розетки / Быт</span><span className="text-amber-400">30 мА</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>Ввод (Противопожарное)</span><span className="text-red-400">100 / 300 мА</span></div>
                  </div>
                </div>
              )}

              {/* Table: POTEE */}
              {selectedDoc.id === 'potee' && (
                <div className="border border-slate-700 rounded-xl overflow-hidden mt-4 text-xs">
                  <div className="bg-slate-800 px-4 py-2 font-semibold text-slate-200 flex justify-between">
                    <span>Группа</span>
                    <span>Требования</span>
                  </div>
                  <div className="divide-y divide-slate-800">
                    <div className="px-4 py-2 flex justify-between"><span>I</span><span>Инструктаж, неэлектротехнический персонал</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>II</span><span>Минимальная для самостоятельной работы</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>III</span><span>Допуск до 1000В, обслуживание</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>IV / V</span><span>Высшие группы, ответственные за электрохозяйство</span></div>
                  </div>
                </div>
              )}
              
              {/* Tables from Stage 1 */}
              {selectedDoc.id === 'gost-50571-5-52' && (
                <div className="border border-slate-700 rounded-xl overflow-hidden mt-4 text-xs">
                  <div className="bg-slate-800 px-4 py-2 font-semibold text-slate-200 flex justify-between">
                    <span>Сечение (мм²)</span>
                    <span>Открыто (А)</span>
                    <span>В трубе (А)</span>
                  </div>
                  <div className="divide-y divide-slate-800">
                    <div className="px-4 py-2 flex justify-between"><span>1.5</span><span>19 А</span><span>15 А</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>2.5</span><span>27 А</span><span>21 А</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>4.0</span><span>38 А</span><span>28 А</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>6.0</span><span>46 А</span><span>36 А</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>10.0</span><span>70 А</span><span>50 А</span></div>
                  </div>
                </div>
              )}

              {selectedDoc.id === 'gost-50462' && (
                <div className="border border-slate-700 rounded-xl overflow-hidden mt-4 text-xs">
                  <div className="bg-slate-800 px-4 py-2 font-semibold text-slate-200 flex justify-between">
                    <span>Назначение жилы</span>
                    <span>Буквенный код</span>
                    <span>Цвет изоляции</span>
                  </div>
                  <div className="divide-y divide-slate-800">
                    <div className="px-4 py-2 flex justify-between"><span>Фаза</span><span>L</span><span className="text-amber-400">Коричневый / Черный / Серый / Белый</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>Нейтраль</span><span>N</span><span className="text-blue-400">Голубой / Синий</span></div>
                    <div className="px-4 py-2 flex justify-between"><span>Заземление</span><span>PE</span><span className="text-emerald-400">Желто-зеленый</span></div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <Button
                onClick={() => setSelectedDoc(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
