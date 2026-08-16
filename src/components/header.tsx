import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, Zap, X, Info } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Обработчик закрытия окон при клике мимо них
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifs(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 mb-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:top-4 lg:mx-0 lg:mb-6 lg:mr-4 lg:rounded-[var(--radius)] lg:border lg:bg-transparent lg:backdrop-blur-0">
      <div className="glass flex items-center gap-2 rounded-none px-4 py-3 lg:gap-3 lg:rounded-[var(--radius)]">
        
        {/* Mobile brand */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground">ВольтПро</span>
        </div>

        {/* Search Desktop */}
        <div 
          ref={searchRef}
          className="relative hidden flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 lg:flex transition-all"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchActive(true);
            }}
            onFocus={() => setIsSearchActive(true)}
            placeholder="Поиск по базе знаний, расчётам, схемам…"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Search Dropdown */}
          {isSearchActive && searchQuery && (
            <div className="absolute left-0 top-full mt-2 w-full rounded-[var(--radius)] border border-border bg-card p-2 shadow-lg animate-in fade-in slide-in-from-top-2 z-50">
              <div className="flex items-center gap-2 p-3 text-sm text-muted-foreground">
                <Search className="h-4 w-4 animate-pulse" />
                <span>Ищем «{searchQuery}» в базе данных...</span>
              </div>
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Search Mobile Button (Лупа) */}
          <button
            aria-label="Поиск"
            className="grid h-11 w-11 place-items-center rounded-xl text-foreground active:scale-95 lg:hidden hover:bg-muted/50 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Mobile Theme Toggle (Кнопка тем для мобильных - строго между лупой и колокольчиком) */}
          <div className="lg:hidden flex items-center">
            <ThemeToggle />
          </div>

          {/* Notifications Dropdown (Колокольчик) */}
          <div className="relative" ref={notifRef}>
            <button
              aria-label="Уведомления"
              onClick={() => setShowNotifs(!showNotifs)}
              className={`glass relative grid h-11 w-11 place-items-center rounded-full lg:h-10 lg:w-10 transition-colors hover:bg-muted/50 ${showNotifs ? 'bg-muted' : ''}`}
            >
              <Bell className="h-4 w-4 text-foreground" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
            </button>

            {showNotifs && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-[var(--radius)] border border-border bg-card p-4 shadow-lg animate-in fade-in slide-in-from-top-2 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-foreground">Уведомления</h3>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Прочитать все</span>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-3 rounded-lg bg-primary/10 p-3 text-sm border border-primary/20">
                    <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-foreground leading-relaxed">
                      <span className="font-semibold text-primary block mb-0.5">Добро пожаловать в VoltPro!</span>
                      Платформа успешно обновлена до версии 2026.
                    </p>
                  </div>
                  <div className="flex gap-3 rounded-lg bg-muted/50 p-3 text-sm border border-border">
                    <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-muted-foreground leading-relaxed">
                      Справочник ПУЭ 7 дополнен новыми комментариями.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme & language desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
