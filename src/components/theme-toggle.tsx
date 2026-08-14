import { useState, useRef, useEffect } from "react";
import { Palette, Check, Sun, Moon, SunDim, Zap, PenTool, ShieldCheck, Wrench, Activity, Box } from "lucide-react";
import { THEMES, useTheme } from "./theme-provider";

// Маппинг строковых названий иконок в реальные компоненты Lucide
const iconMap: Record<string, React.ElementType> = {
  Sun, Moon, SunDim, Zap, PenTool, ShieldCheck, Wrench, Activity, Box
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Обработчик закрытия меню при клике в любое другое место экрана
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Кнопка открытия */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Сменить тему"
        className="glass inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-border bg-card text-foreground transition hover:scale-105 active:scale-95"
      >
        <Palette className="h-5 w-5 text-primary" />
      </button>

      {/* Выпадающее окно (рендерится только если isOpen === true) */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-[var(--radius)] border border-border bg-card p-2 shadow-xl">
          <div className="px-2 py-1.5 text-sm font-semibold text-foreground">
            Оформление платформы
          </div>
          <div className="my-1 h-px bg-border" />
          
          {/* Сетка тем */}
          <div className="grid grid-cols-2 gap-1 pt-1">
            {THEMES.map((t) => {
              const Icon = iconMap[t.icon];
              const isActive = theme === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false); // Закрываем меню после выбора
                  }}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-[var(--radius)] p-2 text-left transition-colors ${
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/50 shadow-sm"
                    style={{ backgroundColor: t.swatch }}
                  >
                    {isActive && <Check className="h-3 w-3 text-white mix-blend-difference" />}
                  </div>
                  <div className="flex flex-1 items-center gap-2 truncate">
                    <Icon className="h-3.5 w-3.5 opacity-70" />
                    <span className="text-xs">{t.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
