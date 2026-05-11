"use client"

import * as React from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme | ((current: Theme) => Theme)) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)
const storageKey = "theme"

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light"

  return window.localStorage.getItem(storageKey) === "dark" ? "dark" : "light"
}

function subscribeToThemeChange(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey) callback()
  }

  const handleThemeChange = () => callback()

  window.addEventListener("storage", handleStorage)
  window.addEventListener("themechange", handleThemeChange)

  return () => {
    window.removeEventListener("storage", handleStorage)
    window.removeEventListener("themechange", handleThemeChange)
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useSyncExternalStore<Theme>(subscribeToThemeChange, getStoredTheme, () => "light")

  React.useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = React.useCallback<ThemeContextValue["setTheme"]>((nextTheme) => {
    const resolvedTheme = typeof nextTheme === "function" ? nextTheme(getStoredTheme()) : nextTheme

    window.localStorage.setItem(storageKey, resolvedTheme)
    applyTheme(resolvedTheme)
    window.dispatchEvent(new Event("themechange"))
  }, [])

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
