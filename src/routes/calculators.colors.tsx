import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Palette, Info, Cable, Zap } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/colors')({
  component: ColorsCalculatorPage,
})

function ColorsCalculatorPage() {
  const [voltage, setVoltage] = useState('220')
  const [standard, setStandard] = useState('cable') // cable (ГОСТ) или busbar (ПУЭ)

  // Данные для отрисовки проводов/шин
  const getWires = () => {
    const PE = { name: 'Заземление (PE)', desc: 'Защитный проводник', color: 'pe', label: 'PE' }
    const N = { name: 'Нейтраль (N)', desc: 'Рабочий ноль', color: 'bg-blue-500', label: 'N' }

    if (standard === 'cable') {
      if (voltage === '220') {
        return [
          { name: 'Фаза (L)', desc: 'Фазный проводник', color: 'bg-amber-800', label: 'L' },
          N,
          PE
        ]
      } else {
        return [
          { name: 'Фаза 1 (L1)', desc: 'А / Коричневый', color: 'bg-amber-800', label: 'L1' },
          { name: 'Фаза 2 (L2)', desc: 'B / Черный', color: 'bg-neutral-900', label: 'L2' },
          { name: 'Фаза 3 (L3)', desc: 'C / Серый', color: 'bg-neutral-500', label: 'L3' },
          N,
          PE
        ]
      }
    } else {
      if (voltage === '220') {
        return [
          { name: 'Фаза (L)', desc: 'Примыкающая к шине', color: 'bg-red-500', label: 'L' },
          N,
          PE
        ]
      } else {
        return [
          { name: 'Фаза А (L1)', desc: 'Желтая', color: 'bg-yellow-400 text-neutral-900', label: 'A' },
          { name: 'Фаза B (L2)', desc: 'Зеленая', color: 'bg-green-600', label: 'B' },
          { name: 'Фаза C (L3)', desc: 'Красная', color: 'bg-red-500', label: 'C' },
          N,
          PE
        ]
      }
    }
  }

  // Динамический текст подсказки в зависимости от обоих параметров
  const getInfoText = () => {
    if (standard === 'cable') {
      if (voltage === '220') {
        return 'В однофазной сети (220В) фазный провод чаще всего бывает коричневым, белым или черным. Желто-зеленый (PE) и синий (N) цвета использовать для фазы строго запрещено!'
      } else {
        return 'В трехфазном кабеле (380В) по ГОСТ 31946-2012 фазные жилы маркируются коричневым (L1), черным (L2) и серым (L3). На практике в разных регионах очередность фаз может выбираться по договоренности монтажников, но концы жил дополнительно помечаются цветной термоусадкой: L1(A) — желтый, L2(B) — зеленый, L3(C) — красный.'
      }
    } else {
      if (voltage === '220') {
        return 'По ПУЭ (гл. 1.1.30) в однофазных щитах при использовании жесткой ошиновки фазная шина (примыкающая) окрашивается в красный цвет.'
      } else {
        return 'Цветовая маркировка «ЖЗК» (Желтый, Зеленый, Красный) применяется на жестких шинах в ВРУ, ГРЩ и подстанциях для визуального контроля порядка чередования фаз А, В, С.'
      }
    }
  }

  const wires = getWires()

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
            <Palette className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">Цветовая маркировка</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Стандарты маркировки проводов (фаза, ноль, земля) по ПУЭ и ГОСТ</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          <div className="space-y-5 sm:space-y-6">
            
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Напряжение сети</label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setVoltage('220')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${voltage === '220' ? activeClass : inactiveClass}`}
                >
                  220 В <span className="hidden sm:inline">(1 фаза)</span>
                </button>
                <button
                  onClick={() => setVoltage('380')}
                  className={`h-10 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 ${voltage === '380' ? activeClass : inactiveClass}`}
                >
                  380 В <span className="hidden sm:inline">(3 фазы)</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm font-bold text-foreground">Элемент проводки</label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => setStandard('cable')}
                  className={`py-2 min-h-[3rem] sm:py-0 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 flex flex-col items-center justify-center gap-0.5 sm:gap-1 ${standard === 'cable' ? activeClass : inactiveClass}`}
                >
                  <span className="text-center leading-tight">Кабель / Провод</span>
                  <span className="text-[9px] sm:text-[10px] font-normal opacity-70">ГОСТ 31946-2012</span>
                </button>
                <button
                  onClick={() => setStandard('busbar')}
                  className={`py-2 min-h-[3rem] sm:py-0 sm:h-12 rounded-lg border text-xs sm:text-sm font-bold transition-all duration-300 flex flex-col items-center justify-center gap-0.5 sm:gap-1 ${standard === 'busbar' ? activeClass : inactiveClass}`}
                >
                  <span className="text-center leading-tight">Жесткие шины</span>
                  <span className="text-[9px] sm:text-[10px] font-normal opacity-70">ПУЭ гл. 1.1</span>
                </button>
              </div>
            </div>

            <div className="bg-muted/50 p-3 sm:p-4 rounded-xl border border-border flex items-start gap-3 mt-4">
              <Info className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {getInfoText()}
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 border border-border flex flex-col justify-start sm:justify-center">
            <div className="space-y-4 animate-in zoom-in-95 duration-300">
              
              <div className="flex items-center gap-2 mb-2 sm:mb-4 px-1 sm:px-0">
                {standard === 'cable' ? <Cable className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /> : <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />}
                <p className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">
                  {standard === 'cable' ? 'Жилы кабеля' : 'Расцветка шин'}
                </p>
              </div>

              <div className="bg-background rounded-xl p-2 sm:p-4 border border-border shadow-sm flex flex-col gap-2 sm:gap-3">
                {wires.map((wire, idx) => (
                  <div key={idx} className="flex items-center gap-3 sm:gap-4 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    
                    {wire.color === 'pe' ? (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex flex-col border border-border/20 shadow-inner shrink-0 relative">
                        <div className="w-full h-1/2 bg-yellow-400"></div>
                        <div className="w-full h-1/2 bg-green-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center font-black text-black/50 text-[10px] sm:text-sm">
                          {wire.label}
                        </div>
                      </div>
                    ) : (
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border/20 shadow-inner shrink-0 flex items-center justify-center font-black text-[10px] sm:text-sm ${
                        wire.color.includes('text-neutral') || wire.color.includes('text-black') 
                          ? wire.color 
                          : `${wire.color} text-white/90`
                      }`}>
                        {wire.label}
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-bold text-foreground leading-tight">{wire.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{wire.desc}</p>
                    </div>

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
