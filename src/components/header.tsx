import { Link } from "@tanstack/react-router";
import { Zap, Bell, Globe, Palette } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
        
        <div className="flex items-center gap-2 md:hidden">
          {/* Пустой блок для баланса на мобильных, так как логотип слева, а кнопка меню была перенесена */}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {/* Поиск и хлебные крошки */}
          <div className="w-full max-w-sm">
             <div className="relative">
                <input type="text" placeholder="Поиск по базе знаний, расчётам, схемам..." className="w-full pl-4 pr-10 py-2 bg-muted/50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                   {/* Иконка поиска, если нужна */}
                </div>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="flex items-center gap-1.5 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted border border-border px-3">
             <Globe className="w-4 h-4" />
             <span className="text-sm font-medium">RU</span>
          </button>

          {/* НОВЫЙ ПЕРЕКЛЮЧАТЕЛЬ ТЕМ */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-xl border border-border hover:bg-muted bg-card shadow-sm">
                <Palette className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border shadow-lg rounded-xl overflow-hidden p-1">
              <DropdownMenuItem onClick={() => setTheme("theme-cyberpunk")} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${theme === 'theme-cyberpunk' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted'}`}>
                <div className="w-4 h-4 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                <span>Кибер-Вольт</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("theme-fluke")} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${theme === 'theme-fluke' ? 'bg-amber-500/10 text-amber-500 font-bold' : 'hover:bg-muted'}`}>
                <div className="w-4 h-4 rounded-sm bg-amber-500 shrink-0"></div>
                <span>Индустриальный Fluke</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${theme === 'light' ? 'bg-gray-200 text-gray-900 font-bold dark:bg-gray-800 dark:text-gray-100' : 'hover:bg-muted'}`}>
                <div className="w-4 h-4 border-2 border-gray-400 shrink-0 rounded-full bg-white"></div>
                <span>На объекте (Контраст)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
