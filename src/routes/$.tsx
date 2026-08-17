import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Home, Calculator, PlugZap, ArrowLeft } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-4 sm:p-6 flex flex-col items-center justify-center min-h-[70vh] text-center animate-in fade-in zoom-in-95 duration-500">
      
      {/* Иконка с эффектом свечения */}
      <div className="relative mb-6 sm:mb-8">
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative bg-card border border-border p-6 sm:p-8 rounded-full shadow-2xl">
          <PlugZap className="w-16 h-16 sm:w-24 sm:h-24 text-primary" />
        </div>
      </div>
      
      {/* Текстовый блок */}
      <h1 className="text-6xl sm:text-8xl font-black text-foreground mb-2 sm:mb-4 tracking-tighter">
        4<span className="text-primary">0</span>4
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
        Обрыв цепи! Страница не найдена
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        Похоже, вы перешли по битой ссылке или страница была удалена. 
        Проверьте правильность адреса или вернитесь к рабочим инструментам.
      </p>
      
      {/* Кнопки навигации */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
        <button
          onClick={() => router.history.back()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl bg-muted text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors font-bold text-sm border border-border shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
        
        <Link
          to="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold text-sm shadow-lg shadow-primary/20"
        >
          <Home className="w-4 h-4" /> На главную
        </Link>
        
        <Link
          to="/calculators"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 rounded-xl bg-card text-foreground hover:border-primary transition-colors font-bold text-sm border border-border shadow-sm"
        >
          <Calculator className="w-4 h-4" /> Калькуляторы
        </Link>
      </div>
    </div>
  )
}
