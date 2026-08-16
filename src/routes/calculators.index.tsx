import { createFileRoute, Link } from '@tanstack/react-router'
import { 
  Cable, 
  TrendingDown, 
  CircleDashed, 
  Sigma, 
  Lightbulb, 
  Cpu, 
  ShieldAlert, 
  Calculator,
  Network,
  Palette,
  Plug,
  ShieldPlus
} from 'lucide-react'

export const Route = createFileRoute('/calculators/')({
  component: CalculatorsPage,
})

function CalculatorsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-6xl animate-in fade-in duration-500 pb-24">
      <div className="mb-6 sm:mb-8">
        <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider mb-2 font-mono">
          Полный инженерный набор: расчёты, проектирование трасс, подбор оборудования и распиновки.
        </p>
      </div>

      {/* Навигация (теперь свайпается на мобилках и не ломает строки) */}
      <div className="flex items-center gap-4 sm:gap-6 border-b border-border pb-3 sm:pb-4 mb-6 sm:mb-8 text-xs sm:text-sm font-medium text-muted-foreground overflow-x-auto whitespace-nowrap scrollbar-hide">
        <a href="#basic" className="hover:text-foreground cursor-pointer transition-colors">Базовые</a>
        <a href="#design" className="hover:text-foreground cursor-pointer transition-colors">Проектирование</a>
        <a href="#equipment" className="hover:text-foreground cursor-pointer transition-colors">Оборудование</a>
        <a href="#schemes" className="hover:text-foreground cursor-pointer transition-colors">Схемы и распиновка</a>
      </div>

      <div className="space-y-10 sm:space-y-12">
        {/* Секция: Базовые */}
        <section id="basic">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Базовые</h2>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">2 инстр.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Cable className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Сечение кабеля по мощности</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Подбор сечения и автомата по нагрузке (Cu/Al, 220/380 В).</p>
              </div>
              <Link to="/calculators/cable" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-yellow-500/10 text-yellow-500">
                  <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors flex items-center gap-2 text-foreground">
                  Падение напряжения
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Проверка ΔU на линии с учётом длины и тока.</p>
              </div>
              <Link to="/calculators/voltage" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>
          </div>
        </section>

        {/* Секция: Проектирование */}
        <section id="design">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Проектирование</h2>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">4 инстр.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <CircleDashed className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Заполняемость гофры/трубы</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Допустимое количество кабелей в трассе по нормам.</p>
              </div>
              <Link to="/calculators/gofra" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Sigma className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Расчёт контура заземления</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Сопротивление растеканию по типу грунта и электродов.</p>
              </div>
              <Link to="/calculators/grounding" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Расчёт освещенности</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Определение светового потока и числа светильников по СП 52.13330.</p>
              </div>
              <Link to="/calculators/light" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <ShieldPlus className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Проектирование ДСУП</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Доп. электробезопасность во влажных зонах. Выбор КУП и сечения проводников по ПУЭ гл. 1.7.</p>
              </div>
              <Link to="/calculators/dsup" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>
          </div>
        </section>

        {/* Секция: Оборудование */}
        <section id="equipment">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Оборудование</h2>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">4 инстр.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Cpu className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Подбор конденсаторов для двигателя</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Ёмкость пускового и рабочего конденсатора 1Ф/3Ф.</p>
              </div>
              <Link to="/calculators/capacitor" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <ShieldAlert className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Подбор УЗО / Диф. автомата</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Выбор тока утечки и номинала по правилам ПУЭ гл. 7.1.</p>
              </div>
              <Link to="/calculators/rcd" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Расчёт суммарной нагрузки</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Суммарная мощность и ток с коэффициентом одновременности по СП 256.</p>
              </div>
              <Link to="/calculators/load" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Plug className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Подбор кабельных муфт</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Выбор концевых и соединительных муфт (термоусадка, заливные) по сечению.</p>
              </div>
              <Link to="/calculators/joints" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>
          </div>
        </section>

        {/* Секция: Схемы и распиновка */}
        <section id="schemes">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Схемы и распиновка</h2>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">2 инстр.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Network className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Распиновка RJ-45 (Интернет)</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Схемы обжима витой пары T568A и T568B (прямой и перекрестный).</p>
              </div>
              <Link to="/calculators/rj45" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>

            <div className="group relative flex flex-col justify-between p-4 sm:p-6 bg-card rounded-[var(--radius)] border border-border shadow-sm hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex items-center justify-center rounded-lg p-2 bg-primary/10 text-primary">
                  <Palette className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 group-hover:text-primary transition-colors text-foreground">Цветовая маркировка</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Стандарты маркировки проводов (фаза, ноль, земля) по ПУЭ и ГОСТ.</p>
              </div>
              <Link to="/calculators/colors" className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-auto">
                Открыть
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
