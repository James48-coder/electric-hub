import { createFileRoute } from '@tanstack/react-router'
import { Calculator, Zap, Activity, Shield, TrendingDown, Anchor, AlertTriangle, Lightbulb, Lock, ChevronRight, Ruler } from 'lucide-react'
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

// Список всех калькуляторов с флагом премиума
const CALCULATORS: CalcItem[] = [
  {
    id: 'power',
    title: 'Закон Ома (Ток и Мощность)',
    description: 'Базовый расчет силы тока, напряжения и мощности для однофазных и трехфазных сетей.',
    icon: Zap,
    isPremium: false
  },
  {
    id: 'cable',
    title: 'Сечение кабеля по мощности',
    description: 'Подбор сечения медного и алюминиевого кабеля по ГОСТ в зависимости от нагрузки и типа прокладки.',
    icon: Activity,
    isPremium: false
  },
  {
    id: 'breaker',
    title: 'Номинал автомата и УЗО',
    description: 'Расчет защитной автоматики, токов утечки и выбор кривой отключения (B, C, D).',
    icon: Shield,
    isPremium: false
  },
  {
    id: 'voltage-drop',
    title: 'Потери напряжения',
    description: 'Точный расчет падения напряжения на длинных кабельных трассах с учетом косинуса Фи.',
    icon: TrendingDown,
    isPremium: true // ПЛАТНЫЙ
  },
  {
    id: 'grounding',
    title: 'Расчет контура заземления',
    description: 'Проектирование заземляющего устройства (модульно-штыревое, треугольник) по сопротивлению грунта.',
    icon: Anchor,
    isPremium: true // ПЛАТНЫЙ
  },
  {
    id: 'short-circuit',
    title: 'Токи короткого замыкания (ТКЗ)',
    description: 'Расчет однофазного и трехфазного КЗ для проверки срабатывания электромагнитного расцепителя.',
    icon: AlertTriangle,
    isPremium: true // ПЛАТНЫЙ
  },
  {
    id: 'lighting',
    title: 'Расчет освещенности',
    description: 'Подбор количества светильников по нормам СНиП в зависимости от площади и типа помещения.',
    icon: Lightbulb,
    isPremium: true // ПЛАТНЫЙ
  },
  {
    id: 'layout',
    title: 'Расход кабеля на квартиру',
    description: 'Черновой просчет метража розеточных и осветительных групп по площади помещения.',
    icon: Ruler,
    isPremium: false
  }
]

function CalculatorsPage() {
  const [tariff, setTariff] = useState<Tariff>('free')

  return (
    <div className="container mx-auto max-w-6xl animate-in fade-in duration-500 pb-24 relative">
      
      {/* 🛠 ПАНЕЛЬ ТЕСТИРОВАНИЯ ТАРИФОВ */}
      <div className="mb-8 p-4 bg-muted/50 border border-border rounded-xl flex items-center gap-4 overflow-x-auto">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Тест интерфейса:</span>
        <button onClick={() => setTariff('free')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${tariff === 'free' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>Free (Базовый)</button>
        <button onClick={() => setTariff('master')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${tariff === 'master' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>Master</button>
        <button onClick={() => setTariff('pro')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${tariff === 'pro' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}>PRO</button>
      </div>

      {/* Шапка */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
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
                  ? 'border-border opacity-75 grayscale-[0.3] hover:grayscale-0 shadow-sm' 
                  : 'border-border hover:border-primary/50 shadow-sm hover:shadow-md cursor-pointer group'}
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

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${isLocked ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'}`}>
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
                <button className="w-full bg-orange-500/10 text-orange-600 border border-orange-500/20 px-4 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-colors">
                  <Lock className="w-4 h-4 shrink-0" />
                  С тарифа Master
                </button>
              ) : (
                <button className="w-full bg-background border border-border text-foreground group-hover:border-primary group-hover:text-primary px-4 py-3.5 rounded-xl text-sm font-bold flex items-center justify-between transition-colors">
                  <span>Открыть расчет</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}
