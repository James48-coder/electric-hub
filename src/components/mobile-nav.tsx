import { Link, useRouterState } from "@tanstack/react-router";
import { NAV_ITEMS } from "./nav-items";

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="glass fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-2xl p-2 lg:hidden">
      {NAV_ITEMS.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={
              "flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium transition " +
              (active ? "text-primary" : "text-muted-foreground")
            }
          >
            <span
              className={
                "flex h-9 w-9 items-center justify-center rounded-xl transition " +
                (active ? "neu-inset text-primary" : "")
              }
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="leading-none">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
