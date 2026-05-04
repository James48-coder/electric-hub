import { Home, BookOpen, Calculator, Network, MessageSquare, User, type LucideIcon } from "lucide-react";

export type NavItem = { to: string; label: string; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/knowledge", label: "База знаний", icon: BookOpen },
  { to: "/calculators", label: "Калькуляторы", icon: Calculator },
  { to: "/schemes", label: "Схемы", icon: Network },
  { to: "/chat", label: "Чат с ИИ", icon: MessageSquare },
  { to: "/profile", label: "Профиль", icon: User },
];
