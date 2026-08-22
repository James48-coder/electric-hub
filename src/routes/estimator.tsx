import { createFileRoute } from '@tanstack/react-router'
import { Bot, MapPin, Home as HomeIcon, Ruler, Settings, Lock, Sparkles, Loader2, FileText, Download, CheckCircle2, ChevronDown, AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/estimator')({
  component: EstimatorPage,
})

type Tariff = 'free' | 'master' | 'pro'

function EstimatorPage() {
  const [tariff, setTariff] = useState<Tariff>('free')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // === ЖИВЫЕ ДАННЫЕ ФОРМЫ ===
  const [roomType, setRoomType] = useState('Коммерческое помещение')
  const [area, setArea] = useState<number>(24)
  const [useMyPrices, setUseMyPrices] = useState(true)

  // === ДАННЫЕ СГЕНЕРИРОВАННОЙ СМЕТЫ ===
  const [estimatedData, setEstimatedData] = useState({
    cableQty: 0,
    rcdQty: 0,
    breakerQty: 0,
    totalPrice: 0
  })

  // Имитация работы нейросети с привязкой к площади
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setShowResult(false)

    // Простая имитация расчета на основе площади
    const calcCable = Math.round(area * 5.5) // ~5.5 метров кабеля на квадрат
    const calcRcd = Math.max(1, Math.ceil(area / 20)) // 1 УЗО на 20 квадратов
    const calcBreaker = Math.max(2, Math.ceil(area / 5)) // 1 Автомат на 5 квадратов
    
    // Условные прайсы
    const priceCable = 85
    const priceRcd = 2500
    const priceBreaker = 350
    const total = (calcCable * priceCable) + (calcRcd * priceRcd) + (calcBreaker * priceBreaker)

    // Имитируем задержку ИИ в 2.5 секунды
    setTimeout(() => {
      setEstimatedData({
        cableQty: calcCable,
        rcdQty: calcRcd,
        breakerQty: calcBreaker,
        totalPrice: total
      })
      setIsGenerating(false)
      setShowResult(true)
    }, 2500)
  }

  return (
    <div className="container mx-auto max-w-4xl animate-in fade-in duration-500 pb-24 relative px-4 sm:px-6">
      
      {/* 🛠 ПАНЕЛЬ ТЕСТИРОВАНИЯ ТАРИФОВ */}
      <div className="mb-8 p-4 bg-muted/30 border-2 border-border rounded-2xl flex flex-wrap items-center gap-4">
        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest w-full sm:w-auto mb-1 sm:mb-0 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
          <Settings className="w-4 h-4" /> Тест тарифов:
        </span>
        
        <button 
          onClick={() => { setTariff('free'); setShowResult(false); }} 
          className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${
            tariff === 'free' 
            ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' 
            : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          Free
        </button>
        
        <button 
          onClick={() => setTariff('master')} 
          className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${
            tariff === 'master' 
            ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' 
            : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          Master
        </button>
        
        <button 
          onClick={() => setTariff('pro')} 
          className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${
            tariff === 'pro' 
            ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' 
            : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          PRO
        </button>
      </div>

      {/* Шапка */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
            <Bot className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">ИИ-сметчик</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          Нейросеть составит смету по ПУЭ и рассчитает материалы за 1 минуту.
        </p>
      </div>

      {/* ЛОГИКА БЛОКИРОВКИ ДЛЯ БАЗОВОГО ТАРИФА */}
      {tariff === 'free' ? (
        <div className="bg-orange-500/10 border-2 border-orange-500/20 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground mb-4">ИИ-сметчик недоступен на Базовом тарифе</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Для автоматической генерации смет по ГОСТ и ПУЭ требуется тариф Master или PRO.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-orange-500/20">
            Улучшить тариф
          </button>
        </div>
      ) : (
        
        /* РАБОЧАЯ ЗОНА ДЛЯ MASTER И PRO */
        <div className="space-y-6">
          
          {/* ФОРМА ВВОДА ПАРАМЕТРОВ */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Параметры объекта</h2>
            </div>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Регион */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Регион / Город</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input type="text" required placeholder="Например: Новосибирск" 
                      onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, укажите регион')}
                      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                      className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" />
                  </div>
                </div>

                {/* Тип помещения */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Тип помещения</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <HomeIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <select required value={roomType} onChange={(e) => setRoomType(e.target.value)}
                      onInvalid={(e) => (e.target as HTMLSelectElement).setCustomValidity('Пожалуйста, выберите тип помещения')}
                      onInput={(e) => (e.target as HTMLSelectElement).setCustomValidity('')}
                      className="w-full pl-12 pr-10 py-3.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none appearance-none cursor-pointer">
                      <option value="Квартира (Новостройка)">Квартира (Новостройка)</option>
                      <option value="Квартира (Вторичка)">Квартира (Вторичка)</option>
                      <option value="Дом / Коттедж">Дом / Коттедж</option>
                      <option value="Коммерческое помещение">Коммерческое помещение</option>
                      <option value="Офис">Офис</option>
                      <option value="Гараж / Подсобное">Гараж / Подсобное</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Площадь */}
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Площадь (м²)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Ruler className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input type="number" required min="1" value={area || ''} onChange={(e) => setArea(Number(e.target.value))} placeholder="0"
                      onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Пожалуйста, укажите площадь')}
                      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                      className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none" />
                  </div>
                </div>

                {/* Использовать мои цены */}
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border mt-auto gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-sm text-foreground mb-1 leading-tight">Использовать мои цены</p>
                    <p className="text-xs text-muted-foreground leading-snug">Алгоритм подставит ваши прайсы</p>
                  </div>
                  {/* Ползунок привязан к стейту useMyPrices */}
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={useMyPrices} onChange={(e) => setUseMyPrices(e.target.checked)} />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                  </label>
                </div>
              </div>

              {/* Описание задачи */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">Описание задачи для ИИ</label>
                  <span className="text-xs text-muted-foreground">Опционально</span>
                </div>
                <textarea rows={3} placeholder="Гараж, 1 выключатель, 2 розетки, 4 светильника" defaultValue="Гараж, 1 выключатель, 2 розетки, 4 светильника"
                  className="w-full p-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none resize-none"></textarea>
              </div>

              {/* Кнопка генерации */}
              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-4 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-80 cursor-pointer"
              >
                {isGenerating ? (
                  <><Loader2 className="w-6 h-6 animate-spin" /> Анализ нормативов ПУЭ...</>
                ) : (
                  <><Sparkles className="w-6 h-6" /> Сгенерировать смету</>
                )}
              </button>
            </form>
          </div>

          {/* ВЫДАЧА РЕЗУЛЬТАТА */}
          {showResult && (
            <div className="bg-card border-2 border-primary/30 rounded-3xl p-6 sm:p-8 shadow-xl animate-in slide-in-from-bottom-8 duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Готово</p>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                    {/* ПОДСТАВЛЯЕМ ВЫБРАННЫЙ ТИП ПОМЕЩЕНИЯ */}
                    <FileText className="w-6 h-6 text-muted-foreground" /> Смета: {roomType}
                  </h3>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-lg text-sm transition-colors border border-border">
                  <Download className="w-4 h-4" /> Экспорт в PDF
                </button>
              </div>

              {/* ДИСКЛЕЙМЕР */}
              <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-500 leading-relaxed font-medium">
                  Расчёт приблизительный, не является офертой. Перед работой проконсультируйтесь со специалистом!
                </p>
              </div>

              {/* Список материалов (ДИНАМИЧЕСКИЙ) */}
              <div className="space-y-3 mb-6">
                <ResultItem 
                  title="Кабель ВВГнг(А)-LS 3x2.5 (м)" 
                  qty={`${estimatedData.cableQty} м.`} 
                  price={useMyPrices ? `${(estimatedData.cableQty * 85).toLocaleString('ru-RU')} ₽` : undefined} 
                />
                <ResultItem 
                  title="УЗО 40А 30мА тип А (шт)" 
                  qty={`${estimatedData.rcdQty} шт.`} 
                  price={useMyPrices ? `${(estimatedData.rcdQty * 2500).toLocaleString('ru-RU')} ₽` : undefined} 
                />
                <ResultItem 
                  title="Автоматический выключатель 16А (шт)" 
                  qty={`${estimatedData.breakerQty} шт.`} 
                  price={useMyPrices ? `${(estimatedData.breakerQty * 350).toLocaleString('ru-RU')} ₽` : undefined} 
                />
                
                {/* ИТОГОВАЯ СУММА (Показывается только если включены цены) */}
                {useMyPrices && (
                  <div className="p-5 mt-4 bg-primary/10 border border-primary/20 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-foreground">Итого по материалам:</span>
                    <span className="text-xl font-black text-primary">{estimatedData.totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}

                <div className="p-4 bg-muted/30 border border-border border-dashed rounded-xl text-center mt-4">
                  <p className="text-sm font-medium text-muted-foreground italic">+ еще 24 позиции согласно ПУЭ</p>
                </div>
              </div>

              <button className="w-full py-4 bg-background border border-border hover:border-primary/50 text-foreground font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                Открыть полную смету
              </button>

            </div>
          )}

        </div>
      )}
    </div>
  )
}

// Вспомогательный компонент для строки сметы (добавлена поддержка цены)
function ResultItem({ title, qty, price }: { title: string, qty: string, price?: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
        <span className="font-medium text-sm sm:text-base text-foreground">{title}</span>
      </div>
      <div className="text-right ml-4">
        <div className="font-black text-foreground whitespace-nowrap">{qty}</div>
        {price && <div className="text-xs font-bold text-primary mt-1">{price}</div>}
      </div>
    </div>
  )
}
