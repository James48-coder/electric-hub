import { createFileRoute } from '@tanstack/react-router'
import { Search, FileText, ExternalLink } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/knowledge')({
  component: KnowledgePage,
})

// База данных документов
const documents = [
  {
    id: 1,
    title: "ПУЭ 7-е издание",
    description: "Правила устройства электроустановок — основной нормативный документ для проектирования и монтажа.",
    tags: ["ПУЭ"],
    link: "#"
  },
  {
    id: 2,
    title: "ГОСТ 31565-2012",
    description: "Требования пожарной безопасности к кабельным изделиям, классы пожарной опасности.",
    tags: ["ГОСТ", "Кабельные линии", "Пожарная безопасность"],
    link: "#"
  },
  {
    id: 3,
    title: "СП 256.1325800.2016",
    description: "Электроустановки жилых и общественных зданий — правила проектирования и монтажа.",
    tags: ["СНиП", "ПУЭ"],
    link: "#"
  },
  {
    id: 4,
    title: "ГОСТ Р 50571.5.52-2011",
    description: "Выбор и монтаж электрооборудования. Электропроводки.",
    tags: ["ГОСТ", "Кабельные линии"],
    link: "#"
  },
  {
    id: 5,
    title: "Инструкция по заземлению",
    description: "Типовая инструкция по устройству молниезащиты зданий, сооружений и промышленных коммуникаций.",
    tags: ["Заземление", "Безопасность"],
    link: "#"
  },
  {
    id: 6,
    title: "ПОТ ЭЭ",
    description: "Правила по охране труда при эксплуатации электроустановок.",
    tags: ["Безопасность"],
    link: "#"
  }
]

// Собираем уникальные категории из всех документов + кнопка "Все"
const allTags = ["Все", ...Array.from(new Set(documents.flatMap(doc => doc.tags)))]

function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState("Все")
  const [searchQuery, setSearchQuery] = useState("")

  // Фильтрация документов по категории и поисковому запросу
  const filteredDocs = documents.filter(doc => {
    const matchesCategory = activeCategory === "Все" || doc.tags.includes(activeCategory)
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container mx-auto max-w-6xl animate-in fade-in duration-500 pb-24">
      
      {/* Строка поиска */}
      <div className="mb-6 sm:mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Поиск по нормам, правилам и ГОСТам..."
            className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-3.5 sm:py-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Горизонтальный скролл с категориями (скроллбар скрыт) */}
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap mb-6 sm:mb-8 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full">
        {allTags.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shrink-0 focus:outline-none ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground scale-105'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Заголовок со счетчиком */}
      <h2 className="text-xl sm:text-2xl font-black text-foreground mb-4 sm:mb-6 flex items-center gap-3">
        Документы 
        <span className="bg-muted text-muted-foreground text-sm px-2.5 py-0.5 rounded-full font-bold">
          {filteredDocs.length}
        </span>
      </h2>

      {/* Сетка документов */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredDocs.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-card border border-border rounded-2xl p-5 sm:p-6 flex flex-col h-full shadow-sm hover:shadow-md hover:border-primary/50 transition-all group"
            >
              {/* Иконка */}
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-primary" />
              </div>

              {/* Текст */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2 leading-tight">
                {doc.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1">
                {doc.description}
              </p>

              {/* Теги */}
              <div className="flex flex-wrap gap-2 mb-6">
                {doc.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground border border-border/50 text-[10px] font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Кнопка "Читать" */}
              <a 
                href={doc.link} 
                className="flex items-center justify-between pt-4 border-t border-border mt-auto focus:outline-none"
              >
                <span className="text-sm font-bold text-primary group-hover:opacity-80 transition-opacity">
                  Читать документ
                </span>
                <ExternalLink className="w-4 h-4 text-primary group-hover:opacity-80 transition-opacity group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        // Пустое состояние, если поиск ничего не нашел
        <div className="text-center py-12 sm:py-20 border-2 border-dashed border-border rounded-2xl bg-card">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-foreground mb-1">Ничего не найдено</h3>
          <p className="text-sm text-muted-foreground">Попробуйте изменить поисковый запрос или категорию.</p>
        </div>
      )}

    </div>
  )
}
