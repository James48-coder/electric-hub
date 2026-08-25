import { createFileRoute } from '@tanstack/react-router'
import { Bot, MapPin, Home as HomeIcon, Ruler, Settings, Lock, Sparkles, Loader2, FileText, Download, CheckCircle2, ChevronDown, AlertTriangle, Share2, X, Send, MessageCircle, Users, MessageSquare, PlusCircle, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/estimator')({
  component: EstimatorPage,
})

type Tariff = 'free' | 'master' | 'pro'

function EstimatorPage() {
  const [tariff, setTariff] = useState<Tariff>('free')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  
  const [showShareModal, setShowShareModal] = useState(false)
  const [pdfError, setPdfError] = useState(false)

  // === ЖИВЫЕ ДАННЫЕ ФОРМЫ ===
  const [region, setRegion] = useState('')
  const [roomType, setRoomType] = useState('Коммерческое помещение')
  const [area, setArea] = useState<number>(24)
  const [description, setDescription] = useState('Гараж, 1 выключатель, 2 розетки, 4 светильника')
  
  const [useMyPrices, setUseMyPrices] = useState(false)
  const [includeWorks, setIncludeWorks] = useState(false)

  const [estimatedData, setEstimatedData] = useState({
    cable3x25: 0, cable3x15: 0, rcdQty: 0, breaker16AQty: 0, breaker10AQty: 0,
  })
  
  const [estimatedWorks, setEstimatedWorks] = useState({
    cableRouting: 0, pointsInstall: 0, shieldAssembly: 0
  })

  const [prices, setPrices] = useState({
    cable3x25: 85, cable3x15: 65, rcd: 2500, breaker16A: 350, breaker10A: 350,
  })
  
  const [workPrices, setWorkPrices] = useState({
    cableRouting: 150, pointsInstall: 450, shieldAssembly: 500,
  })

  const [customMaterials, setCustomMaterials] = useState<any[]>([])
  const [customWorks, setCustomWorks] = useState<any[]>([])

  const handlePriceChange = (key: keyof typeof prices, value: number) => setPrices(prev => ({ ...prev, [key]: value }))
  const handleWorkPriceChange = (key: keyof typeof workPrices, value: number) => setWorkPrices(prev => ({ ...prev, [key]: value }))

  const addCustomItem = (setter: any, list: any[]) => {
    setter([...list, { id: Date.now().toString(), title: '', qty: 1, price: 0 }])
  }
  const updateCustomItem = (setter: any, list: any[], id: string, field: string, value: any) => {
    setter(list.map((item) => item.id === id ? { ...item, [field]: value } : item))
  }
  const removeCustomItem = (setter: any, list: any[], id: string) => {
    setter(list.filter((item) => item.id !== id))
  }

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setShowResult(false)
    setPdfError(false)

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
    setWorkPrices({ cableRouting: 150, pointsInstall: 450, shieldAssembly: 500 })

    setTimeout(() => {
      setEstimatedData({ cable3x25: calcCable3x25, cable3x15: calcCable3x15, rcdQty: calcRcd, breaker16AQty: calcAutomat16A, breaker10AQty: calcAutomat10A })
      setEstimatedWorks({
        cableRouting: calcCable3x25 + calcCable3x15,
        pointsInstall: socketsCount + switchesCount + lightsCount,
        shieldAssembly: calcAutomat16A + calcAutomat10A + calcRcd
      })
      setCustomMaterials([]) 
      setCustomWorks([])
      setIsGenerating(false)
      setShowResult(true)
    }, 2500)
  }

  const materialsBaseSum = (estimatedData.cable3x25 * prices.cable3x25) + (estimatedData.cable3x15 * prices.cable3x15) + (estimatedData.rcdQty * prices.rcd) + (estimatedData.breaker16AQty * prices.breaker16A) + (estimatedData.breaker10AQty * prices.breaker10A)
  const materialsCustomSum = customMaterials.reduce((acc, curr) => acc + (curr.qty * curr.price), 0)
  const totalMaterials = materialsBaseSum + materialsCustomSum

  const worksBaseSum = includeWorks ? (estimatedWorks.cableRouting * workPrices.cableRouting) + (estimatedWorks.pointsInstall * workPrices.pointsInstall) + (estimatedWorks.shieldAssembly * workPrices.shieldAssembly) : 0
  const worksCustomSum = includeWorks ? customWorks.reduce((acc, curr) => acc + (curr.qty * curr.price), 0) : 0
  const totalWorks = worksBaseSum + worksCustomSum

  const grandTotal = totalMaterials + totalWorks

  const getShareText = () => {
    let text = `⚡ ВольтПро | Смета\nОбъект: ${roomType}\nПлощадь: ${area} м²\n\n`
    
    text += `📦 МАТЕРИАЛЫ:\n`
    text += `• Кабель ВВГнг(А)-LS 3x2.5: ${estimatedData.cable3x25} м. (${prices.cable3x25} ₽) = ${estimatedData.cable3x25 * prices.cable3x25} ₽\n`
    text += `• Кабель ВВГнг(А)-LS 3x1.5: ${estimatedData.cable3x15} м. (${prices.cable3x15} ₽) = ${estimatedData.cable3x15 * prices.cable3x15} ₽\n`
    text += `• УЗО 40А 30мА: ${estimatedData.rcdQty} шт. (${prices.rcd} ₽) = ${estimatedData.rcdQty * prices.rcd} ₽\n`
    text += `• Автомат 16А: ${estimatedData.breaker16AQty} шт. (${prices.breaker16A} ₽) = ${estimatedData.breaker16AQty * prices.breaker16A} ₽\n`
    text += `• Автомат 10А: ${estimatedData.breaker10AQty} шт. (${prices.breaker10A} ₽) = ${estimatedData.breaker10AQty * prices.breaker10A} ₽\n`
    customMaterials.forEach(m => {
      if(m.title) text += `• ${m.title}: ${m.qty} ед. (${m.price} ₽) = ${m.qty * m.price} ₽\n`
    })
    text += `Итого материалы: ${totalMaterials.toLocaleString('ru-RU')} ₽\n\n`

    if (includeWorks) {
      text += `🛠 РАБОТЫ:\n`
      text += `• Прокладка кабельных линий: ${estimatedWorks.cableRouting} м. (${workPrices.cableRouting} ₽) = ${estimatedWorks.cableRouting * workPrices.cableRouting} ₽\n`
      text += `• Монтаж установочных мест: ${estimatedWorks.pointsInstall} шт. (${workPrices.pointsInstall} ₽) = ${estimatedWorks.pointsInstall * workPrices.pointsInstall} ₽\n`
      text += `• Сборка и монтаж щита: ${estimatedWorks.shieldAssembly} мод. (${workPrices.shieldAssembly} ₽) = ${estimatedWorks.shieldAssembly * workPrices.shieldAssembly} ₽\n`
      customWorks.forEach(w => {
        if(w.title) text += `• ${w.title}: ${w.qty} ед. (${w.price} ₽) = ${w.qty * w.price} ₽\n`
      })
      text += `Итого работы: ${totalWorks.toLocaleString('ru-RU')} ₽\n\n`
    }

    text += `💰 ОБЩАЯ СУММА: ${grandTotal.toLocaleString('ru-RU')} ₽\n\n*Расчет приблизительный.`
    return text
  }

  const handleShare = async () => {
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

  const handlePdfDownload = () => {
    setPdfError(false)
    try {
      if (typeof window.print !== 'function') { setPdfError(true); return; }
      window.print()
    } catch (error) {
      setPdfError(true)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl animate-in fade-in duration-500 pb-24 relative px-4 sm:px-6 print:static print:p-0 print:m-0 print:max-w-none">
      
      <style>
        {`
          @media print {
            html, body, #root { 
              background-color: white !important; 
              height: auto !important; 
            }
            #print-section {
              background-color: white !important;
              border: none !important;
              box-shadow: none !important;
            }
            #print-section * { 
              color: black !important; 
              border-color: #d1d5db !important; 
            }
            #print-section div { 
              background-color: transparent !important; 
            }
            input::placeholder { 
              color: transparent !important; 
            }
          }
        `}
      </style>

      <div className="mb-8 p-4 bg-muted/30 border-2 border-border rounded-2xl flex flex-wrap items-center gap-4 print:hidden">
        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest w-full sm:w-auto mb-1 sm:mb-0 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
          <Settings className="w-4 h-4" /> Тест тарифов:
        </span>
        <button onClick={() => { setTariff('free'); setShowResult(false); }} className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${tariff === 'free' ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'}`}>Free</button>
        <button onClick={() => setTariff('master')} className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${tariff === 'master' ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'}`}>Master</button>
        <button onClick={() => setTariff('pro')} className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${tariff === 'pro' ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'}`}>PRO</button>
      </div>

      <div className="mb-8 print:hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
            <Bot className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">ИИ-сметчик</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          Нейросеть составит смету по ПУЭ и рассчитает материалы и работы за 1 минуту.
        </p>
      </div>

      {tariff === 'free' ? (
        <div className="bg-orange-500/10 border-2 border-orange-500/20 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center print:hidden">
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
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm print:hidden">
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

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Площадь (м²)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Ruler className="h-5 w-5 text-muted-foreground" /></div>
                    <input type="number" required min="1" value={area || ''} onChange={(e) => setArea(Number(e.target.value))} placeholder="0" className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-sm text-foreground mb-1 leading-tight">Цены материалов</p>
                      <p className="text-xs text-muted-foreground leading-snug">Ручное изменение прайсов</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" className="sr-only peer" checked={useMyPrices} onChange={(e) => setUseMyPrices(e.target.checked)} />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-sm text-foreground mb-1 leading-tight">Стоимость работ</p>
                      <p className="text-xs text-muted-foreground leading-snug">Включить работы в смету</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input type="checkbox" className="sr-only peer" checked={includeWorks} onChange={(e) => setIncludeWorks(e.target.checked)} />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">Описание задачи для ИИ</label>
                  <span className="text-xs text-muted-foreground">Опционально</span>
                </div>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Пример: Гараж, 1 выключатель, 2 розетки, 4 светильника" className="w-full p-4 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none"></textarea>
              </div>

              <button type="submit" disabled={isGenerating} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 disabled:opacity-80">
                {isGenerating ? <><Loader2 className="w-6 h-6 animate-spin" /> Анализ ПУЭ и трассировка...</> : <><Sparkles className="w-6 h-6" /> Сгенерировать смету</>}
              </button>
            </form>
          </div>

          {showResult && (
            <>
              {/* === КАРТОЧКА СМЕТЫ === */}
              <div id="print-section" className="bg-card border-2 border-primary/30 rounded-3xl p-6 sm:p-8 shadow-xl animate-in slide-in-from-bottom-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 print:hidden"></div>
                
                <div className="hidden print:flex justify-between items-end border-b border-border pb-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-foreground tracking-tight">ВольтПро</h1>
                    <p className="text-sm text-muted-foreground">Система инженерных расчетов</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">Смета от: {new Date().toLocaleDateString('ru-RU')}</p>
                    <p className="text-sm text-muted-foreground">Регион: {region || 'Не указан'}</p>
                  </div>
                </div>
                
                <div className="mb-6 print:mb-2">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1 print:hidden">Готово</p>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                    <FileText className="w-6 h-6 text-muted-foreground print:hidden" /> Смета: {roomType}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 hidden print:block">Площадь: {area} м² | Регион: {region || 'Не указан'}</p>
                </div>

                <div className="mb-8 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start gap-3 print:hidden">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-500 leading-relaxed font-medium">
                    Расчёт приблизительный, не является офертой. Перед работой проконсультируйтесь со специалистом!
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest border-l-4 border-primary pl-3">Материалы</h4>
                  
                  <div className="hidden md:grid md:grid-cols-12 print:grid print:grid-cols-12 gap-4 px-4 pb-2 border-b border-border print:px-0">
                    <div className="md:col-span-5 print:col-span-5 text-xs font-bold text-muted-foreground uppercase tracking-widest">Наименование</div>
                    <div className="md:col-span-3 print:col-span-3 text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2 print:pl-0">Цена за ед.</div>
                    <div className="md:col-span-2 print:col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Кол-во</div>
                    <div className="md:col-span-2 print:col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">Итого</div>
                  </div>

                  <ResultItem title="Кабель ВВГнг(А)-LS 3x2.5 (м)" unit="м." qty={estimatedData.cable3x25} price={prices.cable3x25} isEditable={useMyPrices} onChangePrice={(val) => handlePriceChange('cable3x25', val)} />
                  <ResultItem title="Кабель ВВГнг(А)-LS 3x1.5 (м)" unit="м." qty={estimatedData.cable3x15} price={prices.cable3x15} isEditable={useMyPrices} onChangePrice={(val) => handlePriceChange('cable3x15', val)} />
                  <ResultItem title="УЗО 40А 30мА тип А (шт)" unit="шт." qty={estimatedData.rcdQty} price={prices.rcd} isEditable={useMyPrices} onChangePrice={(val) => handlePriceChange('rcd', val)} />
                  <ResultItem title="Автомат 16А, х-ка С (шт)" unit="шт." qty={estimatedData.breaker16AQty} price={prices.breaker16A} isEditable={useMyPrices} onChangePrice={(val) => handlePriceChange('breaker16A', val)} />
                  <ResultItem title="Автомат 10А, х-ка С (шт)" unit="шт." qty={estimatedData.breaker10AQty} price={prices.breaker10A} isEditable={useMyPrices} onChangePrice={(val) => handlePriceChange('breaker10A', val)} />
                  
                  {customMaterials.map(item => (
                    <ResultItem 
                      key={item.id} title={item.title} unit="ед." qty={item.qty} price={item.price} isEditable={true} isCustom={true}
                      onChangeTitle={(val) => updateCustomItem(setCustomMaterials, customMaterials, item.id, 'title', val)}
                      onChangeQty={(val) => updateCustomItem(setCustomMaterials, customMaterials, item.id, 'qty', val)}
                      onChangePrice={(val) => updateCustomItem(setCustomMaterials, customMaterials, item.id, 'price', val)}
                      onRemove={() => removeCustomItem(setCustomMaterials, customMaterials, item.id)}
                    />
                  ))}

                  <button onClick={() => addCustomItem(setCustomMaterials, customMaterials)} className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2 text-sm font-bold print:hidden">
                    <PlusCircle className="w-4 h-4" /> Добавить материал
                  </button>
                  
                  <div className="p-4 bg-muted/30 border border-border rounded-xl flex justify-between items-center print:px-2 print:border-none print:border-t-2 print:border-black print:rounded-none">
                    <span className="font-bold text-foreground">Подытог материалы:</span>
                    <span className="text-lg font-black text-foreground whitespace-nowrap">{totalMaterials.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                {includeWorks && (
                  <div className="space-y-3 mb-8 print:break-before-page">
                    <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest border-l-4 border-primary pl-3">Монтажные работы</h4>
                    
                    <div className="hidden md:grid md:grid-cols-12 print:grid print:grid-cols-12 gap-4 px-4 pb-2 border-b border-border print:px-0">
                      <div className="md:col-span-5 print:col-span-5 text-xs font-bold text-muted-foreground uppercase tracking-widest">Наименование работ</div>
                      <div className="md:col-span-3 print:col-span-3 text-xs font-bold text-muted-foreground uppercase tracking-widest pl-2 print:pl-0">Цена за ед.</div>
                      <div className="md:col-span-2 print:col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Кол-во</div>
                      <div className="md:col-span-2 print:col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">Итого</div>
                    </div>

                    <ResultItem title="Прокладка кабельных линий" unit="м." qty={estimatedWorks.cableRouting} price={workPrices.cableRouting} isEditable={true} onChangePrice={(val) => handleWorkPriceChange('cableRouting', val)} />
                    <ResultItem title="Монтаж установочных мест" unit="шт." qty={estimatedWorks.pointsInstall} price={workPrices.pointsInstall} isEditable={true} onChangePrice={(val) => handleWorkPriceChange('pointsInstall', val)} />
                    <ResultItem title="Сборка и монтаж щита" unit="мод." qty={estimatedWorks.shieldAssembly} price={workPrices.shieldAssembly} isEditable={true} onChangePrice={(val) => handleWorkPriceChange('shieldAssembly', val)} />
                    
                    {customWorks.map(item => (
                      <ResultItem 
                        key={item.id} title={item.title} unit="ед." qty={item.qty} price={item.price} isEditable={true} isCustom={true}
                        onChangeTitle={(val) => updateCustomItem(setCustomWorks, customWorks, item.id, 'title', val)}
                        onChangeQty={(val) => updateCustomItem(setCustomWorks, customWorks, item.id, 'qty', val)}
                        onChangePrice={(val) => updateCustomItem(setCustomWorks, customWorks, item.id, 'price', val)}
                        onRemove={() => removeCustomItem(setCustomWorks, customWorks, item.id)}
                      />
                    ))}

                    <button onClick={() => addCustomItem(setCustomWorks, customWorks)} className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2 text-sm font-bold print:hidden">
                      <PlusCircle className="w-4 h-4" /> Добавить работу
                    </button>

                    <div className="p-4 bg-muted/30 border border-border rounded-xl flex justify-between items-center print:px-2 print:border-none print:border-t-2 print:border-black print:rounded-none">
                      <span className="font-bold text-foreground">Подытог работы:</span>
                      <span className="text-lg font-black text-foreground whitespace-nowrap">{totalWorks.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                )}

                <div className="p-5 bg-primary/10 border-2 border-primary/20 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 print:px-2 print:bg-transparent print:border-none print:border-t-4 print:border-black print:rounded-none print:break-inside-avoid">
                  <span className="font-black text-xl text-foreground">ОБЩАЯ СУММА:</span>
                  <span className="text-3xl font-black text-primary whitespace-nowrap">{grandTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
              
              {/* === БЛОК ОШИБКИ И МАССИВНЫЕ КНОПКИ ДЕЙСТВИЙ (ВНИЗУ) === */}
              {pdfError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium animate-in fade-in print:hidden">
                  <span className="font-bold">⚠️ Функция скачивания PDF заблокирована вашим браузером.</span><br/>
                  Возможно, вы используете режим "Инкогнито" или встроенный браузер соцсети. Пожалуйста, откройте сайт в стандартном браузере (Chrome, Safari, Яндекс).
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 print:hidden">
                <button onClick={handlePdfDownload} className="w-full sm:flex-1 bg-muted hover:bg-muted/80 text-foreground font-black py-4 px-6 rounded-xl border border-border shadow-lg transition-colors flex items-center justify-center gap-3 text-base sm:text-lg">
                  <Download className="w-6 h-6" /> Скачать PDF
                </button>
                <button onClick={handleShare} className="w-full sm:flex-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-black py-4 px-6 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-3 text-base sm:text-lg">
                  <Share2 className="w-6 h-6" /> Поделиться
                </button>
              </div>
            </>
          )}
        </div>
      )}

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
              <a href={`https://t.me/share/url?url=&text=${encodeURIComponent(getShareText())}`} target="_blank" rel="noreferrer" onClick={() => setShowShareModal(false)} className="flex items-center gap-3 w-full p-4 bg-[#0088cc] text-white hover:bg-[#0088cc]/90 rounded-xl font-bold transition-colors shadow-md">
                <Send className="w-6 h-6" /> Telegram
              </a>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`} target="_blank" rel="noreferrer" onClick={() => setShowShareModal(false)} className="flex items-center gap-3 w-full p-4 bg-[#25D366] text-white hover:bg-[#25D366]/90 rounded-xl font-bold transition-colors shadow-md">
                <MessageCircle className="w-6 h-6" /> WhatsApp
              </a>
              <a href={`https://vk.com/share.php?url=https://voltpro.ru&title=Смета&comment=${encodeURIComponent(getShareText())}`} target="_blank" rel="noreferrer" onClick={() => setShowShareModal(false)} className="flex items-center gap-3 w-full p-4 bg-[#0077FF] text-white hover:bg-[#0077FF]/90 rounded-xl font-bold transition-colors shadow-md">
                <Users className="w-6 h-6" /> ВКонтакте
              </a>
              <a href={`max://share?text=${encodeURIComponent(getShareText())}`} target="_blank" rel="noreferrer" onClick={() => setShowShareModal(false)} className="flex items-center gap-3 w-full p-4 bg-purple-600 text-white hover:bg-purple-700 rounded-xl font-bold transition-colors shadow-md">
                <MessageSquare className="w-6 h-6" /> Мессенджер MAX
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ResultItem({ 
  title, unit, qty, price, isEditable, isCustom = false, 
  onChangePrice, onChangeTitle, onChangeQty, onRemove 
}: { 
  title: string, unit: string, qty: number, price: number, 
  isEditable: boolean, isCustom?: boolean, 
  onChangePrice: (val: number) => void, onChangeTitle?: (val: string) => void, 
  onChangeQty?: (val: number) => void, onRemove?: () => void 
}) {
  const total = qty * price

  return (
    <div className="flex flex-col md:grid md:grid-cols-12 print:grid print:grid-cols-12 gap-4 items-start md:items-center p-4 bg-background border border-border rounded-xl print:py-2 print:px-0 print:border-b print:border-t-0 print:border-l-0 print:border-r-0 print:rounded-none group relative print:break-inside-avoid">
      
      {isCustom && (
        <button onClick={onRemove} className="md:hidden absolute right-2 top-2 p-2 text-muted-foreground hover:text-red-500 print:hidden transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <div className="md:col-span-5 print:col-span-5 flex items-start md:items-center gap-3 w-full pr-8 md:pr-0">
        {!isCustom ? (
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 md:mt-0 print:hidden" />
        ) : (
          <button onClick={onRemove} className="hidden md:flex w-5 h-5 items-center justify-center text-muted-foreground hover:text-red-500 shrink-0 print:hidden transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        
        {isCustom ? (
          <div className="w-full">
            <input type="text" value={title} onChange={(e) => onChangeTitle && onChangeTitle(e.target.value)} placeholder="Введите название..." className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-1 text-sm font-medium text-foreground print:hidden placeholder:text-muted-foreground/50" />
            <span className="hidden print:inline font-medium text-sm text-foreground">{title || 'Без названия'}</span>
          </div>
        ) : (
          <span className="font-medium text-sm sm:text-base text-foreground leading-tight">{title}</span>
        )}
      </div>

      <div className="md:col-span-7 print:col-span-7 grid grid-cols-2 md:grid-cols-7 print:grid print:grid-cols-7 gap-y-3 gap-x-2 md:gap-4 items-center w-full mt-2 md:mt-0 pt-3 border-t border-border md:border-0 md:pt-0 print:border-0 print:pt-0">
        
        <div className="col-span-1 md:col-span-3 print:col-span-3 flex flex-col print:block">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden print:hidden mb-1">Цена</span>
          {isEditable ? (
            <div className="relative w-full max-w-[120px] print:hidden">
              <input type="number" value={price || ''} onChange={(e) => onChangePrice(Number(e.target.value))} placeholder="0" className="w-full bg-muted border border-border rounded-lg py-1.5 pl-2 pr-7 text-xs sm:text-sm font-bold focus:ring-1 focus:ring-primary outline-none transition-colors" />
              <span className="absolute right-2 top-1.5 text-xs text-muted-foreground">₽</span>
            </div>
          ) : (
            <span className="font-bold text-xs sm:text-sm mt-1 md:mt-0 print:block whitespace-nowrap">{price.toLocaleString('ru-RU')} ₽</span>
          )}
          {isEditable && (
             <span className="hidden print:block font-bold text-sm text-foreground whitespace-nowrap">
                {price.toLocaleString('ru-RU')} ₽
             </span>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 print:col-span-2 flex flex-col items-end md:items-center print:text-center print:block">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden print:hidden mb-1">Кол-во</span>
          {isCustom ? (
            <div className="flex items-center justify-end md:justify-center gap-1 print:hidden">
              <input type="number" value={qty || ''} onChange={(e) => onChangeQty && onChangeQty(Number(e.target.value))} placeholder="1" className="w-12 sm:w-16 bg-muted border border-border rounded-lg py-1 px-1 sm:px-2 text-xs sm:text-sm font-bold text-center focus:ring-1 focus:ring-primary outline-none" />
              <span className="text-xs sm:text-sm font-black">{unit}</span>
            </div>
          ) : (
            <span className="font-black text-xs sm:text-sm whitespace-nowrap mt-1 md:mt-0">{qty} {unit}</span>
          )}
          {isCustom && (
             <span className="hidden print:block font-black text-sm whitespace-nowrap">
                {qty} {unit}
             </span>
          )}
        </div>

        <div className="col-span-2 md:col-span-2 print:col-span-2 flex items-center justify-between md:flex-col md:items-end print:text-right print:block pt-2 border-t border-border/50 md:border-0 md:pt-0 print:border-0 print:pt-0">
          <span className="text-[10px] text-muted-foreground uppercase md:hidden print:hidden">Итого</span>
          <span className="font-black text-primary text-sm whitespace-nowrap">{total.toLocaleString('ru-RU')} ₽</span>
        </div>
      </div>
    </div>
  )
}
