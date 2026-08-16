import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ShieldPlus, Info, Bath, Cable } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/dsup')({
  component: DsupCalculatorPage,
})

function DsupCalculatorPage() {
  const [maxPhase, setMaxPhase] = useState('2.5')
  const [mechProtected, setMechProtected] = useState('yes')

  const calculate = () => {
    const phase = parseFloat(maxPhase)
    const isProtected = mechProtected === 'yes'

    // Минимальное сечение по ПУЭ 1.7.127
    const minSection = isProtected ? 2.5 : 4.0

    // Магистраль до КУП не должна быть меньше максимального PE-проводника в помещении
    const mainWire = Math.max(phase, minSection)
    
    // Отводы к металлическим частям (трубы, ванна)
    const branchWire = minSection

    return {
      mainWire: mainWire.toFixed(1),
      branchWire: branchWire.toFixed(1),
      isProtected
    }
  }

  const result = calculate()

  // Наш утвержденный единый стиль для активных элементов
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
            <ShieldPlus className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">Проектирование ДСУП</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Выбор сечения проводников для КУП во влажных помещениях (ПУЭ гл. 1.7)</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Левая колонка: Ввод данных */}
          <div className="space-y-5 sm:space-y-6">
            
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Макс. сечение фазы в санузле (мм²)</label>
              <p className="text-xs text-muted-foreground mb-2">Например, кабель на проточный водонагреватель или стиральную машину.</p>
              {/* Сетка кнопок 2x2 на мобилках и 4x1 на компах */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['1.5', '2.5', '4.0', '6.0'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMaxPhase(val)}
                    className={`h-10 sm:h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${maxPhase === val ? activeClass : inactiveClass}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Механическая защита провода ДСУП</label>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">Проводник прокладывается в трубе, гофре или штробе?</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setMechProtected('yes')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${mechProtected === 'yes' ? activeClass : inactiveClass}`}
                >
                  Да (защищен)
                </button>
                <button
                  onClick={() => setMechProtected('no')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${mechProtected === 'no' ? activeClass : inactiveClass}`}
                >
                  Нет (открыто)
                </button>
              </div>
            </div>

            <div className="bg-muted/50 p-3 sm:p-4 rounded-xl border border-border flex items-start gap-3 mt-4">
              <Bath className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                К КУП необходимо подключить: металлический поддон/ванну, трубы ХВС и ГВС, трубу отопления, металлическую сетку теплого пола и PE-контакты всех розеток в помещении.
              </p>
            </div>
          </div>

          {/* Правая колонка: Результат */}
          <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 border border-border flex flex-col justify-start sm:justify-center">
            <div className="space-y-4 sm:space-y-6 animate-in zoom-in-95 duration-300">
              
              {/* Линия от щита до КУП */}
              <div className="bg-primary/10 rounded-xl p-4 sm:p-5 border border-primary/20 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Cable className="h-24 w-24 sm:h-32 sm:w-32 text-primary" />
                </div>
                <p className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider mb-1 sm:mb-2 relative z-10">Линия: Щит ➔ КУП</p>
                <div className="flex items-baseline gap-1 sm:gap-2 relative z-10">
                  <span className="text-4xl sm:text-5xl font-black text-primary">{result.mainWire}</span>
                  <span className="text-lg sm:text-xl font-bold text-primary/70">мм²</span>
                </div>
                <p className="text-xs sm:text-sm text-primary/80 mt-2 sm:mt-3 relative z-10 font-medium">
                  Медный провод (например, ПУГВ {result.mainWire})
                </p>
              </div>

              {/* Отводы к трубам */}
              <div className="bg-background rounded-xl p-4 sm:p-5 border border-border shadow-sm">
                <p className="text-[10px] sm:text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1 sm:mb-2">Отводы: КУП ➔ Трубы / Ванна</p>
                <div className="flex items-baseline gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <span className="text-2xl sm:text-3xl font-black text-foreground">{result.branchWire}</span>
                  <span className="text-sm sm:text-base font-bold text-muted-foreground">мм²</span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                  {result.isProtected 
                    ? 'Минимальное сечение 2.5 мм², так как есть механическая защита.' 
                    : 'Минимальное сечение 4.0 мм², так как прокладка открытая.'}
                </p>
              </div>

              <div className="bg-background rounded-xl p-3 sm:p-4 border border-border shadow-sm flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5 sm:mt-0">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <p className="text-[10px] sm:text-xs text-foreground font-medium leading-relaxed">
                  Проводник от щита подключается напрямую к шине PE. Запрещается подключать КУП шлейфом от PE-контакта розетки!
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
