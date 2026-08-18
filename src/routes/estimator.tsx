import { createFileRoute } from '@tanstack/react-router'
import { Bot, MapPin, Home, Sliders, Zap, Sparkles, AlertTriangle, Lock, FileText, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/estimator')({
  component: EstimatorPage,
})

type Tariff = 'free' | 'master' | 'pro'

function EstimatorPage() {
  const [tariff, setTariff] = useState<Tariff>('free')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  
  // Состояния формы
  const [region, setRegion] = useState('')
  const [roomType, setRoomType] = useState('Квартира (Новостройка)')
  const [customPrices, setCustomPrices] = useState(false)
  const [area, setArea] = useState('')

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (tariff === 'free') return
    
    setIsGenerating(true)
    setShowResult(false)
    
    // Симуляция работы нейросети
    setTimeout(() => {
      setIsGenerating(false)
      setShowResult(true)
    }, 2500)
  }

  return (
    <div className="container mx-auto max-w-4xl animate-in fade-in duration-500 pb-24">
      
      {/* Шапка */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Bot className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">ИИ-сметчик</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Нейросеть составит смету по ПУЭ и рассчитает материалы за 1 минуту.
        </p>
      </div>

      {/* 🛠 ПАНЕЛЬ ТЕСТИРОВАНИЯ ТАРИФОВ (Только 3 наших уровня) */}
      <div className="mb-8 p-4 sm:p-5 bg-card border border-border rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0" />
          <h3 className="font-bold text-foreground text-sm sm:text-base">Панель тестирования тарифов</h3>
        </div>
        <select
          value={tariff}
          onChange={(e) => {
            setTariff(e.target.value as Tariff)
            setShowResult(false) // Скрываем результат при смене тарифа
          }}
          className="bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer w-full sm:w-auto"
        >
          <option value="free">Уровень 0: Базовый (Free)</option>
          <option value="master">Уровень 1: Master</option>
          <option value="pro">Уровень 2: PRO</option>
        </select>
      </div>

      {/* Предупреждение для тарифа Free */}
      {tariff === 'free' && (
        <div className="mb-8 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 flex items-start gap-3 animate-in slide-in-from-top-2">
          <Lock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-foreground mb-1">ИИ-сметчик недоступен на Базовом тарифе</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Для автоматической генерации смет по ГОСТ и ПУЭ требуется тариф Master или PRO.
            </p>
            <button className="text-xs font-bold text-orange-600 bg-orange-500/10 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg transition-colors">
              Улучшить тариф
            </button>
          </div>
        </div>
      )}

      {/* ОСНОВНАЯ ФОРМА */}
      <form onSubmit={handleGenerate} className="space-y-6">
        
        {/* Блок 1: Параметры объекта */}
        <div className={`bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm transition-all ${tariff === 'free' ? 'opacity-60 pointer-events-none grayscale-[0.5]' : ''}`}>
          <h2 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-muted-foreground" />
            Параметры объекта
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Регион / Город</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Например: Новосибирск"
                  className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Тип помещения</label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select 
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pl-11 pr-4 py-3.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                >
                  <option>Квартира (Новостройка)</option>
                  <option>Квартира (Вторичка)</option>
                  <option>Частный дом / Коттедж</option>
                  <option>Коммерческое помещение</option>
                </select>
              </div>
            </div>
          </div>

          {/* Переключатель "Использовать мои цены" */}
          <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
            <div>
              <p className="font-bold text-sm text-foreground mb-0.5">Использовать мои цены</p>
              <p className="text-xs text-muted-foreground">Алгоритм подставит ваши сохраненные прайсы вместо рыночных</p>
            </div>
            <button 
              type="button"
              onClick={() => setCustomPrices(!customPrices)}
              className={`w-11 h-6 rounded-full transition-colors relative border ${customPrices ? 'bg-primary border-primary' : 'bg-muted border-border'}`}
            >
              <div className={`absolute top-[3px] left-[3px] bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${customPrices ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        {/* Блок 2: Детали задачи */}
        <div className={`bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm transition-all ${tariff === 'free' ? 'opacity-60 pointer-events-none grayscale-[0.5]' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Площадь (м²)</label>
              <input 
                type="number" 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="0"
                className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                <span>Описание задачи для ИИ</span>
                <span className="text-primary normal-case font-medium">Опционально</span>
              </label>
              <textarea 
                placeholder="Опишите пожелания. Например: 'Нужно добавить мастер-выключатель, теплые полы в ванной и защиту от протечек воды'."
                className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* КНОПКА ГЕНЕРАЦИИ С ЗАВИСИМОСТЬЮ ОТ ТАРИФА */}
        <button 
          type="submit"
          disabled={tariff === 'free' || isGenerating}
          className={`w-full relative overflow-hidden flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold transition-all shadow-sm
            ${tariff === 'free' ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:opacity-90'}
          `}
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Анализ нормативов и генерация...
            </>
          ) : tariff === 'free' ? (
            <>
              <Lock className="w-5 h-5" />
              Доступно с тарифа Master
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Сгенерировать смету {tariff === 'master' && <span className="opacity-80 text-sm font-medium ml-1">(Осталось 8 из 10)</span>}
            </>
          )}
        </button>

      </form>

      {/* СИМУЛЯЦИЯ ГОТОВОГО РЕЗУЛЬТАТА (Появляется только после загрузки) */}
      {showResult && (
        <div className="mt-8 bg-card border-2 border-primary/50 rounded-2xl p-6 sm:p-8 shadow-lg animate-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between mb-6 border-b border-border pb-6">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Готово</p>
              <h3 className="text-2xl font-black text-foreground">Смета: {roomType}</h3>
            </div>
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Кабель ВВГнг(А)-LS 3х2.5 (м)</span>
              <span className="font-bold text-foreground">150 м.</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">УЗО 40А 30мА тип А (шт)</span>
              <span className="font-bold text-foreground">2 шт.</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Автоматический выключатель 16А (шт)</span>
              <span className="font-bold text-foreground">8 шт.</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-border border-dashed">
              <span className="text-sm text-muted-foreground italic">+ еще 24 позиции</span>
            </div>
          </div>

          <button className="w-full bg-background border border-border hover:border-primary text-foreground hover:text-primary py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors">
            Открыть полную смету <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  )
}
