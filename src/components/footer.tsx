import { Link } from '@tanstack/react-router'
import { Zap } from 'lucide-react'
import React from 'react'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card mt-auto shrink-0">
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6">
          
          {/* Блок 1: Логотип и описание */}
          <div className="md:col-span-1 flex flex-col items-start gap-3 sm:gap-4">
            <Link to="/" className="flex items-center gap-2 outline-none group">
              <div className="relative grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary/20">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-lg sm:text-xl font-black tracking-tight text-foreground transition-all group-hover:text-primary">
                ВольтПро
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pr-4 sm:pr-0">
              Профессиональный инженерный сервис для электриков, проектировщиков и монтажников.
            </p>
          </div>

          {/* Блок 2: Навигация (Сервис) */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-widest mb-1 sm:mb-2">Сервис</h4>
            <Link to="/calculators" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0">Калькуляторы</Link>
            <Link to="/schemes" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0">Схемы и распиновки</Link>
            <Link to="/estimator" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0">ИИ-сметчик</Link>
            <Link to="/articles" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0">База знаний</Link>
          </div>

          {/* Блок 3: Правовая информация (Шаги 1, 2, 3) */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-widest mb-1 sm:mb-2">Документы</h4>
            <Link to="/legal/offer" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0">Публичная оферта</Link>
            <Link to="/legal/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0">Политика конфиденциальности</Link>
            <Link to="/legal/tariffs" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0">Условия тарифов</Link>
          </div>

          {/* Блок 4: Контакты (Шаги 4 и 5) */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h4 className="text-[10px] sm:text-xs font-bold text-foreground uppercase tracking-widest mb-1 sm:mb-2">Связь</h4>
            
            {/* Шаг 4: Почта. Открывает почтовый клиент */}
            <a 
              href="mailto:support@voltpro.ru" 
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0"
            >
              support@voltpro.ru
            </a>
            
            {/* Шаг 5: Telegram. Открывается в новой вкладке (target="_blank") */}
            <a 
              href="https://t.me/voltpro_support" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors py-1 sm:py-0"
            >
              Чат поддержки (Telegram)
            </a>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} ВольтПро. Все права защищены.
          </p>
          <div className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
            Сделано для инженеров с <span className="text-amber-500 animate-pulse">⚡</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
