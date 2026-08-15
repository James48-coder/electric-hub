import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, CircleDashed, Info, CheckCircle2, AlertTriangle, ScrollText } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/gofra')({
  component: GofraCalculatorPage,
})

function GofraCalculatorPage() {
  const [diameter, setDiameter] = useState('')
  const [count, setCount] = useState('1')

  // База стандартных гофрированных труб (внешний и примерный внутренний диаметр в мм)
  const pipes = [
    { outer: 16, inner: 10.7 },
    { outer: 20, inner: 14.1 },
    { outer: 25, inner: 18.3 },
    { outer: 32, inner: 24.5 },
    { outer: 40, inner: 31.2 },
    { outer: 50, inner: 39.6 },
    { outer: 63, inner: 50.0 },
  ]

  const calculate = () => {
    if (!diameter || !count) return null
    const d = parseFloat(diameter.replace(',', '.'))
    const c = parseInt(count)
    
    if (isNaN(d) || isNaN(c) || d <= 0 || c <= 0) return null

    // Площадь одного кабеля (S = π * r^2)
    const singleCableArea = Math.PI * Math.pow(d / 2, 2)
    // Общая площадь пучка кабелей
    const totalCableArea = singleCableArea * c

    let recommendedPipe = null
    let fillRate = 0
    let fillNorm = c === 1 ? 40 : 35 // Для одного кабеля норма до 40%, для пучка до 35%

    // Ищем подходящую трубу по нормативу заполнения
    for (const pipe of pipes) {
      const pipeArea = Math.PI * Math.pow(pipe.inner / 2, 2)
      fillRate = (totalCableArea / pipeArea) * 100
      
      if (fillRate <= fillNorm) {
        recommendedPipe = pipe
        break
      }
    }

    // Если даже 63-я гофра мала, считаем процент для неё, чтобы показать перегруз
    if (!recommendedPipe) {
      const maxPipeArea = Math.PI * Math.pow(pipes[pipes.length - 1].inner / 2, 2)
      fillRate = (totalCableArea / maxPipeArea) * 100
    }

    return {
      totalArea: totalCableArea.toFixed(1),
      recommended: recommendedPipe ? recommendedPipe.outer : '> 63',
      fillRate: fillRate.toFixed(1),
      isOk: recommendedPipe !== null,
      norm: fillNorm
    }
  }

  const result = calculate()

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in fade-in duration-500 text-foreground pb-24">
      <Link to="/calculators" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Назад к инженерному набору
      </Link>

      <div className="bg-card border border-border rounded-[var(--radius)] shadow-sm overflow-hidden">
        <div className="border-b border-border p-6 bg-primary/5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
            <CircleDashed className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Заполняемость гофры/трубы</h1>
            <p className="text-sm text-muted-foreground mt-1">Подбор диаметра трубы по наружному диаметру кабеля и нормам ПУЭ</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Левая колонка: Ввод данных */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Наружный диаметр кабеля (мм)</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  placeholder="Напр: 10.5 (для ВВГнг 3х2.5)"
                  className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground">Используйте штангенциркуль или данные завода-изготовителя.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Количество кабелей (шт)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="flex-1 accent-amber-500"
                />
                <div className="w-16 h-12 bg-background border border-border rounded-lg flex items-center justify-center font-bold text-foreground shadow-sm">
                  {count}
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-xl border border-border flex gap-3 mt-4">
              <ScrollText className="h-5 w-5 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Согласно нормам, площадь кабелей вместе с изоляцией не должна превышать <strong className="text-foreground">35%</strong> площади внутреннего сечения трубы для пучка кабелей, и <strong className="text-foreground">40%</strong> для одного кабеля.
              </p>
            </div>
          </div>

          {/* Правая колонка: Результат */}
          <div className="bg-muted/30 rounded-2xl p-6 border border-border flex flex-col justify-center">
            {!result ? (
              <div className="text-center text-muted-foreground space-y-3">
                <Info className="h-10 w-10 mx-auto opacity-20" />
                <p className="text-sm">Введите диаметр и количество кабелей для расчета.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className={`rounded-xl p-5 border shadow-sm relative overflow-hidden ${
                  result.isOk ? 'bg-primary/10 border-primary/20' : 'bg-destructive/10 border-destructive/20'
                }`}>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${result.isOk ? 'text-primary' : 'text-destructive'}`}>
                        Рекомендуемая гофра
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-black ${result.isOk ? 'text-primary' : 'text-destructive'}`}>
                          {result.recommended}
                        </span>
                        {result.isOk && <span className={`text-xl font-bold ${result.isOk ? 'text-primary/70' : 'text-destructive/70'}`}>мм</span>}
                      </div>
                    </div>
                    {result.isOk ? (
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-2 relative z-10">
                    <span className="text-sm font-medium text-foreground">Заполнение трубы:</span>
                    <span className={`font-bold ${parseFloat(result.fillRate) > result.norm ? 'text-destructive' : 'text-foreground'}`}>
                      {result.fillRate}% <span className="text-xs text-muted-foreground font-normal">(норма до {result.norm}%)</span>
                    </span>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-4 border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${result.isOk ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                      <Info className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-foreground font-medium">
                      {result.isOk 
                        ? 'Протяжка кабеля пройдет без затруднений. Перегрева не ожидается.' 
                        : 'Стандартные гофры (до 63 мм) малы для такого пучка. Рекомендуется разбить трассу или использовать лотки.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
