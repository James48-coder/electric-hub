import { createRootRoute, Outlet, ScrollRestoration, Link } from "@tanstack/react-router";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar"; 
import React, { useState, useEffect } from "react";
import { Menu, X, Calculator, Waypoints, MessageSquare, User, Home, BookOpen, Bot, Zap, Sun, Moon, Monitor, Square, Terminal, Waves, Hexagon, Check } from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AppWrapper />
    </ThemeProvider>
  );
}

function AppWrapper() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme(); 

  // Блокируем скролл основной страницы, когда открыто меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

  // Список твоих кастомных тем из десктопной версии
  const themesList = [
    { id: 'light', name: 'Светлая', icon: <Sun className="w-4 h-4" />, color: 'bg-white border-neutral-300' },
    { id: 'dark', name: 'Тёмная', icon: <Moon className="w-4 h-4" />, color: 'bg-neutral-900 border-neutral-700' },
    { id: 'contrast', name: 'Контрастная', icon: <Sun className="w-4 h-4" />, color: 'bg-amber-500 border-amber-600' },
    { id: 'oled', name: 'OLED Pro', icon: <Monitor className="w-4 h-4" />, color: 'bg-black border-neutral-800' },
    { id: 'scandi', name: 'Сканди Тех', icon: <Square className="w-4 h-4" />, color: 'bg-neutral-100 border-neutral-300' },
    { id: 'terminal', name: 'Терминал', icon: <Terminal className="w-4 h-4" />, color: 'bg-green-500 border-green-600' },
    { id: 'neon', name: 'Неоновый Океан', icon: <Waves className="w-4 h-4" />, color: 'bg-cyan-500 border-cyan-600' },
    { id: 'turquoise', name: 'Тёмная Бирюза', icon: <Hexagon className="w-4 h-4" />, color: 'bg-teal-600 border-teal-700' },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative">
      
      {/* МОБИЛЬНАЯ ШАПКА */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-40 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <div className="bg-primary/20 p-1.5 rounded-lg">
            <Zap className="h-5 w-5 text-primary fill-primary" />
          </div>
          ВольтПро
        </div>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg bg-primary text-primary-foreground shadow-md hover:bg-primary/90">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ (Непрозрачное) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col animate-in slide-in-from-right-full duration-300">
          <div className="h-16 border-b border-border flex items-center justify-between px-4 shrink-0 bg-card shadow-sm">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <div className="bg-primary/20 p-1.5 rounded-lg">
                <Zap className="h-5 w-5 text-primary fill-primary" />
              </div>
              Меню
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg bg-muted text-foreground border border-border shadow-sm">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex flex-col p-4 gap-1 overflow-y-auto pb-24 bg-background h-full">
            
            {/* ВЫБОР ТЕМЫ ОФОРМЛЕНИЯ */}
            <div className="mb-4 bg-card border border-border rounded-xl p-2 shadow-sm">
              <button 
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center justify-between w-full p-3 rounded-lg text-sm font-bold text-foreground"
              >
                Оформление платформы
                {isThemeMenuOpen ? <X className="w-4 h-4 text-muted-foreground"/> : <div className="w-4 h-4 rounded-full bg-primary"></div>}
              </button>
              
              {isThemeMenuOpen && (
                <div className="flex flex-col gap-1 mt-2 border-t border-border pt-2">
                  {themesList.map((t) => (
                    <button 
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setIsThemeMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <div className={`w-5 h-5 rounded border ${t.color} flex items-center justify-center`}>
                        {theme === t.id && <Check className="w-3 h-3 text-white mix-blend-difference" />}
                      </div>
                      <div className="text-muted-foreground">{t.icon}</div>
                      <span className={`text-sm ${theme === t.id ? 'font-bold text-primary' : 'text-foreground'}`}>
                        {t.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 ml-3">Навигация</p>
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

      {/* ДЕСКТОПНОЕ МЕНЮ */}
      <div className="hidden md:block h-screen shrink-0">
        <AppSidebar />
      </div>
      
      {/* КОНТЕНТ */}
      <div className="flex flex-1 flex-col overflow-hidden pt-16 md:pt-0 relative w-full">
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
