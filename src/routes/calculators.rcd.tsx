import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ShieldAlert, Info, Zap, Shield, Activity, AlertTriangle } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/rcd')({
  component: RcdCalculatorPage,
})

function RcdCalculatorPage() {
  const [power, setPower] = useState('')
  const [voltage, setVoltage] = useState('220')
  const [lineType, setLineType] = useState('general')

  const calculate = () => {
    if (!power) return null
    const p = parseFloat(power.replace(',', '.'))
    if (isNaN(p) || p <= 0) return null

    // Расчетный ток
    const current = voltage === '220' ? (p * 1000) / 220 : (p * 1000) / (380 * 1.732)
    
    // Стандартные номиналы автоматов
    const breakers = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100]
    const breaker = breakers.find(b => b >= current) || 100

    // Номинал УЗО (на ступень выше автомата по ПУЭ для защиты контактов)
    const rcdRatings = [16, 25, 32, 40, 50, 63, 80, 100, 125]
    const rcdNominal = rcdRatings.find(r => r > breaker) || 125

    // Ток утечки и логика предупреждений
    let leakage = 30
    let rcdType = 'Тип A (реагирует на переменный и пульсирующий ток)'
    let notice = null

    if (lineType === 'wet') {
      if (current <= 16) {
        leakage = 10
      } else {
        leakage = 30
        notice = 'Мощность превышает 3.5 кВт. УЗО на 10 мА для таких токов найти сложно (выпускаются до 16 А). Выбран стандарт 30 мА. Рекомендуется разделить приборы на две отдельные линии.'
      }
    } else if (lineType === 'general') {
      leakage = 30
    } else if (lineType === 'fire') {
      leakage = 300
      rcdType = 'Тип S (Селективное, с задержкой срабатывания)'
    }

    return {
      current: current.toFixed(1),
      breaker,
      rcdNominal,
      leakage,
      rcdType,
      notice
    }
  }

  const result = calculate()

  // Наш фирменный стиль кнопок
  const activeClass = "bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 shadow-sm"
  const inactiveClass = "bg-background border-border text-muted-foreground hover:border-amber-500/50 hover:text-foreground"

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in fade-in duration-500 text-foreground pb-24">
      <Link to="/calculators" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Назад к инженерному набору
      </Link>

      <div className="bg-card border border-border rounded-[var(--radius)] shadow-sm overflow-hidden">
        <div className="border-b border-border p-6 bg-primary/5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Подбор УЗО / Диф. автомата</h1>
            <p className="text-sm text-muted-foreground mt-1">Выбор номинала и тока утечки дифференциальной защиты по ПУЭ гл. 7.1</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                Мощность нагрузки (кВт)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  placeholder="Например: 3.5"
                  className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium text-lg transition-all"
                />
                <span className="absolute right-4 top-3 text-muted-foreground font-medium">кВт</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Напряжение сети</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setVoltage('220')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${voltage === '220' ? activeClass : inactiveClass}`}
                >
                  220 В
                </button>
                <button
                  onClick={() => setVoltage('380')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${voltage === '380' ? activeClass : inactiveClass}`}
                >
                  380 В
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Назначение линии</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setLineType('wet')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${lineType === 'wet' ? activeClass : inactiveClass}`}
                >
                  Мокрая зона (Ванная, бойлер)
                </button>
                <button
                  onClick={() => setLineType('general')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${lineType === 'general' ? activeClass : inactiveClass}`}
                >
                  Обычные розетки / Свет
                </button>
                <button
                  onClick={() => setLineType('fire')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${lineType === 'fire' ? activeClass : inactiveClass}`}
                >
                  Вводное (Противопожарное)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-2xl p-6 border border-border flex flex-col justify-center">
            {!result ? (
              <div className="text-center text-muted-foreground space-y-3">
                <Info className="h-10 w-10 mx-auto opacity-20" />
                <p className="text-sm">Введите мощность линии для подбора аппарата защиты.</p>
              </div>
            ) : (
              <div className="space-y-4 animate-in zoom-in-95 duration-300">
                
                <div className="bg-primary/10 rounded-xl p-5 border border-primary/20 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Shield className="h-32 w-32 text-primary" />
                  </div>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2 relative z-10">Параметры УЗО</p>
                  
                  <div className="flex flex-col gap-1 relative z-10 mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-primary/80 font-medium w-32">Номинал:</span>
                      <span className="text-3xl font-black text-primary">{result.rcdNominal} А</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-primary/80 font-medium w-32">Ток утечки:</span>
                      <span className="text-3xl font-black text-primary">{result.leakage} мА</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-primary/20 relative z-10">
                    <p className="text-xs text-primary/80 font-bold uppercase mb-1">Рекомендуемый класс:</p>
                    <p className="text-sm text-primary font-medium">{result.rcdType}</p>
                  </div>
                </div>

                {/* Исправленный блок предупреждения с жестко заданным красным цветом */}
                {result.notice && (
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 shadow-sm flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0" />
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium leading-relaxed">
                      {result.notice}
                    </p>
                  </div>
                )}

                <div className="bg-background rounded-xl p-5 border border-border shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Защитный автомат</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-foreground">{result.breaker} А</span>
                      <span className="text-sm text-muted-foreground">(ток: {result.current} А)</span>
                    </div>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-500 opacity-20" />
                </div>

                <div className="bg-background rounded-xl p-4 border border-border shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                    <Activity className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    При установке Диф. автомата (RCBO), его номинал должен быть равен <strong className="text-foreground">{result.breaker} А</strong>.
                  </p>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
