import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Shield, Clock, Calculator, Network, MessageSquare, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl py-6 space-y-8 text-slate-100">
      {/* Верхний блок статистики со скриншота */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass neu rounded-2xl p-6 border border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 grid place-items-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">1240+</div>
              <div className="text-xs text-slate-400">расчётов в день</div>
            </div>
          </div>
        </div>

        <div className="glass neu rounded-2xl p-6 border border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 grid place-items-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs text-slate-400">соответствие ПУЭ</div>
            </div>
          </div>
        </div>

        <div className="glass neu rounded-2xl p-6 border border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 grid place-items-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">&lt; 8 сек</div>
              <div className="text-xs text-slate-400">среднее время</div>
            </div>
          </div>
        </div>
      </div>

      <header className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Быстрые инструменты</h2>
        <p className="text-xs text-slate-400">Открывайте нужное в один клик.</p>
      </header>

      {/* Карточки быстрых инструментов */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/calculators"
          className="group glass neu rounded-2xl p-6 text-left border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 transition-all hover:-translate-y-0.5 hover:shadow-xl flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 grid place-items-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Калькуляторы</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Сечение кабеля, падение напряжения, защита, заземление.
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:translate-x-1 transition-transform pt-4 mt-4 border-t border-slate-800/80">
            Открыть <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>

        {/* Обновленная карточка схем */}
        <Link
          to="/schemes"
          className="group glass neu rounded-2xl p-6 text-left border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 transition-all hover:-translate-y-0.5 hover:shadow-xl flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 grid place-items-center">
              <Network className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Описание схем</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Практические руководства и правила электромонтажа
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:translate-x-1 transition-transform pt-4 mt-4 border-t border-slate-800/80">
            Открыть <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>

        <Link
          to="/chat"
          className="group glass neu rounded-2xl p-6 text-left border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 transition-all hover:-translate-y-0.5 hover:shadow-xl flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 grid place-items-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Чат с ИИ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Подскажет по ПУЭ, ГОСТ и поможет с расчётом на объекте.
              </p>
            </div>
          </div>
          <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:translate-x-1 transition-transform pt-4 mt-4 border-t border-slate-800/80">
            Открыть <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}
