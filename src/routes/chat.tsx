import { createFileRoute } from '@tanstack/react-router'
import { Bot, ExternalLink, MessageSquareWarning } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

function ChatPage() {
  return (
    <div className="container mx-auto max-w-4xl animate-in fade-in duration-500 pb-24">
      
      {/* Заголовок страницы */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-2">Чат с ИИ</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Твой личный эксперт по электромонтажу</p>
      </div>

      {/* Основная карточка-заглушка DeepSeek */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 sm:p-12 shadow-sm text-center flex flex-col items-center">
        
        {/* Неоновый блик на фоне */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Иконка бота */}
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-primary/20">
          <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-primary drop-shadow-sm" />
        </div>

        {/* Текст */}
        <h2 className="relative z-10 text-xl sm:text-3xl font-bold text-foreground mb-4">
          ИИ-ассистент DeepSeek
        </h2>
        
        <p className="relative z-10 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
          Для детальных консультаций по нормам ПУЭ, расчетам и схемам вы можете использовать официальный помощник DeepSeek, который стабильно доступен в России.
        </p>

        {/* Кнопка перехода */}
        <a 
          href="https://chat.deepseek.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 focus:outline-none"
        >
          <span>Открыть чат DeepSeek</span>
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

        {/* Плашка предупреждения */}
        <div className="relative z-10 mt-10 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-md mx-auto flex items-start gap-3 text-left">
          <MessageSquareWarning className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <span className="font-bold text-amber-600 dark:text-amber-500">Внимание:</span> Искусственный интеллект может допускать ошибки. Обязательно перепроверяйте расчеты сечений и номиналов автоматов по таблицам ПУЭ перед началом работ.
          </p>
        </div>
        
      </div>
    </div>
  )
}
