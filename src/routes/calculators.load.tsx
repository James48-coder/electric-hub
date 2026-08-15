import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Calculator, Info, Zap, Activity, BatteryCharging } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/load')({
  component: LoadCalculatorPage,
})

function LoadCalculatorPage() {
  const [installedPower, setInstalledPower] = useState('')
  const [voltage, setVoltage] = useState('220')
  const [factor, setFactor] = useState('0.8')

  const calculate = () => {
    if (!installedPower) return null
    const p = parseFloat(installedPower.replace(',', '.'))
    const k = parseFloat(factor)
    
    if (isNaN(p) || p <= 0 || isNaN(k)) return null

    // Расчетная мощность = Установленная * Коэффициент спроса
    const pCalc = p * k
    
    // Расчетный ток
    const current = voltage === '220' ? (pCalc * 1000) / 220 : (pCalc * 1000) / (380 * 1.732)
    
    // Подбор вводного автомата (ближайший больший номинал)
    const breakers = [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250]
    const breaker = breakers.find(b => b >= current) || '>250'

    return {
      pCalc: pCalc.toFixed(1),
      current: current.toFixed(1),
      breaker
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
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Расчёт суммарной нагрузки</h1>
            <p className="text-sm text-muted-foreground mt-1">Определение реального тока и мощности с учетом коэффициента спроса по СП 256</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Левая колонка: Ввод данных */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                Суммарная (установленная) мощность
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={installedPower}
                  onChange={(e) => setInstalledPower(e.target.value)}
                  placeholder="Например: 15.5"
                  className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium text-lg transition-all"
                />
                <span className="absolute right-4 top-3 text-muted-foreground font-medium">кВт</span>
              </div>
              <p className="text-xs text-muted-foreground">Сумма мощностей всех электроприборов по паспорту.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Напряжение сети</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setVoltage('220')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${voltage === '220' ? activeClass : inactiveClass}`}
                >
                  220 В (1 фаза)
                </button>
                <button
                  onClick={() => setVoltage('380')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${voltage === '380' ? activeClass : inactiveClass}`}
                >
                  380 В (3 фазы)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex justify-between">
                <span>Коэффициент спроса (Кс)</span>
                <span className="text-amber-500 font-bold">{factor}</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.3"
                  max="1.0"
                  step="0.05"
                  value={factor}
                  onChange={(e) => setFactor(e.target.value)}
                  className="flex-1 accent-amber-500"
                />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                Рекомендации: Квартира без электроплиты (0.8 - 1.0), квартира с электроплитой (0.7 - 0.8), коттедж (0.6 - 0.8), офисы (0.7 - 0.9). Для 1-2 приборов Кс = 1.0.
              </p>
            </div>
          </div>

          {/* Правая колонка: Результат */}
          <div className="bg-muted/30 rounded-2xl p-6 border border-border flex flex-col justify-center">
            {!result ? (
              <div className="text-center text-muted-foreground space-y-3">
                <Info className="h-10 w-10 mx-auto opacity-20" />
                <p className="text-sm">Введите сумму мощностей всех приборов для расчета реальной нагрузки.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                
                <div className="bg-primary/10 rounded-xl p-5 border border-primary/20 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <BatteryCharging className="h-32 w-32 text-primary" />
                  </div>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2 relative z-10">Расчетная мощность</p>
                  <div className="flex items-baseline gap-2 relative z-10 mb-4">
                    <span className="text-5xl font-black text-primary">{result.pCalc}</span>
                    <span className="text-xl font-bold text-primary/70">кВт</span>
                  </div>
                  <div className="pt-3 border-t border-primary/20 relative z-10">
                    <p className="text-xs text-primary/80 font-bold uppercase mb-1">Расчетный ток:</p>
                    <p className="text-2xl font-black text-primary">{result.current} <span className="text-sm">А</span></p>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-5 border border-border shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Вводной автомат (номинал)</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-foreground">{result.breaker} А</span>
                    </div>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-500 opacity-20" />
                </div>

                <div className="bg-background rounded-xl p-4 border border-border shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                    <Activity className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    Сечение вводного кабеля и номинал главного автомата в щитке всегда выбираются по <strong>расчетной</strong>, а не по установленной мощности.
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
