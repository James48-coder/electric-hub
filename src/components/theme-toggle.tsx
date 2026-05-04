import { Palette, Check } from "lucide-react";
import { THEMES, useTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Сменить тему"
        className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:scale-105 active:scale-95"
      >
        <Palette className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass min-w-56 rounded-xl border-border">
        <DropdownMenuLabel>Тема оформления</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTheme(t.id)}
            className="flex items-center gap-3 rounded-lg"
          >
            <span
              className="h-5 w-5 rounded-full border border-border"
              style={{ background: t.swatch }}
            />
            <span className="flex-1">{t.label}</span>
            {theme === t.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
