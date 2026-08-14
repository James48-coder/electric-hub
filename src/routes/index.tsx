import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, Shield, Clock, Calculator, Network, MessageSquare, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/spotlight-card";

export const Route = createFileRoute("/")({
  component: HomePage,
});

export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl py-6 space-y-8 text-foreground">
      
      {/* Верхний блок статистики (Обернут в Spotlight) */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SpotlightCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">1240+</div>
              <div className="text-xs text-muted-foreground">расчётов в день</div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs text-muted-foreground">соответствие ПУЭ</div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">&lt; 8 сек</div>
              <div className="text-xs text-muted-foreground">среднее время</div>
            </div>
          </div>
        </SpotlightCard>
      </div>

      <header className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Быстрые инструменты</h2>
        <p className="text-xs text-muted-foreground">Открывайте нужное в один клик.</p>
      </header>

      {/* Карточки быстрых инструментов (Обернуты в Spotlight) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        
        <SpotlightCard>
          <Link
            to="/calculators"
            className="group flex h-full flex-col justify-between p-6 outline-none"
          >
            <div className="space-y-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Calculator className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Калькуляторы</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Сечение кабеля, падение напряжения, защита, заземление.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center border-t border-border pt-4 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
              Открыть <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </Link>
        </SpotlightCard>

        <SpotlightCard>
          <Link
            to="/schemes"
            className="group flex h-full flex-col justify-between p-6 outline-none"
          >
            <div className="space-y-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Network className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Описание схем</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Практические руководства и правила электромонтажа
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center border-t border-border pt-4 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
              Открыть <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </Link>
        </SpotlightCard>

        <SpotlightCard>
          <Link
            to="/chat"
            className="group flex h-full flex-col justify-between p-6 outline-none"
          >
            <div className="space-y-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Чат с ИИ</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Подскажет по ПУЭ, ГОСТ и поможет с расчётом на объекте.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center border-t border-border pt-4 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
              Открыть <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </Link>
        </SpotlightCard>

      </div>
    </div>
  );
}
