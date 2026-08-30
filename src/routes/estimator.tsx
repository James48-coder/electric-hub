import { createFileRoute } from '@tanstack/react-router'
import { Bot, MapPin, Home as HomeIcon, Ruler, Settings, Lock, Sparkles, Loader2, FileText, Download, CheckCircle2, ChevronDown, AlertTriangle, Share2, X, Send, MessageCircle, Users, MessageSquare, PlusCircle, Trash2, Info } from 'lucide-react'
import React, { useState, useEffect } from 'react'

export const Route = createFileRoute('/estimator')({
  component: EstimatorPage,
})

type Tariff = 'free' | 'master' | 'pro'

// === БАЗОВЫЕ (РЕГИОНАЛЬНЫЕ) ЦЕНЫ ПО УМОЛЧАНИЮ ===
const DEFAULT_PRICES = {
  cable3x25: 85, cable3x15: 65, rcd: 2500, breaker16A: 350, breaker10A: 350,
}
const DEFAULT_WORK_PRICES = {
  cableRouting: 150, pointsInstall: 450, shieldAssembly: 500,
}

function EstimatorPage() {
  const [tariff, setTariff] = useState<Tariff>('free')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  
  const [showShareModal, setShowShareModal] = useState(false)
  const [pdfError, setPdfError] = useState(false)

  const [region, setRegion] = useState('')
  const [roomType, setRoomType] = useState('Квартира (Новостройка)')
  const [area, setArea] = useState<number>(65)
  const [description, setDescription] = useState('Квартира 65 кв м- зал, спальня, кухня, коридор, туалет, ванна, 3 одноклавишных выкл, 3 двухклавишных, 15 розеток, 3 люстры, 2 светильника IP-65, 20 распаечных коробок, счетчик, щиток на 12 модулей, ЯТП-12v')
  
  const [useMyPrices, setUseMyPrices] = useState(false)
  const [includeWorks, setIncludeWorks] = useState(false)

  const [estimatedData, setEstimatedData] = useState({
    cable3x25: 0, cable3x15: 0, rcdQty: 0, breaker16AQty: 0, breaker10AQty: 0,
  })
  
  const [estimatedWorks, setEstimatedWorks] = useState({
    cableRouting: 0, pointsInstall: 0, shieldAssembly: 0
  })

  const [prices, setPrices] = useState({ ...DEFAULT_PRICES })
  const [workPrices, setWorkPrices] = useState({ ...DEFAULT_WORK_PRICES })

  const [customMaterials, setCustomMaterials] = useState<any[]>([])
  const [customWorks, setCustomWorks] = useState<any[]>([])

  // === ПОДТЯГИВАНИЕ ЦЕН ИЗ ПРОФИЛЯ ===
  useEffect(() => {
    if (useMyPrices) {
      const saved = localStorage.getItem('voltpro_prices')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setPrices({
            cable3x25: parsed.cable3x25 || DEFAULT_PRICES.cable3x25,
            cable3x15: parsed.cable3x15 || DEFAULT_PRICES.cable3x15,
            rcd: parsed.rcd || DEFAULT_PRICES.rcd,
            breaker16A: parsed.breaker16A || DEFAULT_PRICES.breaker16A,
            breaker10A: parsed.breaker10A || DEFAULT_PRICES.breaker10A,
          })
          setWorkPrices({
            cableRouting: parsed.cableRouting || DEFAULT_WORK_PRICES.cableRouting,
            pointsInstall: parsed.pointsInstall || DEFAULT_WORK_PRICES.pointsInstall,
            shieldAssembly: parsed.shieldAssembly || DEFAULT_WORK_PRICES.shieldAssembly,
          })
        } catch (e) {
          console.error('Ошибка чтения прайса', e)
        }
      }
    } else {
      setPrices({ ...DEFAULT_PRICES })
      setWorkPrices({ ...DEFAULT_WORK_PRICES })
    }
  }, [useMyPrices])

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

  // === БОЕВАЯ ГЕНЕРАЦИЯ СО СМАРТ-ПАРСЕРОМ ТЕКСТА ===
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setShowResult(false)
    setPdfError(false)

    // Умный локальный алгоритм (на случай если Яндекс затупит)
    const text = description.toLowerCase()
    
    // Считаем точки
    const socketsCount = parseInt(text.match(/(\d+)\s*розет/)?.[1] || "0", 10) || Math.max(1, Math.ceil(area / 6))
    const switchesOneGang = parseInt(text.match(/(\d+)\s*одноклавиш/)?.[1] || "0", 10)
    const switchesTwoGang = parseInt(text.match(/(\d+)\s*двухклавиш/)?.[1] || "0", 10)
    const totalSwitches = (switchesOneGang + switchesTwoGang) || parseInt(text.match(/(\d+)\s*выкл/)?.[1] || "0", 10) || 1
    const lightsCount = parseInt(text.match(/(\d+)\s*люстр/)?.[1] || "0", 10) + parseInt(text.match(/(\d+)\s*светил/)?.[1] || "0", 10) || Math.max(1, Math.ceil(area / 5))

    // Считаем кабель и автоматы
    const calcCable3x25 = Math.round(15 + (socketsCount * 3.5) + (area * 0.2)) 
    const calcCable3x15 = Math.round(15 + (totalSwitches * 3.5) + (lightsCount * 2.5) + (area * 0.15))
    const calcAutomat16A = Math.max(1, Math.ceil(socketsCount / 4))
    const calcAutomat10A = Math.max(1, Math.ceil(lightsCount / 8))
    
    // Адекватный расчет УЗО (1 УЗО на 3 автомата розеточных групп)
    const calcRcd = Math.max(1, Math.ceil(calcAutomat16A / 3))

    // Умный парсинг дополнительных материалов прямо из текста
    const smartCustomMaterials = []
    const modMatch = text.match(/(\d+)\s*модул/)
    if (text.includes('щит') || text.includes('бокс')) {
      smartCustomMaterials.push({ id: 'fb1', title: `Щит распределительный (на ${modMatch ? modMatch[1] : '12'} мод.)`, qty: 1, price: 0 })
    }
    if (text.includes('ятп')) {
      smartCustomMaterials.push({ id: 'fb2', title: 'ЯТП 220/12В', qty: 1, price: 0 })
    }
    if (text.includes('счетчик') || text.includes('счётчик')) {
      smartCustomMaterials.push({ id: 'fb3', title: 'Счетчик электроэнергии', qty: 1, price: 0 })
    }
    const boxMatch = text.match(/(\d+)\s*распаечн/)
    if (boxMatch || text.includes('коробк')) {
      smartCustomMaterials.push({ id: 'fb4', title: 'Распаечная коробка', qty: boxMatch ? parseInt(boxMatch[1]) : 5, price: 0 })
    }
    const ip65Match = text.match(/(\d+)\s*светил[а-я]*\s*ip-?65/i)
    if (text.includes('ip65') || text.includes('ip-65')) {
      smartCustomMaterials.push({ id: 'fb5', title: 'Светильник влагозащищенный IP65', qty: ip65Match ? parseInt(ip65Match[1]) : 2, price: 0 })
    }

    try {
      // Пытаемся спросить Яндекс
      const response = await fetch('[https://functions.yandexcloud.net/d4ea349ivafiequjv2fi](https://functions.yandexcloud.net/d4ea349ivafiequjv2fi)', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: description })
      });

      if (!response.ok) throw new Error('Yandex GPT не ответил JSON форматом');
      const data = await response.json();
      
      // ИСПРАВЛЕННАЯ СТРОКА: Убрали глючные регулярки, используем безопасный split
      const cleanJsonString = data.result.split('```json').join('').split('```').join('').trim();
      
      const aiResult = JSON.parse(cleanJsonString);

      // Если Яндекс ответил - берем его, если он забыл доп. материалы - подкидываем наши умные
      setEstimatedData({ 
        cable3x25: aiResult.cable3x25 || calcCable3x25, 
        cable3x15: aiResult.cable3x15 || calcCable3x15, 
        rcdQty: aiResult.rcdQty || calcRcd, 
        breaker16AQty: aiResult.breaker16AQty || calcAutomat16A, 
        breaker10AQty: aiResult.breaker10AQty || calcAutomat10A 
      });

      const finalCustom = (aiResult.additionalMaterials && aiResult.additionalMaterials.length > 0) 
        ? aiResult.additionalMaterials.map((item: any, i: number) => ({ id: 'ai'+i, title: item.title, qty: item.qty, price: 0 }))
        : smartCustomMaterials;

      setCustomMaterials(finalCustom);

      setEstimatedWorks({
        cableRouting: (aiResult.cable3x25 || calcCable3x25) + (aiResult.cable3x15 || calcCable3x15),
        pointsInstall: socketsCount + totalSwitches + lightsCount,
        shieldAssembly: (aiResult.breaker16AQty || calcAutomat16A) + (aiResult.breaker10AQty || calcAutomat10A) + (aiResult.rcdQty || calcRcd)
      });

    } catch (error) {
      console.warn("Сработал умный локальный алгоритм защиты от сбоев ИИ");
      
      // Включаем умную математику
      setEstimatedData({ cable3x25: calcCable3x25, cable3x15: calcCable3x15, rcdQty: calcRcd, breaker16AQty: calcAutomat16A, breaker10AQty: calcAutomat10A });
      setCustomMaterials(smartCustomMaterials);
      setEstimatedWorks({
        cableRouting: calcCable3x25 + calcCable3x15,
        pointsInstall: socketsCount + totalSwitches + lightsCount,
        shieldAssembly: calcAutomat16A + calcAutomat10A + calcRcd
      });
    } finally {
      setCustomWorks([]);
      setIsGenerating(false);
      setShowResult(true);
    }
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
    text += `• Кабель ВВГнг(А)-LS 3x2.5: ${estimatedData.cable3x25} м. = ${estimatedData.cable3x25 * prices.cable3x25} ₽\n`
    text += `• Кабель ВВГнг(А)-LS 3x1.5: ${estimatedData.cable3x15} м. = ${estimatedData.cable3x15 * prices.cable3x15} ₽\n`
    text += `• УЗО 40А 30мА: ${estimatedData.rcdQty} шт. = ${estimatedData.rcdQty * prices.rcd} ₽\n`
    text += `• Автомат 16А: ${estimatedData.breaker16AQty} шт. = ${estimatedData.breaker16AQty * prices.breaker16A} ₽\n`
    text += `• Автомат 10А: ${estimatedData.breaker10AQty} шт. = ${estimatedData.breaker10AQty * prices.breaker10A} ₽\n`
    customMaterials.forEach(m => {
      if(m.title) text += `• ${m.title}: ${m.qty} ед. = ${m.qty * m.price} ₽\n`
    })
    text += `Итого материалы: ${totalMaterials.toLocaleString('ru-RU')} ₽\n\n`

    if (includeWorks) {
      text += `🛠 РАБОТЫ:\n`
      text += `• Прокладка линий: ${estimatedWorks.cableRouting} м. = ${estimatedWorks.cableRouting * workPrices.cableRouting} ₽\n`
      text += `• Монтаж точек: ${estimatedWorks.pointsInstall} шт. = ${estimatedWorks.pointsInstall * workPrices.pointsInstall} ₽\n`
      text += `• Сборка щита: ${estimatedWorks.shieldAssembly} мод. = ${estimatedWorks.shieldAssembly * workPrices.shieldAssembly} ₽\n`
      customWorks.forEach(w => {
        if(w.title) text += `• ${w.title}: ${w.qty} ед. = ${w.qty * w.price} ₽\n`
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
            @page { margin: 10mm; }
            html, body, #root { background-color: white !important; height: auto !important; }
            #print-section { background-color: white !important; border: none !important; box-shadow: none !important; overflow: visible !important; padding: 0 !important; }
            #print-section * { color: black !important; border-color: #d1d5db !important; }
            #print-section div { background-color: transparent !important; }
            input::placeholder { color: transparent !important; }
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
          <div className="bg-card border border-border rounded-3xl p-4 sm:p-8 shadow-sm print:hidden">
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Регион / Город</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><MapPin className="h-5 w-5 text-muted-foreground" /></div>
                    <input type="text" required value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Например: Тверь" className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Тип помещения</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><HomeIcon className="h-5 w-5 text-muted-foreground" /></div>
                    <select required value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full pl-12 pr-10 py-3.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none appearance-none cursor-pointer">
                      <option value="Квартира (Новостройка)">Квартира (Новостройка)</option>
                      <option value="Квартира (Вторичка)">Квартира
