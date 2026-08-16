import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Cable, Zap, Info, ShieldCheck } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/cable')({
  component: CableCalculatorPage,
})

function CableCalculatorPage() {
  const [power, setPower] = useState('')
  const [voltage, setVoltage] = useState('220')
  const [material, setMaterial] = useState('copper')

  const calculate = () => {
    if (!power) return null
    const p = parseFloat(power.replace(',', '.'))
    if (isNaN(p)) return null

    const current = voltage === '220' ? (p * 1000) / 220 : (p * 1000) / (380 * 1.73)
    
    let section = '1.5'
    let breaker = 10

    if (material === 'copper') {
      if (current > 40) { section = '10.0'; breaker = 50 }
      else if (current > 32) { section = '6.0'; breaker = 40 }
      else if (current > 25) { section = '4.0'; breaker = 32 }
      else if (current > 16) { section = '2.5'; breaker = 20 }
      else { section = '1.5'; breaker = 16 }
    } else {
      if (current > 32) { section = '10.0'; breaker = 40 }
      else if (current > 25) { section = '6.0'; breaker = 32 }
      else if (current > 16) { section = '4.0'; breaker = 20 }
      else { section = '2.5'; breaker = 16 }
    }

    return { 
      current: current.toFixed(1), 
      section, 
      breaker,
      powerFormatted: p.toFixed(1)
    }
  }

  const result = calculate()

  // Единый стиль для всех активных и неактивных кнопок-переключателей
  const activeClass = "bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 shadow-sm"
  const inactiveClass = "bg-background border-border text-muted-foreground hover:border-amber-500/50 hover:text-foreground"

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl animate-in fade-in duration-500 text-foreground pb-24">
      <Link to="/calculators" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Назад к инженерному набору
      </Link>

      <div className="bg-card border border-border rounded-[var(--radius)] shadow-sm overflow-hidden">
        {/* Адаптивная шапка карточки */}
        <div className="border-b border-border p-4 sm:p-6 bg-primary/5 flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-xl text-primary shrink-0 mt-1 sm:mt-0">
            <Cable className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">Сечение кабеля по мощности</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Подбор площади сечения жилы и номинала автоматического выключателя</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                Суммарная мощность нагрузки (кВт)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  placeholder="Например: 5.5"
                  className="w-full bg-background border border-border rounded-lg h-10 sm:h-12 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium text-base sm:text-lg transition-all"
                />
                <span className="absolute right-3 sm:right-4 top-2.5 sm:top-3 text-muted-foreground font-medium text-sm sm:text-base">кВт</span>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Напряжение сети</label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setVoltage('220')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${voltage === '220' ? activeClass : inactiveClass}`}
                >
                  220 В (1 фаза)
                </button>
                <button
                  onClick={() => setVoltage('380')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${voltage === '380' ? activeClass : inactiveClass}`}
                >
                  380 В (3 фазы)
                </button>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Материал жил</label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setMaterial('copper')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${material === 'copper' ? activeClass : inactiveClass}`}
                >
                  Медь (Cu)
                </button>
                <button
                  onClick={() => setMaterial('aluminum')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${material === 'aluminum' ? activeClass : inactiveClass}`}
                >
                  Алюминий (Al)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 border border-border flex flex-col justify-center">
            {!result ? (
              <div className="text-center text-muted-foreground space-y-3 py-6 sm:py-0">
                <Info className="h-8 w-8 sm:h-10 sm:w-10 mx-auto opacity-20" />
                <p className="text-xs sm:text-sm px-4">Введите мощность нагрузки, чтобы увидеть результаты расчета.</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6 animate-in zoom-in-95 duration-300">
                
                <div className="bg-background rounded-xl p-3 sm:p-4 border border-border shadow-sm flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Расчетный ток</p>
                    <p className="text-xl sm:text-2xl font-black text-foreground">{result.current} <span className="text-sm sm:text-lg text-muted-foreground">А</span></p>
                  </div>
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 opacity-20 shrink-0" />
                </div>

                <div className="bg-primary/10 rounded-xl p-4 sm:p-5 border border-primary/20 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Cable className="h-24 w-24 sm:h-32 sm:w-32 text-primary" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider mb-1 sm:mb-2 relative z-10">Рекомендуемое сечение</p>
                  <div className="flex items-baseline gap-1 sm:gap-2 relative z-10">
                    <span className="text-4xl sm:text-5xl font-black text-primary">{result.section}</span>
                    <span className="text-lg sm:text-xl font-bold text-primary/70">мм²</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary/80 mt-2 sm:mt-3 relative z-10 font-medium">
                    Кабель: ВВГнг(А)-LS {voltage === '220' ? '3' : '5'}x{result.section}
                  </p>
                </div>

                <div className="bg-background rounded-xl p-3 sm:p-4 border border-border shadow-sm flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Автоматический выключатель</p>
                    <p className="text-lg sm:text-xl font-black text-foreground">{result.breaker} <span className="text-xs sm:text-base text-muted-foreground">А (хар-ка C)</span></p>
                  </div>
                  <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 opacity-20 shrink-0" />
                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
