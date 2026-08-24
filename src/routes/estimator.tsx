import { createFileRoute } from '@tanstack/react-router'
import { Bot, MapPin, Home as HomeIcon, Ruler, Settings, Lock, Sparkles, Loader2, FileText, Download, CheckCircle2, ChevronDown, AlertTriangle, Share2, X, Send, MessageCircle, Users, MessageSquare } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/estimator')({
  component: EstimatorPage,
})

type Tariff = 'free' | 'master' | 'pro'

function EstimatorPage() {
  const [tariff, setTariff] = useState<Tariff>('free')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  
  // Состояния для модалки шеринга и загрузки PDF
  const [showShareModal, setShowShareModal] = useState(false)
  const [isPdfDownloading, setIsPdfDownloading] = useState(false)

  // === ЖИВЫЕ ДАННЫЕ ФОРМЫ ===
  const [region, setRegion] = useState('')
  const [roomType, setRoomType] = useState('Коммерческое помещение')
  const [area, setArea] = useState<number>(24)
  const [useMyPrices, setUseMyPrices] = useState(false)
  const [description, setDescription] = useState('Гараж, 1 выключатель, 2 розетки, 4 светильника')

  const [estimatedData, setEstimatedData] = useState({
    cable3x25: 0, cable3x15: 0, rcdQty: 0, breaker16AQty: 0, breaker10AQty: 0,
  })

  const [prices, setPrices] = useState({
    cable3x25: 85, cable3x15: 65, rcd: 2500, breaker16A: 350, breaker10A: 350,
  })

  const handlePriceChange = (key: keyof typeof prices, value: number) => {
    setPrices(prev => ({ ...prev, [key]: value }))
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setShowResult(false)

    const text = description.toLowerCase()
    const socketsMatch = text.match(/(\d+)\s*розет/)
    const switchesMatch = text.match(/(\d+)\s*выключат/)
    const lightsMatch = text.match(/(\d+)\s*светил/)

    const socketsCount = socketsMatch ? parseInt(socketsMatch[1], 10) : Math.max(1, Math.ceil(area / 6))
    const switchesCount = switchesMatch ? parseInt(switchesMatch[1], 10) : 1
    const lightsCount = lightsMatch ? parseInt(lightsMatch[1], 10) : Math.max(1, Math.ceil(area / 5))

    const calcCable3x25 = Math.round(10 + (socketsCount * 3) + (area * 0.1)) 
    const calcCable3x15 = Math.round(10 + (switchesCount * 3) + (lightsCount * 2) + (area * 0.1))
    const calcAutomat16A = Math.max(1, Math.ceil(socketsCount / 4))
    const calcAutomat10A = Math.max(1, Math.ceil(lightsCount / 10))
    const calcRcd = 1 

    setPrices({ cable3x25: 85, cable3x15: 65, rcd: 2500, breaker16A: 350, breaker10A: 350 })

    setTimeout(() => {
      setEstimatedData({
        cable3x25: calcCable3x25, cable3x15: calcCable3x15, rcdQty: calcRcd, breaker16AQty: calcAutomat16A, breaker10AQty: calcAutomat10A,
      })
      setIsGenerating(false)
      setShowResult(true)
    }, 2500)
  }

  const totalSum = 
    (estimatedData.cable3x25 * prices.cable3x25) + (estimatedData.cable3x15 * prices.cable3x15) +
    (estimatedData.rcdQty * prices.rcd) + (estimatedData.breaker16AQty * prices.breaker16A) +
    (estimatedData.breaker10AQty * prices.breaker10A)

  // === ГЕНЕРАЦИЯ ТЕКСТА ДЛЯ ШЕРИНГА ===
  const getShareText = () => {
    let text = `⚡ ВольтПро | Смета\nОбъект: ${roomType}\nПлощадь: ${area} м²\n\nМатериалы:\n`
    text += `• Кабель ВВГнг(А)-LS 3x2.5: ${estimatedData.cable3x25} м. (${prices.cable3x25} ₽) = ${estimatedData.cable3x25 * prices.cable3x25} ₽\n`
    text += `• Кабель ВВГнг(А)-LS 3x1.5: ${estimatedData.cable3x15} м. (${prices.cable3x15} ₽) = ${estimatedData.cable3x15 * prices.cable3x15} ₽\n`
    text += `• УЗО 40А 30мА: ${estimatedData.rcdQty} шт. (${prices.rcd} ₽) = ${estimatedData.rcdQty * prices.rcd} ₽\n`
    text += `• Автомат 16А: ${estimatedData.breaker16AQty} шт. (${prices.breaker16A} ₽) = ${estimatedData.breaker16AQty * prices.breaker16A} ₽\n`
    text += `• Автомат 10А: ${estimatedData.breaker10AQty} шт. (${prices.breaker10A} ₽) = ${estimatedData.breaker10AQty * prices.breaker10A} ₽\n`
    text += `\nИТОГО ПО МАТЕРИАЛАМ: ${totalSum.toLocaleString('ru-RU')} ₽\n\n*Расчет приблизительный.`
    return text
  }

  const handleShare = async () => {
    // Пробуем вызвать нативное меню
    if (navigator.share) {
      try {
        await navigator.share({ title: `Смета: ${roomType}`, text: getShareText() })
        return
      } catch (error) {
        if ((error as Error).name !== 'AbortError') setShowShareModal(true)
      }
    } else {
      setShowShareModal(true)
    }
  }

  // === СОЗДАНИЕ НАСТОЯЩЕГО PDF-ФАЙЛА (Без терминалов и npm!) ===
  const handlePdfDownload = async () => {
    setIsPdfDownloading(true)
    try {
      if (!(window as any).html2pdf) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }

      const element = document.getElementById('pdf-content')
      const elementsToHide = element?.querySelectorAll('.no-pdf')
      elementsToHide?.forEach(el => (el as HTMLElement).style.display = 'none')

      const opt = {
        margin:       10,
        filename:     `Смета_${roomType.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }

      await (window as any).html2pdf().set(opt).from(element).save()

      elementsToHide?.forEach(el => (el as HTMLElement).style.display = '')
    } catch (err) {
      alert("Не удалось скачать PDF. Проверьте интернет-соединение.")
    } finally {
      setIsPdfDownloading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl animate-in fade-in duration-500 pb-24 relative px-4 sm:px-6">
      
      {/* 🛠 ПАНЕЛЬ ТЕСТИРОВАНИЯ ТАРИФОВ */}
      <div className="mb-8 p-4 bg-muted/30 border-2 border-border rounded-2xl flex flex-wrap items-center gap-4">
        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest w-full sm:w-auto mb-1 sm:mb-0 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
          <Settings className="w-4 h-4" /> Тест тарифов:
        </span>
        <button onClick={() => { setTariff('free'); setShowResult(false); }} className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${tariff === 'free' ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'}`}>Free</button>
        <button onClick={() => setTariff('master')} className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${tariff === 'master' ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'}`}>Master</button>
        <button onClick={() => setTariff('pro')} className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${tariff === 'pro' ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'}`}>PRO</button>
      </div>

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
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Для автоматической генерации смет по ГОСТ и ПУЭ требуется тариф Master или PRO.</p>
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
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Регион / Город</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-muted-foreground" /></div>
                    <input type="text" required value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Например: Новосибирск" className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Тип помещения</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><HomeIcon className="h-5 w-5 text-muted-foreground" /></div>
                    <select required value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full pl-12 pr-10 py-3.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none appearance-none cursor-pointer">
                      <option value="Квартира (Новостройка)">Квартира (Новостройка)</option>
                      <option value="Квартира (Вторичка)">Квартира (Вторичка)</option>
                      <option value="Дом / Коттедж">Дом / Коттедж</option>
                      <option value="Коммерческое помещение">Коммерческое помещение</option>
                      <option value="Офис">Офис</option>
                      <option value="Гараж / Подсобное">Гараж / Подсобное</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"><ChevronDown className="h-5 w-5 text-muted-foreground" /></div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Площадь (м²)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Ruler className="h-5 w-5 text-muted-foreground" /></div>
                    <input type="number" required min="1" value={area || ''} onChange={(e) => setArea(Number(e.target.value))} placeholder="0" className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border mt-auto gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-sm text-foreground mb-1 leading-tight">Использовать мои цены</p>
                    <p className="text-xs text-muted-foreground leading-snug">Алгоритм подставит ваши прайсы</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" className="sr-only peer" checked={useMyPrices} onChange={(e) => setUseMyPrices(e.target.checked)} />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isGenerating} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 disabled:opacity-80">
                {isGenerating ? <><Loader2 className="w-6 h-6 animate-spin" /> Анализ ПУЭ и трассировка...</> : <><Sparkles className="w-6 h-6" /> Сгенерировать смету</>}
              </button>
            </form>
          </div>

          {/* === КОНТЕЙНЕР ДЛЯ ГЕНЕРАЦИИ PDF === */}
          {showResult && (
            <div id="pdf-content" className="bg-card border-2 border-primary/30 rounded-3xl p-6 sm:p-8 shadow-xl animate-in slide-in-from-bottom-8 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 no-pdf"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 no-pdf">Готово</p>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                    <FileText className="w-6 h-6 text-muted-foreground no-pdf" /> Смета: {roomType}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">Площадь: {area} м² | Регион: {region || 'Не указан'}</p>
                </div>
                
                {/* КНОПКИ ДЕЙСТВИЙ */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 no-pdf">
                  <button onClick={handleShare} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-lg text-sm border border-primary/20 transition-colors">
                    <Share2 className="w-4 h-4" /> Поделиться
                  </button>
                  <button onClick={handlePdfDownload} disabled={isPdfDownloading} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-lg text-sm border border-border disabled:opacity-50 transition-colors">
                    {isPdfDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {isPdfDownloading ? 'Сохранение...' : 'Скачать PDF'}
                  </button>
                </div>
              </div>

              <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 no-pdf" />
                <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-500 leading-relaxed font-medium">
                  Расчёт приблизительный, не является офертой. Перед работой проконсультируйтесь со специалистом!
                </p>
              </div>

              {/* ТАБЛИЦА СМЕТЫ */}
              <div className="space-y-3 mb-6">
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 pb-2 border-b border-border">
                  <div className="md:col-span-5 text-xs font-bold text-muted-foreground uppercase tracking-widest">Наименование</div>
                  <div className="md:col-span-3 text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2">Цена за ед.</div>
                  <div className="md:col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Кол-во</div>
                  <div className="md:col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">Итого</div>
                </div>

                <ResultItem title="Кабель ВВГнг(А)-LS 3x2.5 (м)" unit="м." qty={estimatedData.cable3x25} price={prices.cable3x25} isEditable={useMyPrices} onChange={(val) => handlePriceChange('cable3x25', val)} />
                <ResultItem title="Кабель ВВГнг(А)-LS 3x1.5 (м)" unit="м." qty={estimatedData.cable3x15} price={prices.cable3x15} isEditable={useMyPrices} onChange={(val) => handlePriceChange('cable3x15', val)} />
                <ResultItem title="УЗО 40А 30мА тип А (шт)" unit="шт." qty={estimatedData.rcdQty} price={prices.rcd} isEditable={useMyPrices} onChange={(val) => handlePriceChange('rcd', val)} />
                <ResultItem title="Автомат 16А, х-ка С (шт)" unit="шт." qty={estimatedData.breaker16AQty} price={prices.breaker16A} isEditable={useMyPrices} onChange={(val) => handlePriceChange('breaker16A', val)} />
                <ResultItem title="Автомат 10А, х-ка С (шт)" unit="шт." qty={estimatedData.breaker10AQty} price={prices.breaker10A} isEditable={useMyPrices} onChange={(val) => handlePriceChange('breaker10A', val)} />
                
                <div className="p-5 mt-4 bg-primary/10 border border-primary/20 rounded-xl flex justify-between items-center">
                  <span className="font-bold text-foreground">Итого по материалам:</span>
                  <span className="text-xl font-black text-primary whitespace-nowrap">{totalSum.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === НАШЕ СОБСТВЕННОЕ МОДАЛЬНОЕ ОКНО "ПОДЕЛИТЬСЯ" === */}
      {showShareModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl w-full max-w-sm p-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-foreground">Куда отправить?</h3>
              <button onClick={() => setShowShareModal(false)} className="p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-3">
              {/* Telegram */}
              <a href={`https://t.me/share/url?url=&text=${encodeURIComponent(getShareText())}`} target="_blank" rel="noreferrer" onClick={() => setShowShareModal(false)} className="flex items-center gap-3 w-full p-4 bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20 rounded-xl font-bold transition-colors">
                <Send className="w-6 h-6" /> Telegram
              </a>
              
              {/* WhatsApp */}
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`} target="_blank" rel="noreferrer" onClick={() => setShowShareModal(false)} className="flex items-center gap-3 w-full p-4 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-xl font-bold transition-colors">
                <MessageCircle className="w-6 h-6" /> WhatsApp
              </a>

              {/* ВКонтакте */}
              <a href={`https://vk.com/share.php?url=https://voltpro.ru&title=Смета&comment=${encodeURIComponent(getShareText())}`} target="_blank" rel="noreferrer" onClick={() => setShowShareModal(false)} className="flex items-center gap-3 w-full p-4 bg-[#0077FF]/10 text-[#0077FF] hover:bg-[#0077FF]/20 rounded-xl font-bold transition-colors">
                <Users className="w-6 h-6" /> ВКонтакте
              </a>

              {/* Мессенджер MAX */}
              <a href={`max://share?text=${encodeURIComponent(getShareText())}`} target="_blank" rel="noreferrer" onClick={() => setShowShareModal(false)} className="flex items-center gap-3 w-full p-4 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 rounded-xl font-bold transition-colors">
                <MessageSquare className="w-6 h-6" /> Мессенджер MAX
              </a>
            </div>
            
            <p className="text-[10px] text-muted-foreground text-center mt-6">
              Нажмите на нужный мессенджер, и смета будет прикреплена к сообщению.
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

function ResultItem({ title, unit, qty, price, isEditable, onChange }: { title: string, unit: string, qty: number, price: number, isEditable: boolean, onChange: (val: number) => void }) {
  const total = qty * price

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-start md:items-center p-4 bg-background border border-border rounded-xl">
      <div className="md:col-span-5 flex items-start gap-3 w-full">
        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 no-pdf" />
        <span className="font-medium text-sm sm:text-base text-foreground leading-tight">{title}</span>
      </div>

      <div className="md:col-span-7 flex w-full justify-between md:grid md:grid-cols-7 gap-2 md:gap-4 items-center mt-2 md:mt-0 pt-2 border-t border-border md:border-0 md:pt-0">
        <div className="md:col-span-3 flex flex-col w-1/3 md:w-auto">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden mb-1 no-pdf">Цена</span>
          {isEditable ? (
            <div className="relative max-w-[120px] no-pdf">
              <input type="number" value={price} onChange={(e) => onChange(Number(e.target.value))} className="w-full bg-muted border border-border rounded-lg py-1.5 pl-2 pr-6 text-sm font-bold focus:ring-1 focus:ring-primary outline-none transition-colors" />
              <span className="absolute right-2 top-1.5 text-xs text-muted-foreground">₽</span>
            </div>
          ) : (
            <span className="font-bold text-sm mt-1 md:mt-0 whitespace-nowrap">{price.toLocaleString('ru-RU')} ₽</span>
          )}
          {isEditable && (
             <span className="hidden font-bold text-sm text-foreground whitespace-nowrap" style={{ display: 'none' }} id="pdf-price">
                {price.toLocaleString('ru-RU')} ₽
             </span>
          )}
        </div>

        <div className="md:col-span-2 flex flex-col w-1/3 md:w-auto text-center md:text-center">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden mb-1 no-pdf">Кол-во</span>
          <span className="font-black text-sm whitespace-nowrap mt-1 md:mt-0">{qty} {unit}</span>
        </div>

        <div className="md:col-span-2 flex flex-col w-1/3 md:w-auto text-right md:text-right">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden mb-1 no-pdf">Итого</span>
          <span className="font-black text-primary text-sm whitespace-nowrap mt-1 md:mt-0">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>
    </div>
  )
}
