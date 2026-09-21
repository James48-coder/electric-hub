import { createFileRoute, Link } from '@tanstack/react-router'
import { Zap, ShieldCheck, Timer, Calculator, Waypoints, MessageSquare, ArrowRight, Bot } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-24 relative">
      
      {/* СТРОГИЙ HERO SECTION + 3D ХОВЕРЫ */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 sm:p-10 lg:p-10 xl:p-12 mb-8 sm:mb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 shadow-sm hover:shadow-xl transition-shadow duration-500">
        
        {/* Инженерная сетка на фоне (оставляем для технологичности) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* ТЕКСТОВАЯ ЧАСТЬ */}
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[55%] xl:w-[60%] space-y-6">
          
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 shadow-sm">
            <Zap className="w-3.5 h-3.5" /> ВольтПро
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            Электромонтаж <br className="hidden sm:block"/>
            <span className="text-emerald-500 drop-shadow-sm">
              нового уровня
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Забудь про рутину. ИИ-сметчик, точные калькуляторы и профессиональная база знаний в твоем кармане.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3 sm:gap-4 pt-2">
            <Link to="/estimator" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-background border border-border text-foreground hover:bg-muted transition-all duration-300 font-bold text-sm shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-primary/50">
              <Bot className="w-5 h-5" /> ИИ-сметчик
            </Link>
            <Link to="/calculators" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-background border border-border text-foreground hover:bg-muted transition-all duration-300 font-bold text-sm shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-primary/50">
              <Calculator className="w-5 h-5" /> Калькуляторы
            </Link>
          </div>
        </div>

        {/* ПАНЕЛЬ ИИ-СМЕТЧИКА (Строгая 3D Карточка) */}
        <div className="relative z-10 w-full max-w-[340px] lg:w-[40%] xl:w-[340px] mx-auto lg:mx-0 shrink-0 mt-6 lg:mt-0 perspective-1000">
          <div className="w-full bg-background border border-border rounded-2xl p-5 shadow-lg hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 transition-all duration-500 overflow-hidden group">
            
            {/* Шапка карточки */}
            <div className="flex items-center justify-between mb-5 border-b border-border pb-4 relative z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-primary/10 p-2.5 rounded-xl shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-sm text-foreground truncate">Анализ проекта</span>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0 ml-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </div>

            {/* Тело карточки */}
            <div className="space-y-5 mb-5 relative z-10">
              <div>
                <div className="flex items-center justify-between text-xs mb-2 gap-2">
                  <span className="text-muted-foreground truncate mr-2">ГОСТ Р 50571.5.52</span>
                  <span className="font-bold text-foreground animate-pulse whitespace-nowrap shrink-0">Проверка...</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-1.5 rounded-full w-2/3 animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-2 gap-2">
                  <span className="text-muted-foreground truncate mr-2">Расчет сечения кабеля</span>
                  <span className="font-bold text-emerald-500 whitespace-nowrap shrink-0">Успешно</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-full"></div>
                </div>
              </div>
            </div>

            {/* Подвал карточки */}
            <div className="pt-4 border-t border-border flex items-center justify-between bg-muted/20 -mx-5 -mb-5 p-4 sm:px-5 rounded-b-2xl relative z-10">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-bold text-foreground truncate">100% ПУЭ</span>
              </div>
              <span className="text-xs font-bold text-primary whitespace-nowrap shrink-0">Готово</span>
            </div>

          </div>
        </div>
      </div>

      {/* 3D КАРТОЧКИ СО СТАТИСТИКОЙ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12 relative z-10">
        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-primary/40 transition-all duration-300 group overflow-hidden relative">
          <div className="bg-primary/10 p-3 rounded-xl shrink-0 group-hover:bg-primary/20 transition-colors relative z-10">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-xl sm:text-2xl font-black text-foreground">1240+</p>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Расчётов в день</p>
          </div>
        </div>
        
        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 group overflow-hidden relative">
          <div className="bg-emerald-500/10 p-3 rounded-xl shrink-0 group-hover:bg-emerald-500/20 transition-colors relative z-10">
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <p className="text-xl sm:text-2xl font-black text-foreground">100%</p>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Соответствие ПУЭ</p>
          </div>
        </div>

        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-primary/40 transition-all duration-300 group overflow-hidden relative">
          <div className="bg-primary/10 p-3 rounded-xl shrink-0 group-hover:bg-primary/20 transition-colors relative z-10">
            <Timer className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-xl sm:text-2xl font-black text-foreground">&lt; 8 сек</p>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Среднее время</p>
          </div>
        </div>
      </div>

      {/* БЫСТРЫЕ ИНСТРУМЕНТЫ */}
      <div className="mb-6 sm:mb-8 relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Быстрые инструменты</h2>
        <p className="text-sm text-muted-foreground">Открывайте нужное в один клик.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 relative z-10">
        <Link to="/calculators" className="group bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 relative z-10">Калькуляторы</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">Сечение кабеля, падение напряжения, защита, заземление.</p>
          
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary relative z-10">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Link>

        <Link to="/schemes" className="group bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300">
            <Waypoints className="w-6 h-6 text-primary" />
          </div>
          
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 relative z-10">Описание схем</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">Практические руководства и правила электромонтажа.</p>
          
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary relative z-10">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Link>

        <Link to="/chat" className="group bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 relative z-10">Чат с ИИ</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">Подскажет по ПУЭ, ГОСТ и поможет с расчётом на объекте.</p>
          
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary relative z-10">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Link>
      </div>

    </div>
  )
}
