import { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { THEMES, useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div className="absolute right-0 top-12 z-50 min-w-56 rounded-[var(--radius)] border border-border bg-card p-1 shadow-xl">
          <div className="px-2 py-1.5 text-sm font-semibold text-foreground">
            Тема оформления
          </div>
          <div className="my-1 h-px bg-border" />
          
          <div className="flex flex-col gap-1">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className="flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-accent hover:text-foreground"
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-border"
                  style={{ background: t.swatch }}
                />
                <span className="flex-1 text-sm">{t.label}</span>
                {theme === t.id && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
