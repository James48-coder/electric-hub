import { createFileRoute } from '@tanstack/react-router'
import { User, Settings, LogOut, Zap, Shield, CreditCard, Coffee, HelpCircle, CheckCircle2, ChevronRight, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

type TariffType = 'free' | 'master' | 'pro'

function ProfilePage() {
  const [currentTariff, setCurrentTariff] = useState<TariffType>('free')

  // Моковые данные пользователя
  const user = {
    name: "Иван Иванов",
    email: "ivan.electro@mail.ru",
    avatar: "И",
    estimatesUsed: 8,
    estimatesLimit: 10
  }

  return (
    <div className="container mx-auto max-w-7xl animate-in fade-in duration-500 pb-24 relative px-4 sm:px-6">
      
      {/* 🛠 ДЕБАГ-ПАНЕЛЬ (ТОЛЬКО ДЛЯ РАЗРАБОТКИ) - ИСПРАВЛЕННАЯ ДЛЯ МОБИЛОК */}
      <div className="mb-8 p-4 bg-muted/50 border border-border rounded-xl flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider w-full sm:w-auto mb-1 sm:mb-0 text-center sm:text-left">Тест интерфейса:</span>
        <button onClick={() => setCurrentTariff('free')} className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'free' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card border border-border text-foreground hover:bg-muted'}`}>Free</button>
        <button onClick={() => setCurrentTariff('master')} className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'master' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card border border-border text-foreground hover:bg-muted'}`}>Master</button>
        <button onClick={() => setCurrentTariff('pro')} className={`flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'pro' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card border border-border text-foreground hover:bg-muted'}`}>PRO</button>
      </div>

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-2">Личный кабинет</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Управление аккаунтом и подпиской</p>
      </div>

      {/* ВЕРХНЯЯ ПАНЕЛЬ: ИНФО ПОЛЬЗОВАТЕЛЯ И СПОСОБ ОПЛАТЫ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        
        {/* Карточка пользователя */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6 relative overflow-hidden">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-black text-primary relative z-10 border-4 border-background shadow-sm">
            {user.avatar}
            {currentTariff === 'pro' && (
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                <div className="bg-primary text-primary-foreground w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                  <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-black text-foreground mb-1">{user.name}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 truncate">{user.email}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-background border border-border py-2 rounded-lg text-xs font-bold text-foreground hover:border-primary/50 hover:text-primary transition-colors">
                Настройки
              </button>
              <button className="px-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Блок лимитов (показываем только для Master) */}
        {currentTariff === 'master' ? (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between text-sm font-bold mb-3">
              <span className="text-foreground">Остаток ИИ-смет</span>
              <span className="text-primary">{user.estimatesLimit - user.estimatesUsed} из {user.estimatesLimit}</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex justify-end mb-2">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((user.estimatesLimit - user.estimatesUsed) / user.estimatesLimit) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">Лимит обновится 17 сентября.</p>
          </div>
        ) : (
          /* Донат (показываем для Free) или Способ оплаты (показываем для PRO) */
          currentTariff === 'free' ? (
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <Coffee className="w-5 h-5 text-orange-500 shrink-0" />
                <h3 className="font-bold text-foreground">Поддержать проект</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Сервис сэкономил время? Вы можете поддержать сервера.
              </p>
              <button className="w-full bg-orange-500/10 text-orange-600 border border-orange-500/20 hover:bg-orange-500 hover:text-white py-2 rounded-lg text-xs font-bold transition-all">
                Угостить кофе
              </button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" /> Оплата
                </h3>
                <span className="text-xs font-bold text-muted-foreground">До 17 сен 2026</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-5 bg-emerald-900/20 border border-emerald-500/20 rounded flex items-center justify-center text-[8px] font-black text-emerald-500 shrink-0">МИР</div>
                  <span className="font-bold text-sm">•••• 2026</span>
                </div>
                <button className="text-red-500 hover:text-red-400 p-1 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          )
        )}

        {/* Поддержка */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-5 h-5 text-muted-foreground shrink-0" />
            <h3 className="font-bold text-foreground">Помощь</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Возникли вопросы по расчетам, функционалу или тарифам? Мы на связи.
          </p>
          <button className="w-full bg-background border border-border py-2 rounded-lg text-xs font-bold text-foreground hover:bg-muted transition-colors">
            Написать в поддержку
          </button>
        </div>

      </div>

      {/* НИЖНЯЯ ПАНЕЛЬ: ВИТРИНА ТАРИФОВ (ВСЕГДА НА ЭКРАНЕ) */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-3">
          Инвестируйте в свое время
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Делегируйте рутину ВольтПро и забирайте объекты быстрее конкурентов.
        </p>
      </div>

      {/* СЕТКА ТАРИФОВ: 1 КОЛОНКА НА МОБИЛКЕ, 3 НА ДЕСКТОПЕ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* === ТАРИФ FREE === */}
        <div className={`bg-card border-2 rounded-3xl p-6 sm:p-8 flex flex-col relative transition-all ${currentTariff === 'free' ? 'border-primary shadow-md' : 'border-border shadow-sm'}`}>
          <h3 className="text-2xl font-black text-foreground mb-2">Free</h3>
          <p className="text-sm text-muted-foreground mb-6 sm:h-10">
            Базовый набор для простых задач.
          </p>
          <div className="mb-8">
            <span className="text-4xl font-black text-foreground">0 ₽</span>
            <span className="text-muted-foreground font-medium"> / мес</span>
          </div>
          
          <div className="space-y-4 mb-8 flex-1">
            <FeatureItem text="Базовые калькуляторы (Автоматы, Сечения)" active={true} />
            <FeatureItem text="Справочники и База знаний" active={true} />
            <FeatureItem text="Сложные расчеты (Заземление, ТКЗ, Потери)" active={false} />
            <FeatureItem text="ИИ-сметчик и экспорт в PDF" active={false} />
          </div>
          
          <button 
            disabled={currentTariff === 'free'}
            onClick={() => setCurrentTariff('free')}
            className={`w-full py-4 rounded-xl text-sm font-bold transition-colors ${
              currentTariff === 'free' 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-background border border-border text-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {currentTariff === 'free' ? 'Текущий тариф' : 'Перейти на Free'}
          </button>
        </div>

        {/* === ТАРИФ MASTER === */}
        <div className={`bg-card border-2 rounded-3xl p-6 sm:p-8 flex flex-col relative transition-all ${currentTariff === 'master' ? 'border-primary shadow-md' : 'border-border shadow-sm hover:shadow-md'}`}>
          <h3 className="text-2xl font-black text-foreground mb-2">Master</h3>
          <p className="text-sm text-muted-foreground mb-6 sm:h-10">
            Экономия времени. Избавьтесь от рутины расчетов.
          </p>
          <div className="mb-8">
            <span className="text-4xl font-black text-foreground">490 ₽</span>
            <span className="text-muted-foreground font-medium"> / мес</span>
          </div>
          
          <div className="space-y-4 mb-8 flex-1">
            <FeatureItem text="Сложные калькуляторы (Заземление, Потери, ТКЗ)" active={true} highlight={currentTariff !== 'master'} />
            <FeatureItem text="10 ИИ-смет в месяц" active={true} highlight={currentTariff !== 'master'} />
            <FeatureItem text="Базовые инструменты и База знаний" active={true} />
            <FeatureItem text="Экспорт смет в фирменный PDF" active={false} />
          </div>
          
          <button 
            disabled={currentTariff === 'master'}
            onClick={() => setCurrentTariff('master')}
            className={`w-full py-4 rounded-xl text-sm font-bold transition-all ${
              currentTariff === 'master' 
              ? 'bg-primary/20 text-primary cursor-not-allowed border border-primary/20' 
              : 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm'
            }`}
          >
            {currentTariff === 'master' ? 'Текущий тариф' : 'Выбрать Master'}
          </button>
        </div>

        {/* === ТАРИФ PRO === */}
        <div className={`border-2 rounded-3xl p-6 sm:p-8 flex flex-col relative transition-all ${currentTariff === 'pro' ? 'bg-primary/5 border-primary shadow-lg' : 'bg-primary/5 border-primary/30 shadow-md hover:shadow-lg'}`}>
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-bl-xl">
            Для профессионалов
          </div>
          
          <h3 className="text-2xl font-black text-primary mb-2 flex items-center gap-2">
            PRO <Zap className="w-5 h-5" fill="currentColor" />
          </h3>
          <p className="text-sm text-muted-foreground mb-6 sm:h-10">
            Сдавайте объекты быстрее конкурентов.
          </p>
          
          <div className="mb-2">
            <span className="text-4xl font-black text-foreground">1 490 ₽</span>
            <span className="text-muted-foreground font-medium"> / мес</span>
          </div>
          <p className="text-[10px] text-primary font-bold mb-6">Оплата за год — 1 090 ₽/мес</p>
          
          <div className="space-y-4 mb-8 flex-1">
            <FeatureItem text="Безлимитный ИИ-сметчик" active={true} highlight={currentTariff !== 'pro'} />
            <FeatureItem text="Экспорт смет в профессиональный PDF" active={true} highlight={currentTariff !== 'pro'} />
            <FeatureItem text="Облачная история объектов" active={true} highlight={currentTariff !== 'pro'} />
            <FeatureItem text="Все премиум-калькуляторы и справочники" active={true} />
          </div>
          
          <button 
            disabled={currentTariff === 'pro'}
            onClick={() => setCurrentTariff('pro')}
            className={`w-full py-4 rounded-xl text-sm font-bold transition-all ${
              currentTariff === 'pro' 
              ? 'bg-primary text-primary-foreground cursor-not-allowed shadow-md opacity-90' 
              : 'bg-primary text-primary-foreground hover:opacity-90 shadow-md'
            }`}
          >
            {currentTariff === 'pro' ? 'Текущий тариф' : 'Оформить PRO'}
          </button>
        </div>

      </div>
    </div>
  )
}

function FeatureItem({ text, active, highlight = false }: { text: string, active: boolean, highlight?: boolean }) {
  return (
    <div className={`flex items-start gap-3 ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${active ? (highlight ? 'text-primary' : 'text-primary/70') : 'text-muted-foreground'}`} />
      <span className={`text-sm leading-relaxed ${active ? (highlight ? 'font-bold text-foreground' : 'font-medium text-foreground') : 'text-muted-foreground line-through'}`}>
        {text}
      </span>
    </div>
  )
}
