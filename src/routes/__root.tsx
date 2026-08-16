import { createRootRoute, Outlet, ScrollRestoration, Link } from "@tanstack/react-router";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar"; 
import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Calculator, Waypoints, MessageSquare, User, Home, BookOpen, Bot, Zap } from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

// Обертка нужна для того, чтобы useTheme сработал внутри ThemeProvider
function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AppWrapper />
    </ThemeProvider>
  );
}

function AppWrapper() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Правильное переключение темы через хук Shadcn
  const { theme, setTheme } = useTheme(); 

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
    <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative">
      
      {/* ========================================= */}
      {/* МОБИЛЬНАЯ ШАПКА */}
      {/* ========================================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-neutral-950 border-b border-border flex items-center justify-between px-4 z-40 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <div className="bg-primary/20 p-1.5 rounded-lg">
            <Zap className="h-5 w-5 text-primary fill-primary" />
          </div>
          ВольтПро
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-foreground transition-colors border border-border shadow-sm">
            {theme === "dark" ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-blue-500" />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg bg-primary text-primary-foreground shadow-md hover:bg-primary/90">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* МОБИЛЬНОЕ МЕНЮ (Абсолютно непрозрачный фон) */}
      {/* ========================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-neutral-950 flex flex-col animate-in slide-in-from-right-full duration-300">
          <div className="h-16 border-b border-border flex items-center justify-between px-4 shrink-0 bg-white dark:bg-neutral-950 shadow-sm">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <div className="bg-primary/20 p-1.5 rounded-lg">
                <Zap className="h-5 w-5 text-primary fill-primary" />
              </div>
              Меню
            </div>
            <div className="flex items-center gap-3">
               <button onClick={toggleTheme} className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-foreground transition-colors border border-border shadow-sm">
                {theme === "dark" ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-blue-500" />}
              </button>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-foreground border border-border hover:bg-neutral-200 dark:hover:bg-neutral-700 shadow-sm">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Контейнер с жестко заданным фоном, чтобы ничего не просвечивало */}
          <div className="flex flex-col p-4 gap-1 overflow-y-auto pb-24 bg-white dark:bg-neutral-950 h-full">
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
      {/* ДЕСКТОПНОЕ БОКОВОЕ МЕНЮ */}
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
  );
}

// Вспомогательный компонент для красивых мобильных ссылок
function MobileNavLink({ to, icon, label, onClick }: { to: string, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors active:bg-primary/20 font-medium"
      activeProps={{ className: "bg-primary/10 text-primary font-bold shadow-sm border border-primary/20 dark:text-primary dark:bg-primary/20" }}
    >
      {icon}
      <span className="text-base">{label}</span>
    </Link>
  );
}
