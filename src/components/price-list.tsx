import { useState } from "react";
import { Plus, Save, Trash2, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export type PriceItem = {
  id: string;
  name: string;
  unit: string;
  price: number;
};

const INITIAL: PriceItem[] = [
  { id: "1", name: "Штробление стен (бетон)", unit: "м.п.", price: 380 },
  { id: "2", name: "Монтаж подрозетника", unit: "шт", price: 250 },
  { id: "3", name: "Прокладка кабеля в гофре", unit: "м.п.", price: 90 },
  { id: "4", name: "Установка автоматического выключателя", unit: "шт", price: 450 },
];

const uid = () => Math.random().toString(36).slice(2, 9);

export function PriceList() {
  const [items, setItems] = useState<PriceItem[]>(INITIAL);

  const update = (id: string, patch: Partial<PriceItem>) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const add = () =>
    setItems((arr) => [...arr, { id: uid(), name: "", unit: "шт", price: 0 }]);

  const remove = (id: string) => setItems((arr) => arr.filter((i) => i.id !== id));

  const save = () => {
    toast.success("Прайс-лист сохранён", {
      description: `Позиций: ${items.length}`,
    });
  };

  return (
    <section className="glass neu rounded-3xl p-5 md:p-7">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Wallet className="h-5 w-5 text-primary" />
            Мой прайс-лист
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Используется ИИ-сметчиком, когда включена опция «Использовать мои цены».
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={add}
            className="neu-sm inline-flex items-center gap-1.5 rounded-xl bg-card/60 px-3 py-2 text-sm font-medium transition hover:bg-card/80 active:scale-95"
          >
            <Plus className="h-4 w-4" /> Добавить позицию
          </button>
          <button
            onClick={save}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow transition active:scale-95"
          >
            <Save className="h-4 w-4" /> Сохранить изменения
          </button>
        </div>
      </header>

      {/* Table */}
      <div className="neu-inset overflow-hidden rounded-2xl">
        <div className="hidden grid-cols-[1fr_120px_140px_44px] gap-3 border-b border-border/40 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
          <div>Наименование работы</div>
          <div>Ед. изм.</div>
          <div className="text-right">Цена (₽)</div>
          <div />
        </div>

        <div className="divide-y divide-border/30">
          {items.map((it) => (
            <div
              key={it.id}
              className="grid grid-cols-1 gap-2 px-3 py-3 sm:grid-cols-[1fr_120px_140px_44px] sm:items-center sm:gap-3 sm:px-4"
            >
              <Input
                value={it.name}
                onChange={(e) => update(it.id, { name: e.target.value })}
                placeholder="Например: Монтаж розетки"
                className="neu-sm h-9 rounded-lg border-0 bg-card/60"
              />
              <Input
                value={it.unit}
                onChange={(e) => update(it.id, { unit: e.target.value })}
                placeholder="шт / м"
                className="neu-sm h-9 rounded-lg border-0 bg-card/60"
              />
              <Input
                inputMode="decimal"
                value={it.price === 0 ? "" : String(it.price)}
                onChange={(e) => {
                  const v = e.target.value.replace(",", ".").replace(/[^\d.]/g, "");
                  update(it.id, { price: v === "" ? 0 : parseFloat(v) || 0 });
                }}
                placeholder="0"
                className="neu-sm h-9 rounded-lg border-0 bg-card/60 text-right tabular-nums"
              />
              <button
                onClick={() => remove(it.id)}
                aria-label="Удалить"
                className="grid h-9 w-9 place-items-center justify-self-end rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Совет: указывайте цены без НДС. Региональные коэффициенты применяются автоматически.
      </p>
    </section>
  );
}
