import { createFileRoute } from '@tanstack/react-router'
import { Bot, MapPin, Home as HomeIcon, Ruler, Settings, Lock, Sparkles, Loader2, FileText, Download, CheckCircle2, ChevronDown, AlertTriangle, Share2, X, Send, MessageCircle, Users, MessageSquare, PlusCircle, Trash2 } from 'lucide-react'
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

  const [prices, setPrices] = useState({ ...DEFAULT_PRICES })
  const [workPrices, setWorkPrices] = useState({ ...DEFAULT_WORK_PRICES })

  const [customMaterials, setCustomMaterials] = useState<any[]>([])
  const [customWorks, setCustomWorks] = useState<any[]>([])

  // === ПОДТЯГИВАНИЕ ЦЕН ИЗ ПРОФИЛЯ (LOCALSTORAGE) ===
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

  // === БОЕВАЯ ГЕНЕРАЦИЯ СМЕТЫ ЧЕРЕЗ ИИ ===
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setShowResult(false)
    setPdfError(false)

    // 1. Страховочные расчеты (на случай падения интернета или отказа API)
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

    // 2. Жесткий промпт для YandexGPT с требованием вернуть только JSON
    const aiPrompt = `Ты профессиональный сметчик-электромонтажник. 
Рассчитай необходимое количество материалов по ПУЭ-7.
Объект: ${roomType}, Площадь: ${area} м², Вводные: ${description}.
ЗАПРЕЩЕНО использовать кабели ПВС/ШВВП. ОБЯЗАТЕЛЬНО УЗО на розетки.

ВЕРНИ ТОЛЬКО JSON ОБЪЕКТ со следующими ключами и числовыми значениями (без текста, без форматирования markdown):
{
  "cable3x25": количество_метров,
  "cable3x15": количество_метров,
  "rcdQty": количество_штук,
  "breaker16AQty": количество_штук,
  "breaker10AQty": количество_штук
}`

    try {
      // 3. Запрос к нашей защищенной функции на Yandex Cloud
      const response = await fetch('https://functions.yandexcloud.net/d4ea349ivafiequjv2fi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: aiPrompt })
      });

      if (!response.ok) throw new Error('Ошибка ответа сервера Яндекса');

      const data = await response.json();
      
      // Очищаем ответ нейросети от случайных символов (```json)
      const cleanJsonString = data.result.replace(/
