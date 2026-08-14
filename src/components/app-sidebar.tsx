import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Calculator, Network, FileText, MessageSquare, User, Zap } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Главная" },
  { to: "/knowledge", icon: BookOpen, label: "База знаний" },
  { to: "/calculators", icon: Calculator, label: "Калькуляторы" },
  { to: "/schemes", icon: Network, label: "Схемы" },
  { to: "/estimator", icon: FileText, label: "ИИ-сметчик" },
  { to: "/chat", icon: MessageSquare, label: "Чат с ИИ" },
  { to: "/profile", icon: User, label: "Профиль" },
];

// Специальный микро-компонент для ссылок меню с эффектом фонарика
function SidebarLink({ item }: { item: typeof navItems[0] }) {
  const divRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link
      to={item.to}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden flex items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&.active]:text-primary [&.active]:bg-primary/10 group outline-none"
    >
      {/* Мягкое свечение */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, color-mix(in srgb, var(--primary) 15%, transparent), transparent 40%)`,
        }}
      />
      {/* Иконка и текст */}
      <div className="relative z-10 flex items-center gap-3 w-full">
        <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
        {item.label}
      </div>
    </Link>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-card/30 lg:flex">
      
      {/* Логотип: Исправленный, 100% видимый текст */}
      <div className="flex h-16 items-center px-6 mb-4 mt-2">
        <Link to="/" className="flex items-center gap-3 outline-none group w-full">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_50%,transparent)]">
            <Zap className="h-5 w-5 drop-shadow-[0_0_8px_var(--primary)]" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-foreground transition-all duration-300 drop-shadow-sm group-hover:text-primary group-hover:drop-shadow-[0_0_8px_color-mix(in_srgb,var(--primary)_40%,transparent)]">
              ВольтПро
            </div>
            <div className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase opacity-80">
              Электрик • MVP
            </div>
          </div>
        </Link>
      </div>

      {/* Навигация */}
      <nav className="flex-1 space-y-1.5 px-4">
        {navItems.map((item) => (
          <SidebarLink key={item.to} item={item} />
        ))}
      </nav>

      {/* Совет дня */}
      <div className="p-4 mt-auto">
        <div className="rounded-[var(--radius)] border border-border bg-card/50 p-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
           <h4 className="font-bold text-sm mb-1">Совет дня</h4>
           <p className="text-xs text-muted-foreground">Используйте контрастную тему на солнце для лучшей читаемости.</p>
        </div>
      </div>
    </aside>
  );
}
