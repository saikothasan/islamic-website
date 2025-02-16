"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { translations } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export function Search() {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${language}/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder={t.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={t.search}
      />
      <Button type="submit" size="icon" aria-label={t.search}>
        <SearchIcon className="h-4 w-4" />
        <span className="sr-only">{t.search}</span>
      </Button>
    </form>
  )
}

