import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, Clock, Eye, Megaphone, ArrowRight } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/articles')({
  component: ArticlesPage,
})

// Моковые данные для статей
const mockArticles = [
  { id: 1, title: 'Как выбрать УЗО для влажных помещений', category: 'Безопасность', readTime: '5 мин', views: 1240, type: 'article' },
  { id: 2, title: 'Ошибки при сборке распределительного щита', category: 'Монтаж', readTime: '8 мин', views: 890, type: 'article' },
  { id: 3, title: 'Профессиональный инструмент электрика со скидкой 20%', category: 'Спецпредложение', type: 'ad' }, // Нативная реклама
  { id: 4, title: 'Новые требования ГОСТ к кабельной продукции', category: 'Нормативы', readTime: '4 мин', views: 2100, type: 'article' },
]

function ArticlesPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl animate-in fade-in duration-500 text-foreground pb-24">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            База знаний
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Статьи по электрике</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {mockArticles.map((item) => (
          item.type === 'article' ? (
            // Карточка обычной статьи
            <div key={item.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="h-40 sm:h-48 bg-muted relative overflow-hidden">
                {/* Заглушка для картинки */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <BookOpen className="h-10 w-10 text-neutral-700" />
                </div>
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] sm:text-xs font-bold text-foreground">
                  {item.category}
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground font-medium">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3 sm:h-4 sm:w-4" /> {item.readTime}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3 sm:h-4 sm:w-4" /> {item.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Карточка нативной рекламы
            <div key={item.id} className="group bg-amber-500/5 border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col relative">
              <div className="absolute top-3 right-3 bg-amber-500 text-neutral-950 px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider z-10">
                Реклама
              </div>
              <div className="p-5 sm:p-6 flex flex-col h-full justify-center">
                <Megaphone className="h-8 w-8 sm:h-10 sm:w-10 text-amber-500 mb-4 opacity-80" />
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  Надежные пассатижи, стрипперы и отвертки от официального дилера.
                </p>
                <button className="mt-auto w-full py-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-neutral-950 font-bold rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center gap-2">
                  Перейти в магазин <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
