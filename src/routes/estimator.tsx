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
      const response = await fetch('https://functions.yandexcloud.net/d4ea349ivafiequjv2fi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: description })
      });

      if (!response.ok) throw new Error('Yandex GPT не ответил JSON форматом');
      const data = await response.json();
      const cleanJsonString = data.result.replace(/```json/g, '').replace(/
