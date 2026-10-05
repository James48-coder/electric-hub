import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LogOut, Zap, Shield, CreditCard, Coffee, HelpCircle, CheckCircle2, Trash2, Briefcase, Save, Loader2, Lock, LayoutTemplate, Edit2, Check, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
})

type TariffType = 'free' | 'master' | 'pro'

function ProfilePage() {
  const [currentTariff, setCurrentTariff] = useState<TariffType>('free')
  const navigate = useNavigate()

  const [user, setUser] = useState<{name: string, email: string, role: string, avatar: string, estimatesUsed: number, estimatesLimit: number} | null>(null)
  
  // === СТЕЙТЫ ДЛЯ РЕДАКТИРОВАНИЯ ИМЕНИ ===
  const [isEditingName, setIsEditingName] = useState(false)
  const [editNameValue, setEditNameValue] = useState('')
  const [isUpdatingName, setIsUpdatingName] = useState(false)

  const [myPrices, setMyPrices] = useState({
    cable3x25: 85, cable3x15: 65, rcd: 2500, breaker16A: 350, breaker10A: 350,
    cableRouting: 150, pointsInstall: 450, shieldAssembly: 500
  })
  
  const [tariffPrices, setTariffPrices] = useState({ master: 490, pro: 1490 })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const authData = localStorage.getItem('voltpro_auth')
    if (authData) {
      try {
        const parsedData = JSON.parse(authData)
        const firstLetter = parsedData.name ? parsedData.name.charAt(0).toUpperCase() : (parsedData.email ? parsedData.email.charAt(0).toUpperCase() : 'U')
        
        setUser({
          name: parsedData.name || 'Пользователь',
          email: parsedData.email,
          role: parsedData.role || 'USER',
          avatar: firstLetter,
          estimatesUsed: 0,
          estimatesLimit: 10
        })
        setEditNameValue(parsedData.name || 'Пользователь')
      } catch (e) {
        console.error('Ошибка чтения данных профиля', e)
      }
    } else {
      navigate({ to: '/' })
    }

    const saved = localStorage.getItem('voltpro_prices')
    if (saved) {
      try {
        setMyPrices(JSON.parse(saved))
      } catch (e) {}
    }

    const loadTariffPrices = async () => {
      try {
        const response = await fetch('/api/tariffs')
        if (response.ok) {
          const data = await response.json()
          const masterData = data.find((t: any) => t.id === 'master' || t.name === 'master')
          const proData = data.find((t: any) => t.id === 'pro' || t.name === 'pro')
          
          setTariffPrices({
            master: masterData ? masterData.price : 490,
            pro: proData ? proData.price : 1490
          })
        }
      } catch (error) {}
    }
    loadTariffPrices()
  }, [navigate])

  const handlePriceChange = (key: keyof typeof myPrices, value: string) => {
    setMyPrices(prev => ({ ...prev, [key]: Number(value) }))
  }

  const handleSavePrices = async () => {
    if (currentTariff !== 'pro') return 
    setIsSaving(true)
    setIsSaved(false)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      localStorage.setItem('voltpro_prices', JSON.stringify(myPrices))
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2500)
    } catch (error) {
      alert('Не удалось сохранить расценки.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('voltpro_auth')
    window.dispatchEvent(new Event('auth-change'))
    navigate({ to: '/' })
  }

  // === ЛОГИКА СОХРАНЕНИЯ НОВОГО ИМЕНИ В YDB ===
  const handleSaveName = async () => {
    const newName = editNameValue.trim()
    if (!newName || newName === user?.name) {
      setIsEditingName(false)
      return
    }

    setIsUpdatingName(true)
    try {
      const response = await fetch('https://functions.yandexcloud.net/d4erd6lhieqorscbm1qb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_profile',
          email: user?.email,
          name: newName
        })
      })

      if (!response.ok) throw new Error('Ошибка сервера')
      const data = await response.json()

      if (data.success) {
        // Обновляем отображение на странице
        const updatedUser = { ...user!, name: newName, avatar: newName.charAt(0).toUpperCase() }
        setUser(updatedUser)
        
        // Обновляем память браузера, чтобы при перезагрузке имя не сбросилось
        const authData = JSON.parse(localStorage.getItem('voltpro_auth') || '{}')
        localStorage.setItem('voltpro_auth', JSON.stringify({ ...authData, name: newName }))
        window.dispatchEvent(new Event('auth-change'))
        
        setIsEditingName(false)
      }
    } catch (error) {
      alert('Не удалось обновить имя. Проверьте интернет.')
    } finally {
      setIsUpdatingName(false)
    }
  }

  if (!user) return <div className="min-h-screen"></div>;

  return (
    <div className="container mx-auto max-w-7xl animate-in fade-in duration-500 pb-24 relative px-4 sm:px-6">
      
      <div className="mb-8 text-center sm:text-left mt-4 sm:mt-0">
        <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-2">Личный кабинет</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Управление аккаунтом и подпиской</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-center gap-6 relative overflow-hidden">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-black text-primary relative z-10 border-4 border-background shadow-sm transition-all duration-300">
            {user.avatar}
            {user.role === 'ADMIN' && (
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
                <div className="bg-amber-500 text-white w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-sm">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* === БЛОК РЕДАКТИРОВАНИЯ ИМЕНИ === */}
            {isEditingName ? (
              <div className="flex items-center gap-2 mb-1">
                <input 
                  type="text" 
                  value={editNameValue} 
                  onChange={(e) => setEditNameValue(e.target.value)}
                  className="bg-background border border-primary/50 rounded-lg px-3 py-1.5 text-sm sm:text-base font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 w-full max-w-[200px]"
                  autoFocus
                />
                <button 
                  onClick={handleSaveName} 
                  disabled={isUpdatingName} 
                  className="p-1.5 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors"
                >
                  {isUpdatingName ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => { setIsEditingName(false); setEditNameValue(user.name); }} 
                  disabled={isUpdatingName} 
                  className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1 group">
                <h2 className="text-lg sm:text-xl font-black text-foreground truncate">{user.name}</h2>
                <button 
                  onClick={() => setIsEditingName(true)} 
                  className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  title="Изменить имя"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">{user.email}</p>
            <div className="flex gap-2">
              <button onClick={handleLogout} className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> Выйти из аккаунта
              </button>
            </div>
          </div>
        </div>

        {user.role === 'ADMIN' ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-amber-500 shrink-0" />
              <h3 className="font-bold text-amber-700">Владелец платформы</h3>
            </div>
            <p className="text-xs text-amber-700/80 mb-4 leading-relaxed">
              У вас есть права администратора. Вы можете публиковать экспертные SEO-статьи в базу знаний.
            </p>
            <button 
              onClick={() => navigate({ to: '/admin-editor' })}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <LayoutTemplate className="w-4 h-4" />
              Панель администратора
            </button>
          </div>
        ) : (
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
        )}

      </div>

      <div className="bg-card border-2 border-primary/20 rounded-3xl p-6 sm:p-8 mb-12 shadow-sm relative overflow-hidden">
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
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Материалы</h4>
              <PriceInput label="Кабель ВВГнг(А)-LS 3x2.5 (м)" value={myPrices.cable3x25} onChange={(val) => handlePriceChange('cable3x25', val)} />
              <PriceInput label="Кабель ВВГнг(А)-LS 3x1.5 (м)" value={myPrices.cable3x15} onChange={(val) => handlePriceChange('cable3x15', val)} />
              <PriceInput label="УЗО 40А 30мА (шт)" value={myPrices.rcd} onChange={(val) => handlePriceChange('rcd', val)} />
              <PriceInput label="Автомат 16А (шт)" value={myPrices.breaker16A} onChange={(val) => handlePriceChange('breaker16A', val)} />
              <PriceInput label="Автомат 10А (шт)" value={myPrices.breaker10A} onChange={(val) => handlePriceChange('breaker10A', val)} />
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest border-l-4 border-primary pl-3 mb-4">Монтажные работы</h4>
              <PriceInput label="Прокладка кабельных линий (м)" value={myPrices.cableRouting} onChange={(val) => handlePriceChange('cableRouting', val)} />
              <PriceInput label="Монтаж установочных мест (шт)" value={myPrices.pointsInstall} onChange={(val) => handlePriceChange('pointsInstall', val)} />
              <PriceInput label="Сборка и монтаж щита (мод)" value={myPrices.shieldAssembly} onChange={(val) => handlePriceChange('shieldAssembly', val)} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 text-center">
        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-3">Инвестируйте в свое время</h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">Делегируйте рутину ВольтПро и забирайте объекты быстрее конкурентов.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        
        <div className={`bg-card border-2 rounded-3xl p-6 sm:p-8 flex flex-col relative transition-all ${currentTariff === 'free' ? 'border-primary shadow-md' : 'border-border shadow-sm'}`}>
          <h3 className="text-2xl font-black text-foreground mb-2">Free</h3>
          <p className="text-sm text-muted-foreground mb-6 sm:h-10">Базовый набор для простых задач.</p>
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
              currentTariff === 'free' ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-background border border-border text-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {currentTariff === 'free' ? 'Текущий тариф' : 'Перейти на Free'}
          </button>
        </div>

        <div className={`bg-card border-2 rounded-3xl p-6 sm:p-8 flex flex-col relative transition-all ${currentTariff === 'master' ? 'border-primary shadow-md' : 'border-border shadow-sm hover:shadow-md'}`}>
          <h3 className="text-2xl font-black text-foreground mb-2">Master</h3>
          <p className="text-sm text-muted-foreground mb-6 sm:h-10">Экономия времени. Избавьтесь от рутины расчетов.</p>
          <div className="mb-8">
            <span className="text-4xl font-black text-foreground">{tariffPrices.master} ₽</span>
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
              currentTariff === 'master' ? 'bg-primary/20 text-primary cursor-not-allowed border border-primary/20' : 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm'
            }`}
          >
            {currentTariff === 'master' ? 'Текущий тариф' : 'Выбрать Master'}
          </button>
        </div>

        <div className={`border-2 rounded-3xl p-6 sm:p-8 flex flex-col relative transition-all ${currentTariff === 'pro' ? 'bg-primary/5 border-primary shadow-lg' : 'bg-primary/5 border-primary/30 shadow-md hover:shadow-lg'}`}>
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-bl-xl">
            Для профессионалов
          </div>
          <h3 className="text-2xl font-black text-primary mb-2 flex items-center gap-2">
            PRO <Zap className="w-5 h-5" fill="currentColor" />
          </h3>
          <p className="text-sm text-muted-foreground mb-6 sm:h-10">Сдавайте объекты быстрее конкурентов.</p>
          
          <div className="mb-2">
            <span className="text-4xl font-black text-foreground">{tariffPrices.pro.toLocaleString('ru-RU')} ₽</span>
            <span className="text-muted-foreground font-medium"> / мес</span>
          </div>
          <p className="text-[10px] text-primary font-bold mb-6">Оплата за год — {Math.round(tariffPrices.pro * 0.73).toLocaleString('ru-RU')} ₽/мес</p>
          
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
              currentTariff === 'pro' ? 'bg-primary text-primary-foreground cursor-not-allowed shadow-md opacity-90' : 'bg-primary text-primary-foreground hover:opacity-90 shadow-md'
            }`}
          >
            {currentTariff === 'pro' ? 'Текущий тариф' : 'Оформить PRO'}
          </button>
        </div>

      </div>

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
