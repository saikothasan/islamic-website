"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex space-x-2">
      <Button variant={language === "en" ? "default" : "outline"} onClick={() => setLanguage("en")}>
        EN
      </Button>
      <Button variant={language === "bn" ? "default" : "outline"} onClick={() => setLanguage("bn")}>
        বাং
      </Button>
    </div>
  )
}

