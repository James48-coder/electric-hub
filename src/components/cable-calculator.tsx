import { useMemo, useState } from "react";
import { Zap, Cable, ShieldCheck, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type PowerUnit = "W" | "kW";
type Voltage = "220" | "380";
type Material = "cu" | "al";
type Laying = "open" | "hidden";

// Практические пороги с учётом тепловых характеристик автоматов и запаса прочности.
// Медь, 220 В (1 фаза): шаги по току нагрузки.
const CU_STEPS: Array<{ maxI: number; section: number; breaker: number }> = [
  { maxI: 10, section: 1.5, breaker: 10 },
  { maxI: 16, section: 2.5, breaker: 16 },
  { maxI: 25, section: 4, breaker: 25 },
  { maxI: 32, section: 6, breaker: 32 },
  { maxI: 40, section: 10, breaker: 40 },
];

// Алюминий: сдвиг сечения на одну ступень вверх при тех же порогах тока/автомата.
const AL_STEPS: Array<{ maxI: number; section: number; breaker: number }> = [
  { maxI: 10, section: 2.5, breaker: 10 },
  { maxI: 16, section: 4, breaker: 16 },
  { maxI: 25, section: 6, breaker: 25 },
  { maxI: 32, section: 10, breaker: 32 },
  { maxI: 40, section: 16, breaker: 40 },
];

const OUT_OF_RANGE = "Требуется индивидуальный проект";

type Recommendation =
  | { ok: true; section: number; breaker: number }
  | { ok: false; message: string };

function recommend(current: number, material: Material): Recommendation {
  const steps = material === "cu" ? CU_STEPS : AL_STEPS;
  for (const step of steps) {
    if (current <= step.maxI) {
      return { ok: true, section: step.section, breaker: step.breaker };
    }
  }
  return { ok: false, message: OUT_OF_RANGE };
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
    // Для 3-фаз ток на фазу: I = P / (√3 · U_лин). Подбор сечения/автомата — по фазному току.
    const I = voltage === "220" ? powerW / 220 : powerW / (380 * 1.732);
    const rec = recommend(I, material);
    return { I, rec };
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
              type="text"
              inputMode="decimal"
              value={powerInput}
              onChange={(e) => setPowerInput(e.target.value)}
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
          {invalid && powerInput !== "" && (
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
