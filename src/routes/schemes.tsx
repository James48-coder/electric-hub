import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, Lightbulb, Zap, Cpu, LayoutGrid, ChevronRight, Power } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/schemes')({
  component: SchemesPage,
})

function SchemesPage() {
  const [activeScheme, setActiveScheme] = useState<string | null>(null)

  // МАРШРУТИЗАЦИЯ ВНУТРИ СТРАНИЦЫ
  if (activeScheme === 'simple') return <SimpleSchemeDetail onBack={() => setActiveScheme(null)} />
  if (activeScheme === 'double') return <DoubleSchemeDetail onBack={() => setActiveScheme(null)} />
  if (activeScheme === 'two-way') return <TwoWaySchemeDetail onBack={() => setActiveScheme(null)} />
  if (activeScheme === 'cross') return <CrossSchemeDetail onBack={() => setActiveScheme(null)} />
  if (activeScheme === 'sockets') return <SocketsSchemeDetail onBack={() => setActiveScheme(null)} />

  // Заглушка для остальных схем
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
          <p className="text-muted-foreground mt-2">Скоро добавим сюда тексты, нормы и интерактивную анимацию.</p>
        </div>
      </div>
    )
  }

  // ГЛАВНЫЙ ЭКРАН
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

// 1. ОДНОКЛАВИШНЫЙ ВЫКЛЮЧАТЕЛЬ
function SimpleSchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw, setSw] = useState(false) 
  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
  const wireInactive = "bg-black/40"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем
      </button>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Управление светом</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Обычный выключатель</h1>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8 p-6 md:p-8 space-y-6">
        <p className="text-foreground leading-relaxed">Базовая схема подключения одноклавишного выключателя.</p>
        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <h3 className="flex items-center gap-2 font-bold text-foreground mb-4"><BookOpen className="h-5 w-5 text-primary" />Технические требования</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Кабель: ВВГнг-LS 3x1.5 мм²</li>
            <li>Автомат: 10 А</li>
          </ul>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center min-h-[250px]">
          <div className={`transition-all duration-500 mb-12 flex flex-col items-center ${sw ? 'scale-110' : 'opacity-50 grayscale'}`}>
            <Lightbulb className={`h-12 w-12 ${sw ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'text-neutral-500'}`} />
          </div>
          <div className="flex items-center w-full max-w-md justify-between relative">
            <div className={`h-2 w-16 sm:w-24 rounded-full ${wirePhaseActive}`}></div>
            <button onClick={() => setSw(!sw)} className="w-16 h-24 bg-neutral-900 border-2 border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-amber-500 z-10 shadow-lg">
              <div className={`w-10 h-10 bg-black rounded transition-transform duration-300 ${sw ? '-translate-y-4 border-t-2 border-amber-500' : 'translate-y-4 border-b-2 border-neutral-700'}`}></div>
            </button>
            <div className={`h-2 w-16 sm:w-24 rounded-full transition-colors duration-300 ${sw ? wirePhaseActive : wireInactive}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. ДВУХКЛАВИШНЫЙ ВЫКЛЮЧАТЕЛЬ
function DoubleSchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw1, setSw1] = useState(false) 
  const [sw2, setSw2] = useState(false) 
  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
  const wireInactive = "bg-black/40"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем
      </button>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Управление светом</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Двухклавишный выключатель</h1>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 mb-8">
        <p>Управление двумя независимыми группами светильников.</p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center min-h-[300px]">
          <div className="flex gap-12 sm:gap-24 mb-12">
            <Lightbulb className={`h-10 w-10 transition-all duration-300 ${sw1 ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110' : 'text-neutral-500 opacity-50 grayscale'}`} />
            <Lightbulb className={`h-10 w-10 transition-all duration-300 ${sw2 ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110' : 'text-neutral-500 opacity-50 grayscale'}`} />
          </div>
          <div className="flex items-center w-full max-w-lg justify-between">
            <div className={`h-2 w-12 sm:w-20 rounded-full ${wirePhaseActive}`}></div>
            <div className="w-20 sm:w-24 h-24 bg-neutral-900 border-2 border-border rounded-lg flex p-1 gap-1 z-10 shadow-lg">
              <button onClick={() => setSw1(!sw1)} className="flex-1 bg-neutral-800 rounded relative border border-neutral-700">
                <div className={`absolute left-1 right-1 h-8 bg-black rounded transition-all duration-300 ${sw1 ? 'top-1 border-t-2 border-amber-500' : 'bottom-1 border-b-2 border-neutral-600'}`}></div>
              </button>
              <button onClick={() => setSw2(!sw2)} className="flex-1 bg-neutral-800 rounded relative border border-neutral-700">
                <div className={`absolute left-1 right-1 h-8 bg-black rounded transition-all duration-300 ${sw2 ? 'top-1 border-t-2 border-amber-500' : 'bottom-1 border-b-2 border-neutral-600'}`}></div>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className={`h-2 w-12 sm:w-20 rounded-full transition-colors duration-300 ${sw1 ? wirePhaseActive : wireInactive}`}></div>
              <div className={`h-2 w-12 sm:w-20 rounded-full transition-colors duration-300 ${sw2 ? wirePhaseActive : wireInactive}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. ПРОХОДНОЙ ВЫКЛЮЧАТЕЛЬ
function TwoWaySchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw1, setSw1] = useState(true) 
  const [sw2, setSw2] = useState(true)
  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
  const wireInactive = "bg-black/40"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем
      </button>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Управление светом</div>
        <h1 className="text-3xl font-bold mb-2">Проходные выключатели</h1>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 mb-8">
        <p>Схема управления светом из двух разных мест.</p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center min-h-[300px]">
          <Lightbulb className={`mb-12 h-12 w-12 transition-all duration-300 ${((sw1 && sw2) || (!sw1 && !sw2)) ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110' : 'text-neutral-500 opacity-50 grayscale'}`} />
          <div className="flex items-center w-full max-w-2xl justify-between relative">
            <div className={`h-2 w-8 sm:w-12 rounded-full ${wirePhaseActive}`}></div>
            <button onClick={() => setSw1(!sw1)} className="w-12 sm:w-16 h-20 sm:h-24 bg-neutral-900 border-2 border-border rounded-lg relative flex justify-center shadow-lg">
              <div className={`w-6 sm:w-8 h-8 sm:h-10 bg-black rounded absolute transition-all duration-300 ${sw1 ? 'top-2 border-t-2 border-amber-500' : 'bottom-2 border-b-2 border-neutral-700'}`}></div>
            </button>
            <div className="flex flex-col justify-between h-12 sm:h-16 w-24 sm:w-48 mx-2">
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${sw1 ? wirePhaseActive : wireInactive}`}></div>
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${!sw1 ? wirePhaseActive : wireInactive}`}></div>
            </div>
            <button onClick={() => setSw2(!sw2)} className="w-12 sm:w-16 h-20 sm:h-24 bg-neutral-900 border-2 border-border rounded-lg relative flex justify-center shadow-lg">
              <div className={`w-6 sm:w-8 h-8 sm:h-10 bg-black rounded absolute transition-all duration-300 ${sw2 ? 'top-2 border-t-2 border-amber-500' : 'bottom-2 border-b-2 border-neutral-700'}`}></div>
            </button>
            <div className={`h-2 w-8 sm:w-12 rounded-full transition-colors duration-300 ${((sw1 && sw2) || (!sw1 && !sw2)) ? wirePhaseActive : wireInactive}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 4. ПРОХОДНОЙ + ПЕРЕКРЕСТНЫЙ (НОВАЯ)
function CrossSchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw1, setSw1] = useState(true) 
  const [swCross, setSwCross] = useState(true) // true = прямо, false = крест-накрест
  const [sw2, setSw2] = useState(true)

  // Логика перекрестного выключателя
  const t1_in = sw1
  const t2_in = !sw1
  const t1_out = swCross ? t1_in : t2_in
  const t2_out = swCross ? t2_in : t1_in
  const isLightOn = sw2 ? t1_out : t2_out

  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
  const wireInactive = "bg-black/40"

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем
      </button>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Управление светом</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Проходные + перекрестные</h1>
        <p className="text-muted-foreground text-lg">Управление из 3-х и более мест.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8 p-6 md:p-8 space-y-6">
        <p className="text-foreground leading-relaxed">
          Используется в длинных коридорах или на лестницах в 3 этажа. По краям ставятся обычные проходные выключатели, а между ними — перекрестный (он меняет местами две перекидные жилы).
        </p>

        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <h3 className="flex items-center gap-2 font-bold text-foreground mb-4">
            <BookOpen className="h-5 w-5 text-primary" /> Технические требования
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>К крайним (проходным) подводится кабель 3х1.5 мм²</li>
            <li>К центральному (перекрестному) подводится 4 жилы (обычно два кабеля 3х1.5, земля изолируется).</li>
            <li>Перекрестных выключателей в цепи может быть неограниченное количество.</li>
          </ul>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center min-h-[300px] overflow-hidden">
          <Lightbulb className={`mb-12 h-12 w-12 transition-all duration-300 ${isLightOn ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110' : 'text-neutral-500 opacity-50 grayscale'}`} />
          
          <div className="flex items-center w-full max-w-3xl justify-between">
            <div className={`h-2 w-4 sm:w-8 rounded-full ${wirePhaseActive}`}></div>
            
            {/* SW 1 (Проходной) */}
            <button onClick={() => setSw1(!sw1)} className="w-10 sm:w-14 h-16 sm:h-20 bg-neutral-900 border-2 border-border rounded-lg relative flex justify-center shadow-lg">
              <div className={`w-6 sm:w-8 h-6 sm:h-8 bg-black rounded absolute transition-all duration-300 ${sw1 ? 'top-2 border-t-2 border-amber-500' : 'bottom-2 border-b-2 border-neutral-700'}`}></div>
            </button>

            {/* Провода до креста */}
            <div className="flex flex-col justify-between h-10 sm:h-12 flex-1 mx-2">
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${t1_in ? wirePhaseActive : wireInactive}`}></div>
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${t2_in ? wirePhaseActive : wireInactive}`}></div>
            </div>

            {/* SW CROSS (Перекрестный) */}
            <button onClick={() => setSwCross(!swCross)} className="w-12 sm:w-16 h-20 sm:h-24 bg-neutral-800 border-2 border-primary/50 rounded-lg relative flex flex-col items-center justify-center shadow-lg overflow-hidden">
               <div className="text-[10px] font-bold text-muted-foreground mb-1">КРЕСТ</div>
               <div className="flex items-center justify-center w-full h-8">
                  {swCross ? (
                    <div className="flex flex-col gap-3 w-full px-2">
                      <div className="h-1.5 w-full bg-neutral-500 rounded"></div>
                      <div className="h-1.5 w-full bg-neutral-500 rounded"></div>
                    </div>
                  ) : (
                    <svg className="w-full h-full text-neutral-500" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none"><path d="M4 4l16 16M4 20L20 4"/></svg>
                  )}
               </div>
            </button>

            {/* Провода после креста */}
            <div className="flex flex-col justify-between h-10 sm:h-12 flex-1 mx-2">
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${t1_out ? wirePhaseActive : wireInactive}`}></div>
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${t2_out ? wirePhaseActive : wireInactive}`}></div>
            </div>

            {/* SW 2 (Проходной) */}
            <button onClick={() => setSw2(!sw2)} className="w-10 sm:w-14 h-16 sm:h-20 bg-neutral-900 border-2 border-border rounded-lg relative flex justify-center shadow-lg">
              <div className={`w-6 sm:w-8 h-6 sm:h-8 bg-black rounded absolute transition-all duration-300 ${sw2 ? 'top-2 border-t-2 border-amber-500' : 'bottom-2 border-b-2 border-neutral-700'}`}></div>
            </button>

            <div className={`h-2 w-4 sm:w-8 rounded-full transition-colors duration-300 ${isLightOn ? wirePhaseActive : wireInactive}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 5. ГРУППА РОЗЕТОК (НОВАЯ)
function SocketsSchemeDetail({ onBack }: { onBack: () => void }) {
  const [powerOn, setPowerOn] = useState(false)

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем
      </button>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Силовые и розеточные</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Группа розеток (шлейф)</h1>
        <p className="text-muted-foreground text-lg">Параллельное подключение блока розеток в одной рамке.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8 p-6 md:p-8 space-y-6">
        <p className="text-foreground leading-relaxed">
          Самая частая ошибка новичков — подключать заземление от розетки к розетке. Если контакт отгорит на первой розетке, все остальные останутся без защиты.
        </p>

        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
          <h3 className="flex items-center gap-2 font-bold text-destructive mb-2">
            <BookOpen className="h-5 w-5" /> Важное правило ПУЭ 1.7.144
          </h3>
          <p className="text-sm text-destructive font-medium leading-relaxed">
            Подключение защитного проводника (PE) шлейфом строго запрещено! Каждая розетка должна подключаться к заземлению отдельным ответвлением (через WAGO, опрессовку или пайку в глубоком подрозетнике).
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-foreground">Правильное подключение</h3>
          <button 
            onClick={() => setPowerOn(!powerOn)} 
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${powerOn ? 'bg-amber-500 text-neutral-900' : 'bg-neutral-800 text-white hover:bg-neutral-700'}`}
          >
            {powerOn ? 'Отключить питание' : 'Подать питание'}
          </button>
        </div>

        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center min-h-[400px]">
          
          {/* Магистральные провода сверху */}
          <div className="w-full max-w-md space-y-4 mb-16 relative">
            
            {/* L (Фаза) - Идет шлейфом */}
            <div className="relative h-2">
              <div className="absolute font-bold text-amber-500 -left-6 -top-2">L</div>
              <div className={`h-full w-full rounded-full transition-colors duration-500 ${powerOn ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-amber-900/50'}`}></div>
              {/* Отводы фазы */}
              <div className={`absolute left-[15%] top-2 w-1 h-12 transition-colors duration-500 ${powerOn ? 'bg-amber-500' : 'bg-amber-900/50'}`}></div>
              <div className={`absolute left-[50%] top-2 w-1 h-12 transition-colors duration-500 ${powerOn ? 'bg-amber-500' : 'bg-amber-900/50'}`}></div>
              <div className={`absolute left-[85%] top-2 w-1 h-12 transition-colors duration-500 ${powerOn ? 'bg-amber-500' : 'bg-amber-900/50'}`}></div>
            </div>

            {/* N (Ноль) - Идет шлейфом */}
            <div className="relative h-2">
              <div className="absolute font-bold text-blue-500 -left-6 -top-2">N</div>
              <div className="h-full w-full bg-blue-600 rounded-full"></div>
              {/* Отводы нуля */}
              <div className="absolute left-[20%] top-2 w-1 h-12 bg-blue-600"></div>
              <div className="absolute left-[55%] top-2 w-1 h-12 bg-blue-600"></div>
              <div className="absolute left-[90%] top-2 w-1 h-12 bg-blue-600"></div>
            </div>

            {/* PE (Земля) - Разветвитель (Клемма WAGO) */}
            <div className="relative h-2">
              <div className="absolute font-bold text-green-500 -left-8 -top-2">PE</div>
              <div className="h-full w-[40%] bg-green-500 rounded-full"></div>
              
              {/* Клемма WAGO/Опрессовка */}
              <div className="absolute left-[40%] -top-3 w-8 h-8 bg-neutral-300 border-2 border-neutral-400 rounded-md flex items-center justify-center z-10">
                <span className="text-[8px] font-black text-black">WAGO</span>
              </div>

              {/* Три отдельных отвода PE ИЗ ОДНОЙ ТОЧКИ */}
              <div className="absolute left-[42%] top-2 w-1 h-12 bg-green-500 origin-top -rotate-[25deg]"></div>
              <div className="absolute left-[44%] top-5 w-1 h-9 bg-green-500"></div>
              <div className="absolute left-[46%] top-2 w-1 h-16 bg-green-500 origin-top rotate-[45deg]"></div>
            </div>

          </div>

          {/* Розетки */}
          <div className="flex gap-4 sm:gap-12 relative z-20 mt-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 rounded-xl border-2 border-neutral-300 flex items-center justify-center relative shadow-xl">
                 <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-200 rounded-full border border-neutral-300 flex items-center justify-center relative">
                   {/* Отверстия */}
                   <div className="flex gap-3">
                     <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${powerOn ? 'bg-amber-500/80 shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]' : 'bg-black'}`}></div>
                     <div className="w-3 h-3 bg-black rounded-full shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]"></div>
                   </div>
                   {/* Усики заземления */}
                   <div className="absolute top-0 w-2 h-2 bg-neutral-400 rounded-b"></div>
                   <div className="absolute bottom-0 w-2 h-2 bg-neutral-400 rounded-t"></div>
                 </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}
