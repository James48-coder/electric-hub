import { Bell, Search } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-4 z-30 mx-4 mb-6 lg:mx-0 lg:mr-4">
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
        <div className="neu-inset flex flex-1 items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <input
            placeholder="Поиск по базе знаний, расчётам, схемам…"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        <LanguageToggle />
        <button
          aria-label="Уведомления"
          className="glass relative hidden h-10 w-10 items-center justify-center rounded-full sm:inline-flex"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
