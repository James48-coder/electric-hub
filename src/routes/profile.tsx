import { createFileRoute } from '@tanstack/react-router'
import { User, CreditCard, LogOut, Zap, CheckCircle2, Shield, Settings, Trash2, AlertTriangle, HelpCircle } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  // Имитация состояния привязанной карты и уведомлений
  const [isCardLinked, setIsCardLinked] = useState(true)
  const [showToast, setShowToast] = useState(false)

  // Функция отвязки карты (в 1 клик)
  const handleUnbindCard = () => {
    setIsCardLinked(false)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl animate-in fade-in duration-500 text-foreground pb-24 relative">
      
      {/* Всплывающее уведомление (Тост) */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" /> Карта успешно отвязана
        </div>
      )}

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Личный кабинет</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Управление аккаунтом и подпиской</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        
        {/* ЛЕВАЯ КОЛОНКА: Профиль и настройки */}
        <div className="md:col-span-1 space-y-4 sm:space-y-6">
          
          {/* Карточка пользователя */}
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-2 border-primary/20 relative">
              <User className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
              <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-card flex items-center justify-center">
                <Shield className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Иван Иванов</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">ivan.electro@mail.ru</p>
            
            <div className="w-full flex flex-col gap-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-muted text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-xs sm:text-sm font-bold">
                <Settings className="w-4 h-4" /> Настройки профиля
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors text-xs sm:text-sm font-bold">
                <LogOut className="w-4 h-4" /> Выйти из аккаунта
              </button>
            </div>
          </div>

          {/* Карточка поддержки */}
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-bold text-foreground text-sm sm:text-base">Помощь</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
              Возникли вопросы по расчетам или списаниям? Напишите нам, мы быстро поможем.
            </p>
            <a href="https://t.me/voltpro_chat" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-2 sm:py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm font-bold">
              Написать в поддержку
            </a>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: Тарифы и оплата */}
        <div className="md:col-span-2 space-y-4 sm:space-y-6">
          
          {/* Блок активного тарифа */}
          <div className="bg-gradient-to-br from-card to-primary/5 border border-primary/20 rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
            {/* Декоративный элемент */}
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-1">Ваш текущий тариф</p>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-2">
                  Уровень 2: PRO <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 fill-amber-500" />
                </h2>
              </div>
              <div className="bg-background/80 backdrop-blur-sm border border-border px-3 py-1.5 rounded-lg text-center shrink-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Оплачено до</p>
                <p className="text-sm sm:text-base font-bold text-foreground">17 сентября 2026</p>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> Безлимитный доступ к ИИ-сметчику
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> Все инженерные калькуляторы и схемы
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> Экспорт смет в PDF и история объектов
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="flex-1 bg-primary text-primary-foreground py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm">
                Улучшить до Командного
              </button>
              <button className="flex-1 bg-background border border-border text-foreground py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-muted transition-colors">
                Сменить тариф
              </button>
            </div>
          </div>

          {/* Блок управления оплатой (Эквайринг и отвязка карты) */}
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Способ оплаты
            </h3>
            
            {isCardLinked ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/50 p-4 rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 sm:w-14 sm:h-9 bg-background border border-border rounded flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                      {/* Упрощенный логотип карты МИР */}
                      <span className="font-black text-green-600 italic text-xs tracking-tighter">МИР</span>
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-foreground">•••• 2026</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Следующее списание: 490 ₽</p>
                    </div>
                  </div>
                  
                  {/* Кнопка отвязки карты по закону */}
                  <button 
                    onClick={handleUnbindCard}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors text-xs sm:text-sm font-bold shrink-0"
                  >
                    <Trash2 className="w-4 h-4" /> Отвязать карту
                  </button>
                </div>
                
                <div className="flex items-start gap-2 text-[10px] sm:text-xs text-muted-foreground bg-background p-3 rounded-lg border border-border">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p>В соответствии с законом РФ, вы можете отменить автопродление и отвязать карту в любой момент. Доступ к тарифу сохранится до конца оплаченного периода.</p>
                </div>
              </div>
            ) : (
              // Состояние когда карта отвязана
              <div className="flex flex-col items-center justify-center py-6 text-center bg-muted/30 rounded-xl border border-dashed border-border">
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mb-3 shadow-sm">
                  <CreditCard className="w-6 h-6 text-muted-foreground opacity-50" />
                </div>
                <p className="text-sm font-bold text-foreground mb-1">Нет привязанных карт</p>
                <p className="text-xs text-muted-foreground mb-4 max-w-xs">Привяжите карту для автоматического продления подписки и бесперебойного доступа к ИИ-сметчику.</p>
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm">
                  Добавить карту
                </button>
              </div>
            )}
            
          </div>
          
        </div>
      </div>
    </div>
  )
}
