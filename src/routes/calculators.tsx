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
  BookOpen,
  Lightbulb,
  ShieldAlert,
  Calculator,
  Activity,
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
  | "color-codes"
  | "lighting-calc"
  | "uzo-calc"
  | "load-calc"
  | "loop-check";

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
        title: "Заполняемость гофры/трубы",
        description: "Допустимое количество кабелей в трассе по нормам.",
        icon: Workflow,
        ready: true,
      },
      {
        id: "grounding",
        title: "Расчёт контура заземления",
        description: "Сопротивление растеканию по типу грунта и электродов.",
        icon: Sigma,
        ready: true,
      },
      {
        id: "lighting-calc",
        title: "Расчёт освещенности",
        description: "Определение светового потока и числа светильников по СП 52.13330.",
        icon: Lightbulb,
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
        ready: true,
      },
      {
        id: "uzo-calc",
        title: "Подбор УЗО / Диф. автомата",
        description: "Выбор тока утечки и номинала по правилам ПУЭ гл. 7.1.",
        icon: ShieldAlert,
        ready: true,
      },
      {
        id: "load-calc",
        title: "Расчёт суммарной нагрузки",
        description: "Суммарная мощность и ток с коэффициентом одновременности по СП 256.",
        icon: Calculator,
        ready: true,
      },
      {
        id: "loop-check",
        title: "Петля «фаза-ноль» и ток КЗ",
        description: "Проверка срабатывания автомата при коротком замыкании.",
        icon: Activity,
        ready: true,
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
        ready: true,
      },
      {
        id: "color-codes",
        title: "Цветовая маркировка и RJ45",
        description: "Маркировка жил, T568A/B и распиновка коннекторов.",
        icon: Palette,
        ready: true,
      },
    ],
  },
];

// --- КАЛЬКУЛЯТОР СЕЧЕНИЯ КАБЕЛЯ (ПО ПУЭ ГЛ. 1.3) ---
function CableCalculatorEmbedded() {
  const [voltage, setVoltage] = useState('220');
  const [material, setMaterial] = useState('copper');
  const [installMethod, setInstallMethod] = useState('pipe');
  const [power, setPower] = useState('');
  const [resultData, setResultData] = useState<{ section: number; current: number; breaker: number; message: string } | null>(null);

  const handleCalculate = () => {
    const p = Number(power) || 0;
    const U = Number(voltage) || 220;

    if (p <= 0) {
      alert("Введите корректную мощность");
      return;
    }

    let current = 0;
    if (U === 380) {
      current = (p * 1000) / (1.732 * 380 * 0.9);
    } else {
      current = (p * 1000) / (220 * 0.9);
    }

    const copperTable = [
      { s: 1.5, open: 19, pipe: 15 },
      { s: 2.5, open: 27, pipe: 21 },
      { s: 4.0, open: 38, pipe: 28 },
      { s: 6.0, open: 46, pipe: 36 },
      { s: 10.0, open: 70, pipe: 50 },
      { s: 16.0, open: 85, pipe: 65 },
      { s: 25.0, open: 115, pipe: 85 },
      { s: 35.0, open: 135, pipe: 100 },
      { s: 50.0, open: 175, pipe: 135 },
    ];

    const aluminumTable = [
      { s: 2.5, open: 21, pipe: 16 },
      { s: 4.0, open: 28, pipe: 22 },
      { s: 6.0, open: 35, pipe: 28 },
      { s: 10.0, open: 50, pipe: 38 },
      { s: 16.0, open: 65, pipe: 50 },
      { s: 25.0, open: 85, pipe: 65 },
      { s: 35.0, open: 105, pipe: 80 },
      { s: 50.0, open: 135, pipe: 100 },
    ];

    const table = material === 'copper' ? copperTable : aluminumTable;

    let selectedItem = null;
    for (const item of table) {
      const allowableCurrent = installMethod === 'open' ? item.open : item.pipe;
      if (allowableCurrent >= current) {
        selectedItem = item;
        break;
      }
    }

    if (!selectedItem) {
      alert("Слишком большая мощность! Требуется сечение более 50 мм².");
      return;
    }

    const breakers = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
    const maxSafeCurrent = installMethod === 'open' ? selectedItem.open : selectedItem.pipe;
    
    let selectedBreaker = breakers[0];
    for (const b of breakers) {
      if (b <= maxSafeCurrent && b >= current) {
        selectedBreaker = b;
      }
    }
    if (current > selectedBreaker) {
      const higherB = breakers.find(b => b >= current);
      if (higherB) selectedBreaker = higherB;
    }

    setResultData({
      section: selectedItem.s,
      current: Number(current.toFixed(1)),
      breaker: selectedBreaker,
      message: `Для нагрузки ${p} кВт (${U}В, ${material === 'copper' ? 'медь' : 'алюминий'}) расчетный ток составил ~${current.toFixed(1)} А. По нормам ПУЭ рекомендуется минимальное сечение кабеля ${selectedItem.s} мм² и защитный автомат номиналом ${selectedBreaker} А.`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Cable className="w-6 h-6 text-blue-600" />
        Сечение кабеля по мощности
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Напряжение сети (В)</Label>
          <Select value={voltage} onValueChange={setVoltage}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="220 В" />
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
              <SelectItem value="copper">Медь</SelectItem>
              <SelectItem value="aluminum">Алюминий</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Способ прокладки</Label>
          <Select value={installMethod} onValueChange={setInstallMethod}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="В трубе / в стене" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pipe">В трубе / в стене (скрыто)</SelectItem>
              <SelectItem value="open">Открыто (на лотке / в коробе)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Мощность нагрузки (кВт)</Label>
          <input 
            type="number" 
            value={power}
            onChange={(e) => setPower(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="5.5" 
          />
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать сечение по ПУЭ
        </button>

        {resultData && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-sm text-blue-900 font-medium">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{resultData.message}</span>
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
        Падение напряжения (ΔU)
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
              <SelectItem value="copper">Медь (ρ = 0.0175)</SelectItem>
              <SelectItem value="aluminum">Алюминий (ρ = 0.028)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Сечение кабеля (мм²)</Label>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="2.5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.5">1.5 мм²</SelectItem>
              <SelectItem value="2.5">2.5 мм²</SelectItem>
              <SelectItem value="4">4 мм²</SelectItem>
              <SelectItem value="6">6 мм²</SelectItem>
              <SelectItem value="10">10 мм²</SelectItem>
              <SelectItem value="16">16 мм²</SelectItem>
              <SelectItem value="25">25 мм²</SelectItem>
              <SelectItem value="50">50 мм²</SelectItem>
              <SelectItem value="120">120 мм²</SelectItem>
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
  const [soilType, setSoilType] = useState('loam');
  const [rodLength, setRodLength] = useState('3');
  const [rodCount, setRodCount] = useState('3');
  const [resultData, setResultData] = useState<{ resistance: number; isAllowed: boolean; message: string } | null>(null);

  const handleCalculate = () => {
    const L = Number(rodLength) || 3;
    const N = Number(rodCount) || 3;

    let rho = 100;
    let soilName = "Суглинок";
    if (soilType === 'clay') { rho = 60; soilName = "Глина"; }
    else if (soilType === 'sand') { rho = 500; soilName = "Песок"; }
    else if (soilType === 'chernozem') { rho = 40; soilName = "Чернозем"; }
    else if (soilType === 'rock') { rho = 1000; soilName = "Скальный грунт"; }

    const singleResistance = (rho / (2 * 3.14 * L)) * Math.log((4 * L) / 0.02);
    const totalResistance = singleResistance / (N * 0.85);

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
              <SelectItem value="chernozem">Чернозем (ρ ≈ 40 Ом·м)</SelectItem>
              <SelectItem value="clay">Глина (ρ ≈ 60 Ом·м)</SelectItem>
              <SelectItem value="loam">Суглинок (ρ ≈ 100 Ом·м)</SelectItem>
              <SelectItem value="sand">Песок (ρ ≈ 500 Ом·м)</SelectItem>
              <SelectItem value="rock">Скальный грунт (ρ ≈ 1000 Ом·м)</SelectItem>
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

// --- КАЛЬКУЛЯТОР ЗАПОЛНЯЕМОСТИ ГОФРЫ / ТРУБЫ (ПО ПУЭ) ---
function ConduitFillCalculatorEmbedded() {
  const [conduitSize, setConduitSize] = useState('20');
  const [customConduit, setCustomConduit] = useState('25');
  const [cableType, setCableType] = useState('vvgng-3x25');
  const [customBrand, setCustomBrand] = useState('ВВГнг-LS');
  const [customCores, setCustomCores] = useState('3');
  const [customSection, setCustomSection] = useState('2.5');
  const [cableCount, setCableCount] = useState('3');
  const [resultData, setResultData] = useState<{ fillPercent: number; isAllowed: boolean; message: string } | null>(null);

  const handleCalculate = () => {
    let dConduit = conduitSize === 'custom' ? (Number(customConduit) || 20) : (Number(conduitSize) || 20);
    const nCables = Number(cableCount) || 1;
    const innerDiameter = dConduit * 0.8;
    const conduitArea = 3.14 * Math.pow(innerDiameter / 2, 2);

    let cableOuterDiameter = 10;
    let cableDesc = "";

    if (cableType === 'custom') {
      const cores = Number(customCores) || 3;
      const sec = Number(customSection) || 2.5;
      cableOuterDiameter = Math.sqrt(cores * sec) * 1.6 + 4.0;
      cableDesc = `${customBrand} ${cores}х${sec}`;
    } else {
      if (cableType === 'vvgng-2x15') { cableOuterDiameter = 8.5; cableDesc = "ВВГнг-LS 2х1.5"; }
      else if (cableType === 'vvgng-3x15') { cableOuterDiameter = 9.5; cableDesc = "ВВГнг-LS 3х1.5"; }
      else if (cableType === 'vvgng-3x25') { cableOuterDiameter = 10.5; cableDesc = "ВВГнг-LS 3х2.5"; }
      else if (cableType === 'vvgng-3x4') { cableOuterDiameter = 12.0; cableDesc = "ВВГнг-LS 3х4.0"; }
      else if (cableType === 'vvgng-5x6') { cableOuterDiameter = 15.0; cableDesc = "ВВГнг-LS 5х6.0"; }
    }

    const singleCableArea = 3.14 * Math.pow(cableOuterDiameter / 2, 2);
    const totalCablesArea = singleCableArea * nCables;
    const fillPercent = (totalCablesArea / conduitArea) * 100;
    const isAllowed = fillPercent <= 35.0;

    setResultData({
      fillPercent: Number(fillPercent.toFixed(1)),
      isAllowed,
      message: `Расчет для кабеля (${cableDesc}): заполнение трубы составило ~${fillPercent.toFixed(1)}%. ${
        isAllowed 
          ? "Норма соблюдена! Заполнение не превышает 35% по рекомендациям ПУЭ, кабели пройдут свободно." 
          : "ВНИМАНИЕ: Превышен рекомендуемый коэффициент заполнения (более 35% по ПУЭ). Протянуть такую линию будет тяжело, рекомендуется взять трубу большего диаметра."
      }`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Workflow className="w-6 h-6 text-blue-600" />
        Заполняемость гофры / трубы
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Диаметр трубы / гофры (мм)</Label>
          <Select value={conduitSize} onValueChange={setConduitSize}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="20 мм" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="16">16 мм</SelectItem>
              <SelectItem value="20">20 мм</SelectItem>
              <SelectItem value="25">25 мм</SelectItem>
              <SelectItem value="32">32 мм</SelectItem>
              <SelectItem value="40">40 мм</SelectItem>
              <SelectItem value="50">50 мм</SelectItem>
              <SelectItem value="custom">✏️ Свой размер (вручную)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {conduitSize === 'custom' && (
          <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Label>Введите диаметр трубы вручную (мм)</Label>
            <input 
              type="number" 
              value={customConduit}
              onChange={(e) => setCustomConduit(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Например: 35" 
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Марка и сечение кабеля</Label>
          <Select value={cableType} onValueChange={setCableType}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="ВВГнг-LS 3х2.5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vvgng-2x15">ВВГнг-LS 2х1.5</SelectItem>
              <SelectItem value="vvgng-3x15">ВВГнг-LS 3х1.5</SelectItem>
              <SelectItem value="vvgng-3x25">ВВГнг-LS 3х2.5</SelectItem>
              <SelectItem value="vvgng-3x4">ВВГнг-LS 3х4.0</SelectItem>
              <SelectItem value="vvgng-5x6">ВВГнг-LS 5х6.0</SelectItem>
              <SelectItem value="custom">✏️ Свой вариант (вручную)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {cableType === 'custom' && (
          <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="space-y-1">
              <Label className="text-xs">Марка кабеля</Label>
              <input 
                type="text" 
                value={customBrand}
                onChange={(e) => setCustomBrand(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Например: NYM" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Количество жил (шт)</Label>
                <input 
                  type="number" 
                  value={customCores}
                  onChange={(e) => setCustomCores(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="3" 
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Сечение жилы (мм²)</Label>
                <input 
                  type="number" 
                  value={customSection}
                  onChange={(e) => setCustomSection(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-md h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="2.5" 
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Количество кабелей (шт)</Label>
          <input 
            type="number" 
            value={cableCount}
            onChange={(e) => setCableCount(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="3" 
          />
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать заполняемость по ПУЭ
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

// --- РАСЧЁТ ОСВЕЩЕННОСТИ ПОМЕЩЕНИЯ (ПО СП 52.13330) ---
function LightingCalculatorEmbedded() {
  const [roomType, setRoomType] = useState('living');
  const [area, setArea] = useState('');
  const [resultData, setResultData] = useState<{ lumens: number; watts: number; count10w: number; message: string } | null>(null);

  const handleCalculate = () => {
    const s = Number(area) || 0;
    if (s <= 0) {
      alert("Введите корректную площадь помещения");
      return;
    }

    let lux = 150;
    let roomName = "Жилая комната / кухня";
    if (roomType === 'office') { lux = 300; roomName = "Кабинет / офис / рабочая зона"; }
    else if (roomType === 'corridor') { lux = 75; roomName = "Коридор / санузел"; }
    else if (roomType === 'garage') { lux = 200; roomName = "Гараж / мастерская"; }

    const totalLumens = Math.round(lux * s * 1.4);
    const totalWatts = Math.round(totalLumens / 90);
    const count10w = Math.max(1, Math.ceil(totalWatts / 10));

    setResultData({
      lumens: totalLumens,
      watts: totalWatts,
      count10w,
      message: `Для помещения "${roomName}" площадью ${s} м² (норма СП 52.13330: ${lux} лк) требуется суммарный световой поток ~${totalLumens} лм. Общая мощность LED-источников: ~${totalWatts} Вт. Рекомендуется установить около ${count10w} светильников мощностью по 10 Вт.`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-blue-600" />
        Расчёт освещенности помещения
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Назначение помещения</Label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="Жилая комната / кухня" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="living">Жилая комната / кухня (150 лк)</SelectItem>
              <SelectItem value="office">Кабинет / офис (300 лк)</SelectItem>
              <SelectItem value="corridor">Коридор / санузел (75 лк)</SelectItem>
              <SelectItem value="garage">Гараж / мастерская (200 лк)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Площадь помещения (м²)</Label>
          <input 
            type="number" 
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="20" 
          />
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать освещенность по СП
        </button>

        {resultData && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-sm text-blue-900 font-medium">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{resultData.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- ВЫБОР НОМИНАЛА И ТИПА УЗО / ДИФ. АВТОМАТА (ПО ПУЭ ГЛ. 7.1) ---
function UzoCalculatorEmbedded() {
  const [zoneType, setZoneType] = useState('sockets');
  const [breakerRating, setBreakerRating] = useState('16');
  const [resultData, setResultData] = useState<{ leakage: number; recommendedUzo: number; typeUzo: string; message: string } | null>(null);

  const handleCalculate = () => {
    const bAmps = Number(breakerRating) || 16;

    let leakage = 30;
    let zoneDesc = "Розеточная группа общего назначения";
    if (zoneType === 'bathroom') {
      leakage = 10;
      zoneDesc = "Влажная зона (ванная комната, душевая)";
    } else if (zoneType === 'fire') {
      leakage = 300;
      zoneDesc = "Противопожарное вводное УЗО";
    }

    const standardUzoRatings = [16, 25, 40, 63, 80];
    let recommendedUzo = 25;
    for (const r of standardUzoRatings) {
      if (r >= bAmps) {
        recommendedUzo = r;
        break;
      }
    }
    if (recommendedUzo === bAmps) {
      const idx = standardUzoRatings.indexOf(bAmps);
      if (idx !== -1 && idx < standardUzoRatings.length - 1) {
        recommendedUzo = standardUzoRatings[idx + 1];
      }
    }

    setResultData({
      leakage,
      recommendedUzo,
      typeUzo: zoneType === 'bathroom' || zoneType === 'sockets' ? 'Тип A (рекомендуется для электроники)' : 'Тип AC / A',
      message: `Для зоны (${zoneDesc}) с защитным автоматом ${bAmps} А требуется УЗО (или дифавтомат) с током утечки не более ${leakage} мА и номинальным током не менее ${recommendedUzo} А. Рекомендуемый тип: ${zoneType === 'bathroom' || zoneType === 'sockets' ? 'Тип A (реагирует на переменный и пульсирующий постоянный ток)' : 'Тип AC'}.`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <ShieldAlert className="w-6 h-6 text-blue-600" />
        Подбор УЗО / Дифференциального автомата
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Назначение линии / помещение</Label>
          <Select value={zoneType} onValueChange={setZoneType}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="Розеточная группа" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sockets">Розеточная группа / бытовые приборы (30 мА)</SelectItem>
              <SelectItem value="bathroom">Ванная комната / мокрая зона (10 мА)</SelectItem>
              <SelectItem value="fire">Вводное противопожарное УЗО (300 мА)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Номинал защитного автомата в линии (А)</Label>
          <Select value={breakerRating} onValueChange={setBreakerRating}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="16 А" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 А</SelectItem>
              <SelectItem value="16">16 А</SelectItem>
              <SelectItem value="25">25 А</SelectItem>
              <SelectItem value="32">32 А</SelectItem>
              <SelectItem value="40">40 А</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать УЗО по ПУЭ
        </button>

        {resultData && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-sm text-blue-900 font-medium">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{resultData.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- РАСЧЁТ СУММАРНОЙ НАГРУЗКИ С КОЭФФИЦИЕНТОМ ОДНОВРЕМЕННОСТИ (СП 256) ---
function LoadCalculatorEmbedded() {
  const [voltage, setVoltage] = useState('220');
  const [lighting, setLighting] = useState('');
  const [sockets, setSockets] = useState('');
  const [kitchen, setKitchen] = useState('');
  const [climate, setClimate] = useState('');
  const [resultData, setResultData] = useState<{ pInst: number; pCalc: number; current: number; breaker: number; message: string } | null>(null);

  const handleCalculate = () => {
    const l = Number(lighting) || 0;
    const sock = Number(sockets) || 0;
    const kit = Number(kitchen) || 0;
    const clim = Number(climate) || 0;
    const U = Number(voltage) || 220;

    const pInst = l + sock + kit + clim;
    if (pInst <= 0) {
      alert("Введите мощность хотя бы для одной группы потребителей");
      return;
    }

    const pCalc = (l * 0.8) + (sock * 0.3) + (kit * 0.7) + (clim * 0.8);

    let current = 0;
    if (U === 380) {
      current = (pCalc * 1000) / (1.732 * 380 * 0.9);
    } else {
      current = (pCalc * 1000) / (220 * 0.9);
    }

    const breakers = [16, 25, 32, 40, 50, 63, 80, 100];
    let selectedBreaker = breakers[0];
    for (const b of breakers) {
      if (b >= current) {
        selectedBreaker = b;
        break;
      }
    }
    if (current > selectedBreaker) selectedBreaker = 100;

    setResultData({
      pInst: Number(pInst.toFixed(2)),
      pCalc: Number(pCalc.toFixed(2)),
      current: Number(current.toFixed(1)),
      breaker: selectedBreaker,
      message: `Установленная мощность: ${pInst.toFixed(1)} кВт. С учётом коэффициентов одновременности по СП 256.1325800 расчетная нагрузка составляет ~${pCalc.toFixed(1)} кВт. Расчетный ток: ~${current.toFixed(1)} А. Рекомендуемый вводной автомат: ${selectedBreaker} А.`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Calculator className="w-6 h-6 text-blue-600" />
        Расчёт суммарной нагрузки (СП 256)
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Напряжение сети (В)</Label>
          <Select value={voltage} onValueChange={setVoltage}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="220 В" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="220">220 В (Однофазная)</SelectItem>
              <SelectItem value="380">380 В (Трехфазная)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Освещение (кВт)</Label>
            <input 
              type="number" 
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="1.0" 
            />
          </div>
          <div className="space-y-2">
            <Label>Розетки / бытовые (кВт)</Label>
            <input 
              type="number" 
              value={sockets}
              onChange={(e) => setSockets(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="5.0" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Электроплита / кухня (кВт)</Label>
            <input 
              type="number" 
              value={kitchen}
              onChange={(e) => setKitchen(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="7.0" 
            />
          </div>
          <div className="space-y-2">
            <Label>Бойлер / климат (кВт)</Label>
            <input 
              type="number" 
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="3.0" 
            />
          </div>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать нагрузку по СП 256
        </button>

        {resultData && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-sm text-blue-900 font-medium">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{resultData.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- ПУНКТ 4 (ИЗ НОВОГО СПИСКА): ПРОВЕРКА ПЕТЛИ «ФАЗА-НОЛЬ» И ТОКА КЗ ---
function LoopCheckCalculatorEmbedded() {
  const [material, setMaterial] = useState('copper');
  const [section, setSection] = useState('2.5');
  const [length, setLength] = useState('');
  const [breakerRating, setBreakerRating] = useState('16'); // номинал автомата
  const [resultData, setResultData] = useState<{ loopResistance: number; isc: number; isTripValid: boolean; message: string } | null>(null);

  const handleCalculate = () => {
    const l = Number(length) || 0;
    const s = Number(section) || 2.5;
    const bAmps = Number(breakerRating) || 16;

    if (l <= 0) {
      alert("Введите корректную длину линии");
      return;
    }

    // Удельное сопротивление жилы при рабочей температуре (~60-70°C): медь ~0.0225 Ом*мм2/м, алюминий ~0.036 Ом*мм2/м
    const rho = material === 'copper' ? 0.0225 : 0.036;

    // Сопротивление петли фаза-ноль: R = (2 * rho * L) / S (учитываем прямой и обратный проводники)
    const loopResistance = (2 * rho * l) / s;

    // Ожидаемый ток короткого замыкания: Isc = U / R_loop (при напряжении 220В)
    const isc = 220 / loopResistance;

    // Для автоматического выключателя характеристики C мгновенный расцепитель срабатывает при токе (5...10) * In. 
    // Возьмем критический порог 5 * In для надежного мгновенного отключения.
    const requiredIsc = bAmps * 5;
    const isTripValid = isc >= requiredIsc;

    setResultData({
      loopResistance: Number(loopResistance.toFixed(3)),
      isc: Number(isc.toFixed(1)),
      isTripValid,
      message: `Сопротивление петли фаза-ноль: ~${loopResistance.toFixed(3)} Ом. Ожидаемый ток КЗ на конце линии: ~${isc.toFixed(1)} А. ${
        isTripValid 
          ? `Условие надежного срабатывания выполнено (ток КЗ превышает 5×In автомата — ${requiredIsc} А). Защита сработает мгновенно.` 
          : `ВНИМАНИЕ: Ток КЗ недостаточен для мгновенного срабатывания автомата (${bAmps} А требует минимум ${requiredIsc} А). Линия слишком длинная или сечение (${s} мм²) слишком мало!`
      }`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Activity className="w-6 h-6 text-blue-600" />
        Петля «фаза-ноль» и ток КЗ
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Материал проводников</Label>
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
            <Label>Сечение жилы (мм²)</Label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger className="w-full bg-slate-50">
                <SelectValue placeholder="2.5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.5">1.5 мм²</SelectItem>
                <SelectItem value="2.5">2.5 мм²</SelectItem>
                <SelectItem value="4">4 мм²</SelectItem>
                <SelectItem value="6">6 мм²</SelectItem>
                <SelectItem value="10">10 мм²</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Длина линии (м)</Label>
            <input 
              type="number" 
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="30" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Номинал защитного автомата (А)</Label>
          <Select value={breakerRating} onValueChange={setBreakerRating}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="16 А" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 А</SelectItem>
              <SelectItem value="16">16 А</SelectItem>
              <SelectItem value="25">25 А</SelectItem>
              <SelectItem value="32">32 А</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Проверить петлю фаза-ноль
        </button>

        {resultData && (
          <div className={`p-4 border rounded-xl flex items-start gap-3 text-sm font-medium ${
            resultData.isTripValid ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {resultData.isTripValid ? (
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

// --- КАЛЬКУЛЯТОР ПОДБОРА КОНДЕНСАТОРОВ ДЛЯ ДВИГАТЕЛЯ ---
function MotorCapsCalculatorEmbedded() {
  const [powerKw, setPowerKw] = useState('');
  const [connectionType, setConnectionType] = useState('delta');
  const [heavyStart, setHeavyStart] = useState(false);
  const [resultData, setResultData] = useState<{ workCap: number; startCap: number | null; message: string } | null>(null);

  const handleCalculate = () => {
    const p = Number(powerKw) || 0;
    if (p <= 0) {
      alert("Введите корректную мощность двигателя");
      return;
    }

    let workCap = connectionType === 'delta' ? p * 66 : p * 35;
    workCap = Number(workCap.toFixed(1));

    let startCap = null;
    if (heavyStart) {
      startCap = Number((workCap * 2.5).toFixed(1));
    }

    setResultData({
      workCap,
      startCap,
      message: `Для двигателя ${p} кВт (схема: ${connectionType === 'delta' ? 'Треугольник' : 'Звезда'}): рабочая емкость составляет ~${workCap} мкФ.${heavyStart ? ` Пусковая емкость (для тяжелого пуска) ~${startCap} мкФ (подключается кнопкой с возвратом).` : ''} Используйте конденсаторы переменного тока (AC) на напряжение не менее 400–450 В.`
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Cpu className="w-6 h-6 text-blue-600" />
        Подбор конденсаторов для двигателя
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Схема подключения в сети 220 В</Label>
          <Select value={connectionType} onValueChange={setConnectionType}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="Треугольник" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delta">Треугольник (Δ) — полная мощность</SelectItem>
              <SelectItem value="star">Звезда (Y) — сниженная мощность</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Мощность электродвигателя (кВт)</Label>
          <input 
            type="number" 
            value={powerKw}
            onChange={(e) => setPowerKw(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="1.5" 
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <Label htmlFor="heavy-start" className="cursor-pointer font-medium">
            Тяжелый пуск (нужен пусковой конденсатор)
          </Label>
          <Switch id="heavy-start" checked={heavyStart} onCheckedChange={setHeavyStart} />
        </div>

        <button 
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mt-2 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Рассчитать емкость конденсаторов
        </button>

        {resultData && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-sm text-blue-900 font-medium">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <span>{resultData.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// --- СПРАВОЧНИК / СХЕМЫ ПРОХОДНЫХ ВЫКЛЮЧАТЕЛЕЙ (ПО ПУЭ) ---
function ThreeWayCalculatorEmbedded() {
  const [places, setPlaces] = useState('2');

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <ToggleRight className="w-6 h-6 text-blue-600" />
        Схемы проходных выключателей
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Количество мест управления светом</Label>
          <Select value={places} onValueChange={setPlaces}>
            <SelectTrigger className="w-full bg-slate-50">
              <SelectValue placeholder="2 места" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">Из 2-х мест (2 проходных выключателя)</SelectItem>
              <SelectItem value="3">Из 3-х и более мест (2 проходных + перекрестные)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3 text-sm text-blue-900">
          <div className="flex items-center gap-2 font-bold text-blue-950">
            <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
            <span>Инструкция по монтажу по нормам ПУЭ</span>
          </div>
          
          {places === '2' ? (
            <div className="space-y-2">
              <p><strong>Компоненты:</strong> Два одноклавишных проходных выключателя (переключателя на два направления).</p>
              <p><strong>Правила ПУЭ:</strong> Фазный провод от автомата защиты (10А) заводится на общий контакт первого проходного выключателя. От двух парных контактов первого выключателя идут две линии (межвыключательныe жилы) ко второму проходному выключателю. С общего контакта второго выключателя фаза уходит на светильник (лампа), а нулевой проводник (N) и заземление (PE) идут напрямую к светильнику.</p>
              <p className="text-xs text-blue-800 bg-blue-100 p-2 rounded-lg">💡 <em>Рекомендуемый кабель для линии управления: ВВГнг-LS 3х1.5 мм² или 2х1.5 мм² (с обязательным разрывом фазы).</em></p>
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Компоненты:</strong> Два крайних проходных выключателя и один (или более) промежуточный перекрестный (крестовый) выключатель.</p>
              <p><strong>Правила ПУЭ:</strong> Между крайними проходными устанавливается крестовый выключатель, который меняет местами перекрестные жилы. Фаза также приходит на общий контакт первого проходного, а с общего контакта последнего уходит на светильник.</p>
              <p className="text-xs text-blue-800 bg-blue-100 p-2 rounded-lg">💡 <em>Для подключения крестового выключателя требуется 4-жильный кабель (или две пары двухжильных) между узлами коммутации.</em></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- СПРАВОЧНИК ЦВЕТОВОЙ МАРКИРОВКИ И RJ45 (ПО ГОСТ / TIA-568) ---
function ColorCodesCalculatorEmbedded() {
  const [standard, setStandard] = useState('T568B');

  const t568b = [
    { pin: 1, color: "Бело-оранжевый", desc: "Передача данных (+)" },
    { pin: 2, color: "Оранжевый", desc: "Передача данных (-)" },
    { pin: 3, color: "Бело-зеленый", desc: "Прием данных (+)" },
    { pin: 4, color: "Синий", desc: "Резерв / Телефония" },
    { pin: 5, color: "Бело-синий", desc: "Резерв / Телефония" },
    { pin: 6, color: "Зеленый", desc: "Прием данных (-)" },
    { pin: 7, color: "Бело-коричневый", desc: "Резерв" },
    { pin: 8, color: "Коричневый", desc: "Резерв" },
  ];

  const t568a = [
    { pin: 1, color: "Бело-зеленый", desc: "Прием данных (+)" },
    { pin: 2, color: "Зеленый", desc: "Прием данных (-)" },
    { pin: 3, color: "Бело-оранжевый", desc: "Передача данных (+)" },
    { pin: 4, color: "Синий", desc: "Резерв / Телефония" },
    { pin: 5, color: "Бело-синий", desc: "Резерв / Телефония" },
    { pin: 6, color: "Оранжевый", desc: "Передача данных (-)" },
    { pin: 7, color: "Бело-коричневый", desc: "Резерв" },
    { pin: 8, color: "Коричневый", desc: "Резерв" },
  ];

  const currentPins = standard === 'T568B' ? t568b : t568a;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl mx-auto text-slate-900 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Palette className="w-6 h-6 text-blue-600" />
        Цветовая маркировка и RJ45
      </h2>

      <div className="space-y-6">
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
          <h3 className="font-semibold text-slate-900">Маркировка жил по ГОСТ Р 50462 (Электропроводка)</h3>
          <ul className="text-sm space-y-1 text-slate-700">
            <li>• <strong className="text-amber-700">Фаза (L):</strong> Коричневый, черный, серый (или белый)</li>
            <li>• <strong className="text-blue-700">Нейтраль (N):</strong> Голубой / синий</li>
            <li>• <strong className="text-emerald-700">Защитный проводник (PE):</strong> Желто-зеленый</li>
          </ul>
        </div>

        <div className="space-y-4 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <Label className="font-semibold">Стандарт обжима витой пары (RJ45)</Label>
            <Select value={standard} onValueChange={setStandard}>
              <SelectTrigger className="w-36 bg-slate-50 h-9">
                <SelectValue placeholder="T568B" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="T568B">T568B (Основной)</SelectItem>
                <SelectItem value="T568A">T568A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-sm">
            <div className="bg-slate-100 px-4 py-2 font-semibold text-slate-700 flex justify-between">
              <span>Пин (Контакт)</span>
              <span>Цвет жилы</span>
              <span>Назначение</span>
            </div>
            <div className="divide-y divide-slate-100">
              {currentPins.map((item) => (
                <div key={item.pin} className="px-4 py-2 flex justify-between items-center hover:bg-slate-50">
                  <span className="font-mono font-bold text-blue-600">#{item.pin}</span>
                  <span className="font-medium text-slate-800">{item.color}</span>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500">💡 <em>При обжиме патч-корда «прямым» кабелем (для подключения ПК к роутеру) с обоих концов используется одинаковый стандарт (чаще всего T568B).</em></p>
        </div>
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
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Сечение кабеля по мощности</h1>
          <p className="text-muted-foreground text-sm">Подбор сечения и номинала автомата по нормам ПУЭ.</p>
        </header>
        <CableCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "voltage-drop") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Падение напряжения</h1>
          <p className="text-muted-foreground text-sm">Проверка ΔU на линии с учётом длины и тока по нормам ПУЭ.</p>
        </header>
        <VoltageDropCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "grounding") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Расчёт контура заземления</h1>
          <p className="text-muted-foreground text-sm">Сопротивление растеканию по типу грунта и электродов согласно ПУЭ.</p>
        </header>
        <GroundingCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "conduit-fill") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Заполняемость гофры / трубы</h1>
          <p className="text-muted-foreground text-sm">Допустимое количество кабелей в трассе по нормам ПУЭ.</p>
        </header>
        <ConduitFillCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "lighting-calc") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Расчёт освещенности помещения</h1>
          <p className="text-muted-foreground text-sm">Определение светового потока и количества светильников по СП 52.13330.</p>
        </header>
        <LightingCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "motor-caps") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Подбор конденсаторов для двигателя</h1>
          <p className="text-muted-foreground text-sm">Расчёт емкости пускового и рабочего конденсатора для 3Ф двигателя в сеть 220 В.</p>
        </header>
        <MotorCapsCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "uzo-calc") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Подбор УЗО / Дифференциального автомата</h1>
          <p className="text-muted-foreground text-sm">Выбор тока утечки и номинала по правилам ПУЭ гл. 7.1.</p>
        </header>
        <UzoCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "load-calc") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Расчёт суммарной нагрузки</h1>
          <p className="text-muted-foreground text-sm">Расчет мощности и вводного автомата с коэффициентами одновременности по СП 256.</p>
        </header>
        <LoadCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "loop-check") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Петля «фаза-ноль» и ток КЗ</h1>
          <p className="text-muted-foreground text-sm">Проверка мгновенного срабатывания защиты при коротком замыкании.</p>
        </header>
        <LoopCheckCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "three-way") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Проходные выключатели</h1>
          <p className="text-muted-foreground text-sm">Схемы и правила монтажа управления светом из 2-х и более мест.</p>
        </header>
        <ThreeWayCalculatorEmbedded />
      </div>
    );
  }

  if (openTool === "color-codes") {
    return (
      <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setOpenTool(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку калькуляторов
        </Button>
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Цветовая маркировка и RJ45</h1>
          <p className="text-muted-foreground text-sm">Маркировка жил по ГОСТ и стандарты обжима интернет-кабеля (T568A/B).</p>
        </header>
        <ColorCodesCalculatorEmbedded />
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
