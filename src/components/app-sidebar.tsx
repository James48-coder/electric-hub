import { Link } from '@tanstack/react-router'
import { Zap, Home, BookOpen, FileText, Calculator, Waypoints, Bot, MessageSquare, Users, User, HelpCircle, Binary } from 'lucide-react'
import React, { useState, useEffect } from 'react'

export function AppSidebar() {
  // УМНЫЙ РУБИЛЬНИК АВТОРИЗАЦИИ (читает память браузера)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Функция проверки метки в памяти
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('voltpro_auth') === 'true')
    }
    
    checkAuth() // Проверяем при загрузке

    // Слушаем изменения авторизации в реальном времени
    window.addEventListener('storage', checkAuth)
    window.addEventListener('auth-change', checkAuth)

    return () => {
      window.removeEventListener('storage', checkAuth)
      window.removeEventListener('auth-change', checkAuth)
    }
  }, [])

  return (
    <aside className="w-64 h-full flex flex-col bg-card overflow-y-auto">
      {/* Логотип из скриншота */}
      <div className="h-16 flex items-center px-6 shrink-0 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2 outline-none group">
          <Zap className="h-5 w-5 text-primary" />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-foreground leading-none">ВольтПро</span>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">Электрик • MVP</span>
          </div>
        </Link>
      </div>

      {/* Навигация */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
        <SidebarLink to="/" icon={<Home className="w-5 h-5" />} label="Главная" />
        <SidebarLink to="/knowledge" icon={<BookOpen className="w-5 h-5" />} label="База знаний" />
        <SidebarLink to="/articles" icon={<FileText className="w-5 h-5" />} label="Статьи" />
        <SidebarLink to="/calculators" icon={<Calculator className="w-5 h-5" />} label="Калькуляторы" />
        <SidebarLink to="/schemes" icon={<Waypoints className="w-5 h-5" />} label="Схемы" />
        
        {/* НОВАЯ ССЫЛКА НА ДЕКОДЕР */}
        <SidebarLink to="/decoder" icon={<Binary className="w-5 h-5" />} label="Декодер" />
        
        <div className="my-2 border-t border-border/50"></div>
        
        <SidebarLink to="/estimator" icon={<Bot className="w-5 h-5" />} label="ИИ-сметчик" />
        <SidebarLink to="/chat" icon={<MessageSquare className="w-5 h-5" />} label="Чат с ИИ" />
        
        <div className="my-2 border-t border-border/50"></div>
        
        <SidebarLink to="/masters-chat" icon={<Users className="w-5 h-5" />} label="Чат мастеров" />
        
        {/* УМНАЯ ССЫЛКА НА ПРОФИЛЬ */}
        <SidebarLink 
          to={isAuthenticated ? "/profile" : "/login"} 
          icon={<User className="w-5 h-5" />} 
          label="Профиль" 
        />
        
        <SidebarLink to="/faq" icon={<HelpCircle className="w-5 h-5" />} label="Частые вопросы" />
      </nav>

      {/* Совет дня (из твоего скриншота) */}
      <div className="px-4 pb-6 mt-auto">
        <div className="p-4 rounded-xl border border-border bg-muted/30">
          <p className="text-xs font-bold text-foreground mb-1">Совет дня</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Используйте контрастную тему на солнце для лучшей читаемости.
          </p>
        </div>
      </div>
    </aside>
  )
}

function SidebarLink({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all font-medium"
      activeProps={{ className: "bg-primary/10 text-primary font-bold shadow-sm" }}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  )
}
