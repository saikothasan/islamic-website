"use client"

import { createContext, useContext, useState, useMemo, type ReactNode } from "react"

interface ThemeContext {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

const ThemeContext = createContext<ThemeContext>({
  theme: "system",
  setTheme: () => {},
})

export function ThemeProvider({
  children,
  attribute,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: {
  children: ReactNode
  attribute?: string
  defaultTheme?: "light" | "dark" | "system"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(defaultTheme)

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])

  return (
    <ThemeContext.Provider value={value}>
      <div className={`${attribute ? `${attribute}=${theme}` : ""} ${theme === "dark" ? "dark" : ""}`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

