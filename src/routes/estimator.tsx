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
  const [region, setRegion] = useState('')
  const [roomType, setRoomType] = useState('Коммерческое помещение')
  const [area, setArea] = useState<number>(24)
  const [useMyPrices, setUseMyPrices] = useState(false)
  const [description, setDescription] = useState('Гараж, 1 выключатель, 2 розетки, 4 светильника')

  // === КОЛИЧЕСТВО МАТЕРИАЛОВ (Считает ИИ) ===
  const [estimatedData, setEstimatedData] = useState({
    cable3x25: 0,
    cable3x15: 0,
    rcdQty: 0,
    breaker16AQty: 0,
    breaker10AQty: 0,
  })

  // === БАЗОВЫЕ ЦЕНЫ (Будут подтягиваться ИИ онлайн по региону, а пока можно менять руками) ===
  const [prices, setPrices] = useState({
    cable3x25: 85,
    cable3x15: 65,
    rcd: 2500,
    breaker16A: 350,
    breaker10A: 350,
  })

  // Обновление конкретной цены из таблицы
  const handlePriceChange = (key: keyof typeof prices, value: number) => {
    setPrices(prev => ({ ...prev, [key]: value }))
  }

  // === ИМИТАЦИЯ ИИ (ПАРСИНГ ТЕКСТА И ЛОГИКА ТРАССИРОВКИ) ===
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setShowResult(false)

    // ИИ "читает" текст задачи
    const text = description.toLowerCase()
    const socketsMatch = text.match(/(\d+)\s*розет/)
    const switchesMatch = text.match(/(\d+)\s*выключат/)
    const lightsMatch = text.match(/(\d+)\s*светил/)

    const socketsCount = socketsMatch ? parseInt(socketsMatch[1], 10) : Math.max(1, Math.ceil(area / 6))
    const switchesCount = switchesMatch ? parseInt(switchesMatch[1], 10) : 1
    const lightsCount = lightsMatch ? parseInt(lightsMatch[1], 10) : Math.max(1, Math.ceil(area / 5))

    // Логика расчета
    const calcCable3x25 = Math.round(10 + (socketsCount * 3) + (area * 0.1)) 
    const calcCable3x15 = Math.round(10 + (switchesCount * 3) + (lightsCount * 2) + (area * 0.1))
    const calcAutomat16A = Math.max(1, Math.ceil(socketsCount / 4))
    const calcAutomat10A = Math.max(1, Math.ceil(lightsCount / 10))
    const calcRcd = 1 

    // Сбрасываем цены на базовые при новой генерации 
    // (в будущем здесь будет функция fetchPricesFromAI(region) )
    setPrices({
      cable3x25: 85,
      cable3x15: 65,
      rcd: 2500,
      breaker16A: 350,
      breaker10A: 350,
    })

    setTimeout(() => {
      setEstimatedData({
        cable3x25: calcCable3x25,
        cable3x15: calcCable3x15,
        rcdQty: calcRcd,
        breaker16AQty: calcAutomat16A,
        breaker10AQty: calcAutomat10A,
      })
      setIsGenerating(false)
      setShowResult(true)
    }, 2500)
  }

  // Мгновенный пересчет общей суммы
  const totalSum = 
    (estimatedData.cable3x25 * prices.cable3x25) +
    (estimatedData.cable3x15 * prices.cable3x15) +
    (estimatedData.rcdQty * prices.rcd) +
    (estimatedData.breaker16AQty * prices.breaker16A) +
    (estimatedData.breaker10AQty * prices.breaker10A)

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
        <div className="space-y-6">
          
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
                    <input type="text" required value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Например: Новосибирск" 
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
                    <p className="font-bold text-sm text-foreground mb-1 leading-tight">Использовать мои цены / Изменить</p>
                    <p className="text-xs text-muted-foreground leading-snug">Алгоритм подставит ваши прайсы в таблицу</p>
                  </div>
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
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Пример: Гараж, 1 выключатель, 2 розетки, 4 светильника"
                  className="w-full p-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none resize-none"></textarea>
              </div>

              {/* Кнопка генерации */}
              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-4 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-80 cursor-pointer"
              >
                {isGenerating ? (
                  <><Loader2 className="w-6 h-6 animate-spin" /> Анализ ПУЭ и трассировка...</>
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

              {/* === ТАБЛИЦА СМЕТЫ === */}
              <div className="space-y-3 mb-6">
                
                {/* Шапка таблицы (Только для компов) */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 pb-2 border-b border-border">
                  <div className="col-span-5 text-xs font-bold text-muted-foreground uppercase tracking-widest">Наименование работ / материалов</div>
                  <div className="col-span-3 text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2">Цена за ед.</div>
                  <div className="col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Кол-во</div>
                  <div className="col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">Итого</div>
                </div>

                {/* Строки */}
                <ResultItem 
                  title="Кабель ВВГнг(А)-LS 3x2.5 (м)" unit="м."
                  qty={estimatedData.cable3x25} price={prices.cable3x25} isEditable={useMyPrices}
                  onChange={(val) => handlePriceChange('cable3x25', val)} 
                />
                <ResultItem 
                  title="Кабель ВВГнг(А)-LS 3x1.5 (м)" unit="м."
                  qty={estimatedData.cable3x15} price={prices.cable3x15} isEditable={useMyPrices}
                  onChange={(val) => handlePriceChange('cable3x15', val)} 
                />
                <ResultItem 
                  title="УЗО 40А 30мА тип А (шт)" unit="шт."
                  qty={estimatedData.rcdQty} price={prices.rcd} isEditable={useMyPrices}
                  onChange={(val) => handlePriceChange('rcd', val)} 
                />
                <ResultItem 
                  title="Автомат 16А, х-ка С (шт)" unit="шт."
                  qty={estimatedData.breaker16AQty} price={prices.breaker16A} isEditable={useMyPrices}
                  onChange={(val) => handlePriceChange('breaker16A', val)} 
                />
                <ResultItem 
                  title="Автомат 10А, х-ка С (шт)" unit="шт."
                  qty={estimatedData.breaker10AQty} price={prices.breaker10A} isEditable={useMyPrices}
                  onChange={(val) => handlePriceChange('breaker10A', val)} 
                />
                
                {/* ИТОГОВАЯ СУММА */}
                <div className="p-5 mt-4 bg-primary/10 border border-primary/20 rounded-xl flex justify-between items-center">
                  <span className="font-bold text-foreground">Итого по материалам:</span>
                  <span className="text-xl font-black text-primary">{totalSum.toLocaleString('ru-RU')} ₽</span>
                </div>

                <div className="p-4 bg-muted/30 border border-border border-dashed rounded-xl text-center mt-4">
                  <p className="text-sm font-medium text-muted-foreground italic">+ гофра, коробки и еще 14 позиций</p>
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

// === УМНАЯ СТРОКА ТАБЛИЦЫ ===
function ResultItem({ title, unit, qty, price, isEditable, onChange }: { title: string, unit: string, qty: number, price: number, isEditable: boolean, onChange: (val: number) => void }) {
  const total = qty * price

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center p-4 bg-background border border-border rounded-xl">
      {/* 1. Название */}
      <div className="md:col-span-5 flex items-start gap-3 w-full">
        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <span className="font-medium text-sm sm:text-base text-foreground leading-tight">{title}</span>
      </div>

      {/* Блок метрик (Для мобилок выстраивается в ряд) */}
      <div className="md:col-span-7 flex w-full justify-between md:grid md:grid-cols-7 gap-2 md:gap-4 items-center mt-2 md:mt-0 pt-2 border-t border-border md:border-0 md:pt-0">
        
        {/* 2. Цена (Редактируемая колонка или текст) */}
        <div className="md:col-span-3 flex flex-col w-1/3 md:w-auto">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden mb-1">Цена</span>
          {isEditable ? (
            <div className="relative max-w-[120px]">
              <input
                type="number"
                value={price}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full bg-muted border border-border rounded-lg py-1.5 pl-2 pr-6 text-sm font-bold focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
              <span className="absolute right-2 top-1.5 text-xs text-muted-foreground">₽</span>
            </div>
          ) : (
            <span className="font-bold text-sm mt-1 md:mt-0">{price.toLocaleString('ru-RU')} ₽</span>
          )}
        </div>

        {/* 3. Количество */}
        <div className="md:col-span-2 flex flex-col w-1/3 md:w-auto text-center">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden mb-1">Кол-во</span>
          <span className="font-black text-sm whitespace-nowrap mt-1 md:mt-0">{qty} {unit}</span>
        </div>

        {/* 4. Итоговая сумма */}
        <div className="md:col-span-2 flex flex-col w-1/3 md:w-auto text-right">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden mb-1">Итого</span>
          <span className="font-black text-primary text-sm whitespace-nowrap mt-1 md:mt-0">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>
    </div>
  )
}
