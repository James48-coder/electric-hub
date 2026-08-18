import { createFileRoute } from '@tanstack/react-router'
import { User, Settings, LogOut, Zap, Shield, CreditCard, Coffee, HelpCircle, CheckCircle2, ChevronRight, Trash2, ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

type TariffType = 'free' | 'master' | 'pro'

function ProfilePage() {
  const [currentTariff, setCurrentTariff] = useState<TariffType>('free')
  // Состояние для открытия витрины тарифов
  const [showUpgrade, setShowUpgrade] = useState(false)

  // Обновленные моковые данные
  const user = {
    name: "Иван Иванов",
    email: "ivan.electro@mail.ru",
    avatar: "И",
    estimatesUsed: 8,
    estimatesLimit: 10 // Уменьшили лимит до 10
  }

  // === ВИТРИНА ТАРИФОВ (MARKETING VIEW) ===
  if (showUpgrade) {
    return (
      <div className="container mx-auto max-w-5xl animate-in fade-in duration-500 pb-24">
        <button 
          onClick={() => setShowUpgrade(false)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Назад в профиль
        </button>

        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-4">
            Инвестируйте в свое время
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Хватит тратить вечера на составление таблиц и расчеты на коленке. Делегируйте рутину ВольтПро и забирайте объекты быстрее конкурентов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          
          {/* КАРТОЧКА MASTER */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group">
            <h3 className="text-2xl font-black text-foreground mb-2">Master</h3>
            <p className="text-sm text-muted-foreground mb-6 h-10">
              Экономия времени. Избавьтесь от рутины расчетов по вечерам.
            </p>
            <div className="mb-8">
              <span className="text-4xl font-black text-foreground">490 ₽</span>
              <span className="text-muted-foreground font-medium"> / мес</span>
            </div>
            
            <div className="space-y-4 mb-8 flex-1">
              <UpgradeFeature text="10 ИИ-смет в месяц (экономия 10+ часов)" highlight />
              <UpgradeFeature text="Сложные калькуляторы (Заземление, Потери напряжения, ТКЗ)" highlight />
              <UpgradeFeature text="Базовые калькуляторы и схемы" />
              <UpgradeFeature text="Доступ к Базе знаний (ПУЭ, ГОСТ)" />
            </div>
            
            <button 
              onClick={() => { setCurrentTariff('master'); setShowUpgrade(false); }}
              className="w-full bg-background border border-border px-6 py-4 rounded-xl text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              Выбрать Master
            </button>
          </div>

          {/* КАРТОЧКА PRO */}
          <div className="bg-primary/5 border-2 border-primary/50 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col relative overflow-hidden">
            {/* Плашка "Хит" */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-bl-xl">
              Для профессионалов
            </div>
            
            <h3 className="text-2xl font-black text-primary mb-2 flex items-center gap-2">
              PRO <Zap className="w-5 h-5" fill="currentColor" />
            </h3>
            <p className="text-sm text-muted-foreground mb-6 h-10">
              Сдавайте сметы прямо на объекте в PDF, пока конкуренты едут домой.
            </p>
            
            <div className="mb-2">
              <span className="text-4xl font-black text-foreground">1 490 ₽</span>
              <span className="text-muted-foreground font-medium"> / мес</span>
            </div>
            <p className="text-xs text-primary font-bold mb-6">При оплате за год — 1 090 ₽ / мес (Выгода 26%)</p>
            
            <div className="space-y-4 mb-8 flex-1">
              <UpgradeFeature text="Безлимитный ИИ-сметчик" highlight />
              <UpgradeFeature text="Экспорт смет в фирменный PDF" highlight />
              <UpgradeFeature text="Облачная история объектов и черновиков" highlight />
              <UpgradeFeature text="Все премиум-калькуляторы" />
              <UpgradeFeature text="Приоритетная поддержка" />
            </div>
            
            <button 
              onClick={() => { setCurrentTariff('pro'); setShowUpgrade(false); }}
              className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity"
            >
              Оформить PRO
            </button>
          </div>

        </div>
      </div>
    )
  }

  // === СТАНДАРТНЫЙ ЛИЧНЫЙ КАБИНЕТ ===
  return (
    <div className="container mx-auto max-w-6xl animate-in fade-in duration-500 pb-24 relative">
      
      {/* 🛠 ДЕБАГ-ПАНЕЛЬ */}
      <div className="mb-8 p-4 bg-muted/50 border border-border rounded-xl flex items-center gap-4 overflow-x-auto">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Тест интерфейса:</span>
        <button onClick={() => setCurrentTariff('free')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'free' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>Free</button>
        <button onClick={() => setCurrentTariff('master')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'master' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>Master</button>
        <button onClick={() => setCurrentTariff('pro')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${currentTariff === 'pro' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>PRO</button>
      </div>

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-2">Личный кабинет</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Управление аккаунтом и подпиской</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="lg:col-span-4 space-y-6">
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
                <LogOut className="w-4 h-4" /> Выйти
              </button>
            </div>
          </div>

          {/* ДОНАТ ТОЛЬКО ДЛЯ FREE И MASTER */}
          {currentTariff !== 'pro' && (
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500">
                  <Coffee className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-foreground">Поддержать проект</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Сервис сэкономил вам время на объекте? Вы можете сказать «спасибо» и поддержать работу нейросетей.
              </p>
              <button className="w-full bg-orange-500/10 text-orange-600 border border-orange-500/20 hover:bg-orange-500 hover:text-white px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                Угостить кофе <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-bold text-foreground">Помощь</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Возникли вопросы по расчетам или тарифам? Мы на связи.
            </p>
            <button className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm font-bold text-foreground hover:bg-muted transition-colors">
              Написать в поддержку
            </button>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className={`border rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden transition-colors ${
            currentTariff === 'pro' ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'
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
              
              {currentTariff !== 'free' && (
                <div className="bg-background/50 backdrop-blur-sm border border-border px-4 py-2 rounded-xl text-sm font-medium shrink-0">
                  <span className="text-muted-foreground">Оплачено до: </span>
                  <span className="font-bold text-foreground">17 сентября 2026</span>
                </div>
              )}
            </div>

            {/* ПРОГРЕСС-БАР MASTER (ОБНОВЛЕННЫЕ ЛИМИТЫ) */}
            {currentTariff === 'master' && (
              <div className="mb-8 bg-background border border-border rounded-xl p-4">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-foreground">Остаток ИИ-смет</span>
                  <span className="text-primary">{user.estimatesLimit - user.estimatesUsed} из {user.estimatesLimit}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden flex justify-end">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${((user.estimatesLimit - user.estimatesUsed) / user.estimatesLimit) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Лимит обновится 17 сентября.</p>
              </div>
            )}

            {/* СПИСОК ФИЧ В ПРОФИЛЕ */}
            <div className="space-y-3 mb-8">
              {currentTariff === 'free' && (
                <>
                  <FeatureItem text="Базовые инженерные калькуляторы (Автоматы, Сечения)" active={true} />
                  <FeatureItem text="Доступ к Базе знаний (ПУЭ, ГОСТ)" active={true} />
                  <FeatureItem text="Сложные расчеты (Заземление, ТКЗ, Потери)" active={false} />
                  <FeatureItem text="Составление смет через ИИ-сметчик" active={false} />
                </>
              )}
              
              {currentTariff === 'master' && (
                <>
                  <FeatureItem text="Все базовые калькуляторы и База знаний" active={true} />
                  <FeatureItem text="Сложные премиум-калькуляторы" active={true} highlight={true} />
                  <FeatureItem text="10 генераций ИИ-смет (сохранение в браузере)" active={true} highlight={true} />
                  <FeatureItem text="Экспорт профессиональных смет в PDF" active={false} />
                </>
              )}
              
              {currentTariff === 'pro' && (
                <>
                  <FeatureItem text="Все функции Базового и Master тарифа" active={true} />
                  <FeatureItem text="Безлимитный доступ к ИИ-сметчику" active={true} highlight={true} />
                  <FeatureItem text="Экспорт смет в фирменный PDF прямо на объекте" active={true} highlight={true} />
                  <FeatureItem text="Облачная история всех объектов" active={true} />
                </>
              )}
            </div>

            {/* КНОПКИ С ВЫЗОВОМ ВИТРИНЫ */}
            <div className="flex flex-col sm:flex-row gap-3">
              {currentTariff === 'free' && (
                <button 
                  onClick={() => setShowUpgrade(true)}
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity"
                >
                  Улучшить тариф
                </button>
              )}
              {currentTariff === 'master' && (
                <button 
                  onClick={() => setShowUpgrade(true)}
                  className="flex-1 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity"
                >
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
                      Следующее списание: {currentTariff === 'pro' ? '1 490 ₽' : '490 ₽'}
                    </p>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors shrink-0">
                  <Trash2 className="w-3.5 h-3.5" /> Отвязать
                </button>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                <Shield className="w-4 h-4 shrink-0 text-muted-foreground/50" />
                В соответствии с законом РФ, вы можете отменить автопродление в любой момент. Доступ к тарифу сохранится до конца оплаченного периода.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

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

function UpgradeFeature({ text, highlight = false }: { text: string, highlight?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className={`text-sm leading-relaxed ${highlight ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'}`}>
        {text}
      </span>
    </div>
  )
}
