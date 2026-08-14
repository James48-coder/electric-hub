import { Palette, Check, Sun, Moon, SunDim, Zap, PenTool, ShieldCheck, Wrench, Activity, Box } from "lucide-react";
import { THEMES, useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Маппинг строковых названий иконок в реальные компоненты Lucide
const iconMap: Record<string, React.ElementType> = {
  Sun, Moon, SunDim, Zap, PenTool, ShieldCheck, Wrench, Activity, Box
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Сменить тему"
        className="glass inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-border bg-card text-foreground transition hover:scale-105 active:scale-95"
      >
        <Palette className="h-5 w-5 text-primary" />
      </DropdownMenuTrigger>
      
      {/* Широкое окно для сетки тем */}
      <DropdownMenuContent align="end" className="w-80 rounded-[var(--radius)] border-border bg-card p-2 shadow-xl">
        <DropdownMenuLabel className="text-foreground">Оформление платформы</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        
        {/* Сетка в 2 колонки */}
        <div className="grid grid-cols-2 gap-1 pt-2">
          {THEMES.map((t) => {
            const Icon = iconMap[t.icon];
            const isActive = theme === t.id;
            
            return (
              <DropdownMenuItem
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-[var(--radius)] p-2 transition-colors ${
                  isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
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
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
