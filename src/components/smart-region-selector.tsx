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
    <div className="space-y-1.5 relative">
      <label className="flex items-center justify-between gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> Регион
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
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
          placeholder="Введите ваш город или регион..."
          className={cn(
            "neu-sm h-10 w-full rounded-xl border-0 bg-card/60 px-3.5 text-sm",
            "placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
          )}
        />
        {open && filtered.length > 0 && (
          /* ИСПРАВЛЕНИЕ ЗДЕСЬ: bg-popover делает фон плотным, z-50 кладет список поверх всего, shadow-md добавляет объем */
          <div className="absolute left-0 top-full z-50 mt-1.5 max-h-64 w-full overflow-auto rounded-xl p-1 bg-popover shadow-md border border-border/40">
            {filtered.map((r) => {
              const active = r === value;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => pick(r)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    active && "bg-primary/10 text-primary font-medium",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 opacity-70" />
                    {r}
                  </span>
                  {active && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
