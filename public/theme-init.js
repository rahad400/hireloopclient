;(() => {
  let theme = "system"

  try {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme
    }
  } catch {
    theme = "system"
  }

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme

  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(resolvedTheme)
  root.style.colorScheme = resolvedTheme
})()
