import { createFileRoute, Link } from '@tanstack/react-router'
import { Zap, ShieldCheck, Timer, Calculator, Waypoints, MessageSquare, ArrowRight, Bot } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <div className="animate-in fade-in duration-500 pb-24">
      
      {/* ОБНОВЛЕННЫЙ HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 sm:p-10 md:p-12 mb-8 sm:mb-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        
        {/* Инженерная сетка на фоне (Миллиметровка) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Неоновые эффекты */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Текстовая часть */}
        <div className="relative z-10 flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
          <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20 mx-auto md:mx-0 w-max shadow-sm">
            <Zap className="w-3.5 h-3.5" /> ВольтПро 3.1
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
            Электромонтаж <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600 dark:to-emerald-400 drop-shadow-sm">
              нового уровня
            </span>
          </h1>
          
          <p className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed">
            Забудь про рутину. ИИ-сметчик, точные калькуляторы и профессиональная база знаний в твоем кармане.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 pt-2">
            <Link to="/estimator" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 text-sm">
              <Bot className="w-5 h-5" /> ИИ-сметчик
            </Link>
            <Link to="/calculators" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-background border border-border text-foreground hover:bg-muted transition-colors font-bold text-sm shadow-sm">
              <Calculator className="w-5 h-5" /> Калькуляторы
            </Link>
          </div>
        </div>

        {/* НОВЫЙ ВИЗУАЛ: Парящая панель ИИ-сметчика */}
        <div className="hidden md:flex relative z-10 w-full max-w-[320px] items-center justify-center shrink-0 perspective-[1000px]">
          {/* Стеклянная карточка (Glassmorphism) */}
          <div className="relative w-full bg-background/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl transform md:rotate-y-[-10deg] md:rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
            
            {/* Шапка карточки */}
            <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-sm text-foreground">Анализ проекта</span>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </div>

            {/* Тело карточки (имитация проверки ГОСТ/ПУЭ) */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">ГОСТ Р 50571.5.52</span>
                  <span className="font-bold text-foreground animate-pulse">Проверка...</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-1.5 rounded-full w-2/3 animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Расчет сечения кабеля</span>
                  <span className="font-bold text-emerald-500">Успешно</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full w-full"></div>
                </div>
              </div>
            </div>

            {/* Подвал карточки */}
            <div className="pt-4 border-t border-border flex items-center justify-between bg-muted/30 -mx-6 -mb-6 p-4 rounded-b-2xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-foreground">100% ПУЭ</span>
              </div>
              <span className="text-xs font-bold text-primary">Готово</span>
            </div>

          </div>
        </div>
      </div>

      {/* КАРТОЧКИ СО СТАТИСТИКОЙ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12 relative z-10">
        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:border-primary/50 transition-colors">
          <div className="bg-primary/10 p-3 rounded-xl shrink-0">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-foreground">1240+</p>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">Расчётов в день</p>
          </div>
        </div>
        
        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:border-primary/50 transition-colors">
          <div className="bg-primary/10 p-3 rounded-xl shrink-0">
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-foreground">100%</p>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">Соответствие ПУЭ</p>
          </div>
        </div>

        <div className="bg-card border border-border p-5 sm:p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:border-primary/50 transition-colors">
          <div className="bg-primary/10 p-3 rounded-xl shrink-0">
            <Timer className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-foreground">&lt; 8 сек</p>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">Среднее время</p>
          </div>
        </div>
      </div>

      {/* БЫСТРЫЕ ИНСТРУМЕНТЫ */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Быстрые инструменты</h2>
        <p className="text-sm text-muted-foreground">Открывайте нужное в один клик.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Link to="/calculators" className="group bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6" />
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Калькуляторы</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">Сечение кабеля, падение напряжения, защита, заземление.</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link to="/schemes" className="group bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <Waypoints className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6" />
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Описание схем</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">Практические руководства и правила электромонтажа.</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link to="/chat" className="group bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6" />
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Чат с ИИ</h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">Подскажет по ПУЭ, ГОСТ и поможет с расчётом на объекте.</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary">
            Открыть <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

    </div>
  )
}
