import { createFileRoute } from '@tanstack/react-router'
import { User, Settings, LogOut, Zap, Shield, CreditCard, Coffee, HelpCircle, CheckCircle2, ChevronRight, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

// Типы тарифов для логики
type TariffType = 'free' | 'master' | 'pro'

function ProfilePage() {
  // Для тестирования интерфейса делаем переключатель тарифов
  const [currentTariff, setCurrentTariff] = useState<TariffType>('pro')

  // Моковые данные пользователя
  const user = {
    name: "Иван Иванов",
    email: "ivan.electro@mail.ru",
    avatar: "И",
    estimatesUsed: 15,
    estimatesLimit: 20
  }

  return (
    <div className="container mx-auto max-w-6xl animate-in fade-in duration-500 pb-24 relative">
      
      {/* 🛠 ДЕБАГ-ПАНЕЛЬ (ТОЛЬКО ДЛЯ РАЗРАБОТКИ) - Удалишь перед релизом */}
      <div className="mb-8 p-4 bg-muted/50 border border-border rounded-xl flex items-center gap-4 overflow-x-auto">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Тест интерфейса:</span>
        <button onClick={() => setCurrentTariff('free')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'free' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>Free (Бесплатный)</button>
        <button onClick={() => setCurrentTariff('master')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'master' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>Master (Лимиты)</button>
        <button onClick={() => setCurrentTariff('pro')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'pro' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>PRO (Безлимит)</button>
      </div>

      {/* Шапка */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-2">Личный кабинет</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Управление аккаунтом и подпиской</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* === ЛЕВАЯ КОЛОНКА (Инфо пользователя и Донат) === */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Карточка пользователя */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-3xl font-black text-primary mb-4 relative z-10 border-4 border-background shadow-sm">
              {user.avatar}
              {currentTariff === 'pro' && (
                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
            <h2 className="text-xl font-black text-foreground mb-1">{user.name}</h2>
            <p className="text-sm text-muted-foreground mb-8">{user.email}</p>

            <div className="w-full space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-background border border-border px-4 py-3 rounded-xl text-sm font-bold text-foreground hover:border-primary/50 hover:text-primary transition-colors">
                <Settings className="w-4 h-4" /> Настройки профиля
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" /> Выйти из аккаунта
              </button>
            </div>
          </div>

          {/* Блок "На чашечку кофе" (Донат). Показываем ТОЛЬКО для Free и Master */}
          {currentTariff !== 'pro' && (
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500">
                  <Coffee className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground">Поддержать проект</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                ВольтПро разрабатывается одним инженером. Если сервис сэкономил вам время, вы можете сказать «спасибо» и поддержать сервера.
              </p>
              <button className="w-full bg-orange-500/10 text-orange-600 border border-orange-500/20 hover:bg-orange-500 hover:text-white px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                Угостить кофе <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Блок Поддержки */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-bold text-foreground">Помощь</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Возникли вопросы по расчетам ИИ или списаниям? Напишите нам, мы быстро поможем.
            </p>
            <button className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm font-bold text-foreground hover:bg-muted transition-colors">
              Написать в поддержку
            </button>
          </div>

        </div>

        {/* === ПРАВАЯ КОЛОНКА (Тариф и Оплата) === */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Главная карточка тарифа */}
          <div className={`border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors ${
            currentTariff === 'pro' ? 'bg-primary/5 border-primary/30' : 
            currentTariff === 'master' ? 'bg-card border-border' : 
            'bg-card border-border'
          }`}>
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2 text-muted-foreground">
                  Ваш текущий тариф
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground flex items-center gap-3">
                  {currentTariff === 'pro' && 'Уровень PRO ⚡'}
                  {currentTariff === 'master' && 'Уровень Master'}
                  {currentTariff === 'free' && 'Базовый (Free)'}
                </h2>
              </div>
              
              {/* Плашка со статусом */}
              {currentTariff !== 'free' && (
                <div className="bg-background/50 backdrop-blur-sm border border-border px-4 py-2 rounded-xl text-sm font-medium shrink-0">
                  <span className="text-muted-foreground">Оплачено до: </span>
                  <span className="font-bold text-foreground">17 сентября 2026</span>
                </div>
              )}
            </div>

            {/* Прогресс-бар для тарифа Master */}
            {currentTariff === 'master' && (
              <div className="mb-8 bg-background border border-border rounded-xl p-4">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-foreground">Использовано ИИ-смет</span>
                  <span className="text-primary">{user.estimatesUsed} / {user.estimatesLimit}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(user.estimatesUsed / user.estimatesLimit) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Лимит обновится 17 сентября.</p>
              </div>
            )}

            {/* Список фич */}
            <div className="space-y-3 mb-8">
              {currentTariff === 'free' && (
                <>
                  <FeatureItem text="Все инженерные калькуляторы и схемы" active={true} />
                  <FeatureItem text="Доступ к актуальной Базе знаний" active={true} />
                  <FeatureItem text="ИИ-сметчик (составление смет по ПУЭ)" active={false} />
                  <FeatureItem text="Экспорт смет в PDF и сохранение истории" active={false} />
                </>
              )}
              {currentTariff === 'master' && (
                <>
                  <FeatureItem text="20 генераций смет через ИИ в месяц" active={true} />
                  <FeatureItem text="Все инженерные калькуляторы и схемы" active={true} />
                  <FeatureItem text="Экспорт смет в PDF и история объектов" active={false} />
                </>
              )}
              {currentTariff === 'pro' && (
                <>
                  <FeatureItem text="Безлимитный доступ к ИИ-сметчику" active={true} highlight={true} />
                  <FeatureItem text="Экспорт профессиональных смет в PDF" active={true} />
                  <FeatureItem text="История объектов и облачное сохранение" active={true} />
                  <FeatureItem text="Приоритетная поддержка" active={true} />
                </>
              )}
            </div>

            {/* Кнопки управления */}
            <div className="flex flex-col sm:flex-row gap-3">
              {currentTariff === 'free' && (
                <button className="flex-1 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
                  Выбрать тариф
                </button>
              )}
              {currentTariff === 'master' && (
                <button className="flex-1 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
                  Улучшить до PRO (Безлимит)
                </button>
              )}
              {currentTariff === 'pro' && (
                <button className="flex-1 bg-background border border-border px-6 py-3.5 rounded-xl text-sm font-bold text-foreground hover:bg-muted transition-colors">
                  Управление подпиской
                </button>
              )}
            </div>
          </div>

          {/* Карточка способа оплаты (показываем только для платных тарифов) */}
          {currentTariff !== 'free' && (
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-bold text-foreground">Способ оплаты</h3>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background border border-border rounded-xl gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-emerald-900/20 border border-emerald-500/20 rounded-md flex items-center justify-center text-[10px] font-black text-emerald-500">
                    МИР
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">•••• 2026</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Следующее списание: {currentTariff === 'pro' ? '990 ₽' : '490 ₽'}
                    </p>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0">
                  <Trash2 className="w-3.5 h-3.5" /> Отвязать карту
                </button>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                <Shield className="w-4 h-4 shrink-0 text-muted-foreground/50" />
                В соответствии с законом РФ, вы можете отменить автопродление и отвязать карту в любой момент. Доступ к тарифу сохранится до конца оплаченного периода.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// Компонент для списка фич
function FeatureItem({ text, active, highlight = false }: { text: string, active: boolean, highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
      <CheckCircle2 className={`w-5 h-5 shrink-0 ${active ? (highlight ? 'text-primary' : 'text-primary/70') : 'text-muted-foreground'}`} />
      <span className={`text-sm ${active ? (highlight ? 'font-bold text-foreground' : 'font-medium text-foreground') : 'text-muted-foreground line-through'}`}>
        {text}
      </span>
    </div>
  )
}
