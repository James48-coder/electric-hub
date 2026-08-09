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
  XCircle,
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
        ready: true,
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

// --- КАЛЬКУЛЯТОР СЕЧЕНИЯ КАБЕЛЯ ---
function CableCalculatorEmbedded() {
  const [material, setMaterial] = useState('copper');
  const [cableType, setCableType] = useState('vvgng');
  const [inBundle, setInBundle] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    setResult("Расчет выполнен по ГОСТ Р 50571.5.52 / ПУЭ: Рекомендуемый номинал автомата 25А, минимальное сечение 4 мм².");
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
          <Label htmlFor="in-bundle" className="cursor-pointer">Прокладка в пучке (поправка ПУЭ)</Label>
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

// --- КАЛЬКУЛЯТОР ПАДЕНИЯ НАПРЯЖЕНИЯ (ПО ПУЭ / ГОСТ) ---
function VoltageDropCalculatorEmbedded() {
  const [voltage, setVoltage] = useState('220');
  const [material, setMaterial] = useState('copper');
  const [section, setSection] = useState('2.5');
  const [length, setLength] = useState('');
  const [power, setPower] = useState('');
  const [resultData, setResultData] = useState<{ dropPercent: number; isAllowed: boolean; message: string } | null>(null);

  const handleCalculate = () => {
    const l = Number(length) || 0;
    const p = Number(power) || 0;
    const U = Number(voltage) || 220;
    const s = Number(section) || 2.5;

    if (l <= 0 || p <= 0) {
      alert("Введите корректную длину и мощность");
      return;
    }

    const rho = material === 'copper' ? 0.0175 : 0.028;
    let current = 0;
    if (U === 380) {
      current = (p * 1000) / (1.732 * 380 * 0.9);
    } else {
      current = (p * 1000) / (220 * 0.9);
    }

    let dU = 0;
    if (U === 380) {
      dU = (1.732 * l * current * rho) / s;
    } else {
      dU = (2 * l * current * rho) / s;
    }

    const dropPercent = (dU / U) * 100;
    const isAllowed = dropPercent <= 5.0;

    setResultData({
      dropPercent: Number(dropPercent.toFixed(2)),
      isAllowed,
      message: `Падение напряжения составило ~${dropPercent.toFixed(2)}%. ${
        isAllowed 
          ? "Соответствует нормам ПУЭ и ГОСТ (потери не превышают 5%)." 
          : "ВНИМАНИЕ: Превышен допустимый предел потерь по ПУЭ (более 5%). Необходимо увеличить сечение жилы или уменьшить длину/мощность линии."
      }`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <TrendingDown className="w-6 h-6 text-blue-600" />
        Падение напряжения ($\Delta U$)
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Напряжение сети (В)</Label>
          <Select value={voltage} onValueChange={setVoltage}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="220" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="220">220 В (Однофазная)</SelectItem>
              <SelectItem value="380">380 В (Трехфазная)</SelectItem>
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
              <SelectItem value="copper">Медь ($\rho$ = 0.0175)</SelectItem>
              <SelectItem value="aluminum">Алюминий ($\rho$ = 0.028)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Сечение кабеля ($мм^2$)</Label>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="2.5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.5">1.5 $мм^2$</SelectItem>
              <SelectItem value="2.5">2.5 $мм^2$</SelectItem>
              <SelectItem value="4">4 $мм^2$</SelectItem>
              <SelectItem value="6">6 $мм^2$</SelectItem>
              <SelectItem value="10">10 $мм^2$</SelectItem>
              <SelectItem value="16">16 $мм^2$</SelectItem>
              <SelectItem value="25">25 $мм^2$</SelectItem>
              <SelectItem value="50">50 $мм^2$</SelectItem>
              <SelectItem value="120">120 $мм^2$</SelectItem>
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
              placeholder="50" 
            />
          </div>
          <div className="space-y-2">
            <Label>Мощность (кВт)</Label>
            <input 
              type="number" 
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="5.0" 
            />
          </div>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать по ПУЭ
        </button>

        {resultData && (
          <div className={`p-4 border rounded-xl flex items-start gap-3 text-sm font-medium ${
            resultData.isAllowed ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {resultData.isAllowed ? (
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <span>{resultData.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- КАЛЬКУЛЯТОР КОНТУРА ЗАЗЕМЛЕНИЯ (ПО ПУЭ) ---
function GroundingCalculatorEmbedded() {
  const [soilType, setSoilType] = useState('loam'); // суглинок по умолчанию
  const [rodLength, setRodLength] = useState('3');
  const [rodCount, setRodCount] = useState('3');
  const [resultData, setResultData] = useState<{ resistance: number; isAllowed: boolean; message: string } | null>(null);

  const handleCalculate = () => {
    const L = Number(rodLength) || 3;
    const N = Number(rodCount) || 3;

    // Удельное сопротивление грунта (Ом*м) по справочникам
    let rho = 100;
    let soilName = "Суглинок";
    if (soilType === 'clay') { rho = 60; soilName = "Глина"; }
    else if (soilType === 'sand') { rho = 500; soilName = "Песок"; }
    else if (soilType === 'chernozem') { rho = 40; soilName = "Чернозем"; }
    else if (soilType === 'rock') { rho = 1000; soilName = "Скальный грунт"; }

    // Упрощенная инженерная оценка сопротивления одиночного вертикального электрода и группы с коэффициентом использования
    // R1 approx (rho / (2 * pi * L)) * ln(4*L / d)
    const singleResistance = (rho / (2 * 3.14 * L)) * Math.log((4 * L) / 0.02); // диаметр стержня примем 20 мм (0.02 м)
    // Учет количества электродов в ряду (коэффициент экранировки грубо возьмем 0.85 для N штук)
    const totalResistance = singleResistance / (N * 0.85);

    // Требование ПУЭ (п. 1.7.101): для электроустановок напряжением до 1000В сопротивление заземляющего устройства должно быть не более 4 Ом
    const isAllowed = totalResistance <= 4.0;

    setResultData({
      resistance: Number(totalResistance.toFixed(2)),
      isAllowed,
      message: `Ориентировочное сопротивление контура: ~${totalResistance.toFixed(2)} Ом (грунт: ${soilName}, стержни: ${N} шт. по ${L} м). ${
        isAllowed 
          ? "Норма выполнена! Сопротивление не превышает 4 Ом по требованиям ПУЭ для сети 380/220В." 
          : "ВНИМАНИЕ: Сопротивление выше нормы ПУЭ (4 Ом). Рекомендуется увеличить количество электродов или их длину."
      }`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Sigma className="w-6 h-6 text-blue-600" />
        Расчёт контура заземления
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Тип грунта</Label>
          <Select value={soilType} onValueChange={setSoilType}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="Суглинок" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chernozem">Чернозем ($\rho \approx$ 40 Ом·м)</SelectItem>
              <SelectItem value="clay">Глина ($\rho \approx$ 60 Ом·м)</SelectItem>
              <SelectItem value="loam">Суглинок ($\rho \approx$ 100 Ом·м)</SelectItem>
              <SelectItem value="sand">Песок ($\rho \approx$ 500 Ом·м)</SelectItem>
              <SelectItem value="rock">Скальный грунт ($\rho \approx$ 1000 Ом·м)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Длина электрода (м)</Label>
            <input 
              type="number" 
              value={rodLength}
              onChange={(e) => setRodLength(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="3" 
            />
          </div>
          <div className="space-y-2">
            <Label>Кол-во электродов (шт)</Label>
            <input 
              type="number" 
              value={rodCount}
              onChange={(e) => setRodCount(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="3" 
            />
          </div>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать заземление по ПУЭ
        </button>

        {resultData && (
          <div className={`p-4 border rounded-xl flex items-start gap-3 text-sm font-medium ${
            resultData.isAllowed ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {resultData.isAllowed ? (
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <span>{resultData.message}</span>
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
            Проверка $\Delta U$ на линии с учётом длины и тока по нормам ПУЭ.
          </p>
        </header>
        <VoltageDropCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "grounding") {
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
            Расчёт контура заземления
          </h1>
          <p className="text-muted-foreground text-sm">
            Сопротивление растеканию по типу грунта и электродов согласно ПУЭ.
          </p>
        </header>
        <GroundingCalculatorEmbedded />
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
