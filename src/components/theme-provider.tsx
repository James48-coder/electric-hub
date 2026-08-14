import React, { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  { id: "light", label: "Светлая", icon: "Sun", swatch: "#ffffff" },
  { id: "dark", label: "Тёмная", icon: "Moon", swatch: "#09090b" },
  { id: "contrast", label: "Контрастная", icon: "SunDim", swatch: "#fbbf24" },
  { id: "theme-oled", label: "OLED Pro", icon: "Monitor", swatch: "#000000" },
  { id: "theme-scandi", label: "Сканди Тех", icon: "Square", swatch: "#f8fafc" },
  { id: "theme-terminal", label: "Терминал", icon: "Terminal", swatch: "#10b981" },
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
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "voltpro-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (typeof window !== "undefined" ? (localStorage.getItem(storageKey) as Theme) : null) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Сбрасываем все классы перед применением нового
    const allThemes = THEMES.map(t => t.id);
    root.classList.remove(...allThemes, "system");
    body.classList.remove(...allThemes, "system");
    
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
