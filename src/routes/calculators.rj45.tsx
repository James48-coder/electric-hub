import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Network, Info, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/rj45')({
  component: Rj45CalculatorPage,
})

function Rj45CalculatorPage() {
  const [standard, setStandard] = useState('T568B')

  // Описание проводов с цветами для Tailwind
  const wires = {
    wo: { name: 'Бело-оранжевый', color: 'bg-orange-500', striped: true },
    o:  { name: 'Оранжевый', color: 'bg-orange-500', striped: false },
    wg: { name: 'Бело-зеленый', color: 'bg-green-500', striped: true },
    g:  { name: 'Зеленый', color: 'bg-green-600', striped: false },
    wb: { name: 'Бело-синий', color: 'bg-blue-500', striped: true },
    b:  { name: 'Синий', color: 'bg-blue-600', striped: false },
    wbr:{ name: 'Бело-коричневый', color: 'bg-amber-700', striped: true },
    br: { name: 'Коричневый', color: 'bg-amber-900', striped: false },
  }

  // Распиновка по стандартам
  const t568b = [wires.wo, wires.o, wires.wg, wires.b, wires.wb, wires.g, wires.wbr, wires.br]
  const t568a = [wires.wg, wires.g, wires.wo, wires.b, wires.wb, wires.o, wires.wbr, wires.br]

  const currentPins = standard === 'T568B' ? t568b : t568a

  // Наш фирменный стиль кнопок
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
            <Network className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">Распиновка RJ-45</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Схемы обжима витой пары (прямой и перекрестный кабель)</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Левая колонка: Управление и Инфо */}
          <div className="space-y-5 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Стандарт обжима</label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setStandard('T568B')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${standard === 'T568B' ? activeClass : inactiveClass}`}
                >
                  Тип T568B
                </button>
                <button
                  onClick={() => setStandard('T568A')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${standard === 'T568A' ? activeClass : inactiveClass}`}
                >
                  Тип T568A
                </button>
              </div>
            </div>

            <div className="bg-primary/5 p-3 sm:p-4 rounded-xl border border-primary/20 space-y-2 sm:space-y-3">
              <div className="flex items-start sm:items-center gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
                <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">Прямой кабель (PC - Роутер)</p>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed pl-6 sm:pl-7">
                Оба конца кабеля обжимаются по одинаковому стандарту. 
                В РФ и Европе общепринятым стандартом по умолчанию является <strong className="text-foreground">T568B</strong>.
              </p>
            </div>

            <div className="bg-muted/50 p-3 sm:p-4 rounded-xl border border-border space-y-2 sm:space-y-3">
              <div className="flex items-start sm:items-center gap-2">
                <Network className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 mt-0.5 sm:mt-0" />
                <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">Кросс-кабель (PC - PC)</p>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed pl-6 sm:pl-7">
                Для соединения двух компьютеров напрямую один конец обжимается по типу T568B, а второй — по типу T568A. 
                <em className="block mt-1">(Современные гигабитные сетевые карты умеют делать кроссовер автоматически).</em>
              </p>
            </div>
          </div>

          {/* Правая колонка: Визуализация коннектора */}
          <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 border border-border flex flex-col items-center justify-start sm:justify-center">
            
            <p className="text-[10px] sm:text-xs font-bold text-foreground mb-4 sm:mb-6 uppercase tracking-wider text-center">
              Контактами вверх, защелкой от себя
            </p>

            {/* Визуализация проводов */}
            <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 h-24 sm:h-40 items-end">
              {currentPins.map((pin, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <div 
                    className={`w-5 sm:w-8 h-20 sm:h-32 rounded-t-md relative overflow-hidden shadow-inner ${pin.color}`}
                  >
                    {/* Полоска для бело-цветных проводов */}
                    {pin.striped && (
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 sm:w-3 bg-white/95"></div>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-muted-foreground">{index + 1}</span>
                </div>
              ))}
            </div>

            {/* Легенда (текстовый список) */}
            <div className="w-full bg-background rounded-xl p-3 sm:p-4 border border-border shadow-sm">
              <div className="grid grid-cols-2 gap-y-2 gap-x-2 sm:gap-x-4">
                {currentPins.map((pin, index) => (
                  <div key={index} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-medium">
                    <span className="text-muted-foreground w-3 shrink-0">{index + 1}.</span>
                    <div className={`w-3 h-3 rounded-full relative overflow-hidden shrink-0 ${pin.color}`}>
                       {pin.striped && <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-white"></div>}
                    </div>
                    <span className="text-foreground truncate">{pin.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
