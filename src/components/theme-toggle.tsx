import { useState, useRef, useEffect } from "react";
import { Palette, Check, Sun, Moon, SunDim, Monitor, Square, Terminal, Waves, Hexagon } from "lucide-react";
import { THEMES, useTheme } from "./theme-provider";

// Обновленный маппинг всех иконок, включая новые темы
const iconMap: Record<string, React.ElementType> = {
  Sun, Moon, SunDim, Monitor, Square, Terminal, Waves, Hexagon
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике мимо
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Сменить тему"
        className="glass inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-border bg-card text-foreground transition hover:scale-105 active:scale-95"
      >
        <Palette className="h-5 w-5 text-primary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-[var(--radius)] border border-border bg-card p-2 shadow-xl">
          <div className="px-2 py-1.5 text-sm font-semibold text-foreground">
            Оформление платформы
          </div>
          <div className="my-1 h-px bg-border" />
          
          <div className="flex flex-col gap-1 pt-1">
            {THEMES.map((t) => {
              const Icon = iconMap[t.icon];
              const isActive = theme === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-left transition-colors ${
                    isActive
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-border/50 shadow-sm"
                    style={{ backgroundColor: t.swatch }}
                  >
                    {isActive && <Check className="h-3 w-3 mix-blend-difference text-white" />}
                  </div>
                  <Icon className="h-4 w-4 opacity-70" />
                  <span className="flex-1 text-sm">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
