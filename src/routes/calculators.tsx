import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Cable,
  TrendingDown,
  Workflow,
  Sigma,
  Cpu,
  ToggleRight,
  Palette,
  ArrowLeft,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { CableCalculator } from "@/components/cable-calculator";
import VoltageDropCalculator from "@/components/VoltageDropCalculator";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/calculators")({
  component: Page,
});

type ToolId =
  | "cable-section"
  | "voltage-drop"
  | "conduit-fill"
  | "grounding"
  | "motor-caps"
  | "three-way"
  | "color-codes";

type Tool = {
  id: ToolId;
  title: string;
  description: string;
  icon: LucideIcon;
  warn?: boolean;
  ready?: boolean;
};

type Category = {
  id: string;
  label: string;
  tools: Tool[];
};

const CATEGORIES: Category[] = [
  {
    id: "basic",
    label: "Базовые",
    tools: [
      {
        id: "cable-section",
        title: "Сечение кабеля по мощности",
        description: "Подбор сечения и автомата по нагрузке (Cu/Al, 220/380 В).",
        icon: Cable,
        ready: true,
      },
      {
        id: "voltage-drop",
        title: "Падение напряжения",
        description: "Проверка ΔU на линии с учётом длины и тока.",
        icon: TrendingDown,
        ready: true, // Сделали инструмент активным
      },
    ],
  },
  {
    id: "routing",
    label: "Проектирование",
    tools: [
      {
        id: "conduit-fill",
        title: "Заполняемость гофры/лотка",
        description: "Допустимое количество кабелей в трассе по нормам.",
        icon: Workflow,
      },
      {
        id: "grounding",
        title: "Расчёт контура заземления",
        description: "Сопротивление растеканию по типу грунта и электродов.",
        icon: Sigma,
      },
    ],
  },
  {
    id: "equipment",
    label: "Оборудование",
    tools: [
      {
        id: "motor-caps",
        title: "Подбор конденсаторов для двигателя",
        description: "Ёмкость пускового и рабочего конденсатора 1Ф/3Ф.",
        icon: Cpu,
      },
    ],
  },
  {
    id: "wiring",
    label: "Схемы и распиновка",
    tools: [
      {
        id: "three-way",
        title: "Проходные выключатели",
        description: "Схемы управления светом из 2-х и 3-х мест.",
        icon: ToggleRight,
      },
      {
        id: "color-codes",
        title: "Цветовая маркировка и RJ45",
        description: "Маркировка жил, T568A/B и распиновка коннекторов.",
        icon: Palette,
      },
    ],
  },
];

function Page() {
  const [activeCat, setActiveCat] = useState<string>("basic");
  const [openTool, setOpenTool] = useState<ToolId | null>(null);

  if (openTool === "cable-section") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpenTool(null)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Сечение кабеля по мощности
          </h1>
          <p className="text-muted-foreground text-sm">
            Подбор сечения и номинала автомата по практическим порогам.
          </p>
        </header>
        <CableCalculator />
      </div>
    );
  }
if (openTool === "voltage-drop") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpenTool(null)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Падение напряжения
          </h1>
          <p className="text-muted-foreground text-sm">
            Проверка ΔU на линии с учётом длины и тока.
          </p>
        </header>
        <VoltageDropCalculator />
      </div>
    );
  }
  
  return (
    <div className="mx-auto w-full max-w-6xl py-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Калькуляторы</h1>
        <p className="text-muted-foreground">
          Полный инженерный набор: расчёты, проектирование трасс, подбор оборудования и распиновки.
        </p>
      </header>

      {/* Sticky sub-nav */}
      <nav className="sticky top-2 z-20">
        <div className="glass neu rounded-2xl p-1.5 flex gap-1 overflow-x-auto">
          {CATEGORIES.map((c) => {
            const active = activeCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCat(c.id);
                  document
                    .getElementById(`cat-${c.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={
                  "whitespace-nowrap rounded-xl px-4 h-8 text-sm font-medium transition-all " +
                  (active
                    ? "bg-primary text-primary-foreground shadow active:bg-primary/80"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/40 active:bg-accent/60")
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Categories */}
      <div className="space-y-10">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="space-y-4 scroll-mt-20">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-semibold">{cat.label}</h2>
              <span className="text-xs text-muted-foreground">
                {cat.tools.length} инстр.
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onOpen={() => tool.ready && setOpenTool(tool.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ToolCard({ tool, onOpen }: { tool: Tool; onOpen: () => void }) {
  const Icon = tool.icon;
  return (
    <button
      onClick={onOpen}
      disabled={!tool.ready}
      className="group glass neu rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 active:shadow-inner disabled:cursor-not-allowed disabled:opacity-80"
    >
      <div className="flex items-start gap-4">
        <div className="neu-sm relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20 group-hover:text-primary">
          <Icon className="h-6 w-6" />
          {tool.warn && (
            <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-amber-500/90 text-white shadow">
              <AlertTriangle className="h-3 w-3" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold leading-tight">{tool.title}</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            {tool.description}
          </p>
          <div className="pt-2">
            {tool.ready ? (
              <span className="inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                Открыть
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Скоро
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
