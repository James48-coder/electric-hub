import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Shield, Clock, Calculator, Network, MessageSquare, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";

export const Route = createFileRoute("/")({
  component: HomePage,
});

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 text-foreground">
      
      {/* Верхний блок статистики (Обернут в Spotlight) */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <SpotlightCard className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold">1240+</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">расчётов в день</div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold">100%</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">соответствие ПУЭ</div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold">&lt; 8 сек</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">среднее время</div>
            </div>
          </div>
        </SpotlightCard>
      </div>

      <header className="space-y-1 sm:space-y-2 pt-2 sm:pt-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Быстрые инструменты</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">Открывайте нужное в один клик.</p>
      </header>

      {/* Карточки быстрых инструментов (Обернуты в Spotlight) */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        
        <SpotlightCard>
          <Link
            to="/calculators"
            className="group flex h-full flex-col justify-between p-4 sm:p-6 outline-none"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20 shrink-0">
                <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">Калькуляторы</h3>
                <p className="text-[10px] sm:text-xs leading-relaxed text-muted-foreground">
                  Сечение кабеля, падение напряжения, защита, заземление.
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex items-center border-t border-border pt-3 sm:pt-4 text-xs sm:text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
              Открыть <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </div>
          </Link>
        </SpotlightCard>

        <SpotlightCard>
          <Link
            to="/schemes"
            className="group flex h-full flex-col justify-between p-4 sm:p-6 outline-none"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20 shrink-0">
                <Network className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">Описание схем</h3>
                <p className="text-[10px] sm:text-xs leading-relaxed text-muted-foreground">
                  Практические руководства и правила электромонтажа.
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex items-center border-t border-border pt-3 sm:pt-4 text-xs sm:text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
              Открыть <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </div>
          </Link>
        </SpotlightCard>

        <SpotlightCard>
          <Link
            to="/chat"
            className="group flex h-full flex-col justify-between p-4 sm:p-6 outline-none"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20 shrink-0">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">Чат с ИИ</h3>
                <p className="text-[10px] sm:text-xs leading-relaxed text-muted-foreground">
                  Подскажет по ПУЭ, ГОСТ и поможет с расчётом на объекте.
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex items-center border-t border-border pt-3 sm:pt-4 text-xs sm:text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
              Открыть <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </div>
          </Link>
        </SpotlightCard>

      </div>
    </div>
  );
}
