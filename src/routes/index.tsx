import { createFileRoute, Link } from '@tanstack/react-router'
import { Zap, ShieldCheck, Timer, Calculator, Waypoints, MessageSquare, ArrowRight, Bot } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-24 relative">
      
      {/* 3D HERO SECTION */}
      <div className="relative overflow-hidden rounded-[2rem] bg-card/60 backdrop-blur-2xl border border-border/50 p-6 sm:p-10 lg:p-10 xl:p-12 mb-8 sm:mb-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 shadow-2xl shadow-primary/5">
        
        {/* Инженерная сетка на фоне (оставляем для технологичности) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Неоновый блик */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* ТЕКСТОВАЯ ЧАСТЬ */}
        <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[55%] xl:w-[60%] space-y-6">
          
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
            <Zap className="w-4 h-4" /> ВольтПро
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            Электромонтаж <br className="hidden sm:block"/>
            <span className="text-emerald-500 drop-shadow-md">
              нового уровня
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Забудь про рутину. ИИ-сметчик, точные калькуляторы и профессиональная база знаний в твоем кармане.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4 pt-4">
            <Link to="/estimator" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] transition-all duration-300 text-sm">
              <Bot className="w-5 h-5" /> ИИ-сметчик
            </Link>
            <Link to="/calculators" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-card/80 backdrop-blur-md border border-border text-foreground hover:bg-muted/80 hover:shadow-lg transition-all duration-300 font-bold text-sm">
              <Calculator className="w-5 h-5" /> Калькуляторы
            </Link>
          </div>
        </div>

        {/* ПАНЕЛЬ ИИ-СМЕТЧИКА (3D Карточка) */}
        <div className="relative z-10 w-full max-w-[340px] lg:w-[40%] xl:w-[340px] mx-auto lg:mx-0 shrink-0 mt-6 lg:mt-0 perspective-1000">
          <div className="w-full bg-card/80 backdrop-blur-xl border border-border/60 rounded-3xl p-5 shadow-2xl hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(var(--primary),0.3)] hover:border-primary/40 transition-all duration-500 overflow-hidden group">
            
            {/* Блик внутри карточки (эффект стекла) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Шапка карточки */}
            <div className="flex items-center justify-between mb-5 border-b border-border/50 pb-4 relative z-10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="bg-primary/20 p-2.5 rounded-xl shrink-0 shadow-inner">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-sm text-foreground truncate">Анализ проекта</span>
              </div>
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse shrink-0 ml-2 shadow-[0_0_12px_rgba(16,185,129,0.9)]"></span>
            </div>

            {/* Тело карточки */}
            <div className="space-y-6 mb-6 relative z-10">
              <div>
                <div className="flex items-center justify-between text-xs mb-2 gap-2">
                  <span className="text-muted-foreground truncate mr-2 font-medium">ГОСТ Р 50571.5.52</span>
                  <span className="font-bold text-foreground animate-pulse whitespace-nowrap shrink-0">Проверка...</span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="bg-primary h-2 rounded-full w-2/3 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_10px_rgba(var(--primary),0.8)]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-2 gap-2">
                  <span className="text-muted-foreground truncate mr-2 font-medium">Расчет сечения кабеля</span>
                  <span className="font-bold text-emerald-500 whitespace-nowrap shrink-0">Успешно</span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden shadow-inner">
                  <div className="bg-emerald-500 h-2 rounded-full w-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                </div>
              </div>
            </div>

            {/* Подвал карточки */}
            <div className="pt-4 border-t border-border/50 flex items-center justify-between bg-foreground/5 -mx-5 -mb-5 p-4 sm:px-5 rounded-b-3xl relative z-10">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 drop-shadow-md" />
                <span className="text-xs font-bold text-foreground truncate">100% ПУЭ</span>
              </div>
              <span className="text-xs font-bold text-primary whitespace-nowrap shrink-0 drop-shadow-md">Готово</span>
            </div>

          </div>
        </div>
      </div>

      {/* 3D КАРТОЧКИ СО СТАТИСТИКОЙ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 relative z-10">
        <div className="bg-card/60 backdrop-blur-xl border border-border/50 p-6 rounded-3xl flex items-center gap-5 shadow-lg hover:-translate-y-2 hover:shadow-xl hover:border-primary/40 transition-all duration-300 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="bg-primary/10 p-3.5 rounded-2xl shrink-0 shadow-inner group-hover:bg-primary/20 transition-colors relative z-10">
            <Zap className="w-7 h-7 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl font-black text-foreground drop-shadow-sm">1240+</p>
            <p className="text-[11px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Расчётов в день</p>
          </div>
        </div>
        
        <div className="bg-card/60 backdrop-blur-xl border border-border/50 p-6 rounded-3xl flex items-center gap-5 shadow-lg hover:-translate-y-2 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="bg-emerald-500/10 p-3.5 rounded-2xl shrink-0 shadow-inner group-hover:bg-emerald-500/20 transition-colors relative z-10">
            <ShieldCheck className="w-7 h-7 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl font-black text-foreground drop-shadow-sm">100%</p>
            <p className="text-[11px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Точность по ПУЭ</p>
          </div>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border/50 p-6 rounded-3xl flex items-center gap-5 shadow-lg hover:-translate-y-2 hover:shadow-xl hover:border-primary/40 transition-all duration-300 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="bg-primary/10 p-3.5 rounded-2xl shrink-0 shadow-inner group-hover:bg-primary/20 transition-colors relative z-10">
            <Timer className="w-7 h-7 text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl font-black text-foreground drop-shadow-sm">&lt; 8 сек</p>
            <p className="text-[11px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Среднее время</p>
          </div>
        </div>
      </div>

      {/* БЫСТРЫЕ ИНСТРУМЕНТЫ */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left relative z-10">
        <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-2 tracking-tight">Быстрые инструменты</h2>
        <p className="text-base text-muted-foreground">Открывайте нужное в один клик.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative z-10">
        <Link to="/calculators" className="group bg-card/60 backdrop-blur-xl border border-border/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[50px] rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-300">
            <Calculator className="w-7 h-7 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-3 relative z-10">Калькуляторы</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">Сечение кабеля, падение напряжения, защита, заземление и другие точные расчеты.</p>
          
          <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary relative z-10">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Link>

        <Link to="/schemes" className="group bg-card/60 backdrop-blur-xl border border-border/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[50px] rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-300">
            <Waypoints className="w-7 h-7 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-3 relative z-10">Описание схем</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">Практические руководства, типовые решения и строгие правила электромонтажа.</p>
          
          <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary relative z-10">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Link>

        <Link to="/chat" className="group bg-card/60 backdrop-blur-xl border border-border/50 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[50px] rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-300">
            <MessageSquare className="w-7 h-7 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-3 relative z-10">Чат с ИИ</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 relative z-10">Нейросеть подскажет по ПУЭ, ГОСТ и поможет с расчётом прямо на объекте.</p>
          
          <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary relative z-10">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </Link>
      </div>

    </div>
  )
}
