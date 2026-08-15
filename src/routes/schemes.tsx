import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, Lightbulb, Zap, Cpu, LayoutGrid, ChevronRight, Settings2, ShieldAlert, RotateCw, RotateCcw, AlertTriangle, Power } from 'lucide-react'
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
  if (activeScheme === 'appliance') return <ApplianceSchemeDetail onBack={() => setActiveScheme(null)} />
  if (activeScheme === 'motor1') return <Motor1SchemeDetail onBack={() => setActiveScheme(null)} />
  if (activeScheme === 'motor2') return <Motor2SchemeDetail onBack={() => setActiveScheme(null)} />
  if (activeScheme === 'panel') return <PanelSchemeDetail onBack={() => setActiveScheme(null)} />

  // ГЛАВНЫЙ ЭКРАН (СЕТКА)
  const schemesList = [
    { id: 'simple', title: 'Обычный выключатель', desc: 'Базовая схема управления одной группой света.', cat: 'Управление светом', icon: Lightbulb },
    { id: 'double', title: 'Двухклавишный выключатель', desc: 'Управление двумя группами освещения.', cat: 'Управление светом', icon: Lightbulb },
    { id: 'two-way', title: 'Проходные выключатели', desc: 'Управление из 2-х мест.', cat: 'Управление светом', icon: Lightbulb },
    { id: 'cross', title: 'Проходные + перекрестные', desc: 'Управление из 3-х и более мест.', cat: 'Управление светом', icon: Lightbulb },
    { id: 'sockets', title: 'Группа розеток (шлейф/коробка)', desc: 'Подключение группы розеток.', cat: 'Силовые и розеточные', icon: Zap },
    { id: 'appliance', title: 'Стационарная техника', desc: 'Подключение плит и варочных панелей.', cat: 'Силовые и розеточные', icon: Zap },
    { id: 'motor1', title: 'Звезда и Треугольник', desc: 'Подключение 3Ф двигателя в 220В/380В.', cat: 'Электродвигатели', icon: Cpu },
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

// ----------------------------------------------------------------------------
// 1-7. СТАРЫЕ СХЕМЫ (БЕЗ ИЗМЕНЕНИЙ)
// ----------------------------------------------------------------------------

function SimpleSchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw, setSw] = useState(false) 
  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
  const wireInactive = "bg-black/40"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем</button>
      <div className="mb-8"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Управление светом</div><h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Обычный выключатель</h1></div>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8 p-6 md:p-8 space-y-6">
        <p className="text-foreground leading-relaxed">Базовая схема подключения одноклавишного выключателя.</p>
        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <h3 className="flex items-center gap-2 font-bold text-foreground mb-4"><BookOpen className="h-5 w-5 text-primary" />Технические требования</h3>
          <ul className="space-y-3 text-sm text-muted-foreground"><li>Кабель: ВВГнг-LS 3x1.5 мм²</li><li>Автомат: 10 А</li></ul>
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center min-h-[250px]">
          <div className={`transition-all duration-500 mb-12 flex flex-col items-center ${sw ? 'scale-110' : 'opacity-50 grayscale'}`}><Lightbulb className={`h-12 w-12 ${sw ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]' : 'text-neutral-500'}`} /></div>
          <div className="flex items-center w-full max-w-md justify-between relative">
            <div className={`h-2 w-16 sm:w-24 rounded-full ${wirePhaseActive}`}></div>
            <button onClick={() => setSw(!sw)} className="w-16 h-24 bg-neutral-900 border-2 border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-amber-500 z-10 shadow-lg"><div className={`w-10 h-10 bg-black rounded transition-transform duration-300 ${sw ? '-translate-y-4 border-t-2 border-amber-500' : 'translate-y-4 border-b-2 border-neutral-700'}`}></div></button>
            <div className={`h-2 w-16 sm:w-24 rounded-full transition-colors duration-300 ${sw ? wirePhaseActive : wireInactive}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DoubleSchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw1, setSw1] = useState(false); const [sw2, setSw2] = useState(false) 
  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"; const wireInactive = "bg-black/40"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем</button>
      <div className="mb-8"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Управление светом</div><h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Двухклавишный выключатель</h1></div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 mb-8"><p>Управление двумя независимыми группами светильников.</p></div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center min-h-[300px]">
          <div className="flex gap-12 sm:gap-24 mb-12">
            <Lightbulb className={`h-10 w-10 transition-all duration-300 ${sw1 ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110' : 'text-neutral-500 opacity-50 grayscale'}`} />
            <Lightbulb className={`h-10 w-10 transition-all duration-300 ${sw2 ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110' : 'text-neutral-500 opacity-50 grayscale'}`} />
          </div>
          <div className="flex items-center w-full max-w-lg justify-between">
            <div className={`h-2 w-12 sm:w-20 rounded-full ${wirePhaseActive}`}></div>
            <div className="w-20 sm:w-24 h-24 bg-neutral-900 border-2 border-border rounded-lg flex p-1 gap-1 z-10 shadow-lg">
              <button onClick={() => setSw1(!sw1)} className="flex-1 bg-neutral-800 rounded relative border border-neutral-700"><div className={`absolute left-1 right-1 h-8 bg-black rounded transition-all duration-300 ${sw1 ? 'top-1 border-t-2 border-amber-500' : 'bottom-1 border-b-2 border-neutral-600'}`}></div></button>
              <button onClick={() => setSw2(!sw2)} className="flex-1 bg-neutral-800 rounded relative border border-neutral-700"><div className={`absolute left-1 right-1 h-8 bg-black rounded transition-all duration-300 ${sw2 ? 'top-1 border-t-2 border-amber-500' : 'bottom-1 border-b-2 border-neutral-600'}`}></div></button>
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

function TwoWaySchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw1, setSw1] = useState(true); const [sw2, setSw2] = useState(true)
  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"; const wireInactive = "bg-black/40"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем</button>
      <div className="mb-8"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Управление светом</div><h1 className="text-3xl font-bold mb-2">Проходные выключатели</h1></div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 mb-8"><p>Схема управления светом из двух разных мест.</p></div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center min-h-[300px]">
          <Lightbulb className={`mb-12 h-12 w-12 transition-all duration-300 ${((sw1 && sw2) || (!sw1 && !sw2)) ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110' : 'text-neutral-500 opacity-50 grayscale'}`} />
          <div className="flex items-center w-full max-w-2xl justify-between relative">
            <div className={`h-2 w-8 sm:w-12 rounded-full ${wirePhaseActive}`}></div>
            <button onClick={() => setSw1(!sw1)} className="w-12 sm:w-16 h-20 sm:h-24 bg-neutral-900 border-2 border-border rounded-lg relative flex justify-center shadow-lg"><div className={`w-6 sm:w-8 h-8 sm:h-10 bg-black rounded absolute transition-all duration-300 ${sw1 ? 'top-2 border-t-2 border-amber-500' : 'bottom-2 border-b-2 border-neutral-700'}`}></div></button>
            <div className="flex flex-col justify-between h-12 sm:h-16 w-24 sm:w-48 mx-2">
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${sw1 ? wirePhaseActive : wireInactive}`}></div>
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${!sw1 ? wirePhaseActive : wireInactive}`}></div>
            </div>
            <button onClick={() => setSw2(!sw2)} className="w-12 sm:w-16 h-20 sm:h-24 bg-neutral-900 border-2 border-border rounded-lg relative flex justify-center shadow-lg"><div className={`w-6 sm:w-8 h-8 sm:h-10 bg-black rounded absolute transition-all duration-300 ${sw2 ? 'top-2 border-t-2 border-amber-500' : 'bottom-2 border-b-2 border-neutral-700'}`}></div></button>
            <div className={`h-2 w-8 sm:w-12 rounded-full transition-colors duration-300 ${((sw1 && sw2) || (!sw1 && !sw2)) ? wirePhaseActive : wireInactive}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CrossSchemeDetail({ onBack }: { onBack: () => void }) {
  const [sw1, setSw1] = useState(true); const [swCross, setSwCross] = useState(true); const [sw2, setSw2] = useState(true)
  const t1_out = swCross ? sw1 : !sw1; const t2_out = swCross ? !sw1 : sw1
  const isLightOn = sw2 ? t1_out : t2_out
  const wirePhaseActive = "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"; const wireInactive = "bg-black/40"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем</button>
      <div className="mb-8"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Управление светом</div><h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Проходные + перекрестные</h1></div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8"><div className="relative bg-black/20 rounded-2xl p-8 border border-border/50 flex flex-col items-center min-h-[300px] overflow-hidden">
          <Lightbulb className={`mb-12 h-12 w-12 transition-all duration-300 ${isLightOn ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110' : 'text-neutral-500 opacity-50 grayscale'}`} />
          <div className="flex items-center w-full max-w-3xl justify-between">
            <div className={`h-2 w-4 sm:w-8 rounded-full ${wirePhaseActive}`}></div>
            <button onClick={() => setSw1(!sw1)} className="w-10 sm:w-14 h-16 sm:h-20 bg-neutral-900 border-2 border-border rounded-lg relative flex justify-center shadow-lg"><div className={`w-6 sm:w-8 h-6 sm:h-8 bg-black rounded absolute transition-all duration-300 ${sw1 ? 'top-2 border-t-2 border-amber-500' : 'bottom-2 border-b-2 border-neutral-700'}`}></div></button>
            <div className="flex flex-col justify-between h-10 sm:h-12 flex-1 mx-2">
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${sw1 ? wirePhaseActive : wireInactive}`}></div>
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${!sw1 ? wirePhaseActive : wireInactive}`}></div>
            </div>
            <button onClick={() => setSwCross(!swCross)} className="w-12 sm:w-16 h-20 sm:h-24 bg-neutral-800 border-2 border-primary/50 rounded-lg relative flex flex-col items-center justify-center shadow-lg"><div className="text-[10px] font-bold text-muted-foreground mb-1">КРЕСТ</div><div className="flex items-center justify-center w-full h-8">{swCross ? (<div className="flex flex-col gap-3 w-full px-2"><div className="h-1.5 w-full bg-neutral-500 rounded"></div><div className="h-1.5 w-full bg-neutral-500 rounded"></div></div>) : (<svg className="w-full h-full text-neutral-500" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none"><path d="M4 4l16 16M4 20L20 4"/></svg>)}</div></button>
            <div className="flex flex-col justify-between h-10 sm:h-12 flex-1 mx-2">
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${t1_out ? wirePhaseActive : wireInactive}`}></div>
              <div className={`h-2 w-full rounded-full transition-colors duration-300 ${t2_out ? wirePhaseActive : wireInactive}`}></div>
            </div>
            <button onClick={() => setSw2(!sw2)} className="w-10 sm:w-14 h-16 sm:h-20 bg-neutral-900 border-2 border-border rounded-lg relative flex justify-center shadow-lg"><div className={`w-6 sm:w-8 h-6 sm:h-8 bg-black rounded absolute transition-all duration-300 ${sw2 ? 'top-2 border-t-2 border-amber-500' : 'bottom-2 border-b-2 border-neutral-700'}`}></div></button>
            <div className={`h-2 w-4 sm:w-8 rounded-full transition-colors duration-300 ${isLightOn ? wirePhaseActive : wireInactive}`}></div>
          </div>
      </div></div>
    </div>
  )
}

function SocketsSchemeDetail({ onBack }: { onBack: () => void }) {
  const [powerOn, setPowerOn] = useState(false)
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем</button>
      <div className="mb-8"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Силовые и розеточные</div><h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Группа розеток (шлейф)</h1></div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <h3 className="font-bold text-foreground">Правильное подключение</h3>
          <button onClick={() => setPowerOn(!powerOn)} className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${powerOn ? 'bg-amber-500 text-neutral-900 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-neutral-800 text-white hover:bg-neutral-700'}`}>{powerOn ? 'Отключить питание' : 'Подать питание'}</button>
        </div>
        <div className="relative bg-neutral-950/50 rounded-2xl p-4 sm:p-8 pt-12 border border-border/50 flex flex-col items-center min-h-[420px] overflow-hidden">
          <div className="relative w-full max-w-md h-72">
            <div className="absolute font-black text-amber-500 -left-6 sm:-left-8 top-1">L</div>
            <div className={`absolute left-0 right-[20%] top-2 h-2 rounded-full transition-colors duration-500 ${powerOn ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-amber-900/50'}`}></div>
            <div className={`absolute left-[10%] top-2 w-1.5 h-40 transition-colors duration-500 ${powerOn ? 'bg-amber-500' : 'bg-amber-900/50'}`}></div><div className={`absolute left-[45%] top-2 w-1.5 h-40 transition-colors duration-500 ${powerOn ? 'bg-amber-500' : 'bg-amber-900/50'}`}></div><div className={`absolute left-[80%] top-2 w-1.5 h-40 transition-colors duration-500 ${powerOn ? 'bg-amber-500' : 'bg-amber-900/50'}`}></div>
            <div className="absolute font-black text-blue-500 -left-6 sm:-left-8 top-7">N</div>
            <div className="absolute left-0 right-[10%] top-8 h-2 bg-blue-600 rounded-full"></div>
            <div className="absolute left-[20%] top-8 w-1.5 h-34 bg-blue-600"></div><div className="absolute left-[55%] top-8 w-1.5 h-34 bg-blue-600"></div><div className="absolute left-[90%] top-8 w-1.5 h-34 bg-blue-600"></div>
            <div className="absolute font-black text-green-500 -left-8 sm:-left-10 top-13">PE</div>
            <div className="absolute left-0 w-[50%] top-14 h-2 bg-green-500 rounded-l-full"></div>
            <div className="absolute left-[50%] -translate-x-1/2 top-10 w-14 h-9 bg-neutral-200/90 border border-neutral-400 rounded-lg shadow-lg flex flex-col justify-between p-1 z-20"><div className="flex justify-evenly w-full mt-0.5"><div className="w-1.5 h-3.5 bg-orange-500 rounded-sm"></div><div className="w-1.5 h-3.5 bg-orange-500 rounded-sm"></div><div className="w-1.5 h-3.5 bg-orange-500 rounded-sm"></div><div className="w-1.5 h-3.5 bg-orange-500 rounded-sm"></div></div><span className="text-[9px] font-black text-neutral-600 text-center tracking-widest leading-none mb-0.5">WAGO</span></div>
            <div className="absolute left-[50%] -translate-x-1/2 top-18 w-1.5 h-24 bg-green-500 z-10"></div>
            <div className="absolute left-[47%] top-18 w-1.5 h-4 bg-green-500 z-10"></div><div className="absolute left-[15%] right-[53%] top-22 h-1.5 bg-green-500 rounded-l z-10"></div><div className="absolute left-[15%] -translate-x-1/2 top-22 w-1.5 h-20 bg-green-500 z-10"></div>
            <div className="absolute left-[53%] top-18 w-1.5 h-6 bg-green-500 z-10"></div><div className="absolute left-[53%] right-[15%] top-24 h-1.5 bg-green-500 rounded-r z-10"></div><div className="absolute left-[85%] -translate-x-1/2 top-24 w-1.5 h-18 bg-green-500 z-10"></div>
            <div className="absolute bottom-0 left-[15%] -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 rounded-xl border-2 border-neutral-300 flex items-center justify-center shadow-xl z-20"><div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-200 rounded-full border border-neutral-300 flex flex-col items-center justify-center relative"><div className="absolute top-0 w-2 h-2 bg-neutral-400 rounded-b"></div><div className="flex gap-3 sm:gap-4"><div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-500 ${powerOn ? 'bg-amber-500 shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]' : 'bg-neutral-800'}`}></div><div className="w-2 h-2 sm:w-3 sm:h-3 bg-neutral-800 rounded-full shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]"></div></div><div className="absolute bottom-0 w-2 h-2 bg-neutral-400 rounded-t"></div></div></div>
            <div className="absolute bottom-0 left-[50%] -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 rounded-xl border-2 border-neutral-300 flex items-center justify-center shadow-xl z-20"><div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-200 rounded-full border border-neutral-300 flex flex-col items-center justify-center relative"><div className="absolute top-0 w-2 h-2 bg-neutral-400 rounded-b"></div><div className="flex gap-3 sm:gap-4"><div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-500 ${powerOn ? 'bg-amber-500 shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]' : 'bg-neutral-800'}`}></div><div className="w-2 h-2 sm:w-3 sm:h-3 bg-neutral-800 rounded-full shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]"></div></div><div className="absolute bottom-0 w-2 h-2 bg-neutral-400 rounded-t"></div></div></div>
            <div className="absolute bottom-0 left-[85%] -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 rounded-xl border-2 border-neutral-300 flex items-center justify-center shadow-xl z-20"><div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-200 rounded-full border border-neutral-300 flex flex-col items-center justify-center relative"><div className="absolute top-0 w-2 h-2 bg-neutral-400 rounded-b"></div><div className="flex gap-3 sm:gap-4"><div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-500 ${powerOn ? 'bg-amber-500 shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]' : 'bg-neutral-800'}`}></div><div className="w-2 h-2 sm:w-3 sm:h-3 bg-neutral-800 rounded-full shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]"></div></div><div className="absolute bottom-0 w-2 h-2 bg-neutral-400 rounded-t"></div></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ApplianceSchemeDetail({ onBack }: { onBack: () => void }) {
  const [voltage, setVoltage] = useState('220')
  const activeClass = "bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 shadow-sm"; const inactiveClass = "bg-background border-border text-muted-foreground hover:border-amber-500/50 hover:text-foreground"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем</button>
      <div className="mb-8"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Силовые и розеточные</div><h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Стационарная техника</h1></div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8"><div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h3 className="font-bold text-foreground">Схема установки перемычек</h3>
          <div className="flex bg-background border border-border rounded-lg p-1"><button onClick={() => setVoltage('220')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${voltage === '220' ? activeClass : inactiveClass} border-transparent`}>1 фаза (220 В)</button><button onClick={() => setVoltage('380')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${voltage === '380' ? activeClass : inactiveClass} border-transparent`}>2 фазы (380 В)</button></div>
        </div>
        <div className="relative bg-neutral-900 rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center min-h-[350px]">
          <div className="absolute top-4 left-4 right-4 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-4 py-2 rounded-lg"><ShieldAlert className="w-4 h-4" />{voltage === '220' ? 'Внимание! Если не поставить перемычку на 1-2-3, половина конфорок не будет работать.' : 'Внимание! Обязательно снимите перемычку между 1-2, иначе произойдет межфазное КЗ!'}</div>
          <div className="w-full max-w-sm bg-neutral-800 border-2 border-neutral-700 rounded-xl p-6 shadow-2xl mt-8">
             <div className="flex justify-between items-end mb-2 px-2 text-xs font-bold text-neutral-400"><span>L1</span><span>L2</span><span>L3</span><span>N1</span><span>N2</span><span>PE</span></div>
             <div className="flex justify-between items-center bg-neutral-950 p-3 rounded-lg border border-neutral-800 relative">
               {voltage === '220' && (<div className="absolute left-[8%] right-[58%] top-1/2 -translate-y-1/2 h-2 bg-amber-600 rounded-full shadow-[0_0_5px_rgba(217,119,6,0.5)] z-10 border-y border-amber-500"></div>)}
               <div className="absolute left-[60%] right-[25%] top-1/2 -translate-y-1/2 h-2 bg-amber-600 rounded-full shadow-[0_0_5px_rgba(217,119,6,0.5)] z-10 border-y border-amber-500"></div>
               {[1, 2, 3, 4, 5, 6].map((num) => (<div key={num} className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-neutral-500 flex items-center justify-center z-20 shadow-inner"><div className="w-3 h-0.5 bg-neutral-600"></div></div>))}
             </div>
             <div className="flex justify-between items-start mt-2 px-3 text-[10px] font-black text-neutral-500"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span className="text-green-600">⏚</span></div>
             <div className="flex justify-between items-start mt-8 px-3 relative">
               {voltage === '220' ? (<><div className="w-2 h-16 bg-amber-800 rounded-t-sm absolute left-[10%] -bottom-16 shadow-[0_0_10px_rgba(180,83,9,0.5)] border-x border-amber-700"></div><div className="w-2 h-16 bg-blue-600 rounded-t-sm absolute left-[60%] -bottom-16 border-x border-blue-500"></div></>) : (<><div className="w-2 h-16 bg-amber-800 rounded-t-sm absolute left-[10%] -bottom-16 shadow-[0_0_10px_rgba(180,83,9,0.5)] border-x border-amber-700"></div><div className="w-2 h-16 bg-neutral-900 rounded-t-sm absolute left-[27%] -bottom-16 border-x border-neutral-700"></div><div className="w-2 h-16 bg-blue-600 rounded-t-sm absolute left-[60%] -bottom-16 border-x border-blue-500"></div></>)}
               <div className="w-2 h-16 bg-green-500 rounded-t-sm absolute right-[9%] -bottom-16 flex flex-col overflow-hidden border-x border-green-400"><div className="w-full h-1/2 bg-yellow-400"></div></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Motor1SchemeDetail({ onBack }: { onBack: () => void }) {
  const [connection, setConnection] = useState('star')
  const activeClass = "bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 shadow-sm"; const inactiveClass = "bg-background border-border text-muted-foreground hover:border-amber-500/50 hover:text-foreground"
  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"><ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем</button>
      <div className="mb-8"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Электродвигатели</div><h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Звезда и Треугольник</h1></div>
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h3 className="font-bold text-foreground">Положение перемычек</h3>
          <div className="flex bg-background border border-border rounded-lg p-1"><button onClick={() => setConnection('star')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${connection === 'star' ? activeClass : inactiveClass} border-transparent`}>Звезда (Y)</button><button onClick={() => setConnection('delta')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${connection === 'delta' ? activeClass : inactiveClass} border-transparent`}>Треугольник (Δ)</button></div>
        </div>
        <div className="relative bg-neutral-900 rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-64 h-48 bg-neutral-800 border-4 border-neutral-700 rounded-xl p-6 shadow-2xl relative">
             <div className="flex justify-between px-4 mb-12 relative z-20"><div className="flex flex-col items-center gap-2"><span className="text-xs font-bold text-neutral-400">W2</span><div className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-neutral-500 shadow-inner"></div></div><div className="flex flex-col items-center gap-2"><span className="text-xs font-bold text-neutral-400">U2</span><div className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-neutral-500 shadow-inner"></div></div><div className="flex flex-col items-center gap-2"><span className="text-xs font-bold text-neutral-400">V2</span><div className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-neutral-500 shadow-inner"></div></div></div>
             <div className="flex justify-between px-4 relative z-20"><div className="flex flex-col items-center gap-2"><div className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-neutral-500 shadow-inner"></div><span className="text-xs font-bold text-neutral-400">U1</span></div><div className="flex flex-col items-center gap-2"><div className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-neutral-500 shadow-inner"></div><span className="text-xs font-bold text-neutral-400">V1</span></div><div className="flex flex-col items-center gap-2"><div className="w-6 h-6 rounded-full bg-neutral-300 border-2 border-neutral-500 shadow-inner"></div><span className="text-xs font-bold text-neutral-400">W1</span></div></div>
             {connection === 'star' ? (<div className="absolute top-[48px] left-[40px] right-[40px] h-3 bg-amber-600 rounded-sm shadow-md border border-amber-500 z-10 transition-all duration-500"></div>) : (<><div className="absolute top-[48px] bottom-[48px] left-[46px] w-3 bg-amber-600 rounded-sm shadow-md border border-amber-500 z-10 transition-all duration-500"></div><div className="absolute top-[48px] bottom-[48px] left-[110px] w-3 bg-amber-600 rounded-sm shadow-md border border-amber-500 z-10 transition-all duration-500"></div><div className="absolute top-[48px] bottom-[48px] right-[46px] w-3 bg-amber-600 rounded-sm shadow-md border border-amber-500 z-10 transition-all duration-500"></div></>)}
             <div className="absolute -bottom-12 left-0 right-0 flex justify-between px-[50px] z-0"><div className="w-2 h-12 bg-amber-800 shadow-[0_0_10px_rgba(180,83,9,0.5)]"></div><div className="w-2 h-12 bg-neutral-900"></div><div className="w-2 h-12 bg-neutral-500"></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 8. НОВАЯ СХЕМА: РЕВЕРСИВНАЯ (ДВИГАТЕЛЬ)
// ----------------------------------------------------------------------------
function Motor2SchemeDetail({ onBack }: { onBack: () => void }) {
  const [direction, setDirection] = useState<'off' | 'forward' | 'reverse'>('off')

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем
      </button>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Электродвигатели
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Реверсивная схема</h1>
        <p className="text-muted-foreground text-lg">Схема изменения направления вращения (через 2 контактора).</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8 p-6 md:p-8 space-y-6">
        <p className="text-foreground leading-relaxed">
          Для изменения направления вращения трехфазного двигателя (реверса) достаточно поменять местами любые две фазы (обычно L1 и L3). Это реализуется с помощью двух магнитных пускателей.
        </p>
        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <h3 className="flex items-center gap-2 font-bold text-foreground mb-2">
            <ShieldAlert className="h-5 w-5 text-destructive" /> Электрическая блокировка
          </h3>
          <p className="text-sm text-muted-foreground">
            Обязательное условие реверсивной схемы — электрическая (и желательно механическая) блокировка. Нормально-закрытые контакты (NC) одного пускателя разрывают цепь катушки другого. Это исключает одновременное включение КМ1 и КМ2, что привело бы к межфазному короткому замыканию.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h3 className="font-bold text-foreground">Пульт управления</h3>
          <div className="flex gap-2">
             <button 
               onClick={() => setDirection('forward')}
               disabled={direction === 'reverse'}
               className={`px-4 py-2 flex items-center gap-2 rounded-lg font-bold text-sm transition-all ${direction === 'forward' ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-neutral-800 text-white hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed'}`}
             >
               <RotateCw className="w-4 h-4" /> Вперед (КМ1)
             </button>
             <button 
               onClick={() => setDirection('off')}
               className="px-4 py-2 rounded-lg font-bold text-sm bg-red-500 text-white hover:bg-red-600 shadow-[0_0_10px_rgba(239,68,6,0.3)] transition-all"
             >
               СТОП
             </button>
             <button 
               onClick={() => setDirection('reverse')}
               disabled={direction === 'forward'}
               className={`px-4 py-2 flex items-center gap-2 rounded-lg font-bold text-sm transition-all ${direction === 'reverse' ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-neutral-800 text-white hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed'}`}
             >
               <RotateCcw className="w-4 h-4" /> Назад (КМ2)
             </button>
          </div>
        </div>

        <div className="relative bg-neutral-950 rounded-2xl p-8 border border-border/50 flex flex-col items-center justify-center min-h-[450px]">
          
          <div className="flex gap-16 absolute top-8">
             <div className="font-black text-amber-500">L1</div>
             <div className="font-black text-neutral-400">L2</div>
             <div className="font-black text-neutral-600">L3</div>
          </div>

          {/* Входящие линии (Верх) */}
          <div className="flex gap-16 absolute top-16 h-12">
             <div className="w-1 h-full bg-amber-600"></div>
             <div className="w-1 h-full bg-neutral-400"></div>
             <div className="w-1 h-full bg-neutral-600"></div>
          </div>

          {/* Контакторы КМ1 и КМ2 */}
          <div className="flex justify-between w-[320px] absolute top-28 z-20">
             {/* KM1 */}
             <div className={`w-28 h-20 border-2 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${direction === 'forward' ? 'bg-green-900/50 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-neutral-900 border-neutral-700'}`}>
                <span className="font-black text-neutral-300 mb-1">КМ1</span>
                <div className="flex gap-3">
                   <div className={`w-1 h-8 transition-colors ${direction === 'forward' ? 'bg-amber-500' : 'bg-neutral-800'}`}></div>
                   <div className={`w-1 h-8 transition-colors ${direction === 'forward' ? 'bg-neutral-300' : 'bg-neutral-800'}`}></div>
                   <div className={`w-1 h-8 transition-colors ${direction === 'forward' ? 'bg-neutral-500' : 'bg-neutral-800'}`}></div>
                </div>
             </div>
             
             {/* KM2 */}
             <div className={`w-28 h-20 border-2 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${direction === 'reverse' ? 'bg-amber-900/50 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-neutral-900 border-neutral-700'}`}>
                <span className="font-black text-neutral-300 mb-1">КМ2 (Реверс)</span>
                <div className="flex gap-3">
                   <div className={`w-1 h-8 transition-colors ${direction === 'reverse' ? 'bg-neutral-500' : 'bg-neutral-800'}`}></div>
                   <div className={`w-1 h-8 transition-colors ${direction === 'reverse' ? 'bg-neutral-300' : 'bg-neutral-800'}`}></div>
                   <div className={`w-1 h-8 transition-colors ${direction === 'reverse' ? 'bg-amber-500' : 'bg-neutral-800'}`}></div>
                </div>
             </div>
          </div>

          {/* Разводка до контакторов */}
          <svg className="absolute top-16 w-[320px] h-12" style={{ zIndex: 10 }}>
             <path d="M 50 0 L 50 48 M 114 0 L 114 48 M 178 0 L 178 48" stroke="#d97706" strokeWidth="4" className="text-amber-600"/>
             {/* Ответвления на КМ2 (Перехлест) */}
             <path d="M 50 24 L 270 24 L 270 48" fill="none" stroke="#d97706" strokeWidth="4" />
             <path d="M 114 32 L 206 32 L 206 48" fill="none" stroke="#9ca3af" strokeWidth="4" />
             <path d="M 178 40 L 142 40 L 142 48" fill="none" stroke="#4b5563" strokeWidth="4" />
          </svg>

          {/* Разводка после контакторов (Сборка) */}
          <svg className="absolute top-[192px] w-[320px] h-16" style={{ zIndex: 10 }}>
             {/* КМ1 Прямо */}
             <path d="M 50 0 L 50 64" fill="none" stroke={direction === 'forward' ? "#f59e0b" : "#262626"} strokeWidth="4" />
             <path d="M 114 0 L 114 64" fill="none" stroke={direction === 'forward' ? "#d1d5db" : "#262626"} strokeWidth="4" />
             <path d="M 178 0 L 178 64" fill="none" stroke={direction === 'forward' ? "#6b7280" : "#262626"} strokeWidth="4" />
             
             {/* КМ2 Крест */}
             {/* L3 -> L1 */}
             <path d="M 142 0 L 142 40 L 50 40 L 50 64" fill="none" stroke={direction === 'reverse' ? "#f59e0b" : "transparent"} strokeWidth="4" />
             {/* L2 -> L2 */}
             <path d="M 206 0 L 206 32 L 114 32 L 114 64" fill="none" stroke={direction === 'reverse' ? "#d1d5db" : "transparent"} strokeWidth="4" />
             {/* L1 -> L3 */}
             <path d="M 270 0 L 270 24 L 178 24 L 178 64" fill="none" stroke={direction === 'reverse' ? "#6b7280" : "transparent"} strokeWidth="4" />
          </svg>

          {/* Двигатель */}
          <div className="absolute bottom-12 w-32 h-32 rounded-full border-8 border-neutral-700 bg-neutral-800 flex items-center justify-center z-30 shadow-2xl overflow-hidden">
             <div className="font-black text-2xl text-neutral-500 mb-2">M</div>
             {/* Вращающийся ротор */}
             <div className={`absolute inset-2 border-4 border-dashed rounded-full transition-all duration-[2000ms] ease-linear ${direction === 'forward' ? 'border-green-500 animate-[spin_1s_linear_infinite]' : direction === 'reverse' ? 'border-amber-500 animate-[spin_1s_linear_infinite_reverse]' : 'border-neutral-600'}`}></div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------------
// 9. НОВАЯ СХЕМА: СБОРКА ЩИТА (DIN-РЕЙКИ)
// ----------------------------------------------------------------------------
function PanelSchemeDetail({ onBack }: { onBack: () => void }) {
  const [mainPower, setMainPower] = useState(false)

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in slide-in-from-right-4 duration-300 text-foreground pb-24">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> К списку схем
      </button>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Щитовое
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Сборка щита (Квартира)</h1>
        <p className="text-muted-foreground text-lg">Базовая компоновка оборудования на DIN-рейке.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden mb-8 p-6 md:p-8 space-y-6">
        <p className="text-foreground leading-relaxed">
          Современный электрощит собирается по каскадной схеме: Вводной автомат → Реле напряжения → Групповые УЗО (дифзащита) → Линейные автоматы.
        </p>
        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <h3 className="flex items-center gap-2 font-bold text-foreground mb-2">
            <BookOpen className="h-5 w-5 text-primary" /> Правила хорошего тона
          </h3>
          <p className="text-sm text-muted-foreground">
            Реле напряжения (УЗМ/РН) защищает технику от отгорания нуля и скачков напряжения. Разделение на несколько УЗО (например, на свет и розетки отдельно) позволяет не обесточивать всю квартиру при утечке на одной линии.
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-foreground">Интерактивный электрощит</h3>
          <button 
            onClick={() => setMainPower(!mainPower)} 
            className={`px-6 py-2 flex items-center gap-2 rounded-lg font-bold text-sm transition-all ${mainPower ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,6,0.5)]' : 'bg-neutral-800 text-white hover:bg-neutral-700'}`}
          >
            <Power className="w-4 h-4" /> {mainPower ? 'Отключить ввод' : 'Включить ввод'}
          </button>
        </div>

        <div className="relative bg-neutral-200/5 dark:bg-neutral-900 rounded-2xl p-8 border border-border/50 flex flex-col gap-16 min-h-[400px]">
           
           {/* ВХОДЯЩАЯ ФАЗА */}
           <div className={`absolute top-0 left-[88px] w-1.5 h-8 transition-colors duration-500 ${mainPower ? 'bg-amber-500' : 'bg-neutral-800'}`}></div>

           {/* ВЕРХНЯЯ DIN-РЕЙКА */}
           <div className="relative w-full h-24 bg-neutral-300 dark:bg-neutral-800 border-y-2 border-neutral-400 dark:border-neutral-600 flex items-center px-4 gap-1 shadow-inner">
              
              {/* Вводной автомат 2P */}
              <div className="w-16 h-20 bg-neutral-100 dark:bg-neutral-200 rounded border-2 border-neutral-400 shadow-md flex flex-col items-center p-1 relative z-10">
                 <div className={`w-8 h-4 rounded-t mb-2 transition-colors ${mainPower ? 'bg-red-500' : 'bg-green-500'}`}></div>
                 <span className="text-[10px] font-black text-black">C40</span>
                 <span className="text-[8px] text-black">ВВОД</span>
              </div>

              {/* Реле напряжения */}
              <div className="w-16 h-20 bg-neutral-100 dark:bg-neutral-200 rounded border-2 border-neutral-400 shadow-md flex flex-col items-center p-1 relative z-10 ml-2">
                 <div className={`w-12 h-6 bg-black rounded flex items-center justify-center mb-1 transition-all ${mainPower ? 'text-red-500 shadow-[inset_0_0_5px_rgba(239,68,6,0.8)]' : 'text-neutral-700'}`}>
                    <span className="font-mono font-bold text-xs">{mainPower ? '232' : '000'}</span>
                 </div>
                 <span className="text-[8px] font-black text-black mt-1">РЕЛЕ НАПР.</span>
              </div>

              {/* Кросс-модуль / Шина */}
              <div className="w-12 h-20 bg-neutral-100 dark:bg-neutral-200 rounded border-2 border-neutral-400 shadow-md flex flex-col items-center p-1 relative z-10 ml-auto">
                 <div className="flex justify-between w-full mt-1 px-1">
                    <div className={`w-2 h-2 rounded-full ${mainPower ? 'bg-amber-500' : 'bg-neutral-400'}`}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                 </div>
                 <span className="text-[8px] font-black text-black mt-auto">КРОСС</span>
              </div>

              {/* Разводка на первой рейке */}
              {/* Ввод -> Реле */}
              <div className={`absolute top-0 left-[110px] w-6 h-1.5 transition-colors duration-500 z-0 ${mainPower ? 'bg-amber-500' : 'bg-neutral-500'}`}></div>
              {/* Реле -> Кросс */}
              <div className={`absolute top-0 left-[180px] right-[70px] h-1.5 transition-colors duration-500 z-0 ${mainPower ? 'bg-amber-500' : 'bg-neutral-500'}`}></div>
           </div>

           {/* ПРОВОД НА НИЖНЮЮ РЕЙКУ */}
           <div className={`absolute top-[120px] right-[70px] w-1.5 h-[80px] transition-colors duration-500 ${mainPower ? 'bg-amber-500' : 'bg-neutral-500'}`}></div>

           {/* НИЖНЯЯ DIN-РЕЙКА (ГРУППОВАЯ) */}
           <div className="relative w-full h-24 bg-neutral-300 dark:bg-neutral-800 border-y-2 border-neutral-400 dark:border-neutral-600 flex items-center px-4 gap-1 shadow-inner">
              
              {/* УЗО 1 */}
              <div className="w-16 h-20 bg-neutral-100 dark:bg-neutral-200 rounded border-2 border-neutral-400 shadow-md flex flex-col items-center p-1 relative z-10">
                 <div className="w-4 h-3 rounded-full bg-neutral-300 border border-neutral-400 mb-1"></div>
                 <div className={`w-8 h-4 rounded-t mb-1 transition-colors ${mainPower ? 'bg-red-500' : 'bg-green-500'}`}></div>
                 <span className="text-[10px] font-black text-black">УЗО</span>
              </div>

              {/* Гребенка (Шина) */}
              <div className={`absolute top-[-8px] left-[105px] w-[110px] h-2 rounded transition-colors duration-500 z-20 ${mainPower ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-neutral-400'}`}></div>

              {/* Автоматы группы 1 */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-20 bg-neutral-100 dark:bg-neutral-200 rounded border-2 border-neutral-400 shadow-md flex flex-col items-center p-1 relative z-10">
                   <div className={`w-4 h-3 rounded-t mb-2 transition-colors ${mainPower ? 'bg-red-500' : 'bg-green-500'}`}></div>
                   <span className="text-[8px] font-black text-black">C16</span>
                </div>
              ))}

              <div className="w-4"></div> {/* Отступ */}

              {/* УЗО 2 */}
              <div className="w-16 h-20 bg-neutral-100 dark:bg-neutral-200 rounded border-2 border-neutral-400 shadow-md flex flex-col items-center p-1 relative z-10">
                 <div className="w-4 h-3 rounded-full bg-neutral-300 border border-neutral-400 mb-1"></div>
                 <div className={`w-8 h-4 rounded-t mb-1 transition-colors ${mainPower ? 'bg-red-500' : 'bg-green-500'}`}></div>
                 <span className="text-[10px] font-black text-black">УЗО</span>
              </div>

              {/* Гребенка (Шина) 2 */}
              <div className={`absolute top-[-8px] left-[260px] w-[75px] h-2 rounded transition-colors duration-500 z-20 ${mainPower ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-neutral-400'}`}></div>

              {/* Автоматы группы 2 */}
              {[1, 2].map((i) => (
                <div key={i} className="w-8 h-20 bg-neutral-100 dark:bg-neutral-200 rounded border-2 border-neutral-400 shadow-md flex flex-col items-center p-1 relative z-10">
                   <div className={`w-4 h-3 rounded-t mb-2 transition-colors ${mainPower ? 'bg-red-500' : 'bg-green-500'}`}></div>
                   <span className="text-[8px] font-black text-black">C10</span>
                </div>
              ))}

              {/* Разводка на нижнюю рейку от Кросс-модуля */}
              <div className={`absolute top-[-25px] right-[70px] left-[50px] h-1.5 transition-colors duration-500 z-0 ${mainPower ? 'bg-amber-500' : 'bg-neutral-500'}`}></div>
              <div className={`absolute top-[-25px] left-[50px] w-1.5 h-[25px] transition-colors duration-500 z-0 ${mainPower ? 'bg-amber-500' : 'bg-neutral-500'}`}></div>
              <div className={`absolute top-[-25px] left-[230px] w-1.5 h-[25px] transition-colors duration-500 z-0 ${mainPower ? 'bg-amber-500' : 'bg-neutral-500'}`}></div>
           </div>

        </div>
      </div>
    </div>
  )
}
