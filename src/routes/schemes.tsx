import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, Lightbulb, Zap, Cpu, LayoutGrid, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/schemes')({
  component: SchemesPage,
})

function SchemesPage() {
  // Состояние для управления экранами: null = сетка карточек, 'two-way' = проходной, и т.д.
  const [activeScheme, setActiveScheme] = useState<string | null>(null)

  // 1. ЭКРАН ДЕТАЛЬНОЙ СХЕМЫ (ПРОХОДНЫЕ ВЫКЛЮЧАТЕЛИ)
  if (activeScheme === 'two-way') {
    return <TwoWaySchemeDetail onBack={() => setActiveScheme(null)} />
  }

  // Заглушка для остальных схем, пока мы их не нарисовали
  if (activeScheme) {
    return (
      <div className="container mx-auto p-6 max-w-4xl animate-in fade-in duration-500 text-foreground pb-24">
        <button onClick={() => setActiveScheme(null)} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
          К списку схем
        </button>
        <div className="text-center mt-20 border border-border rounded-2xl p-12 bg-muted/10">
          <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-foreground">Схема в разработке</h2>
          <p className="text-muted-foreground mt-2">Скоро добавим сюда интерактивную анимацию.</p>
        </div>
      </div>
    )
  }

  // 2. ГЛАВНЫЙ ЭКРАН (СЕТКА КАРТОЧЕК)
  const schemesList = [
    { id: 'simple', title: 'Обычный выключатель', desc: 'Базовая схема управления одной группой света.', cat: 'Управление светом', icon: Lightbulb },
    { id: 'double', title: 'Двухклавишный выключатель', desc: 'Управление двумя группами освещения.', cat: 'Управление светом', icon: Lightbulb },
    { id: 'two-way', title: 'Проходные выключатели', desc: 'Управление из 2-х мест.', cat: 'Управление светом', icon: Lightbulb },
    { id: 'cross', title: 'Проходные + перекрестные', desc: 'Управление из 3-х и более мест.', cat: 'Управление светом', icon: Lightbulb },
    { id: 'sockets', title: 'Группа розеток (шлейф/коробка)', desc: 'Подключение группы розеток.', cat: 'Силовые и розеточные', icon: Zap },
    { id: 'appliance', title: 'Стационарная техника', desc: 'Подключение плит и варочных панелей.', cat: 'Силовые и розеточные', icon: Zap },
    { id: 'motor1', title: 'Звезда и Треугольник', desc: 'Подключение 3Ф двигателя в 220В.', cat: 'Электродвигатели', icon: Cpu },
    { id: 'motor2', title: 'Реверсивная схема', desc: 'Схема изменения направления вращения.', cat: 'Электродвигатели', icon: Cpu },
    { id: 'panel', title: 'Сборка щита', desc: 'Компоновка оборудования в щите.', cat: 'Щитовое', icon: LayoutGrid },
  ]

  return (
    <div className="container mx-auto p-6 max-w-6xl animate-in fade-in duration-500 text-foreground pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Схемы</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemesList.map((scheme) => {
          const Icon = scheme.icon
          return (
            <div 
              key={scheme.id}
              onClick={() => setActiveScheme(scheme.id)}
              className="bg-card border border-border hover:border-primary/50 transition-all duration-300 rounded-2xl p-6 cursor-pointer group flex flex-col h-full shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-border rounded text-muted-foreground">
                  {scheme.cat}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{scheme.title}</h3>
              <p className="text-sm text-muted-foreground flex-grow mb-6">{scheme.desc}</p>
              
              <div className="pt-4 border-t border-border flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                Описание схемы <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================================
// КОМПОНЕНТ ДЕТАЛЬНОЙ СТРАНИЦЫ: ПРОХОДНОЙ ВЫКЛЮЧАТЕЛЬ
// ============================================================================
function TwoWaySchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw1, setSw1] = useState(true) 
  const [sw2, setSw2] = useState(true)

  const isTraveler1Active = sw1 === true
  const isTraveler2Active = sw1 === false
  const isLightOn = (sw1 && sw2) || (!sw1 && !sw2)

  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
  const wireInactive = "bg-black/40"
  const wireNeutral = "bg-blue-500"

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        К списку схем
      </button>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Управление светом
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Проходные выключатели</h1>
        <p className="text-muted-foreground text-lg">Управление из 2-х мест.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8 p-6 md:p-8 space-y-6">
        <p className="text-foreground leading-relaxed">
          Схема управления одной группой света из двух разных мест (коридоры, лестницы).
        </p>

        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            Технические требования и нормы
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
              <span>Кабели между выключателями: 3х1.5 мм²</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
              <span>Фаза заходит на первый, со второго уходит на лампу</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ИНТЕРАКТИВНАЯ ЧАСТЬ */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
          Интерактивная схема
        </h3>
        <p className="text-sm text-muted-foreground mb-8">
          Нажмите на переключатели, чтобы увидеть, как фаза (L) проходит по перекидным контактам к лампочке.
        </p>

        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
          
          <div className={`transition-all duration-500 mb-12 flex flex-col items-center ${isLightOn ? 'scale-110' : 'opacity-50 grayscale'}`}>
            <div className={`p-4 rounded-full ${isLightOn ? 'bg-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.6)]' : 'bg-neutral-800'}`}>
              <Lightbulb className={`h-12 w-12 ${isLightOn ? 'text-amber-400' : 'text-neutral-500'}`} />
            </div>
          </div>

          <div className="flex items-center w-full max-w-2xl justify-between relative">
            <div className="flex items-center">
              <div className="font-black text-amber-500 mr-2">L</div>
              <div className={`h-2 w-8 sm:w-12 rounded-full ${wirePhaseActive}`}></div>
            </div>

            <button 
              onClick={() => setSw1(!sw1)}
              className="w-12 sm:w-16 h-20 sm:h-24 bg-neutral-900 border-2 border-border rounded-lg relative flex items-center justify-center cursor-pointer hover:border-amber-500 transition-colors z-10 shadow-lg"
            >
              <div className={`w-6 sm:w-8 h-8 sm:h-10 bg-black rounded shadow-inner transition-transform duration-300 ${sw1 ? '-translate-y-3 sm:-translate-y-4 border-t-2 border-amber-500' : 'translate-y-3 sm:translate-y-4 border-b-2 border-neutral-700'}`}></div>
            </button>

            <div className="flex flex-col justify-between h-12 sm:h-16 w-24 sm:w-48 relative mx-2">
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${isTraveler1Active ? wirePhaseActive : wireInactive}`}></div>
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${isTraveler2Active ? wirePhaseActive : wireInactive}`}></div>
            </div>

            <button 
              onClick={() => setSw2(!sw2)}
              className="w-12 sm:w-16 h-20 sm:h-24 bg-neutral-900 border-2 border-border rounded-lg relative flex items-center justify-center cursor-pointer hover:border-amber-500 transition-colors z-10 shadow-lg"
            >
              <div className={`w-6 sm:w-8 h-8 sm:h-10 bg-black rounded shadow-inner transition-transform duration-300 ${sw2 ? '-translate-y-3 sm:-translate-y-4 border-t-2 border-amber-500' : 'translate-y-3 sm:translate-y-4 border-b-2 border-neutral-700'}`}></div>
            </button>

            <div className="flex items-center">
              <div className={`h-2 w-8 sm:w-12 rounded-full transition-colors duration-300 ${isLightOn ? wirePhaseActive : wireInactive}`}></div>
              <div className="h-2 w-2 bg-amber-500 rounded-full ml-1 opacity-0"></div>
            </div>
          </div>

          <div className="absolute top-8 left-8 right-8 flex items-center justify-between opacity-70">
             <div className="font-black text-blue-500">N</div>
             <div className={`h-1 flex-1 mx-4 rounded-full ${wireNeutral} border border-dashed border-blue-400`}></div>
             <div className="h-1 w-4"></div>
          </div>

        </div>
      </div>

    </div>
  )
}
