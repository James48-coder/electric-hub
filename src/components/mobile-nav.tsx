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
            aria-current={active ? "page" : undefined}
            className={
              "group relative flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center text-[12px] font-semibold transition-all duration-300 ease-out hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
              (active
                ? "text-primary"
                : "text-foreground/85 hover:text-accent-foreground")
            }
          >
            <span
              className={
                "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 " +
                (active
                  ? "neu-inset text-primary glow"
                  : "text-foreground/80 group-hover:bg-accent/25 group-hover:text-accent-foreground group-hover:shadow-[0_0_18px_var(--color-accent)]")
              }
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="leading-none tracking-tight">{item.label}</span>
            {active && (
              <span className="absolute -top-0.5 h-1 w-6 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
