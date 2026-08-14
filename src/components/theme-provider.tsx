import React, { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  { id: "light", label: "Светлая", icon: "Sun", swatch: "#ffffff" },
  { id: "dark", label: "Тёмная", icon: "Moon", swatch: "#09090b" },
  { id: "contrast", label: "Контрастная", icon: "SunDim", swatch: "#fbbf24" },
  { id: "theme-industrial", label: "Электрощитовая", icon: "Zap", swatch: "#b87333" },
  { id: "theme-blueprint", label: "Схемотехника", icon: "PenTool", swatch: "#1976d2" },
  { id: "theme-safety", label: "Безопасность", icon: "ShieldCheck", swatch: "#2e7d32" },
  { id: "theme-diy", label: "Мастерская", icon: "Wrench", swatch: "#cd7f32" },
  { id: "theme-flow", label: "Энергия", icon: "Activity", swatch: "#ff6a00" },
  { id: "theme-minimal", label: "Минимализм", icon: "Box", swatch: "#0066ff" },
];

type Theme = string;

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "voltpro-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (typeof window !== "undefined" ? (localStorage.getItem(storageKey) as Theme) : null) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Удаляем все возможные классы тем перед установкой новой
    const allThemes = THEMES.map(t => t.id);
    root.classList.remove(...allThemes, "system");
    body.classList.remove(...allThemes, "system");
    
    // Применяем тему к html и body для надежности
    root.classList.add(theme);
    body.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
