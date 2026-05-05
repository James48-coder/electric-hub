import { useMemo, useState } from "react";
import { Zap, Cable, ShieldCheck, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type PowerUnit = "W" | "kW";
type Voltage = "220" | "380";
type Material = "cu" | "al";
type Laying = "open" | "hidden";

// Допустимый длительный ток (А) по сечению (мм²) — упрощённо по ПУЭ табл. 1.3.4/1.3.5
// [сечение, медь-открытая, медь-скрытая, алюминий-открытая, алюминий-скрытая]
const TABLE: Array<{ s: number; cuO: number; cuH: number; alO: number; alH: number }> = [
  { s: 1.5, cuO: 23, cuH: 19, alO: 0, alH: 0 },
  { s: 2.5, cuO: 30, cuH: 27, alO: 24, alH: 20 },
  { s: 4, cuO: 41, cuH: 38, alO: 32, alH: 28 },
  { s: 6, cuO: 50, cuH: 46, alO: 39, alH: 36 },
  { s: 10, cuO: 80, cuH: 70, alO: 60, alH: 50 },
  { s: 16, cuO: 100, cuH: 85, alO: 75, alH: 65 },
  { s: 25, cuO: 140, cuH: 115, alO: 105, alH: 90 },
  { s: 35, cuO: 170, cuH: 135, alO: 130, alH: 105 },
  { s: 50, cuO: 215, cuH: 175, alO: 165, alH: 135 },
  { s: 70, cuO: 270, cuH: 215, alO: 210, alH: 165 },
];

const BREAKERS = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];

function pickSection(current: number, material: Material, laying: Laying) {
  for (const row of TABLE) {
    const cap =
      material === "cu"
        ? laying === "open"
          ? row.cuO
          : row.cuH
        : laying === "open"
          ? row.alO
          : row.alH;
    if (cap > 0 && cap >= current) return row.s;
  }
  return null;
}

function pickBreaker(current: number) {
  for (const b of BREAKERS) if (b >= current) return b;
  return null;
}

export function CableCalculator() {
  const [powerInput, setPowerInput] = useState("3");
  const [unit, setUnit] = useState<PowerUnit>("kW");
  const [voltage, setVoltage] = useState<Voltage>("220");
  const [material, setMaterial] = useState<Material>("cu");
  const [laying, setLaying] = useState<Laying>("hidden");

  const powerNum = parseFloat(powerInput.replace(",", "."));
  const invalid = !isFinite(powerNum) || powerNum <= 0;
  const powerW = invalid ? 0 : unit === "kW" ? powerNum * 1000 : powerNum;

  const result = useMemo(() => {
    if (invalid) return null;
    const I = voltage === "220" ? powerW / 220 : powerW / (380 * 1.732);
    const section = pickSection(I, material, laying);
    const breaker = pickBreaker(I);
    return { I, section, breaker };
  }, [invalid, powerW, voltage, material, laying]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Inputs */}
      <div className="glass neu rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Параметры расчёта</h2>
        </div>

        {/* Power */}
        <div className="space-y-2">
          <Label htmlFor="power" className="text-sm font-medium">
            Мощность нагрузки
          </Label>
          <div className="flex gap-2">
            <Input
              id="power"
              type="number"
              min={0}
              step="0.1"
              inputMode="decimal"
              value={powerStr}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || parseFloat(v) >= 0) setPowerStr(v);
              }}
              className="neu-inset flex-1 h-10 rounded-xl"
              placeholder="Введите мощность"
            />
            <ToggleGroup
              type="single"
              value={unit}
              onValueChange={(v) => v && setUnit(v as PowerUnit)}
              className="neu rounded-xl p-1"
            >
              <ToggleGroupItem value="W" className="rounded-lg px-3 h-8">
                Вт
              </ToggleGroupItem>
              <ToggleGroupItem value="kW" className="rounded-lg px-3 h-8">
                кВт
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {invalid && powerStr !== "" && (
            <p className="text-xs text-destructive">Введите положительное число</p>
          )}
        </div>

        {/* Voltage */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Напряжение сети</Label>
          <ToggleGroup
            type="single"
            value={voltage}
            onValueChange={(v) => v && setVoltage(v as Voltage)}
            className="neu rounded-xl p-1 w-full grid grid-cols-2"
          >
            <ToggleGroupItem value="220" className="rounded-lg h-9">
              220 В (1 фаза)
            </ToggleGroupItem>
            <ToggleGroupItem value="380" className="rounded-lg h-9">
              380 В (3 фазы)
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Material */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Материал кабеля</Label>
          <ToggleGroup
            type="single"
            value={material}
            onValueChange={(v) => v && setMaterial(v as Material)}
            className="neu rounded-xl p-1 w-full grid grid-cols-2"
          >
            <ToggleGroupItem value="cu" className="rounded-lg h-9">
              Медь
            </ToggleGroupItem>
            <ToggleGroupItem value="al" className="rounded-lg h-9">
              Алюминий
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Laying */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Способ прокладки</Label>
          <ToggleGroup
            type="single"
            value={laying}
            onValueChange={(v) => v && setLaying(v as Laying)}
            className="neu rounded-xl p-1 w-full grid grid-cols-2"
          >
            <ToggleGroupItem value="open" className="rounded-lg h-9">
              Открытая
            </ToggleGroupItem>
            <ToggleGroupItem value="hidden" className="rounded-lg h-9">
              Скрытая
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Results */}
      <div className="glass neu rounded-3xl p-6 md:p-8 space-y-5 border-primary/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Результаты расчёта</h2>
        </div>

        <div className="grid gap-4">
          <ResultCard
            icon={<Zap className="h-5 w-5" />}
            label="Расчётный ток"
            value={result ? `${result.I.toFixed(2)} А` : "—"}
          />
          <ResultCard
            icon={<Cable className="h-5 w-5" />}
            label="Рекомендуемое сечение"
            value={
              result
                ? result.section
                  ? `${result.section} мм²`
                  : "Вне диапазона"
                : "—"
            }
            highlight
          />
          <ResultCard
            icon={<ShieldCheck className="h-5 w-5" />}
            label="Рекомендуемый автомат"
            value={
              result ? (result.breaker ? `${result.breaker} А` : "Вне диапазона") : "—"
            }
          />
        </div>

        <div className="neu-inset flex gap-2 rounded-xl p-3 text-xs text-muted-foreground">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-primary/80" />
          <p>
            Расчёт является предварительным. Точный выбор зависит от длины линии и
            поправочных коэффициентов.
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "neu-sm flex items-center justify-between rounded-2xl p-4 transition " +
        (highlight ? "bg-primary/10 ring-1 ring-primary/30 glow" : "bg-card/40")
      }
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
          {icon}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      <div className="text-xl font-bold tabular-nums">{value}</div>
    </div>
  );
}
