import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Radio, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const REGIONS = [
  "Москва",
  "Московская область",
  "Санкт-Петербург",
  "Ленинградская область",
  "Казань",
  "Краснодар",
  "Сочи",
  "Екатеринбург",
  "Новосибирск",
  "Нижний Новгород",
  "Самара",
  "Ростов-на-Дону",
  "Уфа",
  "Челябинск",
  "Пермь",
  "Воронеж",
  "Волгоград",
  "Красноярск",
  "Тюмень",
  "Калининград",
];

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function SmartRegionSelector({ value, onChange }: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(value), [value]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return REGIONS.slice(0, 8);
    return REGIONS.filter((r) => r.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const pick = (r: string) => {
    onChange(r);
    setQuery(r);
    setOpen(false);
  };

  return (
    <div className="space-y-1">
      <label className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" /> Регион
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <Radio className="h-2.5 w-2.5 animate-pulse" />
          Live Price Data
        </span>
      </label>

      <div ref={wrapRef} className="relative">
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Введите ваш город или регион для актуальных цен"
          className={cn(
            "neu-sm h-9 w-full rounded-xl border-0 bg-card/60 px-3 text-sm",
            "placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/50",
          )}
        />
        {open && filtered.length > 0 && (
          <div className="glass neu-sm absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-xl p-1">
            {filtered.map((r) => {
              const active = r === value;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => pick(r)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition",
                    "hover:bg-primary/10",
                    active && "bg-primary/15 text-primary",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 opacity-70" />
                    {r}
                  </span>
                  {active && <Check className="h-3.5 w-3.5" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
