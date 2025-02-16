"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

async function fetchSurahs() {
  try {
    const res = await fetch("http://api.alquran.cloud/v1/surah", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error("Error:", error)
    return []
  }
}

export function SurahList() {
  const [surahs, setSurahs] = useState([])
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    fetchSurahs().then(setSurahs)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {surahs.map((surah: any) => (
        <Link key={surah.number} href={`/quran/${surah.number}`}>
          <Card className="h-full transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {surah.number}. {language === "en" ? surah.englishName : surah.name}
                </CardTitle>
                <span className="text-2xl font-arabic">{surah.name}</span>
              </div>
              <p className="text-muted-foreground">
                {language === "en" ? surah.englishNameTranslation : surah.englishName} • {surah.numberOfAyahs}{" "}
                {t.verses}
              </p>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}

