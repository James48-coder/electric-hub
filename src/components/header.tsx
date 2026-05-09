import { Bell, Search, Zap } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 mb-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:top-4 lg:mx-0 lg:mb-6 lg:mr-4 lg:rounded-2xl lg:border lg:bg-transparent lg:backdrop-blur-0">
      <div className="glass flex items-center gap-2 rounded-none px-4 py-3 lg:gap-3 lg:rounded-2xl">
        {/* Mobile brand */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="neu-sm grid h-9 w-9 place-items-center rounded-xl">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-tight">ВольтПро</span>
        </div>

        {/* Search — full on desktop, icon-only on mobile */}
        <div className="neu-inset hidden flex-1 items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground lg:flex">
          <Search className="h-4 w-4" />
          <input
            placeholder="Поиск по базе знаний, расчётам, схемам…"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            aria-label="Поиск"
            className="grid h-11 w-11 place-items-center rounded-xl text-foreground active:scale-95 lg:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Уведомления"
            className="glass relative grid h-11 w-11 place-items-center rounded-full lg:h-10 lg:w-10"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
          </button>

          {/* Theme & language only on desktop — mobile uses Drawer */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
