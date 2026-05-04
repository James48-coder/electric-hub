import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "hc" | "electric" | "industrial" | "eco" | "emerald";

export const THEMES: { id: Theme; label: string; swatch: string }[] = [
  { id: "light", label: "Светлая", swatch: "linear-gradient(135deg,#f4f6fb,#e6ecf6)" },
  { id: "dark", label: "Тёмная", swatch: "linear-gradient(135deg,#1f2540,#0f1325)" },
  { id: "hc", label: "Контраст", swatch: "linear-gradient(135deg,#ffffff 50%,#000 50%)" },
  { id: "electric", label: "Electric Blue", swatch: "linear-gradient(135deg,#1b3bff,#22d3ee)" },
  { id: "industrial", label: "Industrial", swatch: "linear-gradient(135deg,#3a2c1c,#d18a3a)" },
  { id: "eco", label: "Eco Power", swatch: "linear-gradient(135deg,#0f7a3d,#5fd38a)" },
  { id: "emerald", label: "Solid Emerald", swatch: "linear-gradient(135deg,#064e3b,#10b981)" },
];

type Ctx = { theme: Theme; setTheme: (t: Theme) => void };
const ThemeCtx = createContext<Ctx | null>(null);

const ALL = ["light", "dark", "hc", "electric", "industrial", "eco", "emerald"] as const;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    if (saved && ALL.includes(saved)) setThemeState(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    ALL.forEach((t) => root.classList.remove(t));
    if (theme !== "light") root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme: setThemeState }}>{children}</ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
