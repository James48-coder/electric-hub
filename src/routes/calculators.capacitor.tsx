import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Cpu, Info, Zap, Settings, Power } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/capacitor')({
  component: CapacitorCalculatorPage,
})

function CapacitorCalculatorPage() {
  const [power, setPower] = useState('')
  const [connection, setConnection] = useState('delta')

  const calculate = () => {
    const p = parseFloat(power.replace(',', '.'))
    
    if (isNaN(p) || p <= 0) return null

    // Эмпирический расчет для перевода 3-фазного двигателя (380В) в 1-фазную сеть (220В)
    // Схема "Треугольник" требует около 70 мкФ на 1 кВт
    // Схема "Звезда" требует около 50 мкФ на 1 кВт
    const multiplier = connection === 'delta' ? 70 : 50
    const workingCapacitor = p * multiplier
    
    // Пусковой конденсатор обычно берется в 2.5 - 3 раза больше рабочего
    const startingCapacitor = workingCapacitor * 2.5

    return {
      working: Math.round(workingCapacitor),
      starting: Math.round(startingCapacitor),
      voltage: 450 // Безопасное рабочее напряжение для пленочных конденсаторов
    }
  }

  const result = calculate()

  // Единый стиль кнопок
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
            <Cpu className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">Подбор конденсаторов</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Расчет емкости для запуска 3Ф двигателя (380В) от сети 220В</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Левая колонка: Ввод данных */}
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center gap-2">
                Мощность двигателя (кВт)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  placeholder="Например: 1.5"
                  className="w-full bg-background border border-border rounded-lg h-10 sm:h-12 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium text-base sm:text-lg transition-all"
                />
                <span className="absolute right-3 sm:right-4 top-2.5 sm:top-3 text-muted-foreground font-medium text-sm sm:text-base">кВт</span>
              </div>
              <p className="text-xs text-muted-foreground">Указана на шильдике (бирке) самого мотора.</p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Схема подключения обмоток</label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setConnection('delta')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${connection === 'delta' ? activeClass : inactiveClass}`}
                >
                  Треугольник (Δ)
                </button>
                <button
                  onClick={() => setConnection('star')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${connection === 'star' ? activeClass : inactiveClass}`}
                >
                  Звезда (Y)
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Для работы от 220В предпочтительна схема «Треугольник» (сохраняется до 70% мощности). На «Звезде» мотор потеряет больше половины мощности.
              </p>
            </div>
          </div>

          {/* Правая колонка: Результат */}
          <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 border border-border flex flex-col justify-center">
            {!result ? (
              <div className="text-center text-muted-foreground space-y-3 py-6 sm:py-0">
                <Info className="h-8 w-8 sm:h-10 sm:w-10 mx-auto opacity-20" />
                <p className="text-xs sm:text-sm px-4">Введите мощность двигателя для расчета емкостей.</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6 animate-in zoom-in-95 duration-300">
                
                <div className="bg-primary/10 rounded-xl p-4 sm:p-5 border border-primary/20 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Power className="h-24 w-24 sm:h-32 sm:w-32 text-primary" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider mb-1 sm:mb-2 relative z-10">Рабочий конденсатор (Ср)</p>
                  <div className="flex items-baseline gap-1 sm:gap-2 relative z-10">
                    <span className="text-4xl sm:text-5xl font-black text-primary">{result.working}</span>
                    <span className="text-lg sm:text-xl font-bold text-primary/70">мкФ</span>
                  </div>
                  <p className="text-xs sm:text-sm text-primary/80 mt-1 sm:mt-1.5 relative z-10 font-medium">
                    Напряжение не ниже {result.voltage} В
                  </p>
                </div>

                <div className="bg-background rounded-xl p-4 sm:p-5 border border-border shadow-sm">
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1 sm:mb-2">Пусковой конденсатор (Сп)</p>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-foreground">{result.starting}</span>
                    <span className="text-sm sm:text-base font-bold text-muted-foreground">мкФ</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 leading-relaxed">
                    Напряжение не ниже {result.voltage} В. Подключается параллельно рабочему <strong className="text-foreground">только на время пуска</strong> (2-3 секунды), затем отключается кнопкой без фиксации.
                  </p>
                </div>

                <div className="bg-background rounded-xl p-3 sm:p-4 border border-border shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 mt-0.5 sm:mt-0">
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <p className="text-[10px] sm:text-xs text-foreground font-medium leading-relaxed">
                    Если двигатель запускается вхолостую (без нагрузки), пусковой конденсатор может не понадобиться.
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
