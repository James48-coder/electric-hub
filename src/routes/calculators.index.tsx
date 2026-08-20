import { createFileRoute, Link } from '@tanstack/react-router'
import { Calculator, Zap, Activity, Shield, TrendingDown, Anchor, AlertTriangle, Lightbulb, Lock, ChevronRight, Ruler, Network, Palette, CheckSquare, Layers, Settings } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/')({
  component: CalculatorsPage,
})

type Tariff = 'free' | 'master' | 'pro'

type CalcItem = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isPremium: boolean;
}

// Полный список всех 12 калькуляторов
const CALCULATORS: CalcItem[] = [
  // === БЕСПЛАТНЫЕ ИНСТРУМЕНТЫ (FREE) ===
  {
    id: 'load',
    title: 'Закон Ома и Нагрузки',
    description: 'Базовый расчет силы тока, напряжения и мощности для однофазных и трехфазных сетей.',
    icon: Zap,
    isPremium: false
  },
  {
    id: 'cable',
    title: 'Сечение кабеля',
    description: 'Подбор сечения медного и алюминиевого кабеля по ГОСТ в зависимости от нагрузки и типа прокладки.',
    icon: Activity,
    isPremium: false
  },
  {
    id: 'rcd',
    title: 'Номинал автомата и УЗО',
    description: 'Расчет защитной автоматики, токов утечки и выбор кривой отключения (B, C, D).',
    icon: Shield,
    isPremium: false
  },
  {
    id: 'colors',
    title: 'Цвета жил и маркировка',
    description: 'Справочник по цветовой и буквенно-цифровой идентификации проводников по ГОСТ Р 50462.',
    icon: Palette,
    isPremium: false
  },
  {
    id: 'gofra',
    title: 'Подбор гофры и труб',
    description: 'Расчет диаметра гофротрубы или ПНД трубы в зависимости от количества и сечения прокладываемых кабелей.',
    icon: CheckSquare,
    isPremium: false
  },
  {
    id: 'joints',
    title: 'Муфты и соединения',
    description: 'Подбор кабельных гильз, наконечников и термоусадочных муфт по сечению жилы.',
    icon: Layers,
    isPremium: false
  },
  {
    id: 'rj45',
    title: 'Распиновка RJ-45',
    description: 'Схемы обжима витой пары (прямой и перекрестный кабель) по стандартам T568A и T568B.',
    icon: Network,
    isPremium: false
  },

  // === ПЛАТНЫЕ ИНСТРУМЕНТЫ (MASTER / PRO) ===
  {
    id: 'voltage',
    title: 'Потери напряжения',
    description: 'Точный расчет падения напряжения на длинных кабельных трассах с учетом косинуса Фи.',
    icon: TrendingDown,
    isPremium: true
  },
  {
    id: 'grounding',
    title: 'Расчет контура заземления',
    description: 'Проектирование заземляющего устройства (модульно-штыревое, треугольник) по сопротивлению грунта.',
    icon: Anchor,
    isPremium: true
  },
  {
    id: 'dsup',
    title: 'Расчет ОСУП и ДСУП',
    description: 'Выбор сечения проводников для основной и дополнительной систем уравнивания потенциалов.',
    icon: AlertTriangle,
    isPremium: true
  },
  {
    id: 'light',
    title: 'Расчет освещенности',
    description: 'Подбор количества светильников по нормам СНиП в зависимости от площади и типа помещения.',
    icon: Lightbulb,
    isPremium: true
  },
  {
    id: 'capacitor',
    title: 'Расчет конденсаторов',
    description: 'Подбор рабочей и пусковой емкости для подключения трехфазного двигателя в однофазную сеть.',
    icon: Ruler,
    isPremium: true
  }
]

function CalculatorsPage() {
  const [tariff, setTariff] = useState<Tariff>('free')

  return (
    <div className="container mx-auto max-w-7xl animate-in fade-in duration-500 pb-24 relative">
      
      {/* ПАНЕЛЬ ТЕСТИРОВАНИЯ ТАРИФОВ (ОБНОВЛЕННЫЙ ДИЗАЙН) */}
      <div className="mb-8 p-4 bg-muted/30 border-2 border-border rounded-2xl flex flex-wrap items-center gap-4">
        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest w-full sm:w-auto mb-1 sm:mb-0 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
          <Settings className="w-4 h-4" /> Тест интерфейса:
        </span>
        
        <button 
          onClick={() => setTariff('free')} 
          className={`flex-1 sm:flex-none px-4 py-2.5 text-sm font-black rounded-xl transition-all duration-300 ${
            tariff === 'free' 
            ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30 scale-105' 
            : 'bg-background border-2 border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          Free (Базовый)
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
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
            <Calculator className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">Калькуляторы</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          Инженерные инструменты для точных расчетов по ГОСТ и ПУЭ. Профессиональные модули доступны на тарифах Master и PRO.
        </p>
      </div>

      {/* Сетка калькуляторов */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {CALCULATORS.map((calc, idx) => {
          const isLocked = calc.isPremium && tariff === 'free'
          
          return (
            <div 
              key={calc.id} 
              className={`bg-card border rounded-3xl p-6 sm:p-8 flex flex-col relative transition-all duration-300
                ${isLocked 
                  ? 'border-border opacity-75 grayscale-[0.3] shadow-sm' 
                  : 'border-border hover:border-primary/50 shadow-sm hover:shadow-md group'}
              `}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              
              {/* Плашка Премиума / Замок */}
              {calc.isPremium && (
                <div className="absolute top-6 right-6">
                  {isLocked ? (
                    <div className="bg-orange-500/10 text-orange-500 p-2 rounded-xl flex items-center gap-2 text-xs font-bold">
                      <Lock className="w-4 h-4" /> 
                    </div>
                  ) : (
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      PRO-инструмент
                    </div>
                  )}
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 transition-colors ${isLocked ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'}`}>
                <calc.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-black text-foreground mb-3 leading-tight pr-8">
                {calc.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                {calc.description}
              </p>

              {/* Кнопка действия */}
              {isLocked ? (
                <button className="w-full bg-orange-500/10 text-orange-600 border border-orange-500/20 px-4 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                  <Lock className="w-4 h-4 shrink-0" />
                  С тарифа Master
                </button>
              ) : (
                <Link 
                  to={`/calculators/${calc.id}`} 
                  className="w-full bg-background border border-border text-foreground group-hover:border-primary group-hover:text-primary px-4 py-3.5 rounded-xl text-sm font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Открыть расчет</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </Link>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
