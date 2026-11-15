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

function getResolvedTheme(theme: Theme): ResolvedTheme {
  if (theme !== "system") {
    return theme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(theme)
  root.style.colorScheme = theme
}

function readSavedTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem("theme")
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme
    }
  } catch {
    return "system"
  }

  return "system"
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
  const [theme, setThemeState] = React.useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] =
    React.useState<ResolvedTheme>("light")

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)

    try {
      window.localStorage.setItem("theme", nextTheme)
    } catch {
      // Theme changes still apply when storage is unavailable.
    }

    const resolved = getResolvedTheme(nextTheme)
    setResolvedTheme(resolved)
    applyTheme(resolved)
  }, [])

  React.useEffect(() => {
    const savedTheme = readSavedTheme()
    const resolved = getResolvedTheme(savedTheme)
    setThemeState(savedTheme)
    setResolvedTheme(resolved)
    applyTheme(resolved)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const onSystemThemeChange = () => {
      if (savedTheme === "system") {
        const systemTheme = getResolvedTheme("system")
        setResolvedTheme(systemTheme)
        applyTheme(systemTheme)
      }
    }

    mediaQuery.addEventListener("change", onSystemThemeChange)
    return () => mediaQuery.removeEventListener("change", onSystemThemeChange)
  }, [])

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
