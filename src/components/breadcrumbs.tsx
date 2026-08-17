import { Link, useLocation } from '@tanstack/react-router'
import { ChevronRight, Home } from 'lucide-react'
import React from 'react'

// Словарь для перевода путей из URL в красивые русские названия
const routeNames: Record<string, string> = {
  'knowledge': 'База знаний',
  'articles': 'Статьи',
  'calculators': 'Калькуляторы',
  'schemes': 'Схемы и распиновки',
  'estimator': 'ИИ-сметчик',
  'chat': 'Чат с ИИ',
  'masters-chat': 'Чат мастеров',
  'profile': 'Личный кабинет',
  'legal': 'Юридическая информация',
  'offer': 'Публичная оферта',
  'privacy': 'Политика конфиденциальности',
  'tariffs': 'Условия тарифов'
}

export function Breadcrumbs() {
  const location = useLocation()
  
  // Разбиваем текущий путь на сегменты
  const pathnames = location.pathname.split('/').filter((x) => x)

  // На главной странице крошки не показываем
  if (pathnames.length === 0) {
    return null
  }

  return (
    <nav className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs text-muted-foreground mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1 w-full">
      
      {/* Ссылка на главную (Домик) */}
      <Link to="/" className="flex items-center gap-1.5 hover:text-primary transition-colors focus:outline-none shrink-0">
        <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Главная</span>
      </Link>
      
      {/* Генерация цепочки из сегментов URL */}
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1
        // Собираем путь для каждой промежуточной ссылки
        const to = `/${pathnames.slice(0, index + 1).join('/')}`
        // Берем русское название из словаря, либо оставляем как есть, если в словаре нет
        const name = routeNames[value] || value

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 opacity-40" />
            
            {isLast ? (
              // Последний элемент — это текущая страница, делаем её жирной и некликабельной
              <span className="font-bold text-foreground truncate shrink-0">
                {name}
              </span>
            ) : (
              // Промежуточные элементы — кликабельные ссылки
              <Link to={to as any} className="hover:text-primary transition-colors focus:outline-none truncate shrink-0">
                {name}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
