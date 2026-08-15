import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Network, Info, Cable, Shield, Wrench } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/joints')({
  component: JointsCalculatorPage,
})

function JointsCalculatorPage() {
  const [jointType, setJointType] = useState('connecting')
  const [cores, setCores] = useState('4')
  const [armor, setArmor] = useState('no')
  const [section, setSection] = useState('16-50')

  const calculate = () => {
    // Базовая логика формирования аббревиатур (стандарт для рынка РФ/СНГ до 1 кВ)
    let abbreviation = ''
    let description = ''
    let accessories = ''

    if (jointType === 'connecting') {
      abbreviation = armor === 'yes' ? 'СТп' : 'ПСТ'
      description = 'Соединительная термоусаживаемая муфта'
      accessories = 'В комплекте должны быть болтовые соединители (гильзы) со срывными болтами.'
    } else if (jointType === 'end_indoor') {
      abbreviation = armor === 'yes' ? 'КВТп' : 'ПКВТ'
      description = 'Концевая внутренняя термоусаживаемая муфта'
      accessories = 'В комплекте должны быть болтовые наконечники со срывными болтами.'
    } else if (jointType === 'end_outdoor') {
      abbreviation = armor === 'yes' ? 'КНТп' : 'ПКНТ'
      description = 'Концевая наружная термоусаживаемая муфта'
      accessories = 'В комплекте должны быть болтовые наконечники и термоусаживаемые изоляторы (юбки) для защиты от осадков.'
    }

    // Собираем полное название (например: 4ПСТ-1 (16-50) или 5КВТп-1 (70-120))
    // Индекс "-1" означает рабочее напряжение до 1 кВ
    const fullName = `${cores}${abbreviation}-1 (${section})`

    let groundingInfo = null
    if (armor === 'yes') {
      groundingInfo = 'Муфта включает комплект заземления брони (роликовая пружина постоянного давления и провод заземления).'
    }

    return {
      fullName,
      description,
      accessories,
      groundingInfo
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
            <Network className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Подбор кабельных муфт</h1>
            <p className="text-sm text-muted-foreground mt-1">Определение маркировки термоусаживаемых муфт (до 1 кВ)</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Левая колонка: Ввод данных */}
          <div className="space-y-6">
            
            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Тип муфты</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setJointType('connecting')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${jointType === 'connecting' ? activeClass : inactiveClass}`}
                >
                  Соединительная (сращивание)
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setJointType('end_indoor')}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${jointType === 'end_indoor' ? activeClass : inactiveClass}`}
                  >
                    Концевая (внутри)
                  </button>
                  <button
                    onClick={() => setJointType('end_outdoor')}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${jointType === 'end_outdoor' ? activeClass : inactiveClass}`}
                  >
                    Концевая (на улице)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">Количество жил</label>
                <div className="grid grid-cols-3 gap-2">
                  {['3', '4', '5'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setCores(val)}
                      className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${cores === val ? activeClass : inactiveClass}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">Броня кабеля</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setArmor('no')}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${armor === 'no' ? activeClass : inactiveClass}`}
                  >
                    Нет
                  </button>
                  <button
                    onClick={() => setArmor('yes')}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${armor === 'yes' ? activeClass : inactiveClass}`}
                  >
                    Есть
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Диапазон сечений (мм²)</label>
              <div className="grid grid-cols-2 gap-2">
                {['1.5-10', '16-50', '70-120', '150-240'].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSection(val)}
                    className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${section === val ? activeClass : inactiveClass}`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Правая колонка: Результат */}
          <div className="bg-muted/30 rounded-2xl p-6 border border-border flex flex-col justify-center">
            <div className="space-y-4 animate-in zoom-in-95 duration-300">
              
              <div className="bg-primary/10 rounded-xl p-5 border border-primary/20 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Cable className="h-32 w-32 text-primary" />
                </div>
                <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2 relative z-10">Маркировка для заказа</p>
                <div className="relative z-10 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-primary tracking-tight">{result.fullName}</span>
                </div>
                <div className="pt-3 border-t border-primary/20 relative z-10 mt-4">
                  <p className="text-sm text-primary font-medium">{result.description}</p>
                </div>
              </div>

              {result.groundingInfo && (
                <div className="bg-background rounded-xl p-4 border border-border shadow-sm flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <p className="text-xs text-foreground font-medium leading-relaxed">
                    {result.groundingInfo}
                  </p>
                </div>
              )}

              <div className="bg-background rounded-xl p-4 border border-border shadow-sm flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Wrench className="h-5 w-5" />
                </div>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {result.accessories}
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-4 border border-border flex items-start gap-3 mt-2">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Монтаж должен производиться с помощью газовой горелки или мощного промышленного фена. Термоусадка усаживается от центра к краям.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
