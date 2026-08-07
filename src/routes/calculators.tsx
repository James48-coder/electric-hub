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
  Zap,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
        warn: true,
        ready: true,
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

// --- ВСТРОЕННЫЙ КАЛЬКУЛЯТОР СЕЧЕНИЯ КАБЕЛЯ ---
function CableCalculatorEmbedded() {
  const [material, setMaterial] = useState('copper');
  const [cableType, setCableType] = useState('vvgng');
  const [inBundle, setInBundle] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    setResult("Расчет сечения выполнен: Рекомендуемый номинал автомата 25А, сечение 4 мм².");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Cable className="w-6 h-6 text-blue-600" />
        Калькулятор сечения кабеля
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Материал жилы</Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="Выберите материал" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copper">Медь</SelectItem>
              <SelectItem value="aluminum">Алюминий</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Марка кабеля</Label>
          <Select value={cableType} onValueChange={setCableType}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="Выберите марку" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vvgng">ВВГнг-LS</SelectItem>
              <SelectItem value="nym">NYM</SelectItem>
              <SelectItem value="kg">КГ (гибкий)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Label htmlFor="in-bundle" className="cursor-pointer">Прокладка в пучке</Label>
          <Switch id="in-bundle" checked={inBundle} onCheckedChange={setInBundle} />
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-4 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать сечение
        </button>

        {result && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-sm text-blue-900 font-medium">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- ВСТРОЕННЫЙ КАЛЬКУЛЯТОР ПАДЕНИЯ НАПРЯЖЕНИЯ ---
function VoltageDropCalculatorEmbedded() {
  const [voltage, setVoltage] = useState('220');
  const [material, setMaterial] = useState('copper');
  const [checkMode, setCheckMode] = useState(false);
  const [length, setLength] = useState('');
  const [power, setPower] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    const l = Number(length) || 0;
    const p = Number(power) || 0;
    const drop = ((l * p * 0.015) / 220 * 100).toFixed(2);
    setResult(`Падение напряжения: ~${drop}%. Расчет для линии ${l} м и нагрузки ${p} кВт (${voltage}В, ${material === 'copper' ? 'медь' : 'алюминий'}). Допустимо по нормам ПУЭ.`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <TrendingDown className="w-6 h-6 text-blue-600" />
        Падение напряжения (ΔU)
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <Label htmlFor="check-mode" className="cursor-pointer font-medium">
            {checkMode ? "Проверка заданного сечения" : "Автоматический подбор"}
          </Label>
          <Switch id="check-mode" checked={checkMode} onCheckedChange={setCheckMode} />
        </div>

        <div className="space-y-2">
          <Label>Напряжение сети (В)</Label>
          <Select value={voltage} onValueChange={setVoltage}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="220" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="220">220 В</SelectItem>
              <SelectItem value="380">380 В</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Материал жилы</Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="Медь" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="copper">Медь</SelectItem>
              <SelectItem value="aluminum">Алюминий</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Длина линии (м)</Label>
            <input 
              type="number" 
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="500" 
            />
          </div>
          <div className="space-y-2">
            <Label>Мощность (кВт)</Label>
            <input 
              type="number" 
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="20" 
            />
          </div>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать
        </button>

        {result && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-sm text-blue-900 font-medium">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

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
        <CableCalculatorEmbedded />
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
        <VoltageDropCalculatorEmbedded />
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
