"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = Exclude<Theme, "system">

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)
const themeChangeEvent = "hireloop:theme-change"
let inMemoryTheme: Theme | null = null

function parseTheme(value: string | null): Theme {
  if (value === "light" || value === "dark") {
    return value
  }

  return "system"
}

function subscribeToTheme(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === "theme" || event.key === null) {
      inMemoryTheme = parseTheme(event.newValue)
      onChange()
    }
  }

  window.addEventListener("storage", onStorage)
  window.addEventListener(themeChangeEvent, onChange)
  return () => {
    window.removeEventListener("storage", onStorage)
    window.removeEventListener(themeChangeEvent, onChange)
  }
}

function getThemeSnapshot(): Theme {
  try {
    const savedTheme = window.localStorage.getItem("theme")
    if (savedTheme !== null) {
      return parseTheme(savedTheme)
    }
  } catch {
    return inMemoryTheme ?? "system"
  }

  return inMemoryTheme ?? "system"
}

function getServerThemeSnapshot(): Theme {
  return "system"
}

function subscribeToSystemTheme(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  mediaQuery.addEventListener("change", onChange)
  return () => mediaQuery.removeEventListener("change", onChange)
}

function getSystemThemeSnapshot(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getServerSystemThemeSnapshot(): ResolvedTheme {
  return "light"
}

function applyTheme(theme: ResolvedTheme) {
  const transitionStyle = document.createElement("style")
  transitionStyle.textContent =
    "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
  document.head.appendChild(transitionStyle)
  window.getComputedStyle(document.body)

  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(theme)
  root.style.colorScheme = theme

  window.setTimeout(() => transitionStyle.remove(), 1)
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [resolvedTheme, setTheme])

  return null
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  )
  const systemTheme = React.useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemThemeSnapshot,
    getServerSystemThemeSnapshot
  )
  const resolvedTheme = theme === "system" ? systemTheme : theme

  const setTheme = React.useCallback((nextTheme: Theme) => {
    inMemoryTheme = nextTheme

    try {
      window.localStorage.setItem("theme", nextTheme)
    } catch {
      // Theme changes still apply when storage is unavailable.
    }

    window.dispatchEvent(new Event(themeChangeEvent))
  }, [])

  React.useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  const contextValue = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeHotkey />
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
