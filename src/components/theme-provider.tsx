import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "theme-cyberpunk" | "theme-fluke" | "contrast" | "theme-oled" | "theme-scandi" | "theme-terminal" | "theme-ocean" | "theme-teal"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "theme-cyberpunk",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "theme-cyberpunk",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    // Убираем все возможные классы тем
    root.classList.remove(
      "light", "dark", "theme-cyberpunk", "theme-fluke", 
      "contrast", "theme-oled", "theme-scandi", 
      "theme-terminal", "theme-ocean", "theme-teal"
    )

    // Если выбрана светлая тема, добавляем только класс 'light'
    if (theme === "light") {
        root.classList.add("light")
    } else {
        // Для всех остальных добавляем класс темы и ОБЯЗАТЕЛЬНО класс 'dark' 
        // для корректной работы Tailwind dark mode
        root.classList.add("dark")
        if (theme !== "dark") {
            root.classList.add(theme)
        }
    }
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
