import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Sigma, Info, AlertTriangle, Shield } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/grounding')({
  component: GroundingCalculatorPage,
})

function GroundingCalculatorPage() {
  const [soil, setSoil] = useState('loam')
  const [length, setLength] = useState('3')
  const [diameter, setDiameter] = useState('16')
  const [count, setCount] = useState('3')

  const calculate = () => {
    const L = parseFloat(length)
    const d = parseFloat(diameter) / 1000 
    const n = parseInt(count)

    const soilResistivity: Record<string, number> = {
      clay: 40,
      loam: 100,
      sand: 500
    }
    const rho = soilResistivity[soil]

    const R1 = (rho / (2 * Math.PI * L)) * Math.log((2 * L) / d)

    let eta = 1
    if (n === 2) eta = 0.85
    if (n >= 3 && n <= 5) eta = 0.7
    if (n > 5) eta = 0.6

    const R_total = R1 / (n * eta)

    const isExcellent = R_total <= 4
    const isAcceptable = R_total > 4 && R_total <= 30

    return {
      resistance: R_total.toFixed(2),
      single: R1.toFixed(2),
      isExcellent,
      isAcceptable
    }
  }

  const result = calculate()

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
            <Sigma className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">Расчёт контура заземления</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Определение сопротивления растеканию тока для вертикальных электродов</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Левая колонка: Ввод данных */}
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Тип грунта</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSoil('clay')}
                  className={`h-10 sm:h-12 rounded-lg border text-[10px] sm:text-sm font-bold transition-all duration-300 ${soil === 'clay' ? activeClass : inactiveClass}`}
                >
                  Глина
                </button>
                <button
                  onClick={() => setSoil('loam')}
                  className={`h-10 sm:h-12 rounded-lg border text-[10px] sm:text-sm font-bold transition-all duration-300 ${soil === 'loam' ? activeClass : inactiveClass}`}
                >
                  Суглинок
                </button>
                <button
                  onClick={() => setSoil('sand')}
                  className={`h-10 sm:h-12 rounded-lg border text-[10px] sm:text-sm font-bold transition-all duration-300 ${soil === 'sand' ? activeClass : inactiveClass}`}
                >
                  Песок
                </button>
              </div>
            </div>

            {/* Блоки Длина и Диаметр перестраиваются в колонку на мобилках */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm font-bold text-foreground">Длина штыря</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setLength('2')}
                    className={`h-10 sm:h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${length === '2' ? activeClass : inactiveClass}`}
                  >
                    2 м
                  </button>
                  <button
                    onClick={() => setLength('3')}
                    className={`h-10 sm:h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${length === '3' ? activeClass : inactiveClass}`}
                  >
                    3 м
                  </button>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm font-bold text-foreground">Диаметр</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDiameter('16')}
                    className={`h-10 sm:h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${diameter === '16' ? activeClass : inactiveClass}`}
                  >
                    16 мм
                  </button>
                  <button
                    onClick={() => setDiameter('20')}
                    className={`h-10 sm:h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${diameter === '20' ? activeClass : inactiveClass}`}
                  >
                    20 мм
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Количество электродов (шт)</label>
              <div className="flex items-center gap-3 sm:gap-4">
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="flex-1 accent-amber-500"
                />
                <div className="w-14 sm:w-16 h-10 sm:h-12 bg-background border border-border rounded-lg flex items-center justify-center font-bold text-foreground shadow-sm text-sm sm:text-base">
                  {count}
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка: Результат */}
          <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 border border-border flex flex-col justify-start sm:justify-center">
            <div className="space-y-4 sm:space-y-6 animate-in zoom-in-95 duration-300">
              
              <div className={`rounded-xl p-4 sm:p-5 border shadow-sm relative overflow-hidden ${
                result.isExcellent ? 'bg-green-500/10 border-green-500/20' : 
                result.isAcceptable ? 'bg-amber-500/10 border-amber-500/20' : 'bg-destructive/10 border-destructive/20'
              }`}>
                <div className="flex justify-between items-start mb-4 relative z-10 gap-2">
                  <div>
                    <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1 ${
                      result.isExcellent ? 'text-green-600 dark:text-green-400' : 
                      result.isAcceptable ? 'text-amber-600 dark:text-amber-400' : 'text-destructive'
                    }`}>
                      Общее сопротивление
                    </p>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className={`text-4xl sm:text-5xl font-black ${
                        result.isExcellent ? 'text-green-600 dark:text-green-400' : 
                        result.isAcceptable ? 'text-amber-600 dark:text-amber-400' : 'text-destructive'
                      }`}>
                        {result.resistance}
                      </span>
                      <span className={`text-lg sm:text-xl font-bold opacity-70 ${
                        result.isExcellent ? 'text-green-600 dark:text-green-400' : 
                        result.isAcceptable ? 'text-amber-600 dark:text-amber-400' : 'text-destructive'
                      }`}>
                        Ом
                      </span>
                    </div>
                  </div>
                  {result.isExcellent ? (
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 shrink-0" />
                  ) : (
                    <AlertTriangle className={`h-6 w-6 sm:h-8 sm:w-8 shrink-0 ${result.isAcceptable ? 'text-amber-500' : 'text-destructive'}`} />
                  )}
                </div>
                
                {/* Строка перестраивается на мобилке */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-border/50 pt-3 sm:pt-4 mt-2 relative z-10 gap-1 sm:gap-0">
                  <span className="text-xs sm:text-sm font-medium text-foreground">Сопротивление одного штыря:</span>
                  <span className="text-sm sm:text-base font-bold text-foreground">{result.single} Ом</span>
                </div>
              </div>

              <div className="bg-background rounded-xl p-3 sm:p-4 border border-border shadow-sm flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5 sm:mt-0">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-foreground font-bold leading-tight">Оценка по ПУЭ (гл. 1.7):</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                    {result.isExcellent 
                      ? 'Отлично (≤ 4 Ом). Подходит для источника 380/220В.' 
                      : result.isAcceptable 
                      ? 'Норма для повторного заземления PEN-проводника (до 30 Ом). Для источника 380/220В нужно снизить сопротивление (добавить электроды).' 
                      : 'Внимание! Сопротивление превышает 30 Ом. Требуется увеличить длину или количество заземлителей.'}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
