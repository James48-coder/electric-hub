import { createRootRoute, Outlet, ScrollRestoration, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar"; 
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Calculator, Waypoints, MessageSquare, User, Home, BookOpen, Bot, Zap, FileText, Users, HelpCircle, Palette } from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2 mt-4 mb-2">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-3">Тема оформления</p>
      <div className="grid grid-cols-1 gap-2 px-2">
        <button 
          onClick={() => setTheme("theme-cyberpunk")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors border ${theme === 'theme-cyberpunk' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-transparent border-transparent text-muted-foreground hover:bg-muted'}`}
        >
          <div className="w-4 h-4 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
          <span className="text-sm">Кибер-Вольт</span>
        </button>

        <button 
          onClick={() => setTheme("theme-fluke")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors border ${theme === 'theme-fluke' ? 'bg-amber-500/10 border-amber-500 text-amber-500 font-bold' : 'bg-transparent border-transparent text-muted-foreground hover:bg-muted'}`}
        >
          <div className="w-4 h-4 rounded-sm bg-amber-500 shrink-0"></div>
          <span className="text-sm">Индустриальный Fluke</span>
        </button>

        <button 
          onClick={() => setTheme("light")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors border ${theme === 'light' ? 'bg-gray-200 border-gray-400 text-gray-900 font-bold dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100' : 'bg-transparent border-transparent text-muted-foreground hover:bg-muted'}`}
        >
          <div className="w-4 h-4 border-2 border-gray-400 shrink-0 rounded-full bg-white"></div>
          <span className="text-sm">На объекте (Контраст)</span>
        </button>
      </div>
    </div>
  );
}

function RootComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Изначально берем статус авторизации прямо из памяти, чтобы не было "вылетов" при переходе
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('voltpro_auth') !== null;
  });

  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  // === 1. ВОССТАНОВЛЕНИЕ СЕССИИ (При запуске) ===
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const savedRoute = localStorage.getItem('voltpro_last_route');
      
      if (savedRoute && savedRoute !== '/' && currentPath === '/') {
        navigate({ to: savedRoute, replace: true });
      }
    }
  }, [currentPath, navigate]);

  // === 2. СОХРАНЕНИЕ СЕССИИ (При каждом переходе) ===
  useEffect(() => {
    if (currentPath) {
      localStorage.setItem('voltpro_last_route', currentPath);
      // При каждом переходе проверяем, не разлогинился ли юзер
      setIsAuthenticated(localStorage.getItem('voltpro_auth') !== null);
    }
  }, [currentPath]);

  // === 3. СЛУШАТЕЛЬ СОСТОЯНИЯ (Открытое меню / Вход / Выход) ===
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('voltpro_auth') !== null);
    };
    
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => { 
      document.body.style.overflow = 'unset';
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    }
  }, [isMobileMenuOpen]);

  return (
    <ThemeProvider defaultTheme="theme-cyberpunk">
      <div className="flex min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative">
        
        {/* МОБИЛЬНОЕ МЕНЮ */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[100] flex flex-col animate-in slide-in-from-left-full duration-300 bg-card text-card-foreground shadow-2xl">
            <div className="h-16 border-b border-border flex items-center justify-between px-4 shrink-0 bg-card">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                  <Zap className="h-5 w-5 fill-primary" />
                </div>
                ВольтПро
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg bg-muted text-foreground border border-border hover:bg-neutral-200 dark:hover:bg-neutral-800 shadow-sm">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col p-4 gap-2 overflow-y-auto pb-24 h-full bg-card">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 ml-3 mt-2">Навигация</p>
              <MobileNavLink to="/" icon={<Home className="w-5 h-5"/>} label="Главная" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/knowledge" icon={<BookOpen className="w-5 h-5"/>} label="База знаний" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/articles" icon={<FileText className="w-5 h-5"/>} label="Статьи" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/calculators" icon={<Calculator className="w-5 h-5"/>} label="Калькуляторы" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink to="/schemes" icon={<Waypoints className="w-5 h-5"/>} label="Схемы" onClick={() => setIsMobileMenuOpen(false)} />
              
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-4 mb-1 ml-3">Инструменты ИИ</p>
              <MobileNavLink to="/estimator" icon={<Bot className="w-5 h-5"/>} label="ИИ-сметчик" onClick={() => setIsMobileMenuOpen(false)} />
              
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-4 mb-1 ml-3">Сообщество и аккаунт</p>
              <MobileNavLink to="/masters-chat" icon={<Users className="w-5 h-5"/>} label="Чат мастеров" onClick={() => setIsMobileMenuOpen(false)} />
              
              <MobileNavLink 
                to={isAuthenticated ? "/profile" : "/login"} 
                icon={<User className="w-5 h-5"/>} 
                label="Профиль" 
                onClick={() => setIsMobileMenuOpen(false)} 
              />
              
              <MobileNavLink to="/faq" icon={<HelpCircle className="w-5 h-5"/>} label="Частые вопросы" onClick={() => setIsMobileMenuOpen(false)} />
              
              {/* ПЕРЕКЛЮЧАТЕЛЬ ТЕМ */}
              <div className="mt-4 pt-4 border-t border-border">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        )}

        <div className="hidden md:flex flex-col w-64 shrink-0 border-r border-border bg-card">
          <AppSidebar />
          {/* ПЕРЕКЛЮЧАТЕЛЬ ТЕМ В ДЕСКТОПНОМ МЕНЮ */}
          <div className="p-4 border-t border-border bg-card mt-auto">
             <ThemeSwitcher />
          </div>
        </div>
        
        <div className="flex flex-1 flex-col overflow-hidden w-full relative">
          <div className="md:hidden flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-sm shrink-0">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <Zap className="h-5 w-5 fill-primary text-primary" />
              ВольтПро
            </div>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg bg-primary text-primary-foreground shadow-md hover:opacity-90">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <Header />
          
          <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-background">
            <div className="flex-1 p-4 lg:p-6">
              <Breadcrumbs />
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>
        
      </div>
      <ScrollRestoration />
    </ThemeProvider>
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
