import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calculator, FileText, BookOpen, Menu, Network, User, X, type LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LanguageToggle } from "./language-toggle";
import { ThemeToggle } from "./theme-toggle";

type Item = { to: string; label: string; icon: LucideIcon };

const PRIMARY: Item[] = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/estimator", label: "Сметчик", icon: FileText },
  { to: "/calculators", label: "Расчёты", icon: Calculator },
  { to: "/knowledge", label: "База", icon: BookOpen },
];

const MORE: Item[] = [
  { to: "/profile", label: "Личный кабинет", icon: User },
  { to: "/schemes", label: "Схемы", icon: Network },
];

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  const moreActive = MORE.some((m) => isActive(m.to));

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.25)] lg:hidden"
      aria-label="Главное меню"
    >
      <div className="flex items-stretch justify-around px-1">
        {PRIMARY.map((item) => (
          <NavBtn key={item.to} item={item} active={isActive(item.to)} />
        ))}

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              aria-label="Ещё"
              className={
                "group relative flex min-h-[56px] min-w-[44px] flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-[12px] font-semibold transition-all duration-200 active:scale-95 " +
                (moreActive || open ? "text-primary" : "text-foreground/85")
              }
            >
              <span
                className={
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all " +
                  (moreActive || open ? "neu-inset text-primary glow" : "text-foreground/80")
                }
              >
                <Menu className="h-5 w-5" />
              </span>
              <span className="leading-none tracking-tight">Ещё</span>
              {(moreActive || open) && (
                <span className="absolute top-0 h-1 w-6 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              )}
            </button>
          </DrawerTrigger>

          <DrawerContent className="border-border bg-background">
            <DrawerHeader className="flex flex-row items-center justify-between pb-2">
              <DrawerTitle>Меню</DrawerTitle>
              <DrawerClose asChild>
                <button
                  aria-label="Закрыть"
                  className="grid h-11 w-11 place-items-center rounded-xl text-foreground/80 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </DrawerClose>
            </DrawerHeader>

            <div className="px-4 pb-8 space-y-2">
              {MORE.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={
                      "flex min-h-[56px] items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition-all active:scale-[0.98] " +
                      (active ? "neu-inset text-primary" : "neu-sm text-foreground")
                    }
                  >
                    <span
                      className={
                        "grid h-10 w-10 place-items-center rounded-xl " +
                        (active ? "bg-primary/15 text-primary" : "bg-muted text-foreground/80")
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    {item.label}
                  </Link>
                );
              })}

              <div className="neu-sm mt-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
                <span className="text-sm font-semibold text-foreground">Язык</span>
                <LanguageToggle />
              </div>

              <div className="neu-sm flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
                <span className="text-sm font-semibold text-foreground">Тема оформления</span>
                <ThemeToggle />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}

function NavBtn({ item, active }: { item: Item; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      aria-current={active ? "page" : undefined}
      className={
        "group relative flex min-h-[56px] min-w-[44px] flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-center text-[12px] font-semibold transition-all duration-200 active:scale-95 " +
        (active ? "text-primary" : "text-foreground/85")
      }
    >
      <span
        className={
          "flex h-9 w-9 items-center justify-center rounded-xl transition-all " +
          (active ? "neu-inset text-primary glow" : "text-foreground/80")
        }
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="leading-none tracking-tight">{item.label}</span>
      {active && (
        <span className="absolute top-0 h-1 w-6 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
      )}
    </Link>
  );
}
