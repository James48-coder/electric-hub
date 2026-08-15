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
    const d = parseFloat(diameter) / 1000 // перевод мм в метры
    const n = parseInt(count)

    // Удельное сопротивление грунта (Ом*м)
    const soilResistivity: Record<string, number> = {
      clay: 40,
      loam: 100,
      sand: 500
    }
    const rho = soilResistivity[soil]

    // Сопротивление одного одиночного стержня
    // Формула: R1 = rho / (2 * PI * L) * ln(2L / d)
    const R1 = (rho / (2 * Math.PI * L)) * Math.log((2 * L) / d)

    // Коэффициент использования (примерный для контура в ряд/треугольник)
    let eta = 1
    if (n === 2) eta = 0.85
    if (n >= 3 && n <= 5) eta = 0.7
    if (n > 5) eta = 0.6

    // Общее сопротивление контура
    const R_total = R1 / (n * eta)

    // Норма по ПУЭ (до 4 Ом для 380/220В, до 30 Ом для повторного заземления)
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
            <Sigma className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Расчёт контура заземления</h1>
            <p className="text-sm text-muted-foreground mt-1">Определение сопротивления растеканию тока для вертикальных электродов</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Левая колонка: Ввод данных */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Тип грунта</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSoil('clay')}
                  className={`h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${soil === 'clay' ? activeClass : inactiveClass}`}
                >
                  Глина
                </button>
                <button
                  onClick={() => setSoil('loam')}
                  className={`h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${soil === 'loam' ? activeClass : inactiveClass}`}
                >
                  Суглинок
                </button>
                <button
                  onClick={() => setSoil('sand')}
                  className={`h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${soil === 'sand' ? activeClass : inactiveClass}`}
                >
                  Песок
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">Длина штыря</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setLength('2')}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${length === '2' ? activeClass : inactiveClass}`}
                  >
                    2 м
                  </button>
                  <button
                    onClick={() => setLength('3')}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${length === '3' ? activeClass : inactiveClass}`}
                  >
                    3 м
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">Диаметр</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDiameter('16')}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${diameter === '16' ? activeClass : inactiveClass}`}
                  >
                    16 мм
                  </button>
                  <button
                    onClick={() => setDiameter('20')}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${diameter === '20' ? activeClass : inactiveClass}`}
                  >
                    20 мм
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex justify-between">
                <span>Количество электродов (шт)</span>
                <span className="text-primary">{count}</span>
              </label>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Правая колонка: Результат */}
          <div className="bg-muted/30 rounded-2xl p-6 border border-border flex flex-col justify-center">
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className={`rounded-xl p-5 border shadow-sm relative overflow-hidden ${
                result.isExcellent ? 'bg-green-500/10 border-green-500/20' : 
                result.isAcceptable ? 'bg-amber-500/10 border-amber-500/20' : 'bg-destructive/10 border-destructive/20'
              }`}>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                      result.isExcellent ? 'text-green-600 dark:text-green-400' : 
                      result.isAcceptable ? 'text-amber-600 dark:text-amber-400' : 'text-destructive'
                    }`}>
                      Общее сопротивление
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-black ${
                        result.isExcellent ? 'text-green-600 dark:text-green-400' : 
                        result.isAcceptable ? 'text-amber-600 dark:text-amber-400' : 'text-destructive'
                      }`}>
                        {result.resistance}
                      </span>
                      <span className={`text-xl font-bold opacity-70 ${
                        result.isExcellent ? 'text-green-600 dark:text-green-400' : 
                        result.isAcceptable ? 'text-amber-600 dark:text-amber-400' : 'text-destructive'
                      }`}>
                        Ом
                      </span>
                    </div>
                  </div>
                  {result.isExcellent ? (
                    <Shield className="h-8 w-8 text-green-500" />
                  ) : (
                    <AlertTriangle className={`h-8 w-8 ${result.isAcceptable ? 'text-amber-500' : 'text-destructive'}`} />
                  )}
                </div>
                
                <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-2 relative z-10">
                  <span className="text-sm font-medium text-foreground">Сопротивление одного штыря:</span>
                  <span className="font-bold text-foreground">{result.single} Ом</span>
                </div>
              </div>

              <div className="bg-background rounded-xl p-4 border border-border shadow-sm">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 h-fit">
                    <Info className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-foreground font-bold">Оценка по ПУЭ (гл. 1.7):</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
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
    </div>
  )
}
