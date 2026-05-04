import { Link, useRouterState } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { NAV_ITEMS } from "./nav-items";

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="glass sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col gap-2 rounded-2xl p-4 lg:flex ml-4">
      <Link to="/" className="mb-4 flex items-center gap-3 px-2 py-3">
        <div className="neu flex h-10 w-10 items-center justify-center rounded-xl">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight">ВольтПро</div>
          <div className="text-xs text-muted-foreground">Электрик · MVP</div>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all " +
                (active
                  ? "neu-inset text-primary"
                  : "text-foreground/80 hover:text-foreground hover:translate-x-0.5")
              }
            >
              <span
                className={
                  "flex h-8 w-8 items-center justify-center rounded-lg transition " +
                  (active ? "bg-primary/15 text-primary" : "bg-transparent text-muted-foreground group-hover:bg-muted")
                }
              >
                <Icon className="h-4 w-4" />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="neu-sm rounded-xl p-3 text-xs text-muted-foreground">
        <div className="mb-1 font-semibold text-foreground">Совет дня</div>
        Используйте контрастную тему на солнце для лучшей читаемости.
      </div>
    </aside>
  );
}
