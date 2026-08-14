import { createFileRoute, Link } from '@tanstack/react-router'
import { 
  Cable, 
  TrendingDown, 
  CircleDashed, 
  Sigma, 
  Lightbulb, 
  Cpu, 
  ShieldAlert, 
  Calculator 
} from 'lucide-react'

export const Route = createFileRoute('/calculators')({
  component: CalculatorsPage,
})

function CalculatorsPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl animate-in fade-in duration-500">
      <div className="mb-8">
        <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2 font-mono">
          Полный инженерный набор: расчёты, проектирование трасс, подбор оборудования и распиновки.
        </p>
      </div>

      <div className="flex items-center gap-6 border-b border-border pb-4 mb-8 text-sm font-medium text-muted-foreground overflow-x-auto">
        <span className="text-foreground border-b-2 border-primary pb-4 -mb-[17px] cursor-pointer">Базовые</span>
        <span className="hover:text-foreground cursor-pointer transition-colors">Проектирование</span>
        <span className="hover:text-foreground cursor-pointer transition-colors">Оборудование</span>
        <span className="hover:text-foreground cursor-pointer transition-colors">Схемы и распиновка</span>
      </div>

      <div className="space-y-12">
        {/* Секция: Базовые */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Базовые</h2>
            <span className="text-xs text-muted-foreground font-mono">2 инстр.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group relative flex flex-col justify-between p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Cable className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">Сечение кабеля по мощности</h3>
                <p className="text-sm text-muted-foreground mb-6">Подбор сечения и автомата по нагрузке (Cu/Al, 220/380 В).</p>
              </div>
              <Link to="/calculators" className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-yellow-500/10 text-yellow-500">
                  <TrendingDown className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  Падение напряжения
                </h3>
                <p className="text-sm text-muted-foreground mb-6">Проверка ΔU на линии с учётом длины и тока.</p>
              </div>
              <Link to="/calculators" className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Открыть
              </Link>
            </div>
          </div>
        </section>

        {/* Секция: Проектирование */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Проектирование</h2>
            <span className="text-xs text-muted-foreground font-mono">3 инстр.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group relative flex flex-col justify-between p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <CircleDashed className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">Заполняемость гофры/трубы</h3>
                <p className="text-sm text-muted-foreground mb-6">Допустимое количество кабелей в трассе по нормам.</p>
              </div>
              <Link to="/calculators" className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Sigma className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">Расчёт контура заземления</h3>
                <p className="text-sm text-muted-foreground mb-6">Сопротивление растеканию по типу грунта и электродов.</p>
              </div>
              <Link to="/calculators" className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">Расчёт освещенности</h3>
                <p className="text-sm text-muted-foreground mb-6">Определение светового потока и числа светильников по СП 52.13330.</p>
              </div>
              <Link to="/calculators" className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Открыть
              </Link>
            </div>
          </div>
        </section>

        {/* Секция: Оборудование */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Оборудование</h2>
            <span className="text-xs text-muted-foreground font-mono">4 инстр.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group relative flex flex-col justify-between p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">Подбор конденсаторов для двигателя</h3>
                <p className="text-sm text-muted-foreground mb-6">Ёмкость пускового и рабочего конденсатора 1Ф/3Ф.</p>
              </div>
              <Link to="/calculators" className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">Подбор УЗО / Диф. автомата</h3>
                <p className="text-sm text-muted-foreground mb-6">Выбор тока утечки и номинала по правилам ПУЭ гл. 7.1.</p>
              </div>
              <Link to="/calculators" className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Calculator className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">Расчёт суммарной нагрузки</h3>
                <p className="text-sm text-muted-foreground mb-6">Суммарная мощность и ток с коэффициентом одновременности по СП 256.</p>
              </div>
              <Link to="/calculators" className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                Открыть
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
