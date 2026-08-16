import { createRootRoute, Outlet, ScrollRestoration, Link } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar"; 
import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Calculator, Waypoints, MessageSquare, User, Home, BookOpen, Bot, Zap } from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Простой и надежный переключатель темы (работает напрямую с DOM)
  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("vite-ui-theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("vite-ui-theme", "dark");
    }
  };

  // Блокируем скролл основной страницы, когда открыто мобильное меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative">
        
        {/* ========================================= */}
        {/* МОБИЛЬНАЯ ШАПКА (Видна только на телефонах) */}
        {/* ========================================= */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-40 shadow-sm">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <div className="bg-primary/20 p-1.5 rounded-lg">
              <Zap className="h-5 w-5 text-primary fill-primary" />
            </div>
            ВольтПро
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border shadow-sm">
              <Sun className="h-5 w-5 hidden dark:block text-amber-500" />
              <Moon className="h-5 w-5 block dark:hidden text-blue-500" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg bg-primary text-primary-foreground shadow-md hover:bg-primary/90">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ========================================= */}
        {/* МОБИЛЬНОЕ МЕНЮ (Выезжающая шторка) */}
        {/* ========================================= */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="h-16 border-b border-border flex items-center justify-between px-4 shrink-0 bg-card shadow-sm">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <div className="bg-primary/20 p-1.5 rounded-lg">
                  <Zap className="h-5 w-5 text-primary fill-primary" />
                </div>
                Меню
              </div>
              <div className="flex items-center gap-3">
                 <button onClick={toggleTheme} className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border shadow-sm">
                  <Sun className="h-5 w-5 hidden dark:block text-amber-500" />
                  <Moon className="h-5 w-5 block dark:hidden text-blue-500" />
                </button>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg bg-muted text-foreground border border-border hover:bg-neutral-200 dark:hover:bg-neutral-800 shadow-sm">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col p-4 gap-1 overflow-y-auto pb-24">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 ml-3 mt-2">Навигация</p>
              <MobileNavLink to="/" icon={<Home className="w-5 h-5"/>} label="Главная" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/knowledge" icon={<BookOpen className="w-5 h-5"/>} label="База знаний" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/calculators" icon={<Calculator className="w-5 h-5"/>} label="Калькуляторы" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/schemes" icon={<Waypoints className="w-5 h-5"/>} label="Схемы" onClick={() => setIsMobileMenuOpen(false)} />
              
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-6 mb-2 ml-3">Инструменты ИИ</p>
              <MobileNavLink to="/estimator" icon={<Bot className="w-5 h-5"/>} label="ИИ-сметчик" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/chat" icon={<MessageSquare className="w-5 h-5"/>} label="Чат с ИИ" onClick={() => setIsMobileMenuOpen(false)} />
              
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-6 mb-2 ml-3">Аккаунт</p>
              <MobileNavLink to="/profile" icon={<User className="w-5 h-5"/>} label="Профиль" onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* ДЕСКТОПНОЕ БОКОВОЕ МЕНЮ (Скрыто на мобилках) */}
        {/* ========================================= */}
        <div className="hidden md:block h-screen shrink-0">
          <AppSidebar />
        </div>
        
        {/* Правая часть: Шапка + Основной контент */}
        <div className="flex flex-1 flex-col overflow-hidden pt-16 md:pt-0 relative w-full">
          {/* Десктопная шапка скрыта на телефонах */}
          <div className="hidden md:block">
            <Header />
          </div>
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-6 bg-background">
            <Outlet />
          </main>
        </div>
        
      </div>
      <ScrollRestoration />
    </ThemeProvider>
  );
}

// Вспомогательный компонент для красивых мобильных ссылок
function MobileNavLink({ to, icon, label, onClick }: { to: string, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-muted-foreground hover:bg-muted transition-colors active:bg-primary/20 font-medium"
      activeProps={{ className: "bg-primary/10 text-primary font-bold shadow-sm border border-primary/20" }}
    >
      {icon}
      <span className="text-base">{label}</span>
    </Link>
  );
}
