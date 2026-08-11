import { useState, useRef, useEffect } from "react";
import { Outlet, createRootRoute, Link, useNavigate } from "@tanstack/react-router";
import { 
  Home, 
  BookOpen, 
  Calculator, 
  Network, 
  FileText, 
  MessageSquare, 
  User, 
  Search, 
  Bell, 
  Palette, 
  Zap,
  X
} from "lucide-react";
import "../index.css";

export const Route = createRootRoute({
  component: RootLayout,
});

const SEARCH_ITEMS = [
  { title: "Калькулятор сечения кабеля", path: "/calculators", category: "Калькуляторы" },
  { title: "Расчет падения напряжения", path: "/calculators", category: "Калькуляторы" },
  { title: "Обычный выключатель", path: "/schemes", category: "Описание схем" },
  { title: "Проходные выключатели", path: "/schemes", category: "Описание схем" },
  { title: "Сборка распределительного щита", path: "/schemes", category: "Описание схем" },
  { title: "База знаний ПУЭ и ГОСТ", path: "/knowledge", category: "Документация" },
  { title: "Чат с ИИ (DeepSeek)", path: "/chat", category: "Ассистент" },
];

export function RootLayout() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [lang, setLang] = useState<"RU" | "EN">("RU");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = SEARCH_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-6 py-3 flex items-center justify-between gap-4">
        
        <div ref={searchRef} className="relative flex-1 max-w-xl">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={lang === "RU" ? "Поиск по базе знаний, расчётам, схемам..." : "Search knowledge, calculators, schemes..."}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-full h-11 pl-11 pr-10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute top-14 left-0 right-0 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate({ to: item.path });
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-3 hover:bg-slate-800/70 cursor-pointer border-b border-slate-800/50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-200">{item.title}</div>
                      <div className="text-xs text-blue-400">{item.category}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-slate-400">
                  {lang === "RU" ? "Ничего не найдено" : "No results found"}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-12 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-semibold text-sm">
                    {lang === "RU" ? "Уведомления" : "Notifications"}
                  </span>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                    2 новых
                  </span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/50">
                    <div className="font-semibold text-slate-200">Обновление норм ПУЭ-7</div>
                    <div className="text-slate-400 mt-0.5">Актуализированы требования к сечениям кабелей и защитным аппаратам.</div>
                  </div>
                  <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/50">
                    <div className="font-semibold text-slate-200">Совет дня</div>
                    <div className="text-slate-400 mt-0.5">Используйте контрастную тему на солнце для лучшей читаемости.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex bg-slate-900 border border-slate-800 rounded-full p-1 text-xs font-semibold">
            <button
              onClick={() => setLang("RU")}
              className={`px-3 py-1 rounded-full transition-all ${lang === "RU" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
            >
              RU
            </button>
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-1 rounded-full transition-all ${lang === "EN" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
            >
              EN
            </button>
          </div>

          <button className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <Palette className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r border-slate-800/80 p-6 flex flex-col justify-between hidden md:flex">
          <div className="space-y-8">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white grid place-items-center shadow-lg shadow-blue-500/20">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="font-bold tracking-tight text-lg">ВольтПро</div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Электрик • MVP</div>
              </div>
            </div>

            <nav className="space-y-1">
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all [&.active]:bg-blue-600 [&.active]:text-white [&.active]:shadow-lg [&.active]:shadow-blue-600/20">
                <Home className="w-4 h-4" /> Главная
              </Link>
              <Link to="/knowledge" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all [&.active]:bg-blue-600 [&.active]:text-white [&.active]:shadow-lg [&.active]:shadow-blue-600/20">
                <BookOpen className="w-4 h-4" /> База знаний
              </Link>
              <Link to="/calculators" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all [&.active]:bg-blue-600 [&.active]:text-white [&.active]:shadow-lg [&.active]:shadow-blue-600/20">
                <Calculator className="w-4 h-4" /> Калькуляторы
              </Link>
              <Link to="/schemes" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all [&.active]:bg-blue-600 [&.active]:text-white [&.active]:shadow-lg [&.active]:shadow-blue-600/20">
                <Network className="w-4 h-4" /> Схемы
              </Link>
              <Link to="/estimator" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all [&.active]:bg-blue-600 [&.active]:text-white [&.active]:shadow-lg [&.active]:shadow-blue-600/20">
                <FileText className="w-4 h-4" /> ИИ-сметчик
              </Link>
              <Link to="/chat" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all [&.active]:bg-blue-600 [&.active]:text-white [&.active]:shadow-lg [&.active]:shadow-blue-600/20">
                <MessageSquare className="w-4 h-4" /> Чат с ИИ
              </Link>
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900/60 transition-all [&.active]:bg-blue-600 [&.active]:text-white [&.active]:shadow-lg [&.active]:shadow-blue-600/20">
                <User className="w-4 h-4" /> Профиль
              </Link>
            </nav>
          </div>

          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-1.5">
            <div className="text-xs font-semibold text-blue-400">Совет дня</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Используйте контрастную тему на солнце для лучшей читаемости.
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
