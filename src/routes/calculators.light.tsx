import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Lightbulb, Info, Sun, LayoutGrid } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/light')({
  component: LightCalculatorPage,
})

function LightCalculatorPage() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [roomType, setRoomType] = useState('living')
  const [lumens, setLumens] = useState('1000') // 1000 Лм примерно равно хорошей 10Вт LED лампе

  const calculate = () => {
    const l = parseFloat(length.replace(',', '.'))
    const w = parseFloat(width.replace(',', '.'))
    const fixtureLumens = parseInt(lumens)

    if (isNaN(l) || isNaN(w) || isNaN(fixtureLumens) || l <= 0 || w <= 0 || fixtureLumens <= 0) {
      return null
    }

    const area = l * w

    // Нормы освещенности (Люкс) по СП
    const norms: Record<string, number> = {
      living: 150,   // Жилые комнаты, кухни, гостиные
      office: 300,   // Кабинеты, офисы, чтение
      workshop: 500, // Мастерские, точные работы, черчение
    }
    const E = norms[roomType]

    // Коэффициент запаса и использования (для LED и светлых/средних стен)
    // Упрощенная инженерная формула: F = (E * S * k) / (N * n)
    // Для базового расчета берем усредненный коэффициент потерь = 1.5
    const K = 1.5 
    
    const totalLumens = area * E * K
    const fixturesCount = Math.ceil(totalLumens / fixtureLumens)

    return {
      area: area.toFixed(1),
      norm: E,
      totalLumens: Math.round(totalLumens),
      fixturesCount
    }
  }

  const result = calculate()

  // Наш утвержденный единый стиль для активных элементов
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
            <Lightbulb className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Расчёт освещенности</h1>
            <p className="text-sm text-muted-foreground mt-1">Подбор количества светильников по нормам СП 52.13330 (СНиП)</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Левая колонка: Ввод данных */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">Длина (м)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Напр: 5"
                    className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">Ширина (м)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Напр: 4.5"
                    className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Тип помещения</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setRoomType('living')}
                  className={`h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${roomType === 'living' ? activeClass : inactiveClass}`}
                >
                  Жилое (150 Лк)
                </button>
                <button
                  onClick={() => setRoomType('office')}
                  className={`h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${roomType === 'office' ? activeClass : inactiveClass}`}
                >
                  Офис (300 Лк)
                </button>
                <button
                  onClick={() => setRoomType('workshop')}
                  className={`h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${roomType === 'workshop' ? activeClass : inactiveClass}`}
                >
                  Работа (500 Лк)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex justify-between">
                <span>Световой поток 1 лампы (Люмен)</span>
                <span className="text-primary">{lumens} Лм</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="400"
                  max="4000"
                  step="100"
                  value={lumens}
                  onChange={(e) => setLumens(e.target.value)}
                  className="flex-1 accent-amber-500"
                />
                <div className="w-20 h-12 bg-background border border-border rounded-lg flex items-center justify-center font-bold text-foreground shadow-sm">
                  {lumens}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Подсказка: LED 10 Вт ≈ 900-1000 Лм. Панель 36 Вт ≈ 3000 Лм.
              </p>
            </div>
          </div>

          {/* Правая колонка: Результат */}
          <div className="bg-muted/30 rounded-2xl p-6 border border-border flex flex-col justify-center">
            {!result ? (
              <div className="text-center text-muted-foreground space-y-3">
                <Info className="h-10 w-10 mx-auto opacity-20" />
                <p className="text-sm">Введите габариты помещения, чтобы выполнить расчет.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                
                <div className="bg-primary/10 rounded-xl p-5 border border-primary/20 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Sun className="h-32 w-32 text-primary" />
                  </div>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2 relative z-10">Количество светильников</p>
                  <div className="flex items-baseline gap-2 relative z-10">
                    <span className="text-5xl font-black text-primary">{result.fixturesCount}</span>
                    <span className="text-xl font-bold text-primary/70">шт.</span>
                  </div>
                  <p className="text-sm text-primary/80 mt-3 relative z-10 font-medium flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" /> Равномерно распределить по потолку
                  </p>
                </div>

                <div className="bg-background rounded-xl p-4 border border-border shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <span className="text-sm text-muted-foreground">Площадь помещения:</span>
                    <span className="font-bold text-foreground">{result.area} м²</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <span className="text-sm text-muted-foreground">Требуемая норма:</span>
                    <span className="font-bold text-foreground">{result.norm} Люкс</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Общий световой поток:</span>
                    <span className="font-bold text-foreground">≈ {result.totalLumens} Лм</span>
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
