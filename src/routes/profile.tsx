import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { User, Settings, LogOut, Zap, Shield, CreditCard, Coffee, HelpCircle, CheckCircle2, ChevronRight, Trash2, Briefcase, Save, Loader2, Lock } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

type TariffType = 'free' | 'master' | 'pro'

function ProfilePage() {
  const [currentTariff, setCurrentTariff] = useState<TariffType>('free')
  const navigate = useNavigate()

  // === СТЕЙТ ДЛЯ ПРАЙС-ЛИСТА ===
  const [myPrices, setMyPrices] = useState({
    cable3x25: 85, cable3x15: 65, rcd: 2500, breaker16A: 350, breaker10A: 350,
    cableRouting: 150, pointsInstall: 450, shieldAssembly: 500
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handlePriceChange = (key: keyof typeof myPrices, value: string) => {
    setMyPrices(prev => ({ ...prev, [key]: Number(value) }))
  }

  // Заглушка для будущего сохранения в базу данных D1
  const handleSavePrices = () => {
    if (currentTariff !== 'pro') return // Защита от хитрецов

    setIsSaving(true)
    setIsSaved(false)
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2500) // Убираем галочку через 2.5 сек
    }, 1000)
  }

  // Логика выхода
  const handleLogout = () => {
    localStorage.removeItem('voltpro_auth')
    window.dispatchEvent(new Event('auth-change'))
    navigate({ to: '/' })
  }

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
      
      {/* 🛠 ДЕБАГ-ПАНЕЛЬ */}
      <div className="mb-8 p-4 bg-muted/30 border-2 border-border rounded-2xl flex flex-wrap items-center gap-4">
        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest w-full sm:w-auto mb-1 sm:mb-0 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
          <Settings className="w-4 h-4" /> Тест:
        </span>
        
        {/* НОВАЯ КНОПКА ТЕСТА СВЯЗИ */}
        <button 
          onClick={async () => {
            try {
              const res = await fetch('/api/ping');
              const data = await res.json();
              alert('УСПЕХ: ' + data.message);
            } catch (e) {
              alert('ОШИБКА 404: API не отвечает. Связь сломана.');
            }
          }}
          className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 bg-emerald-500/10 text-emerald-500 border-2 border-emerald-500/50 hover:bg-emerald-500 hover:text-white"
        >
          Пинг API
        </button>
        
        <button 
          onClick={() => setCurrentTariff('free')} 
          className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${
            currentTariff === 'free' 
            ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' 
            : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          Free
        </button>
        
        <button 
          onClick={() => setCurrentTariff('master')} 
          className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${
            currentTariff === 'master' 
            ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' 
            : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          Master
        </button>
        
        <button 
          onClick={() => setCurrentTariff('pro')} 
          className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${
            currentTariff === 'pro' 
            ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' 
            : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          PRO
        </button>
      </div>

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-2">Личный кабинет</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Управление аккаунтом и подпиской</p>
      </div>

      {/* ВЕРХНЯЯ ПАНЕЛЬ: ПРОФИЛЬ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
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
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-black text-foreground mb-1 truncate">{user.name}</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">{user.email}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-background border border-border py-2 rounded-lg text-xs font-bold text-foreground hover:border-primary/50 hover:text-primary transition-colors">
                Настройки
              </button>
              <button onClick={handleLogout} className="px-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

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

      {/* === БЛОК: МОИ РАСЦЕНКИ (ПРАЙС-ЛИСТ) === */}
      <div className="bg-card border-2 border-primary/20 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm relative overflow-hidden">
        {/* Декоративная полоса сверху */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-1 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              Мои расценки
            </h2>
            <p className="text-sm text-muted-foreground">Эти цены будут автоматически подставляться в ИИ-сметчик</p>
          </div>
          
          <button 
            onClick={handleSavePrices} 
            disabled={isSaving || currentTariff !== 'pro'}
            className={`font-bold py-2.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto ${
              currentTariff === 'pro' 
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-80' 
              : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
            }`}
          >
            {isSaving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Сохранение...</>
            ) : isSaved ? (
              <><CheckCircle2 className="w-4 h-4" /> Сохранено</>
            ) : (
              <><Save className="w-4 h-4" /> Сохранить прайс</>
            )}
          </button>
        </div>

        <div className="relative">
          {/* 🔒 ПАНЕЛЬ БЛОКИРОВКИ ДЛЯ НЕ-PRO ТАРИФОВ */}
          {currentTariff !== 'pro' && (
            <div className="absolute inset-0 z-20 backdrop-blur-[3px] bg-background/50 rounded-2xl flex flex-col items-center justify-center p-6 border border-border/50">
              <div className="w-14 h-14 bg-background border-2 border-primary/20 text-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-2">Доступно в PRO</h3>
              <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
                Создание собственного прайс-листа и автоматическая подстановка цен в сметы — это премиум-функция.
              </p>
              <button 
                onClick={() => setCurrentTariff('pro')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Оформить PRO
              </button>
            </div>
          )}

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-opacity duration-300 ${currentTariff !== 'pro' ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            {/* Колонка 1: Материалы */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Материалы</h4>
              <PriceInput label="Кабель ВВГнг(А)-LS 3x2.5 (м)" value={myPrices.cable3x25} onChange={(val) => handlePriceChange('cable3x25', val)} />
              <PriceInput label="Кабель ВВГнг(А)-LS 3x1.5 (м)" value={myPrices.cable3x15} onChange={(val) => handlePriceChange('cable3x15', val)} />
              <PriceInput label="УЗО 40А 30мА (шт)" value={myPrices.rcd} onChange={(val) => handlePriceChange('rcd', val)} />
              <PriceInput label="Автомат 16А (шт)" value={myPrices.breaker16A} onChange={(val) => handlePriceChange('breaker16A', val)} />
              <PriceInput label="Автомат 10А (шт)" value={myPrices.breaker10A} onChange={(val) => handlePriceChange('breaker10A', val)} />
            </div>

            {/* Колонка 2: Работы */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Монтажные работы</h4>
              <PriceInput label="Прокладка кабельных линий (м)" value={myPrices.cableRouting} onChange={(val) => handlePriceChange('cableRouting', val)} />
              <PriceInput label="Монтаж установочных мест (шт)" value={myPrices.pointsInstall} onChange={(val) => handlePriceChange('pointsInstall', val)} />
              <PriceInput label="Сборка и монтаж щита (мод)" value={myPrices.shieldAssembly} onChange={(val) => handlePriceChange('shieldAssembly', val)} />
            </div>
          </div>
        </div>
      </div>
      {/* === КОНЕЦ БЛОКА ПРАЙС-ЛИСТА === */}

      {/* НИЖНЯЯ ПАНЕЛЬ: ВИТРИНА ТАРИФОВ */}
      <div className="mb-10 text-center">
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-3">
          Инвестируйте в свое время
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Делегируйте рутину ВольтПро и забирайте объекты быстрее конкурентов.
        </p>
      </div>

      {/* СЕТКА ТАРИФОВ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        
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

      {/* ОПУЩЕННЫЙ ВНИЗ БЛОК (ОПЛАТА / ДОНАТ / ЛИМИТЫ) */}
      <div className="max-w-md mx-auto w-full">
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
            <p className="text-xs text-muted-foreground text-center mt-2">Лимит обновится 17 сентября.</p>
          </div>
        ) : (
          currentTariff === 'free' ? (
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
              <div className="flex items-center gap-3 mb-2">
                <Coffee className="w-5 h-5 text-orange-500 shrink-0" />
                <h3 className="font-bold text-foreground">Поддержать проект</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Сервис сэкономил время? Вы можете поддержать сервера.
              </p>
              <button className="w-full bg-orange-500/10 text-orange-600 border border-orange-500/20 hover:bg-orange-500 hover:text-white py-3 rounded-xl text-sm font-bold transition-all">
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
              <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-6 bg-emerald-900/20 border border-emerald-500/20 rounded flex items-center justify-center text-[10px] font-black text-emerald-500 shrink-0">МИР</div>
                  <span className="font-bold text-sm">•••• 2026</span>
                </div>
                <button className="text-red-500 hover:text-red-400 p-2 transition-colors bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          )
        )}
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

function PriceInput({ label, value, onChange }: { label: string, value: number, onChange: (val: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 p-3 bg-background border border-border rounded-xl hover:border-primary/30 transition-colors">
      <span className="text-sm font-medium text-foreground leading-tight">{label}</span>
      <div className="relative w-24 shrink-0">
        <input 
          type="number" 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="0"
          className="w-full bg-muted border border-border rounded-lg py-1.5 pl-2 pr-6 text-sm font-bold focus:ring-1 focus:ring-primary outline-none transition-colors" 
        />
        <span className="absolute right-2 top-1.5 text-xs text-muted-foreground font-medium pointer-events-none">₽</span>
      </div>
    </div>
  )
}
